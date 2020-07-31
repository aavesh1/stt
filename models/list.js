var mongoose = require("mongoose");
const { model } = require("./user");
var ListSchema = new mongoose.Schema({
  username : String,
  score : Number,
  
});

module.exports = mongoose.model("List", ListSchema);