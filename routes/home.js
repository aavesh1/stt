var express = require('express')
var router = express.Router()
var passport = require('passport')

var User = require('../models/user.js')
//-----------------------------Landing Page Routes---------------------------------//
router.get('/' , (req , res) =>{
    res.render('landing')
})

//------------------------------------------AUTH ROUTES--------------------------------------------------------------------//
//SignUp Routes
router.get('/signup' , (req , res) => 
{
    res.render('signup')
}

)

router.post('/signup' , (req, res) =>{

    var newUser = new User(
      { username: req.body.username }
    );
    
    User.register(newUser , req.body.password , function(err , user){
        if(err){console.log(err)
            req.flash('error', 'Username is not available')
            res.redirect('/signup')
        }
        else{
                passport.authenticate("local") (req , res , function(){
                    res.redirect('/')
                })}


    })})

//LogIn Routes

router.get('/login' , (req , res) => 
{
    res.render('login')
}
)

router.post('/login', passport.authenticate("local" , {

    
    successRedirect: '/' , failureRedirect:'/login'
}) 
, (req , res) =>{}
)
//Log out
router.get('/logout' , (req ,res)=> {

    req.logOut() ;
    req.flash("success" , "Logged you out")
    res.redirect('/')
})


// Entering Goal

router.put('/:id/goal' , isLoggedIn,  (req , res)=>{

        var newgoal = req.body.goals;
    User.findByIdAndUpdate(req.params.id ,{ goal : newgoal } , function(err , goal){

        if(err){
            console.log(err)
        }

        else{
            req.flash("success" , "Goal Updated Successfully")
            res.redirect('/sheets/'+req.params.id)
        
        }

    } )


})



//is logged in check
function isLoggedIn (req , res , next){
    if(req.isAuthenticated()){
        return next();
    }
    req.flash("error" , "Please Login First")
   
    res.redirect('/login')

}



module.exports = router;