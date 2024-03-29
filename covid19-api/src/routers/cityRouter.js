const { Router } = require('express');
const mongoose=require('mongoose')
const City=require('../models/cityModel');
const { getChangesPercentageOfCityBetweenWeeks,getIllCountOfCityInWeek,getVerifiedCountOfCityInWeek, getPositiveTestPercentageOfCityInWeek, getCityIllsCount } = require('../utils/cityStatics');
const router = Router();// /city

router.get('/', async (req, res) => {
    const name=req.query.name
    try {
        const cities = await City.find(name ? { name } : {})
        if (name && cities.length === 0)
            return res.status(404).send('city not found')
        return res.send(cities)
    } catch (err) {
        console.log(err)
        return res.status(500).send('problem occurred')
    }
})
router.post('/new', async (req, res) => {
    try {
        await (new City({ ...req.body })).save()
        return res.send('city added')
    } catch (err) {
        console.log(err)
        res.sendStatus(500);
    }
})
router.delete('/:id', async (req, res) => {
    const _id = req.params.id;    
    try {
        const city = await City.findByIdAndRemove(_id)       
        return res.send({message:'city removes',data:city})
    } catch (err) {
        console.log(err)
        res.sendStatus(500);
    }
})
router.patch('/:id', async (req, res) => {
    const _id = req.params.id;  
    if (req.body.colors_calculated) {
        
        return res.sendStatus(401)
    }
    try {
        const city = await City.findByIdAndUpdate(_id,{...req.body},{runValidators:true})        
        return res.send({message:'city removes',data:city})
    }catch (err) {
        console.log(err)
        res.sendStatus(500);
    }
})

router.get('/statics', async (req, res) => {
    const result=[]
    try {
        const cities = await City.find();
        for(let city of cities)
         {
            const resultObj={city}
            resultObj.personsNewVerified=await getIllCountOfCityInWeek(city.id)
            resultObj.positiveTestsPercentage=await getPositiveTestPercentageOfCityInWeek(city.id)
            resultObj.changesBetweenWeeks=await getChangesPercentageOfCityBetweenWeeks(city.id)
            resultObj.illsCount=await getCityIllsCount(city.id)
            resultObj.grade=Math.abs( 2+Math.log(resultObj.personsNewVerified/10000)+(resultObj.positiveTestsPercentage)%10)||0
            result.push(resultObj)
        }
        res.send(result)
    } catch (err) { 
        console.log(err)
    }
}) 

module.exports=router