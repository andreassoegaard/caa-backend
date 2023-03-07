// Require the express essentials
const express = require("express");
const router = express.Router();

// Require prisma to interact with the DB
const prisma = require("../db/prisma");

router.put("/:companyId/:qaCategoryId", async (req, res) => {
  try {
    const transactions = [];
    req.body.answers.forEach(async (element) => {
      // console.log(element);
      const allAnswers = await prisma.qaFactorsAnswers.findMany();
      console.log({
        log: allAnswers,
      });
      const checkIfAnswered = allAnswers.filter(
        (item) =>
          item.companyId === Number(req.params.companyId) &&
          item.qaCategoryId === Number(req.params.qaCategoryId) &&
          item.qaFactorId === Number(element.qaFactorId)
      );
      // console.log(checkIfAnswered);
      if (checkIfAnswered.length === 0) {
        const object = {
          answer: element.answer,
          rating: Number(element.rating),
          companyId: Number(req.params.companyId),
          qaCategoryId: Number(req.params.qaCategoryId),
          qaFactorId: Number(element.id),
        };
        transactions.push(
          prisma.qaFactorsAnswers.create({
            data: object,
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
    res.status(400).json({
      message: "Kunne ikke opdatere faktoren",
    });
  }
});

module.exports = router;
