const Person = require('../models/personModel')
const moment = require('moment')


const getPercentPositiveTestFromMidnight = async () => {
    const dayStart = moment().startOf('day');
    const allTestCountYesterdayCount = await Person.find({
        statuses: {
            $elemMatch: { name: "נבדק", createdAt: { $gte: dayStart } }
        }
    }).countDocuments();
     const allTestPositiveCountYesterdayCount = await Person.find({
        statuses: {
            $elemMatch: { name: "נבדק",detail:"חיובי", createdAt: { $gte: dayStart } }
        }
     }).countDocuments();
    
    return (allTestPositiveCountYesterdayCount/allTestCountYesterdayCount)*100
}
const getPercentPositiveTestYesterday = async () => {
    const yesterdayStart = moment().subtract(1, 'day').startOf('day');
    const yesterdayEnd = moment().subtract(1, 'day').endOf('day');
    const allTestCountYesterdayCount = await Person.find({
        statuses: {
            $elemMatch: { name: "נבדק", createdAt: { $gte: yesterdayStart, $lte: yesterdayEnd } }
        }
    }).countDocuments();
     const allTestPositiveCountYesterdayCount = await Person.find({
        statuses: {
            $elemMatch: { name: "נבדק",detail:"חיובי", createdAt: { $gte: yesterdayStart, $lte: yesterdayEnd } }
        }
     }).countDocuments();
    
    return (allTestPositiveCountYesterdayCount/allTestCountYesterdayCount)*100
}
const getChangesRespiratoryUntilMidnightAndUntilNow = async () => {
    const midnight = moment().startOf('day')
    const untilMidnightCount = await Person.find({
        statuses: {
            $elemMatch: { isRespiratory:true, $or: [{ end_date: { $exists: false } }, { end_date: { $lt: midnight } }] }
        }
    }).countDocuments()
    const untilNowCount = await Person.find({
        statuses: {
            $elemMatch: { isRespiratory:true,end_date: { $exists: false }  } 
        }
    }).countDocuments()  

    return (untilNowCount-untilMidnightCount)
    
}
const getChangesSickUntilMidnightAndUntilNow = async () => {
    const midnight = moment().startOf('day')
    const untilMidnightCount = await Person.find({
        statuses: {
            $elemMatch: { name: "חולה", detail: "קשה", $or: [{ end_date: { $exists: false } }, { end_date: { $lt: midnight } }] }
        }
    }).countDocuments()
    const untilNowCount = await Person.find({
        statuses: {
            $elemMatch: { name: "חולה", detail: "קשה",end_date: { $exists: false }  } 
        }
    }).countDocuments()  

    return (untilNowCount-untilMidnightCount)
    
}

const getVerifiedSickObject = async () => {
    const yesterdayStart = moment().subtract(1, 'day').startOf('day') 
    const yesterdayEnd = moment().subtract(1, 'day').endOf('day')  

    return {
        fromYesterdayVerifiedUntilNow : await Person.find(
            {
                "statuses.name": "נבדק",
                "statuses.detail": "חיובי",
                "statuses.createdAt": { $gt: yesterdayStart,$lt:yesterdayEnd}
            }),
        fromMidnightUntilNow: await Person.find({
            "statuses.name": "נבדק",
            "statuses.detail": "חיובי",
            "statuses.createdAt": { $gt: moment().startOf('day')}
        }),
        allTimesCount: await Person.find({
            "statuses.name": "נבדק",
            "statuses.detail": "חיובי",
        }).countDocuments()
    }
}
const organizeSickByLocation = async (sickPeople) => {
    return {
        hospitals: sickPeople.reduce((acc, person) => {
            if (person.location && person.location.type === 'בית חולים') {
                return ++acc
            }
            else
                return acc
        }, 0),
        hotels: sickPeople.reduce((acc, person) => {
            if (person.location && person.location.type === 'מלון') {
                return ++acc
            }
            else
                return acc
        }, 0),
        home: sickPeople.reduce((acc, person) => {
            if (!person.location) {
                return ++acc
            }
            else
                return acc
        }, 0),

    }
}

const getSickPeopleObject = async () => {
    return {
        allCurrentSick: await Person.find({
            "statuses.name": "חולה",
            "statuses.end_date": { $exists: false }
        }),
        fromMidnightUntilNow: await Person.find({
            "statuses.name": "חולה",
            "statuses.end_date": { $exists: false },
            "statuses.createdAt": { $gt: moment().startOf('day') }
        }),
        locationsCount:organizeSickByLocation(await Person.find().populate('location').exec()) ,
        SeriouslyIll: await Person.find({
            "statuses.name": "חולה",
            $or: [{ "statuses.detail": "קשה" }, { "statuses.detail": "קריטי" }],
            "statuses.end_date": { $exists: false }
        }),
        SeriouslyIllSinceMidnight: await getChangesSickUntilMidnightAndUntilNow(),
            
        
        mediumIll: await Person.find({
            statuses: {
                $all: [{ $elemMatch: { name: "חולה", detail: "בינוני" } }]
            }
        })
    }

}

const getRespiratoryObject = async () => {
    return {
        allRespiratoryData: await Person.find({ "statuses.isRespiratory": true }),
        changeTodayAndMidnight:await getChangesRespiratoryUntilMidnightAndUntilNow()
    }
}
const getDeathsObject = async () => {
    return await Person.find({
            "statuses.name": "נפטר",
            "statuses.end_date": {$exists:false}
        })
}
const getTestObject = async () => {
    return {
        all: await Person.find({ "statuses.name": "נבדק" }),
        percentPositiveYesterday: await getPercentPositiveTestYesterday(),
        percentPositiveToday:await getPercentPositiveTestFromMidnight()
    }
}

const getEpidemicChanges = async (startDate=moment('20/03/2020','DD/MM/YYYY')) => {
    let endDate = moment();
    let currentDate = startDate.clone().startOf('day')    
    let result = [];
    while (currentDate.isBefore(endDate)) {
        const verifiedUntilDate = await Person.find({
            statuses: {
                $elemMatch: { name: 'נבדק', detail: 'חיובי', createdAt: { $lte: currentDate.clone().endOf('day') } }
            }
        }).countDocuments();
        const verifiedOnDate=  await Person.find({
            statuses: {
                $elemMatch: { name: 'נבדק', detail: 'חיובי', createdAt: { $gte: currentDate.clone().startOf('day'),$lte:currentDate.clone().endOf('day')} }
            }
        }).countDocuments();
        const recoverOnDate=  await Person.find({
            statuses: {
                $elemMatch: { name: 'החלים', createdAt: { $gte: currentDate.clone().startOf('day'),$lte:currentDate.clone().endOf('day')} }
            }
        }).countDocuments();

        result.push({day:currentDate.format('D.M').toString(),verifiedUntilDate,verifiedOnDate,recoverOnDate})
        currentDate.add(1,'day')
    }
    return result
}
const getSeriouslyIllChart = async (startDate=moment('20/03/2020','DD/MM/YYYY')) => {
    let endDate = moment();
    let currentDate = startDate.clone().startOf('day')    
    let result = [];
    while (currentDate.isBefore(endDate)) {
        const seriouslyIllOnDate = await Person.find({
            statuses: {
                $elemMatch: {
                    name: 'חולה',
                    $and: [
                        { $or: [{ detail: 'קשה' }, { detail: 'קריטי' }] },
                        { $or: [{ end_date: { $exists: false } }, { end_date: { $gte: currentDate.clone().startOf('day') } }] }
                          ],
                    createdAt: { $lte: currentDate.clone().endOf('day') }
                }
            }
        }).countDocuments();
        const respiratoryOnDate = await Person.find({
            statuses: {
                $elemMatch: {
                    isRespiratory: true,
                    $or: [{ end_date: { $exists: false } }, { end_date: { $gte: currentDate.clone().startOf('day') } }],
                    createdAt: { $lte: currentDate.clone().endOf('day') }
                }
            }
        }).countDocuments();

        result.push({day:currentDate.format('D.M').toString(),seriouslyIllOnDate,respiratoryOnDate})
        currentDate.add(1,'day')
    }
    return result
}
const getEnlightenmentVerifiedDoubleFromNow =async () => {
    const verifiedData = await getEpidemicChanges();
    const dateDoubleNow= (verifiedData.find(verified=>verified.verifiedOnDate*2<=verifiedData[verifiedData.length-1].verifiedOnDate)).day   

    return moment(dateDoubleNow,'D.M').diff(moment(), 'days')
}
const getEnlightenmentSeriouslyIllUntilNow =async () => {
    const seriouslyIllData = await Person.find({
        statuses:
        { $elemMatch:{name:'חולה',$or:[ {detail:'קשה'},{detail:'קריטי'}]}}

    }).countDocuments();
    const respiratoryData = await Person.find({
        statuses:
        {
            $elemMatch: { isRespiratory: true }

        }
    }).countDocuments();


    return {respiratoryData,seriouslyIllData}
}
module.exports = {
    getPercentPositiveTestFromMidnight, getPercentPositiveTestYesterday
    ,getChangesRespiratoryUntilMidnightAndUntilNow,getChangesSickUntilMidnightAndUntilNow
    ,getVerifiedSickObject,getSickPeopleObject,getRespiratoryObject
    , getDeathsObject, getTestObject, getEpidemicChanges, getEnlightenmentVerifiedDoubleFromNow
    ,getSeriouslyIllChart,getEnlightenmentSeriouslyIllUntilNow
}