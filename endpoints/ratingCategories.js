// Require the express essentials
const express = require("express");
const router = express.Router();

// Require prisma to interact with the DB
const prisma = require("../db/prisma");

/**
 * @swagger
 * components:
 *   schemas:
 *     RatingCategory:
 *       type: object
 *       required:
 *         - name
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated id of the rating category
 *         name:
 *           type: string
 *           description: The title of the rating category
 *       example:
 *         id: 1
 *         title: Mining
 *     RatingCategories:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated id of the rating category
 *         name:
 *           type: string
 *           description: The title of the rating category
 *       example:
 *         id: 1
 *         title: Mining
 */

/**
 * @swagger
 * /ratingCategories:
 *   post:
 *     summary: Create a new rating category
 *     tags: [RatingCategories]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/RatingCategory'
 *     responses:
 *       200:
 *         description: The created rating category.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/RatingCategory'
 *       400:
 *         description: Some server error
 *
 */
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

/**
 * @swagger
 * /ratingCategories:
 *   get:
 *     summary: Get all rating categories
 *     tags: [RatingCategories]
 *     responses:
 *       200:
 *         description: The created rating categories.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/RatingCategories'
 *       400:
 *         description: Some server error
 *
 */
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

/**
 * @swagger
 * /ratingCategories/:id:
 *   get:
 *     summary: Get a specific rating category
 *     tags: [RatingCategories]
 *     responses:
 *       200:
 *         description: The requested rating category.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/RatingCategory'
 *       400:
 *         description: Some server error
 *
 */
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

/**
 * @swagger
 * /ratingCategories/:id:
 *   put:
 *     summary: Change a rating category
 *     tags: [RatingCategories]
 *     responses:
 *       200:
 *         description: The rating category has been changed.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/RatingCategory'
 *       400:
 *         description: Some server error
 *
 */
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

/**
 * @swagger
 * /ratingCategories/:id:
 *   delete:
 *     summary: Delete a rating category
 *     tags: [RatingCategories]
 *     responses:
 *       200:
 *         description: The rating category has been deleted.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/RatingCategory'
 *       400:
 *         description: Some server error
 *
 */
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
