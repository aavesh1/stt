var mongoose = require('mongoose')
const { model } = require('./user')
var DataSchema = new mongoose.Schema({

user:String  ,  date : String , topic : String , time : Number 

})

module.exports = mongoose.model("Data" , DataSchema)

