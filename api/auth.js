// Require the express essentials
const express = require("express");
const router = express.Router();

// Require prisma to interact with the DB
const prisma = require("../db/prisma");

// Require the auth stuff
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const hashCost = 12;

// Functions to use to provide access and refresh tokens when logging in
const generateAccessToken = (user) => {
  return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "24h" });
};
const generateRefreshToken = (user) => {
  return jwt.sign(user, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: "30d",
  });
};

router.post("/create", async (req, res) => {
  try {
    const name = req.body.name;
    const email = req.body.email;
    const password = await bcrypt.hash(req.body.password, hashCost);
    await prisma.users.create({
      data: {
        email,
        password,
        name,
      },
    });
    res.json({
      message: "OK",
    });
  } catch (e) {
    res.status(400).json({
      message: "Kunne ikke oprette brugeren",
    });
  }
});

router.post("/login", async (req, res) => {
  try {
    const email = req.body.email;
    const user = await prisma.users.findUnique({
      where: {
        email,
      },
    });

    // Check to see if the user exists in the list of registered users
    // If user does not exist, send a 400 response
    if (user == null) {
      res.status(404).json({
        message: "Bruger eksisterer ikke",
      });
    } else if (await bcrypt.compare(req.body.password, user.password)) {
      const accessToken = generateAccessToken({ user: user.id });
      const refreshToken = generateRefreshToken({ user: user.id });
      await prisma.refreshTokens.create({
        data: {
          token: refreshToken,
        },
      });

      const accessTokenExpiry = new Date();
      accessTokenExpiry.setHours(accessTokenExpiry.getHours() + 24);

      const returnObject = {
        message: "OK",
        accessToken,
        accessTokenExpiry,
        refreshToken,
        user: {
          id: user.id,
          email: user.email,
          name: user.name,
        },
      };
      res.json(returnObject);
    } else {
      res.status(401).json({
        message: "Password er forkert",
      });
    }
  } catch (e) {
    res.status(400).json({
      message: "Login mislykkedes",
    });
  }
});

router.post("/logout", async (req, res) => {
  try {
    await prisma.refreshTokens.delete({
      where: {
        token: req.body.token,
      },
    });
    res.status(200).json({
      message: "Du er nu logget ud",
    });
  } catch (e) {
    res.status(403).json({
      message: "Ugyldig token",
    });
  }
});

router.get("/users", async (req, res) => {
  try {
    const results = await prisma.users.findMany({
      select: {
        id: true,
        name: true,
        email: true,
      },
    });
    res.json({
      message: "OK",
      results,
    });
  } catch (e) {
    console.log(e);
    res.status(400).json({
      message: "Kunne ikke hente brugerne",
      error: e,
    });
  }
});

const validateMiddleware = (req, res, next) => {
  if (!req.body.token) {
    res.status(400).json({
      message: "Invalid request",
    });
  } else {
    next();
  }
};
router.post("/validate", validateMiddleware, async (req, res) => {
  try {
    const token = await prisma.refreshTokens.findUnique({
      where: {
        token: req.body.token,
      },
    });

    if (token) {
      jwt.verify(
        req.body.token,
        process.env.REFRESH_TOKEN_SECRET,
        async (err, result) => {
          if (err) {
            res.status(403).json({
              message: "F1: Din session er udløbet. Log venligst ind igen",
            });
          } else {
            // Delete current token
            await prisma.refreshTokens.delete({
              where: {
                token: req.body.token,
              },
            });

            // Gennerate new tokens
            const user = await prisma.users.findUnique({
              where: {
                id: result.user,
              },
            });
            const accessToken = generateAccessToken({ user: result.user });
            const refreshToken = generateRefreshToken({ user: result.user });
            const accessTokenExpiry = new Date();
            accessTokenExpiry.setHours(accessTokenExpiry.getHours() + 24);
            const createAction = await prisma.refreshTokens.create({
              data: {
                token: refreshToken,
              },
            });

            res.json({
              message: "OK",
              accessToken,
              accessTokenExpiry,
              refreshToken,
              user: {
                id: user.id,
                email: user.email,
                name: user.name,
              },
            });
          }
        }
      );
    } else {
      res.status(403).json({
        message: "F2: Din session er udløbet. Log venligst ind igen",
      });
    }
  } catch (e) {
    res.status(403).json({
      message: "F3: Der skete en fejl. Log venligst ind igen",
    });
  }
});

module.exports = router;
