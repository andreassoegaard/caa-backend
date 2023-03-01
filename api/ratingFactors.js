// Require the express essentials
const express = require("express");
const router = express.Router();

// Require prisma to interact with the DB
const prisma = require("../db/prisma");

/**
 * @swagger
 * components:
 *   schemas:
 *     RatingFactor:
 *       type: object
 *       required:
 *         - name
 *         - importance
 *         - categoryId
 *       properties:
 *         id:
 *           type: int
 *           description: The auto-generated id of the rating factor
 *         name:
 *           type: string
 *           description: The name of the rating factor
 *         description:
 *           type: string
 *           description: The description of the rating factor
 *         importance:
 *           type: int
 *           description: The importance of the rating factor
 *         categoryId:
 *           type: int
 *           description: The category of the rating factor
 *       example:
 *         id: 1
 *         name: Fully diluted
 *         description: Ligger der warrants, optioner, mv?
 *         importance: 1
 *         categoryId: 2
 *     RatingFactors:
 *       type: object
 *       properties:
 *         id:
 *           type: int
 *           description: The auto-generated id of the rating factor
 *         name:
 *           type: string
 *           description: The name of the rating factor
 *         description:
 *           type: string
 *           description: The description of the rating factor
 *         importance:
 *           type: int
 *           description: The importance of the rating factor
 *         categoryId:
 *           type: int
 *           description: The category of the rating factor
 *       example:
 *         id: 1
 *         name: Fully diluted
 *         description: Ligger der warrants, optioner, mv?
 *         importance: 1
 *         categoryId: 2
 */

/**
 * @swagger
 * /ratingFactors:
 *   post:
 *     summary: Create a new rating factor
 *     tags: [RatingFactors]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/RatingFactor'
 *     responses:
 *       200:
 *         description: The created rating factor.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/RatingFactor'
 *       400:
 *         description: Some server error
 *
 */
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

/**
 * @swagger
 * /ratingFactors/:categoryId:
 *   get:
 *     summary: Get rating factors based on category
 *     tags: [RatingFactors]
 *     responses:
 *       200:
 *         description: The requested rating factors based on category.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/RatingFactors'
 *       400:
 *         description: Some server error
 *
 */
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

/**
 * @swagger
 * /ratingFactors/:id:
 *   put:
 *     summary: Change a specific rating factor
 *     tags: [RatingFactors]
 *     responses:
 *       200:
 *         description: The rating factor has been changed.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/RatingFactor'
 *       400:
 *         description: Some server error
 *
 */
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

/**
 * @swagger
 * /ratingFactors/:id:
 *   delete:
 *     summary: Delete a specific rating factor
 *     tags: [RatingFactors]
 *     responses:
 *       200:
 *         description: The rating factor has been deleted.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/RatingFactor'
 *       400:
 *         description: Some server error
 *
 */
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
