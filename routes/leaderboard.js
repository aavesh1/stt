var express = require("express");
var router = express.Router();
var List = require("../models/list.js");
var User = require("../models/user.js");

router.post('/:id/addtolist' , isLoggedIn ,  (req ,res)=> {

var username = req.body.username ;
var score =    req.body.score;
var newmember = { username: username , score : score };


  User.findById(req.params.id, function (err, user) {
    if (err) {
      console.log(err);
    } else {
      List.create(newmember , function (err, created) {
        if (err) {
          console.log(err);
        } else {
          user.list.push(created);
          user.save(function (err) {
            if (err) {
              console.log(err);
            } else {
              res.redirect("/sheets/" + user._id);
            }
          });
        }
      });
    }
  });







}) 

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  } else {
    req.flash("error", "Please Login First");
    res.redirect("/login");
  }
}

module.exports = router;