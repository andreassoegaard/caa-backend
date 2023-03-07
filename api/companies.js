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
router.post("/", async (req, res) => {
  try {
    const result = await prisma.companies.create({
      data: req.body,
    });
    res.json({
      message: "OK",
      result: result.id,
    });
  } catch (e) {
    res.status(400).json({
      message: "Kunne ikke oprette virksomheden",
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
router.get("/", async (req, res) => {
  try {
    const results = await prisma.companies.findMany();
    res.json({
      message: "OK",
      results,
    });
  } catch (e) {
    res.status(400).json({
      message: "Kunne ikke hente virksomhederne",
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
router.get("/:id", async (req, res) => {
  try {
    const result = await prisma.companies.findUnique({
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
      message: "Kunne ikke hente virksomheden",
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
    await prisma.companies.update({
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
    await prisma.qaFactorsAnswers.deleteMany({
      where: {
        companyId: Number(req.params.id),
      },
    });
    const deleteResult = await prisma.companies.delete({
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
        message: "Virksomheden findes ikke",
      });
    }
  } catch (e) {
    res.status(400).json({
      message: "Kunne ikke slette virksomheden",
    });
  }
});

module.exports = router;
