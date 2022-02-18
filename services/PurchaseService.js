const UserModel = require("../models/Purchase");

exports.getAllPurchase = async (req, res) => {
  try {
    let data = await UserModel.find().populate("products");
    res.status(200).send({ data: [...data], success: true });
  } catch (err) {
    console.log(err);
    res.status(404).send({ success: false, msg: err.message });
  }
};

exports.addPurchase = async (req, res) => {
  const user = new UserModel(req.body);

  try {
    await user.save();
    res.status(201).send({ data: user["_doc"], success: true });
  } catch (err) {
    console.log(err);
    res.status(400).send({ success: false, msg: err.message });
  }
};

exports.getPurchase = async (req, res) => {
  try {
    let data = await UserModel.findById(req.params.id).populate("products");
    res.status(200).send({ data: data, success: true });
  } catch (err) {
    console.log(err);
    res.status(404).send({ success: false, msg: err.message });
  }
};
