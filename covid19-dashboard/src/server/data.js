import axios from 'axios'
const path='http://localhost:3000'
const getGeneralStatics =async () => {
    try {
        const statics = await axios.get(`${path}/people/statics`)        
        return statics.data
    } catch (err) {
        console.log(err)
    }


}

const getChangesAndDoubleFactorPerWeek =async () => {
    try {
        const value = await axios.get(`${path}/people/statics/charts/weekly-verified`)
        return value.data
     } catch (err) {
        console.log(err)
    }
   
}
const getSeriouslyIllWeek = async () => {
    try {
        const value = await axios.get(`${path}/people/statics/charts/weekly-seriously-ill`)
        console.log("🚀 ~ file: data.js ~ line 26 ~ getSeriouslyIllWeek ~ value", value)
        
        return value.data
        } catch (err) {
        console.log(err)
    }
}
const getVerifiedOutsideRedZone = async () => {
    try {
        const value = await axios.get(`${path}/people/statics/charts/weekly-verified-not-red-zone`)
        return value.data
    } catch (err) {
        console.log(err)
    }
}

const getEpidemicCurve = async (startDate) => {
    try {
        const value = await axios.get(`${path}/people/statics/charts/epidemic-curve`, {
            params:{startDate}
        })
        console.log("🚀 ~ file: data.js ~ line 47 ~ getEpidemicCurve ~ value", value)
        
        return value.data
    } catch (err) {
        console.log(err)
    }

}
const getEnlightenmentVerifiedDoubleFromNow = async () => {
    try {
        const value = await axios.get(`${path}/people/statics/enlightenment/double-verified`)        
        return value.data.result
    } catch (err) {
        console.log(err)
    }
}
const getEnlightenmentSeriouslyIllUntilNow = async () => {
    try {
        const value = await axios.get(`${path}/people/statics/enlightenment/sick-and-respiratory`)        
        console.log("🚀 ~ file: data.js ~ line 66 ~ getEnlightenmentSeriouslyIllUntilNow ~ value", value)
        
        return value.data.result
    } catch (err) {
        console.log(err)
    }
}
const getSeriouslyIllAndRespiratoryUntilNow = async (startDate) => {
    try {
        const value = await axios.get(`${path}/people/statics/charts/seriously-ills`, {
           params:{ startDate}
        }) 
        console.log("🚀 ~ file: data.js ~ line 68 ~ getSeriouslyIllAndRespiratoryUntilNow ~ value", value)
        
        return value.data
    } catch (err) {
        console.log(err)
    }
}
export {
    getGeneralStatics, getChangesAndDoubleFactorPerWeek
    , getSeriouslyIllWeek, getVerifiedOutsideRedZone,
    getEpidemicCurve,getEnlightenmentVerifiedDoubleFromNow,getSeriouslyIllAndRespiratoryUntilNow
    ,getEnlightenmentSeriouslyIllUntilNow
}