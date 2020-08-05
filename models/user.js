var mongoose = require("mongoose");
var passportLocalMongoose = require("passport-local-mongoose");

var userSchema = new mongoose.Schema({
  username: String,
  password: String,
  completedtasks : [{task : String , time : String}] ,
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
  list : [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "List",
    },
  ],
  goal: Number, 
});
userSchema.plugin(passportLocalMongoose);
module.exports = mongoose.model("User", userSchema);
