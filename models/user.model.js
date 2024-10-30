const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const userSchema = mongoose.Schema({
    id:{
        type:Number
    },
    username:{
        type: String,
        required: true,
        unique: true
    },
    verified:{ 
        type:Boolean, 
        default:false 
    },
    otp:{
        type:String
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

userSchema.pre('save', async function(){
    try{
        user = this
        if(user.__v == undefined ) {
            lastuser = await User.findOne().sort({_id:-1})

            if(!lastuser) user.id = 1
            else user.id = lastuser.id + 1

            if(!user.userName) user.userName=user.firstName + user.lastName
        }
        if(user.isModified('password')){
            user.password = await bcrypt.hash(user.password, 10)
        }
        
    }
    catch(e){
        console.log(e.message)
    }

})

userSchema.methods.generateAuthToken = async function(){
    const user = this
    const token = jwt.sign({_id:user._id.toString()}, process.env.JWTKEY)
    user.tokens = user.tokens.concat({token})
    await user.save()

    return token;
}

User = mongoose.model('User', userSchema)
module.exports = User