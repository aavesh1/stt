var express = require("express");
var router = express.Router();
var Task = require("../models/task.js");
var User = require("../models/user.js");

// ADDING TASK
router.post("/tdl/newtask/:id", isLoggedIn, (req, res) => {
  var task = req.body.task;
  var date = req.body.date;
  var newtask = { task: task, date: date };
  User.findById(req.params.id, function (err, user) {
    if (err) {
      console.log(err);
    } else {
      Task.create(newtask, function (err, created) {
        if (err) {
          console.log(err);
        } else {
          user.task.push(created);
          user.save(function (err) {
            if (err) {
              console.log(err);
            } else {
              req.flash("success", "Task Added Succesfully");
              res.redirect("/tdl/" + user._id);
            }
          });
        }
      });
    }
  });
});

//Viewing Tasks
router.get("/tdl/:id", isLoggedIn, (req, res) => {
  User.findById(req.params.id)
    .populate("task")
    .exec(function (err, founduser) {
      if (err) {
        console.log(err);
      } else {
        res.render("tdl", { founduser: founduser });
      }
    });
});

//Deleting Task
router.delete("/:id/deletetask/:user", isLoggedIn, (req, res) => {
  var uid = req.params.user;
  Task.findByIdAndRemove(req.params.id, function (err, deleted) {
    if (err) {
      res.redirect("/");
    } else {
      req.flash("success", "Entry Deleted Succesfully");
      res.redirect("/tdl/" + uid);
    }
  });
});

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  } else {
    req.flash("error", "Please Login First");
    res.redirect("/login");
  }
}

module.exports = router;
