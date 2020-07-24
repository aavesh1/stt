
var express = require('express')
var app = express()
var bodyParser = require('body-parser')
var mongoose = require('mongoose')
mongoose.connect("mongodb+srv://aavesh:nsut@2000@cluster0.9tmhq.mongodb.net/stt?retryWrites=true&w=majority" , {useNewUrlParser: true, useUnifiedTopology: true})
var passport = require('passport')
var LocalStrategy = require('passport-local')
var passportLocalMongoose = require('passport-local-mongoose')
var Chart = require('chart.js')
var methodOverride = require('method-override')
//Models
var User = require('./models/user')
var Data = require('./models/data')



app.set('view engine' , 'ejs')

//USE commands
app.use(methodOverride("_method"));
app.use(bodyParser.urlencoded({extended: true}))

app.use(express.static(__dirname + "/public"))

app.use(require('express-session')({
    secret  : "This is my only secret"  ,
    resave : false,
    saveUninitialized : false
    }))

    app.use(passport.initialize());

    app.use(passport.session());

    app.use(function(req , res , next){

        res.locals.currentUser = req.user;
        next();

        })

        

passport.use( new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser()); 
passport.deserializeUser(User.deserializeUser());
    


//Landing routes
app.get('/' , (req , res) =>{
    res.render('landing')
})


//SignUp Routes
app.get('/signup' , (req , res) => 
{
    res.render('signup')
}

)

app.post('/signup' , (req, res) =>{

    var newUser = new User({username : req.body.username})

    User.register(newUser , req.body.password , function(err , user){
        if(err){console.log(err)
            res.redirect('/signup')
        }
        else{
                passport.authenticate("local") (req , res , function(){
                    res.redirect('/')
                })}


    })})

//LogIn Routes

app.get('/login' , (req , res) => 
{
    res.render('login')
}
)

app.post('/login', passport.authenticate("local" , {

    successRedirect: '/' , failureRedirect:'/login'
}) 
, (req , res) =>{}
)
//Log out
app.get('/logout' , (req ,res)=> {

    req.logOut() ;
    res.redirect('/')
})

//is logged in check
function isLoggedIn (req , res , next){
    if(req.isAuthenticated()){
        return next();
    }
else{res.redirect('/login')}

}

//sheets

app.get('/sheets/:id/new' , isLoggedIn , (req , res)=>{

    res.render('new')
} )


app.get('/sheets/:id' , isLoggedIn , (req , res)=> {
    
    User.findById(req.params.id).populate('data').exec(function(err , founduser){
        if(err){console.log(err)}
        else{            
                res.render('sheets' , {founduser : founduser})
        }
    })
    })

app.post('/sheets/:id/new' , isLoggedIn , (req , res)=>{
    var user = req.body.username
    var date = req.body.date
    var topic = req.body.topic
    var time = req.body.time
    var newData = {date : date , topic: topic , time: time , user : user}
    User.findById(req.params.id , function(err , user){
            if(err){console.loglog(err)}

        else{

            Data.create(newData , function(err , created){
                if(err){console.log(err)}
                else{ user.data.push(created)
                user.save(function(err){
                        if(err){console.log(err)}
                        else{res.redirect('/sheets/'+ user._id)}

                })
                
                }
            })}

 })})


app.get('/sheets/:id/graph', isLoggedIn, (req , res)=> {

    User.findById(req.params.id).populate('data').exec(function(err , founduser){
        if(err){console.log(err)}
        else{            
                res.render('graph' , {founduser : founduser})
        }
    }
    )
}
)

//Update
//to get update form
app.get('/update/:id' ,isLoggedIn , (req , res)=> {
    Data.findById(req.params.id , function(err , founddata){
        if(err){console.log(err)}
        else{
            res.render('update', {data:founddata})
        }

    })
  
})

//to update database

app.put('/update/:id' , isLoggedIn ,(req , res)=>{

Data.findByIdAndUpdate(req.params.id , req.body.data , function(err , updated){

if(err){console.log(err)}
else{
        res.redirect('/')

}

})


})





//Delete
app.delete('/delete/:id' ,isLoggedIn , (req , res) =>{

    Data.findByIdAndRemove(req.params.id , function(err , deleted){
            if(err) {res.redirect('/')}
            else {res.redirect('/')}
    })


})



app.listen(3002)
