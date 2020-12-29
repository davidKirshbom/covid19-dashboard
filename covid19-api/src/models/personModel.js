const mongoose = require("mongoose");
const statusSchema=require('../schemas/statusSchema')

const personSchema = new mongoose.Schema({
    city: {
        type: mongoose.Types.ObjectId,
        
    },
    hospital: {
        type: mongoose.Types.ObjectId,
      
    },
    gender: {
        type: String,
        required: true,
        validate(value) {
            if (value != 'זכר' && value != 'נקבה')
            throw new Error('invalid gender')
        } 
    },
    age: {
        type: Number,
        required: true,
        validate(value) {
            if (value<0||value>150)
            throw new Error('invalid age')
        }
        
    },
    statuses:[statusSchema]
})

const Person=mongoose.model('Person',personSchema)
module.exports=Person