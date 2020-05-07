const mongoose = require('mongoose')
const validator = require('validator')

//For user
const taskmodel = mongoose.model('task' , {
    description :{
        type : String , 
        trim : true ,
        required : true ,
    },
    completed :{
        type : Boolean ,
        default : false,
    }
})

module.exports = taskmodel;