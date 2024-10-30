const jwt = require('jsonwebtoken')
const Admin = require('../models/admin.model')

const adminAuth = async( req, res, next ) => {

    try{
        const token = req.header('Authorization')?.replace('Bearer ','')
        console.log(token)
        const myDecodedToken = jwt.verify(token, process.env.JWTKEY)
        console.log(token)
        const admin = await Admin.findOne({
            _id:myDecodedToken._id,
            'tokens.token':token
        })
        console.log(admin)
        if(!admin) throw new Error()
        req.admin=admin
        req.token=token
        next()
    }
    catch(e){
        console.log(e)
        res.status(401).send({
            error:false,
            message: 'unauthorized',
            data:e,
        })
    }
}

module.exports = adminAuth