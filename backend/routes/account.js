const express = require("express");
const { authMiddleware } = require("../middleware");
const { Account } = require("../dbSchema");
const mongoose = require("mongoose");

const router = express.Router();
module.exports = router;

// const mongoose = require("mongoose");
// const Account = require("./path-to-your-account-model");
//
// const transferFunds = async (fromAccountId, toAccountId, amount) => {
//   // Decrement the balance of the fromAccount
//   await Account.findByIdAndUpdate(fromAccountId, {
//     $inc: { balance: -amount },
//   });
//
//   // Increment the balance of the toAccount
//   await Account.findByIdAndUpdate(toAccountId, { $inc: { balance: amount } });
// };
//
// // Example usage
// transferFunds("fromAccountID", "toAccountID", 100);

router.get("/balance", authMiddleware, async (req, res) => {
  const account = await Account.findOne({
    userId: req.userId,
  });
  if (!account) {
    res.status(-200).json({
      message: "Something went wrong.",
    });
  }
  res.json({
    balance: account.balance,
  });
});

router.post("/transfer", authMiddleware, async (req, res) => {
  console.log("Wds");
  const session = await mongoose.startSession();

  session.startTransaction();
  const { amount, to } = req.body;

  //   Fetching the acc details of user who is initiating transfer
  const account = await Account.findOne({
    userId: req.userId,
  }).session(session);

  // Check if acc exits or balance is enough for transaction.
  if (!account || account.balance < amount) {
    await session.abortTransaction();
    return res.status(400).json({
      message: "Insufficient balance",
    });
  }

  const toAccount = await Account.findOne({
    userId: to,
  }).session(session);

  // Checks if credited acc exists
  if (!toAccount) {
    await session.abortTransaction();
    return res.status(400).json({
      message: "Invalid account",
    });
  }

  await Account.updateOne(
    { userId: req.userId },
    { $inc: { balance: -amount } },
  ).session(session);
  await Account.updateOne(
    { userId: to },
    { $inc: { balance: +amount } },
  ).session(session);

  //   Commit the transaction to DB
  await session.commitTransaction();
  res.json({
    message: "Transfer succesful",
  });
});
