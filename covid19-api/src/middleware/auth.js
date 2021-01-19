const jwt = require('jsonwebtoken')
const Admin=require('../models/adminModel')
const auth =async (req, res, next) =>
{
    const username = req.query.username 
    let token;
    if (req.headers.authorization)
        token = req.headers.authorization.replace('Bearer', '').trim();
    else return next();
    const admin = await Admin.find({
        username,
        tokens:token
        
    })
    try
    {
        const tokensUsername = jwt.verify(token, process.env.SECRET_TOKEN)
    } catch (err) {
       return res.status(401).send();
    }
  
        req.headers.admin=admin[0]
    next()
}
module.exports=auth