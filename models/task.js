var mongoose = require("mongoose");
const { model } = require("./user");
var TaskSchema = new mongoose.Schema({
  task: String,
  date: Date,
});

module.exports = mongoose.model("Task", TaskSchema);
