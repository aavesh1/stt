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
var flash = require('connect-flash')
//Models
var User = require('./models/user')
var Data = require('./models/data')

var sheetsRoutes = require('./routes/sheets.js')
var homeRoutes = require('./routes/home.js')

app.set('view engine' , 'ejs')
app.use(flash());
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
        res.locals.error = req.flash('error')
        res.locals.success = req.flash('success')
        next();

        })

        

passport.use( new LocalStrategy( User.authenticate()));

passport.serializeUser(User.serializeUser()); 
passport.deserializeUser(User.deserializeUser());
    

//use them at last to avoide errors
app.use(sheetsRoutes);
app.use(homeRoutes);



app.listen(3002)
