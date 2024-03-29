require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const app = express();

app.use(cors());

mongoose.connect(
  "mongodb+srv://admin:admin@infotix.yvteh.mongodb.net/retail?retryWrites=true&w=majority",
  { useNewUrlParser: true }
);

const db = mongoose.connection;
db.on("error", (error) => console.error(error));
db.once("open", () => console.log("connected to database"));

app.use(express.json());

app.use("/", require("./routes/index"));
app.use("/users", require("./routes/users"));
app.use("/products", require("./routes/Product"));
app.use("/purchases", require("./routes/Purchase"));

app.listen(process.env.PORT || 4000, () => console.log("server started at 8080"));