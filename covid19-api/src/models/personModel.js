const mongoose = require("mongoose");
const isIsraeliIdValid =require('israeli-id-validator');
const statusSchema=require('../schemas/statusSchema')

const personSchema = new mongoose.Schema({
    id_number: {
        type: String,
        required: true,
        trim: true,
        validate(value) {
            // if (!isIsraeliIdValid(value))
            //     throw new Error('invalid id')
        }
    },
    city: {
        type: mongoose.Types.ObjectId,
        ref:'City'
    },
    location: { 
        type: mongoose.Types.ObjectId,
        ref: 'Location',
    
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