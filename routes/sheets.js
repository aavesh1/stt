var express = require("express");
var router = express.Router();
var Data = require("../models/data.js");
var User = require("../models/user.js");

//To view Add new data form
router.get("/sheets/:id/new", isLoggedIn, (req, res) => {
  
     User.findById(req.params.id)
       .populate("data")
       .exec(function (err, founduser) {
         if (err) {
           console.log(err);
         } else {
           res.render("new", { founduser: founduser });
         }
       });

});

//to add new data
router.post("/sheets/:id/new", isLoggedIn, (req, res) => {
  var user = req.body.username;
  var date = req.body.date;
  var topic = req.body.topic;
  var time = req.body.time;
  var totaltime = Number(req.body.totaltime) + Number(req.body.time) ;
  var newData = { date: date, topic: topic, time: time, user: user , totaltime: totaltime };
  User.findById(req.params.id, function (err, user) {
    if (err) {
      console.log(err);
    } else {
      Data.create(newData, function (err, created) {
        if (err) {
          console.log(err);
        } else {
          user.data.push(created);
          user.save(function (err) {
            if (err) {
              console.log(err);
            } else {
              req.flash("success", "Entry Added Succesfully");
              res.redirect("/sheets/" + user._id);
            }
          });
        }
      });
    }
  });
});

//to view all the data
router.get("/sheets/:id", isLoggedIn, (req, res) => {
  User.findById(req.params.id)
    .populate("data")
    .exec(function (err, founduser) {
      if (err) {
        console.log(err);
      } else {
        res.render("sheets", { founduser: founduser });
      }
    });
});

//to view graph
router.get("/sheets/:id/graph", isLoggedIn, (req, res) => {
  User.findById(req.params.id)
    .populate("data")
    .exec(function (err, founduser) {
      if (err) {
        console.log(err);
      } else {
        res.render("graph", { founduser: founduser });
      }
    });
});

//Update
//to get update form
router.get("/update/:id", isLoggedIn, (req, res) => {
  Data.findById(req.params.id, function (err, founddata) {
    if (err) {
      console.log(err);
    } else {
      res.render("update", { data: founddata });
    }
  });
});

//to update database

router.put("/update/:id", isLoggedIn, (req, res) => {
  Data.findByIdAndUpdate(req.params.id, req.body.data, function (err, updated) {
    if (err) {
      console.log(err);
    } else {
      req.flash("success", "Entry Updated Succesfully");
      res.redirect("/");
    }
  });
});

//Delete
router.delete("/delete/:id", isLoggedIn, (req, res) => {
  Data.findByIdAndRemove(req.params.id, function (err, deleted) {
    if (err) {
      res.redirect("/");
    } else {
      req.flash("success", "Entry Deleted Succesfully");
      res.redirect("/");
    }
  });
});


//is logged in check
function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  } else {
    req.flash("error", "Please Login First");
    res.redirect("/login");
  }
}

module.exports = router;
