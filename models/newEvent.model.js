const mongoose = require('mongoose')

const newEventSchema = mongoose.Schema({
    id:{
        type:Number
    },
    name:{
        type:String,
        required: true,
        unique: true
    },
    description:{
        type: String,
        required: true,
        unique: true
    },
    start_date:{
        type:Date,
        required:true
    },
    end_date:{
        type:Date,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    status:{
        type:String,
        required:true,
        enum: ['AVAILABLE', 'BOOKED', 'CANCELLED'],
        default: 'AVAILABLE'
    },
    capacity: {
        type:Number,
        required:true
    },
    room_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Room'
    },
    speaker_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Speaker'
    },
    host_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Host'
    }
}, {timestamps:true})


newEventSchema.virtual('eventBooking',{
    ref:'Booking',
    localField:'_id',
    foreignField:'event_id'
})

newEventSchema.methods.toJSON = function(){
    let newEvent = this.toObject()
    return newEvent
}

newEventSchema.pre('save', async function(){
    try{
        newEvent = this
        if(newEvent.__v == undefined ) {
            lastevent = await NewEvent.findOne().sort({_id:-1})
            if(!lastevent) newEvent.id = 1
            else newEvent.id = lastevent.id + 1
        }
        
    }
    catch(e){
        console.log(e.message)
    }

})

NewEvent = mongoose.model('NewEvent', newEventSchema)
module.exports = NewEvent