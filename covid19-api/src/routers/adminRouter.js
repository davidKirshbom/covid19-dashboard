const { Router } = require('express');
const mongoose = require('mongoose');
const Admin=require('../models/adminModel');
const bcrypt = require('bcrypt');
const jwt =require('jsonwebtoken')
const router = Router();// /admin
router.patch('/sign-in', async (req, res) => {
    try {
        const { username, password } = req.body;        
        const hashPassword = await bcrypt.hash(password, 8);
        const token = jwt.sign(username,process.env.SECRET_TOKEN)       
        const admin = new Admin({
            username,password:hashPassword,tokens:[token]
        })
        const result = await admin.save();
        res.send(token)
    } catch (err) {
        res.send(err)
    }
})
router.get('/login', async (req, res) => {
    try {
        const admin = req.headers.admin;
        if (admin)
            res.send(admin);
        else
            res.status(401)
    } catch (err) {
        res.send(err)
    }
})
router.patch('/logout', async (req, res) => {
    try {
        const admin = req.headers.admin;
        
        const currentToken=req.headers.authorization.replace('Bearer','').trim()
        admin.tokens = admin.tokens.filter(token => token !== currentToken)
        await admin.save();
        res.send();
    } catch (err) {
        res.send(err)
    }
})
module.exports=router