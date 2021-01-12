const City = require('../models/cityModel');
const Person = require('../models/personModel')
const moment=require('moment')
const getIllCountOfCityInWeek = async (cityObjectId, date = moment()) => {
    const startWeek=date.clone().subtract(1,'week').startOf('day')
   
    try {
        const personsCount = await Person.find({
            city: cityObjectId,
            statuses: {
                $elemMatch:{name:'חולה',createdAt:{$gte:startWeek,$lte:date}}
            }
        }).countDocuments();
        return personsCount;
    } catch (err) {
        console.log(err);
    }
}
const getVerifiedCountOfCityInWeek = async (cityObjectId, date = moment()) => {
    const startWeek=date.clone().subtract(1,'week').startOf('day')
   
    try {
        const personsCount = await Person.find({
            city: cityObjectId,
            statuses: {
                $elemMatch:{name:'נבדק',detail:'חיובי',createdAt:{$gte:startWeek,$lte:date}}
            }
        }).countDocuments();
        return personsCount;
    } catch (err) {
        console.log(err);
    }
}
const getPositiveTestPercentageOfCityInWeek = async (cityObjectId,date=moment()) => {
    const startWeek=date.clone().subtract(1,'week').startOf('day')
    try {
        const verifiedTestCount = await Person.find({
            city: cityObjectId,
            statuses: {
                $elemMatch:{name:'נבדק',detail:'חיובי',createdAt:{$gte:startWeek,$lte:date}}
            }
        }).countDocuments();   
        const otherTestCount = await Person.find({
            city: cityObjectId,
            statuses: {
                $elemMatch:{name:'נבדק',$or:[{detail:'שלילי'},{detail:''}],createdAt:{$gte:startWeek,$lte:date}}
            } 
        }).countDocuments();
        return (verifiedTestCount/(verifiedTestCount+otherTestCount))*100 ||0;
    } catch (err) {
        console.log(err);
    }
}
const getChangesPercentageOfCityBetweenWeeks = async (cityObjectId,date1=moment(),date2=moment().subtract(1,'week')) => {
    try {
        const verifiedWeek1=await getVerifiedCountOfCityInWeek(cityObjectId,date1)
        const verifiedWeek2=await getVerifiedCountOfCityInWeek(cityObjectId,date2)

        return ((verifiedWeek1 / verifiedWeek2 ) * 100) || 0;
    } catch (err) {
        console.log(err);
    }
}
const getCityIllsCount = async (cityObjectId) => {
    try {
        const illsCount = await Person.find({
            city: cityObjectId,
            statuses: {
                $elemMatch: { name: 'חולה', end_date: { $exists: false } }
            }
        }).countDocuments();

        return illsCount;
    } catch (err) {
        console.log(err);
    }
}

module.exports={getVerifiedCountOfCityInWeek,getCityIllsCount,getChangesPercentageOfCityBetweenWeeks,getIllCountOfCityInWeek,getPositiveTestPercentageOfCityInWeek}