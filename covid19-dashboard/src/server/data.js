import axios from 'axios'
const path='http://localhost:3000'
const getGeneralStatics =async () => {
    try {
        const statics = await axios.get(`${path}/people/statics`)
        console.log("🚀 ~ file: data.js ~ line 6 ~ getGeneralStatics ~ statics", statics)
        
        return statics.data
    } catch (err) {
        console.log(err)
    }


}

export {getGeneralStatics}