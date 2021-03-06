const UserFinance = require("../models/UserFinance.model");

module.exports.getFinance = (req, res) => {
  const userId = req.user._id;

  UserFinance.findOne({ userId }).then(doc => {
    if (!doc) {
      res.status(400).json({
        success: false,
        message: "Not found finance data with this user ID"
      });
    }

    res.status(200).json({
      success: true,
      message: "Data found with this ID",
      finance: doc,
      user: { name: req.user.name, email: req.user.email }
    });
  });
};

module.exports.saveFinance = (req, res) => {
  const userId = req.user._id;

  const newData = {
    date: req.body.date,
    type: req.body.type,
    category: req.body.category,
    comments: req.body.comments,
    amount: req.body.amount,
    balanceAfter: req.body.balanceAfter,
    typeBalanceAfter: req.body.typeBalanceAfter
  };

  UserFinance.findOneAndUpdate(
    { userId },
    {
      $push: { data: newData },
      totalBalance: newData.balanceAfter,
      typeTotalBalance: newData.typeBalanceAfter
    },
    { new: true, upsert: true }
  ).then((doc, err) => {
    if (err) {
      res.status(400).json({
        success: false,
        message: "Not found finance data with this user ID"
      });
    }
    res.status(200).json({
      success: true,
      message: "Data found with this ID",
      user: { name: req.user.name, email: req.user.email },
      finance: doc
    });
  });
};
