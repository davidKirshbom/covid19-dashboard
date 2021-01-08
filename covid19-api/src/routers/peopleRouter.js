const { Router } = require('express');
const mongoose = require('mongoose');
const moment=require('moment')
const Person = require('../models/personModel')
const { getDeathsObject, getVerifiedSickObject,
    getSickPeopleObject, getRespiratoryObject, getTestObject,getEpidemicChanges, getEnlightenmentVerifiedDoubleFromNow, getSeriouslyIllChart, getEnlightenmentSeriouslyIllUntilNow
} = require('../utils/peopleStatics')
const {getChartWeeklyVerifiedData, getWeekCountSeriouslyIll, getVerifiedNotRedZone}=require('../utils/weeklyStatics')
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
router.get('/statics', async (req, res) => {
    const staticsObj = {}
    try {
        staticsObj.verifiedSick =await getVerifiedSickObject()
        staticsObj.sickPeople =await getSickPeopleObject()
        staticsObj.respiratory = await getRespiratoryObject()
        staticsObj.deathsData = await getDeathsObject()
        staticsObj.testsData = await getTestObject()
        res.send(staticsObj)
    } catch (err) {
        console.log(err)
        return res.status(500).send(err)
    }
}) 
router.get('/statics/charts/weekly-verified', async (req, res) => {
    try { res.send(await getChartWeeklyVerifiedData()); }
    catch (err) {
        console.log(err)
        return res.status(500).send(err)
    }
})
router.get('/statics/charts/weekly-seriously-ill', async (req, res) => {
    try {
        res.send(await getWeekCountSeriouslyIll());
    }
    catch (err) {
        console.log(err)
        return res.status(500).send(err)
    }
})
router.get('/statics/charts/weekly-verified-not-red-zone', async (req, res) => {
    try {
        res.send(await getVerifiedNotRedZone());
    }
    catch (err) {
        console.log(err)
        return res.status(500).send(err)
    }
})
router.get('/statics/charts/epidemic-curve', async (req, res) => {
    const startDate = moment(new Date( req.query.startDate))
    try {
        console.log("🚀 ~ file: peopleRouter.js ~ line 119 ~ router.get ~ await getEpidemicChanges(startDate)", startDate)

        res.send(await getEpidemicChanges(startDate));
    }
    catch (err) {
        console.log(err)
        return res.status(500).send(err)
    }
})
router.get('/statics/enlightenment/double-verified', async (req, res) => {
    try {
        const result=await getEnlightenmentVerifiedDoubleFromNow()
        res.send({result});
    }
    catch (err) {
        console.log(err)
        return res.sendStatus(500).send(err)
    }
})
router.get('/statics/charts/seriously-ills', async (req, res) => {
    const startDate = moment(new Date( req.query.startDate))
    try {
        const result=await getSeriouslyIllChart(startDate)
        res.send(result);
    }
    catch (err) {
        console.log(err)
        return res.sendStatus(500).send(err)
    }
})
router.get('/statics/enlightenment/sick-and-respiratory', async (req, res) => {
    try {
        const result=await getEnlightenmentSeriouslyIllUntilNow()
        res.send({result});
    }
    catch (err) {
        console.log(err)
        return res.sendStatus(500).send(err)
    }
})
module.exports=router