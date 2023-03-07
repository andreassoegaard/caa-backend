// Require the express essentials
const express = require("express");
const router = express.Router();

// Require prisma to interact with the DB
const prisma = require("../db/prisma");

router.put("/:companyId/:qaCategoryId", async (req, res) => {
  try {
    const answersToPost = [];
    req.body.answers.forEach(async (element) => {
      const checkIfAnswered = await prisma.qaFactorsAnswers.findFirst({
        where: {
          companyId: Number(req.params.companyId),
          qaCategoryId: Number(req.params.qaCategoryId),
          qaFactorId: Number(element.qaFactorId),
        },
      });
      if (!checkIfAnswered) {
        const object = {
          answer: element.answer,
          rating: Number(element.rating),
          companyId: Number(req.params.companyId),
          qaCategoryId: Number(req.params.qaCategoryId),
          qaFactorId: Number(element.id),
        };
        answersToPost.push(object);
      }
    });
    res.json({
      message: "OK",
      answersToPost,
    });
  } catch (e) {
    res.status(400).json({
      message: "Kunne ikke opdatere faktoren",
    });
  }
});

module.exports = router;
