const mongoose = require('mongoose')

const bookingSchema = mongoose.Schema({
    id:{
        type:Number
    },
    booked:{
        type:Boolean,
        required:true,
        default:true,
    },
    paid:{
        type:Boolean,
        required:true,
        default:false,
    },
    user_id:{
        type: mongoose.Schema.Types.ObjectId,
        required:true,
        ref: 'User'
    },
    event_id:{
        type: mongoose.Schema.Types.ObjectId,
        required:true,
        ref: 'NewEvent'
    },
}, {timestamps:true})

bookingSchema.virtual('events',{
    ref:'NewEvent',
    localField:'_id',
    foreignField:'event_id'
})

bookingSchema.pre('save', async function(){
    try{
        booking = this
        if(booking.__v == undefined ) {
            lastbooking = await Booking.findOne().sort({_id:-1})

            if(!lastbooking) booking.id = 1
            else booking.id = lastbooking.id + 1
        }
        
    }
    catch(e){
        console.log(e.message)
    }

})

Booking = mongoose.model('Booking', bookingSchema)
module.exports = Booking