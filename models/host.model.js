const mongoose = require('mongoose')
const NewEvent = require('./newEvent.model')

const hostSchema = mongoose.Schema({
    id:{
        type:Number
    },
    name:{
        type:String,
        required:true,
        unique:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    mobile:{
        type:String,
        required:true,
        unique:true
    },
    description:{ 
        type:String,
        required:true,
    },
}, {timestamps:true})

hostSchema.methods.toJSON  = function(){
    let host = this.toObject()
    return host
}

hostSchema.pre('save', async function(){
    try{
        host = this
        if(host.__v == undefined ) {
            lasthost = await Host.findOne().sort({_id:-1})
            if(!lasthost) host.id = 1
            else host.id = lasthost.id + 1
        }
        
    }
    catch(e){
        console.log(e.message)
    }

})

hostSchema.pre('findOneAndDelete', {document:false, query: true},async function(next){
    console.log('delete one')
    let host = this.getQuery()
    console.log(host)
    eventExist = await NewEvent.findOne({host_id:host._id})
    if(!eventExist) throw new Error('can not delete this')
    else next();
})

Host = mongoose.model('Host', hostSchema)
module.exports = Host