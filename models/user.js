var mongoose = require("mongoose");
var passportLocalMongoose = require("passport-local-mongoose");

var userSchema = new mongoose.Schema({
  username: String,
  password: String,
  data: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Data",
    },
  ],
  task: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Task",
    },
  ],

  goal: Number,
});
userSchema.plugin(passportLocalMongoose);
module.exports = mongoose.model("User", userSchema);
