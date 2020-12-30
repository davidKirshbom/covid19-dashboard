const { Router } = require('express');
const mongoose=require('mongoose')
const Hospital=require('../models/hospitalModel')
const router = Router();// /hospital

router.get('/',async (req, res) => {
    const name = req.query.name;
    try {
        const hospital = Hospital.find(name ? { name } : {})
        if (name && !hospital)
            return res.sendStatus(404);
        return res.send(hospital)
    } catch (err) {
        console.log(err)
        return res.status(500).send({message:"problem occurred"})
    }
})
router.post('/new', async (req, res) => {
    try {
        const hospital = await (new Hospital({ ...req.body })).save()
        return res.send(hospital)
        
    } catch (err) {
        console.log(err)
        return res.status(500).send({message:"problem occurred"})
    }
})
router.delete('/:id', async (req, res) => {
    const _id = req.params.id
    if (!_id) {
        return res.sendStatus(404)
    }
    try {
        const hospital = await Hospital.findByIdAndRemove(_id)
        return res.send(hospital)
    } catch (err) {
        console.log(err)
        return res.status(500).send({message:"problem occurred"})
    }
})
router.patch('/:id', async (req, res)=> {
    const _id = req.params.id
    if (!_id) {
        return res.sendStatus(404)
    }
    try {
        const oldHospital = await Hospital.findByIdAndUpdate(_id, { ...req.body },{runValidators:true});
        return res.send(oldHospital)
    } catch (err) {
        console.log(err)
        return res.status(500).send({message:"problem occurred"})
    }
})






module.exports = router