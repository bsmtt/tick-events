const mongoose = require('mongoose')

const roomSchema = mongoose.Schema({
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
        required:false,
    },
    capacity: {
        type:Number,
        required:true
    },
}, {timestamps:true})


roomSchema.pre('save', async function(){
    try{
        room = this
        if(room.__v == undefined ) {
            lastroom = await Room.findOne().sort({_id:-1})

            if(!lastroom) room.id = 1
            else room.id = lastroom.id + 1
        }
        
    }
    catch(e){
        console.log(e.message)
    }

})

Room = mongoose.model('Room', roomSchema)
module.exports = Room