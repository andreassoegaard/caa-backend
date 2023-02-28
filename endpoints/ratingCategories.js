// Require the express essentials
const express = require("express");
const router = express.Router();

// Require prisma to interact with the DB
const prisma = require("../db/prisma");

router.post("/", async (req, res) => {
  try {
    await prisma.ratingCategories.create({
      data: req.body,
    });
    res.json({
      message: "OK",
    });
  } catch (e) {
    res.status(400).json({
      message: "Kunne ikke oprette kategorien",
    });
  }
});

router.get("/", async (req, res) => {
  try {
    const results = await prisma.ratingCategories.findMany();
    res.json({
      message: "OK",
      results,
    });
  } catch (e) {
    res.status(400).json({
      message: "Kunne ikke oprette kategorien",
    });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const result = await prisma.ratingCategories.findUnique({
      where: {
        id: Number(req.params.id),
      },
    });
    res.json({
      message: "OK",
      result,
    });
  } catch (e) {
    res.status(400).json({
      message: "Kunne ikke hente kategorien",
    });
  }
});

router.put("/:id", async (req, res) => {
  try {
    await prisma.ratingCategories.update({
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
      message: "Kunne ikke opdatere kategorien",
    });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    await prisma.ratingCategories.delete({
      where: {
        id: Number(req.params.id),
      },
    });
    res.json({
      message: "OK",
    });
  } catch (e) {
    res.status(400).json({
      message: "Kunne ikke slette kategorien",
    });
  }
});

module.exports = router;
