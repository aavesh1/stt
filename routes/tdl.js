var express = require("express");
var router = express.Router();
var Task = require("../models/task.js");
var User = require("../models/user.js");
const { json } = require("body-parser");

// ADDING TASK
router.post("/tdl/newtask/:id", isLoggedIn, (req, res) => {
  var task = req.body.task;
  var date = req.body.date;
  
  var username = req.body.username;
  var newtask = { task: task, date: date , username : username };
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

// Marking a task complete
router.put('/:id/marktask/:user', isLoggedIn, (req, res) => {
var task = req.body.task ;
var time = req.body.time ;
var uid = req.params.user;
  var ctask = {task : task , time : time}

  User.findByIdAndUpdate({ _id:req.params.user }, 
    
    
    { $push: { completedtasks : ctask } },
    function (error, success) {
      if (error) {
        console.log(error);
      } 
      else {


        Task.findByIdAndRemove(req.params.id, function (err, deleted) {
          if (err) {
            res.redirect("/");
          } else {
            req.flash("success", "Task added to completed tasks list");
            res.redirect("/tdl/" + uid);
          }
        });    
    }
    
    }
    
    )

})
// Viewing completed tasks

router.get('/:id/ctl' , isLoggedIn , (req , res)=>{

  User.findById(req.params.id , function(err , founduser){

    if (err) {
      console.log(err);
    } else {
      res.render("ctl", { founduser: founduser });
    }
  });
   
  }
)

// Deleting Completed Tasks

router.put('/:id/deletectask/:user' , (req , res) =>{
  var tid = req.params.id ;
  var uid = req.params.user;
  
  User.update({_id : uid} , { "$pull" : {"completedtasks" : {"_id" : tid}}},
  
  (err , result) => {
    if(err){console.log(err)}
    else{
      res.redirect('/'+uid+'/ctl') ;
    }


  }

  )


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
