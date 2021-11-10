 //a middleware that logs the request url, method, and current time 
 module.exports = (err, req, res, next) => {
    console.error(err)
    res.status(500).send({ error: 'internal server error' })
    next(err);
};