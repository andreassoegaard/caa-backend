// Require the express essentials
const express = require("express");
const router = express.Router();

// Require prisma to interact with the DB
const prisma = require("../db/prisma");

/**
 * @swagger
 * components:
 *   schemas:
 *     QaFactor:
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
 *     QaFactors:
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
 * /qaFactors:
 *   post:
 *     summary: Create a new rating factor
 *     tags: [QaFactors]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/QaFactor'
 *     responses:
 *       200:
 *         description: The created rating factor.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/QaFactor'
 *       400:
 *         description: Some server error
 *
 */
router.post("/:categoryId", async (req, res) => {
  try {
    req.body.categoryId = Number(req.params.categoryId);
    await prisma.qaFactors.create({
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
 * /qaFactors/:categoryId:
 *   get:
 *     summary: Get rating factors based on category
 *     tags: [QaFactors]
 *     responses:
 *       200:
 *         description: The requested rating factors based on category.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/QaFactors'
 *       400:
 *         description: Some server error
 *
 */
router.get("/:categoryId", async (req, res) => {
  try {
    const results = await prisma.qaFactors.findMany({
      where: {
        _categoryId: Number(req.params.categoryId),
      },
      orderBy: {
        importance: { sort: "asc" },
      },
    });
    res.json({
      message: "OK",
      results,
    });
  } catch (e) {
    console.log(e);
    res.status(400).json({
      message: "Kunne ikke hente faktorerne",
    });
  }
});

/**
 * @swagger
 * /qaFactors/:categoryId/:factorId:
 *   get:
 *     summary: Get rating factor based on factor id
 *     tags: [QaFactors]
 *     responses:
 *       200:
 *         description: The requested rating factor based on id.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/QaFactor'
 *       400:
 *         description: Some server error
 *
 */
router.get("/:categoryId/:factorId", async (req, res) => {
  try {
    const result = await prisma.qaFactors.findUnique({
      where: {
        id: Number(req.params.factorId),
      },
    });
    res.json({
      message: "OK",
      result,
    });
  } catch (e) {
    res.status(400).json({
      message: "Kunne ikke hente faktoren",
    });
  }
});

/**
 * @swagger
 * /qaFactors/:id:
 *   put:
 *     summary: Change a specific rating factor
 *     tags: [QaFactors]
 *     responses:
 *       200:
 *         description: The rating factor has been changed.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/QaFactor'
 *       400:
 *         description: Some server error
 *
 */
router.put("/:id", async (req, res) => {
  try {
    req.body.importance = Number(req.body.importance);
    await prisma.qaFactors.update({
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
 * /qaFactors/:id:
 *   delete:
 *     summary: Delete a specific rating factor
 *     tags: [QaFactors]
 *     responses:
 *       200:
 *         description: The rating factor has been deleted.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/QaFactor'
 *       400:
 *         description: Some server error
 *
 */
router.delete("/:id", async (req, res) => {
  try {
    const deleteResult = await prisma.qaFactors.delete({
      where: {
        id: Number(req.params.id),
      },
    });
    if (deleteResult) {
      res.json({
        message: "OK",
      });
    } else {
      res.status(400).json({
        message: "Faktoren findes ikke",
      });
    }
  } catch (e) {
    res.status(400).json({
      message: "Kunne ikke slette faktoren",
    });
  }
});

module.exports = router;
