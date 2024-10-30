const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const adminSchema = mongoose.Schema({
    id:{
        type:Number
    },
    name:{
        type: String,
        required: true,
        unique: true
    },
    mobile:{ 
        type:String, 
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true
    },
    tokens: [
        {
            token:{
                type:String
            }
        }
    ]
}, {timestamps:true})

adminSchema.pre('save', async function(){
    try{
        admin = this
        if(admin.__v == undefined ) {
            lastAdmin = await Admin.findOne().sort({_id:-1})

            if(!lastAdmin) admin.id = 1
            else admin.id = lastAdmin.id + 1

        }
        if(admin.isModified('password')){
            admin.password = await bcrypt.hash(admin.password, 10)
        }
        
    }
    catch(e){
        console.log(e.message)
    }

})


adminSchema.methods.toJSON = function(){
    let admin = this.toObject()
    deleteItems = ['password']
    deleteItems.forEach(item =>{
        delete admin[item]
    })
    return admin
}

adminSchema.statics.logIn = async(mobile, password)=>{
    const admin = await Admin.findOne({mobile})
    if(!admin) throw new Error('invalid email')
    const matchPass = await bcrypt.compare(password, admin.password)
    if(!matchPass) throw new Error('invalid pass')
    return admin
}

adminSchema.methods.generateAuthToken = async function(){
    const admin = this
    const token = jwt.sign({_id:admin._id.toString()}, process.env.JWTKEY)
    admin.tokens = admin.tokens.concat({token})
    await admin.save()

    return token;
}

Admin = mongoose.model('Admin', adminSchema)
module.exports = Admin