const jwt = require('jsonwebtoken')
const User = require('../models/user.model')

const userAuth = async( req, res, next ) => {

    try{
        const token = req.header('Authorization').replace('bearer ','')
        const myDecodedToken = jwt.verify(token, process.env.JWTKEY)
        const user = await User.findOne({
            _id:myDecodedToken._id,
            'tokens.token':token
        })
        if(!user) throw new Error()
        req.user=user
        req.token=token
        next()
    }
    catch(e){
        res.status(500).send({
            status:false,
            error:e.message,
            message: 'unauthorized'
        })
    }
}

module.exports = {userAuth}