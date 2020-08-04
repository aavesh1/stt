var mongoose = require("mongoose");
const { model } = require("./user");
var TaskSchema = new mongoose.Schema({
  task: String,
  date: Date,
  username : String ,
});

module.exports = mongoose.model("Task", TaskSchema);
