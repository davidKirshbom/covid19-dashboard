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
router.get('/statics', async (req, res) => {
    const staticsObj = {}
    const yesterdayStart = moment().subtract(1, 'day').startOf('day')  
    try {
        staticsObj.fromYesterdayVerifiedUntilNow = await Person.find(
            {
                "statuses.name": "מאומת",
                "statuses.createdAt": { $gt: yesterdayStart}
            });
        staticsObj.allCurrentSick = await Person.find({
            "statuses.name": "חולה",
            "statuses.end_date": {$exists:false}
        })
        staticsObj.allRespiratoryData = await Person.find({
            "statuses.isRespiratory": true
        })
        staticsObj.deathsData = await Person.find({
            "statuses.name": "נפטר",
            "statuses.end_date": {$exists:false}
        })
        staticsObj.testsData = await Person.find({
            "statuses.name": "נבדק",
        })
        res.send(staticsObj)
    } catch (err) {
        console.log(err)
    }
}) 

module.exports=router