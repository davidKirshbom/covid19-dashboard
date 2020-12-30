const { Router } = require('express');
const mongoose=require('mongoose')
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


module.exports=router