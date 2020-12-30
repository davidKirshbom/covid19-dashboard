const logger = (req, res, next) =>
{
    console.log('path: ', req.path)
    console.log('method', req.method)
    next()
}
module.exports=logger