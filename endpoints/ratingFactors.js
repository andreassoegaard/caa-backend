// Require the express essentials
const express = require("express");
const router = express.Router();

// Require prisma to interact with the DB
const prisma = require("../db/prisma");

router.post("/", async (req, res) => {
  try {
    await prisma.ratingFactors.create({
      data: req.body,
    });
    res.json({
      message: "OK",
    });
  } catch (e) {
    res.status(400).json({
      message: "Kunne ikke oprette faktoren",
    });
  }
});

router.get("/:categoryId", async (req, res) => {
  try {
    const result = await prisma.ratingFactors.findMany({
      where: {
        categoryId: Number(req.params.categoryId),
      },
    });
    res.json({
      message: "OK",
      result,
    });
  } catch (e) {
    res.status(400).json({
      message: "Kunne ikke hente faktorerne",
    });
  }
});

router.put("/:id", async (req, res) => {
  try {
    await prisma.ratingFactors.update({
      where: {
        id: Number(req.params.id),
      },
      data: req.body,
    });
    res.json({
      message: "OK",
    });
  } catch (e) {
    res.status(400).json({
      message: "Kunne ikke opdatere faktoren",
    });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    await prisma.ratingFactors.delete({
      where: {
        id: Number(req.params.id),
      },
    });
    res.json({
      message: "OK",
    });
  } catch (e) {
    res.status(400).json({
      message: "Kunne ikke slette faktoren",
    });
  }
});

module.exports = router;
