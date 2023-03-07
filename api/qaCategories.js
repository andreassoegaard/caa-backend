// Require the express essentials
const express = require("express");
const router = express.Router();

// Require prisma to interact with the DB
const prisma = require("../db/prisma");
const validateToken = require("../middlewares/validateToken");

/**
 * @swagger
 * components:
 *   schemas:
 *     QaCategory:
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
 *     QaCategories:
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
 * /qaCategories:
 *   post:
 *     summary: Create a new rating category
 *     tags: [QaCategories]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/QaCategory'
 *     responses:
 *       200:
 *         description: The created rating category.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/QaCategory'
 *       400:
 *         description: Some server error
 *
 */
router.post("/", validateToken, async (req, res) => {
  try {
    const result = await prisma.qaCategories.create({
      data: req.body,
    });
    res.json({
      message: "OK",
      result: result.id,
    });
  } catch (e) {
    console.log(e);
    res.status(400).json({
      message: "Kunne ikke oprette kategorien",
    });
  }
});

/**
 * @swagger
 * /qaCategories:
 *   get:
 *     summary: Get all rating categories
 *     tags: [QaCategories]
 *     responses:
 *       200:
 *         description: The created rating categories.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/QaCategories'
 *       400:
 *         description: Some server error
 *
 */
router.get("/", validateToken, async (req, res) => {
  try {
    const results = await prisma.qaCategories.findMany();
    res.json({
      message: "OK",
      results,
    });
  } catch (e) {
    console.log(e);
    res.status(400).json({
      message: "Kunne ikke hente kategorierne",
      error: e,
    });
  }
});

/**
 * @swagger
 * /qaCategories/:id:
 *   get:
 *     summary: Get a specific rating category
 *     tags: [QaCategories]
 *     responses:
 *       200:
 *         description: The requested rating category.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/QaCategory'
 *       400:
 *         description: Some server error
 *
 */
router.get("/:id", validateToken, async (req, res) => {
  try {
    const result = await prisma.qaCategories.findUnique({
      where: {
        id: Number(req.params.id),
      },
    });

    if (result) {
      res.json({
        message: "OK",
        result,
      });
    } else {
      res.status(400).json({
        message: "Kategori findes ikke",
      });
    }
  } catch (e) {
    res.status(400).json({
      message: "Kunne ikke hente kategorien",
    });
  }
});

/**
 * @swagger
 * /qaCategories/:id:
 *   put:
 *     summary: Change a rating category
 *     tags: [QaCategories]
 *     responses:
 *       200:
 *         description: The rating category has been changed.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/QaCategory'
 *       400:
 *         description: Some server error
 *
 */
router.put("/:id", validateToken, async (req, res) => {
  try {
    await prisma.qaCategories.update({
      where: {
        id: Number(req.params.id),
      },
      data: req.body,
    });
    res.json({
      message: "OK",
    });
  } catch (e) {
    console.log(e);
    res.status(400).json({
      message: "Kunne ikke opdatere kategorien",
      error: JSON.stringify(e),
    });
  }
});

/**
 * @swagger
 * /qaCategories/:id:
 *   delete:
 *     summary: Delete a rating category
 *     tags: [QaCategories]
 *     responses:
 *       200:
 *         description: The rating category has been deleted.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/QaCategory'
 *       400:
 *         description: Some server error
 *
 */
router.delete("/:id", validateToken, async (req, res) => {
  try {
    // Find companies that has this QA Category ID
    const companiesWithThisId = await prisma.companies.findMany({
      where: {
        ratingCategoryId: Number(req.params.id),
      },
    });

    if (companiesWithThisId && companiesWithThisId.length > 0) {
      res.status(400).json({
        message: `Kategorien kan ikke slettes, da den er koblet på ${companiesWithThisId.length} virksomheder. Fjern den fra alle virksomhederne og prøv igen.`,
      });
    } else {
      const deleteResult = await prisma.qaCategories.delete({
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
          message: "Kategorien findes ikke",
        });
      }
    }
  } catch (e) {
    res.status(400).json({
      message: "Kunne ikke slette kategorien",
    });
  }
});

module.exports = router;
