const ProductModel = require("../models/Products");

exports.getAllProducts = async (req, res) => {
  try {
    let data = await ProductModel.find();
    res.status(200).send({ data: [...data], success: true });
  } catch (err) {
    console.log(err);
    res.status(404).send({ success: false, msg: err.message });
  }
};

exports.getProduct = async (req, res) => {
  try {
    let data = await ProductModel.findById(req.params.id);
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

exports.addProduct = async (req, res) => {
  const user = new ProductModel(req.body);
  try {
    await user.save();
    res.status(201).send({ data: user["_doc"], success: true });
  } catch (err) {
    console.log(err);
    res.status(400).send({ success: false, msg: err.message });
  }
};
