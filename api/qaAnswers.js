// Require the express essentials
const express = require("express");
const router = express.Router();

// Require prisma to interact with the DB
const prisma = require("../db/prisma");

router.put("/:companyId/:qaCategoryId", async (req, res) => {
  try {
    const transactions = [];
    const allAnswers = await prisma.qaFactorsAnswers.findMany();
    console.log(allAnswers);
    req.body.answers.forEach(async (element) => {
      const checkIfAnswered = allAnswers.filter(
        (item) =>
          item.companyId === Number(req.params.companyId) &&
          item.qaCategoryId === Number(req.params.qaCategoryId) &&
          item.qaFactorId === Number(element.qaFactorId)
      );
      console.log({ checkIfAnswered });
      const object = {
        answer: element.answer,
        rating: Number(element.rating),
        companyId: Number(req.params.companyId),
        qaCategoryId: Number(req.params.qaCategoryId),
        qaFactorId: Number(element.id),
      };
      if (!element.answerId) {
        transactions.push(
          prisma.qaFactorsAnswers.create({
            data: object,
          })
        );
      } else {
        transactions.push(
          prisma.qaFactorsAnswers.update({
            data: object,
            where: {
              id: element.answerId,
            },
          })
        );
      }
    });
    const transaction = await prisma.$transaction(transactions);
    res.json({
      message: "OK",
      transaction,
    });
  } catch (e) {
    console.log(e);
    res.status(400).json({
      message: "Kunne ikke opdatere faktoren",
    });
  }
});

router.get("/:companyId", async (req, res) => {
  try {
    const results = await prisma.qaFactorsAnswers.findMany({
      where: {
        companyId: Number(req.params.companyId),
      },
    });
    res.json({
      message: "OK",
      results,
    });
  } catch (e) {
    console.log(e);
    res.status(400).json({
      message: "Kunne ikke opdatere faktoren",
    });
  }
});

module.exports = router;
