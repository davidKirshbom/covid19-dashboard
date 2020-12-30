const mongoose = require("mongoose");


const citySchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: true, 
        unique:true
    },
    color_by_gov:{
        type: String,
        required:true,
        validate(value) {
            const validateColors = ['ירוק', 'צהוב', 'כתום', 'אדום'];
            if (!validateColors.includes(value))
            throw new Error('invalid color')
        } 
      
    },
    colors_calculated: {
        type: [String],
        default:undefined,
        validate(array) {
            if (array.length > 14)
                throw new Error('no need more then 14 days')
            const validateColors = ['ירוק', 'צהוב', 'כתום', 'אדום'];
            array.forEach((value) => {
                if (!validateColors.includes(value))
                    throw new Error('invalid color')
            } )}
    }
   
})

const City=mongoose.model('City',citySchema)
module.exports = City;