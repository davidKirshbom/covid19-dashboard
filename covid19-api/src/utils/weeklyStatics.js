const Person = require('../models/personModel')
const moment=require('moment');
const { getVerifiedSickObject } = require('./peopleStatics');

const getVerifiedAvgWeekBefore =async (day) => {
    const endDate = moment(day).subtract(1, 'day').endOf('day');  
    const startDate = endDate.clone().subtract(1,'week').startOf('day');    
    const verifiedCountLastWeekWithoutDateCount = await Person.find({
        statuses: {
            $elemMatch: { name: "נבדק", detail: 'חיובי', $and: [{ createdAt: { $gte: startDate } }, { createdAt: { $lte: endDate } }] }
        }
    }).countDocuments()     
    const verifiedCountLastWeekAvg = verifiedCountLastWeekWithoutDateCount / 7;
    const verifiedCountLastWeekWithDateCount = await Person.find({
        statuses: {
            $elemMatch: { name: "נבדק", detail: 'חיובי', $and: [{ createdAt: { $gte: startDate.add(1,'day') } }, { createdAt: { $lte: day } }] }
        }
    }).countDocuments() 
    const verifiedCountLastWeekWithDayAvg = verifiedCountLastWeekWithDateCount / 7;
    const daysToDoubleSickPeople=  (await getSickPeopleCountUntilDate(day))/verifiedCountLastWeekWithDayAvg
    return {avgChange:((verifiedCountLastWeekWithDayAvg/verifiedCountLastWeekAvg)*100),daysToDoubleSickPeople}
}
const getSickPeopleCountUntilDate = async (date) => {
    const endDate=date.clone().endOf('day')
    const sickPeopleCount = await Person.find({
        statuses: {
            $elemMatch: { name: "חולה",$and: [{createdAt:{$lte:endDate}},{$or: [{ end_date: { $gte: date } }, { end_date: { $exists: false } }]} ]}
        }
    }).countDocuments() 
    return sickPeopleCount
}
const getChartWeeklyVerifiedData = async () => {
    const endDate = moment().endOf('day');  
    const currentDate = endDate.clone().subtract(1, 'week').startOf('day'); 
    
    const result=[]
    while (currentDate.isBefore(endDate)) {
        const verifiedAvgData = await getVerifiedAvgWeekBefore(currentDate);
        result.push({ day: currentDate.format('D.M').toString(), avgChangeByWeek:verifiedAvgData.avgChange,daysToDoubleSickPeople:verifiedAvgData.daysToDoubleSickPeople  })
        currentDate.add(1,'day')
    }
    return result;
}
const getWeekCountSeriouslyIll = async () => {
    const endDate = moment().endOf('day');  
    const currentDate = endDate.clone().subtract(1, 'week').startOf('day'); 
    
    const result=[]
    while (currentDate.isBefore(endDate)) {
        const seriouslyIllCount = await Person.find({
            statuses: {
                $elemMatch: { name: "חולה", $or: [{ detail: 'קשה' }, { detail: 'קריטי' }], $and: [{ createdAt: { $lte: currentDate.clone().endOf('day') } }, { $or: [{ end_date: { $gte: currentDate } }, { end_date: { $exists: false } }] }] }
            }
        }).countDocuments();
        result.push({ day: currentDate.format('D.M').toString(), count:seriouslyIllCount})
        currentDate.add(1,'day')
    }
    return result;
}
const getVerifiedNotRedZone = async () => {
    const endDate = moment().endOf('day');  
    const currentDate = endDate.clone().subtract(1, 'week').startOf('day'); 
    
    const result=[]
    while (currentDate.isBefore(endDate)) {
        const verifiedPeopleCount = (await Person.find({
            statuses: {
                $elemMatch: { name: "נבדק",detail:'חיובי',  createdAt: { $lt: currentDate.clone().endOf('day'),$gt: currentDate.clone().startOf('day') } } }  
            
        }).populate('city').exec()).filter((person)=>person.city.color_by_gov!=='אדום').length;
        
        result.push({ day: currentDate.format('D.M').toString(), count:verifiedPeopleCount})
        currentDate.add(1,'day')
    }
    return result;
}
module.exports={getChartWeeklyVerifiedData,getWeekCountSeriouslyIll,getVerifiedNotRedZone}