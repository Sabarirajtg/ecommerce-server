const UserModel = require("../models/users");
const PurchaseModel = require("../models/Purchase");

exports.getAllUsers = async (req, res) => {
  try {
    let data = await UserModel.find().populate("purchases");
    res.status(200).send({ data: [...data], success: true });
  } catch (err) {
    console.log(err);
    res.status(404).send({ success: false, msg: err.message });
  }
};

exports.login = async (req, res) => {
  try {
    let data = await UserModel.findOne({ email: req.body.email });
    if (data === null || data === {}) {
      res
        .status(200)
        .send({ success: false, loggedIn: false, msg: "Invalid Email" });
    } else if (data.password !== req.body.password) {
      res
        .status(200)
        .send({ success: false, loggedIn: false, msg: "Invalid Password" });
    } else {
      res
        .status(200)
        .send({ success: true, loggedIn: true, msg: "Logged in", user: data });
    }
  } catch (err) {
    res.status(404).send({ success: false, msg: err.message });
  }
};

exports.getUser = async (req, res) => {
  try {
    let data = await UserModel.findById(req.params.id).populate({
      path: "purchases",
      model: "Purchase",
      populate: {
        path: "products",
        model: "Products",
      },
    }).exec();
    if (data === null) {
      // noinspection ExceptionCaughtLocallyJS
      throw new Error("No record found");
    }
    res.status(200).send({ data: data, success: true });
  } catch (err) {
    console.log(err);
    if (err.name === "CastError") {
      res.status(404).send({ success: false, msg: "Invalid User Id" });
    } else {
      res.status(404).send({ success: false, msg: err.message });
    }
  }
};

exports.getPurchases = async (req, res) => {
  try {
    let data = await UserModel.findById(req.params.id);
    if (data === null) {
      // noinspection ExceptionCaughtLocallyJS
      throw new Error("No record found");
    }
    res.status(200).send({ data: data, success: true });
  } catch (err) {
    console.log(err);
    if (err.name === "CastError") {
      res.status(404).send({ success: false, msg: "Invalid User Id" });
    } else {
      res.status(404).send({ success: false, msg: err.message });
    }
  }
};

exports.addUser = async (req, res) => {
  const user = new UserModel(req.body);

  try {
    await user.save();
    res.status(201).send({ data: user["_doc"], success: true });
  } catch (err) {
    console.log(err);
    res.status(400).send({ success: false, msg: err.message });
  }
};

exports.updateUser = async (req, res) => {
  try {
    let data = await UserModel.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    }).exec();
    res.status(200).send({ data: data["_doc"], success: true });
  } catch (err) {
    console.log(err);
    res.status(404).send({ success: false, msg: err.message });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    let data = await UserModel.findByIdAndRemove(req.params.id).exec();
    res.status(200).send({ data: data["_doc"], success: true });
  } catch (err) {
    console.log(err);
    res.status(404).send({ success: false, msg: err.message });
  }
};

exports.addPurchase = async (req, res) => {
  /*
    {
        "_id": 
        "total": 100;
        "products": [
            "123",
            "124"
        ]
    }
    /users/123
    */
  try {
    // user = {} => id => {"purchases" : []}
    // find user
    let user = await UserModel.findById(req.params.id);

    // create new purchase
    let purchase = new PurchaseModel(req.body);
    // insert new purchase to db
    let purchaseDoc = await purchase.save();

    // get purchase id and add to user
    user.purchases.push(purchaseDoc["_id"]);

    // save updated user
    let updatedUser = user.save();
    res.status(200).send({ data: updatedUser, success: true });
  } catch (err) {
    console.log(err);
    res.status(404).send({ success: false, msg: err.message });
  }
};
