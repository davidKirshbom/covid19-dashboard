const mongoose = require("mongoose");

const stuffSchema = new mongoose.Schema({
    position: {
        type: String,
        required: true,
        trim:true,
    },
    count: {
        type: Number,
        default: 0,
        validate(value) {
            if (value < 0)
                throw new Error('invalid count')
        }
    }
    
})

const hospitalSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: true,       
    },
    general_occupation:{
        type: Number,
        required:true,
        validate(value) {
            if (value<0)
            throw new Error('invalid occupation')
        } 
      
    },
    covid19_occupation: {
        type: Number,
        default:'אין מידע',
        validate(value) {
            if (value<0)
            throw new Error('invalid occupation')
        } 
    },
    quarantine_stuff: {
        type:[stuffSchema]
    }  
})

const Hospital=mongoose.model('Hospital',hospitalSchema)
module.exports = Hospital;