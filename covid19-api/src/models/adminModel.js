const mongoose = require("mongoose");

const adminSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        trim: true,
        unique:true,
    },
    password: {
        type: String,
        required: true,
        trim:true,
    },
    tokens: { 
        type: [String],
        
    
    },
   
})

const Admin=mongoose.model('Admin',adminSchema)
module.exports=Admin