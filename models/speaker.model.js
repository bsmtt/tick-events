const mongoose = require('mongoose')

const speakerSchema = mongoose.Schema({
    id:{
        type:Number
    },
    name:{
        type:String,
        required:true,
        unique:true
    },
    description:{ 
        type:String,
        required:true,
    },
}, {timestamps:true})

speakerSchema.pre('save', async function(){
    try{
        speaker = this
        if(speaker.__v == undefined ) {
            lastspeaker = await Speaker.findOne().sort({_id:-1})

            if(!lastspeaker) speaker.id = 1
            else speaker.id = lastspeaker.id + 1
        }
        
    }
    catch(e){
        console.log(e.message)
    }

})

Speaker = mongoose.model('Speaker', speakerSchema)
module.exports = Speaker