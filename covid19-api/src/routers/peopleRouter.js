const { Router } = require('express');
const mongoose = require('mongoose');
const moment=require('moment')
const Person=require('../models/personModel')
const router = Router();// /people

router.get('', async (req, res) => {
    const _id = req.query.id;
    try{
    if (_id) {
        const person = await Person.findOne({ id_number: _id });
        if (person)
            res.send(person);
        else
            res.status(404).send('not found person')
        }
    else {
        const peoples = await Person.find({})
        res.send(peoples);
        }
    } catch (err) {
        res.status(500).send(err)
    }
})

router.post('/insert',async (req, res) => {
    const person = new Person({ ...req.body })
    try {
        await person.save();
        return res.send('successful added')
    } catch (err) {
        console.log(err);
        return res.status(500).send(err)
    }

})
router.delete('/delete', async (req, res) => { 
    const _id=req.query.id
    try {
        await Person.findOneAndDelete({id_number:_id})
        return res.send('successful deleted')
    } catch (err) {
        console.log(err);
        return res.status(500).send(err)
    }
})
router.patch('/update/:id', async (req, res) => {
    const _id = req.params.id
    try {
        await Person.findOneAndUpdate({ id_number: _id }, { ...req.body })
        return res.send('update successful')
    } catch (err) {
        console.log(err)
        return res.status(500).send(err)
    }
})
router.patch('/add-status/:id', async (req, res) => {
    const _id = req.params.id
    const status=req.body
    try {
        const person = await Person.findOne({ id_number: _id })
        person.statuses[person.statuses.length - 1].end_date = Date.now();
        person.statuses.push(status);        
        await Person.findOneAndUpdate({ id_number: _id } ,{statuses:person.statuses },{ runValidators: true })
        return res.send('update successful')
    } catch (err) {
        console.log(err)
        return res.status(500).send(err)
    }
})

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
router.get('/statics', async (req, res) => {
    const staticsObj = {}
    const yesterdayStart = moment().subtract(1, 'day').startOf('day') 
    const yesterdayEnd = moment().subtract(1, 'day').endOf('day')  
    try {
        staticsObj.verifiedSick = {
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
        staticsObj.sickPeople = {
            allCurrentSick : await Person.find({
                "statuses.name": "חולה",
                "statuses.end_date": {$exists:false}
            }),
            fromMidnightUntilNow: await Person.find({
                "statuses.name": "חולה",
                "statuses.end_date": {$exists:false},
                "statuses.createdAt": { $gt: moment().startOf('day')}
            }),
            locationsCount: {
                hospitals: (await Person.find().populate('location').exec()).reduce((acc, person) => {
                                    if (person.location && person.location.type === 'בית חולים')
                                        { 
                                            return ++acc
                                        }
                                    else 
                                        return acc
                                    }, 0),
                hotels: (await Person.find().populate('location').exec()).reduce((acc, person) => {
                    if (person.location && person.location.type === 'מלון')
                        { 
                            return ++acc
                        }
                    else 
                        return acc
                    }, 0),
                home:await Person.find({location:{$exists:false}}).countDocuments(),

            },
            SeriouslyIll: await Person.find({
                "statuses.name": "חולה",
                $or:[{"statuses.detail":"קשה"},{"statuses.detail":"קריטי"}],
                "statuses.end_date": {$exists:false}
            }),
            SeriouslyIllSinceMidnight:await getChangesSickUntilMidnightAndUntilNow(),
                
            
            mediumIll: await Person.find({
                statuses: {
                    $all: [{ $elemMatch: { name: "חולה", detail: "בינוני" } }]
                }
            })
            
        }
     


        staticsObj.respiratory = {
            allRespiratoryData: await Person.find({ "statuses.isRespiratory": true }),
            changeTodayAndMidnight:await getChangesRespiratoryUntilMidnightAndUntilNow()
        }
        staticsObj.deathsData = await Person.find({
            "statuses.name": "נפטר",
            "statuses.end_date": {$exists:false}
        })
        staticsObj.testsData = {
            all: await Person.find({ "statuses.name": "נבדק" }),
            percentPositiveYesterday: await getPercentPositiveTestYesterday(),
            percentPositiveToday:await getPercentPositiveTestFromMidnight()
        }
        res.send(staticsObj)
    } catch (err) {
        console.log(err)
    }
}) 

module.exports=router