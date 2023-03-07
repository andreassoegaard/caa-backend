// Require the express essentials
const express = require("express");
const router = express.Router();

// Require prisma to interact with the DB
const prisma = require("../db/prisma");

router.put("/:companyId/:qaCategoryId", async (req, res) => {
  try {
    req.body.answers.forEach(async (element) => {
      const checkIfAnswered = await prisma.qaFactorsAnswers.findFirst({
        where: {
          companyId: Number(req.params.companyId),
          qaCategoryId: Number(req.params.qaCategoryId),
          qaFactorId: Number(element.qaFactorId),
        },
      });
      console.log(checkIfAnswered);
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

module.exports = router;
