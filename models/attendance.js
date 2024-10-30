const mongoose = require('mongoose')

const attendanceSchema = mongoose.Schema({
    id:{
        type:Number
    },
    attend:{
        type:Boolean,
        required:true,
        default:true,
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

attendanceSchema.pre('save', async function(){
    try{
        attendance = this
        if(attendance.__v == undefined ) {
            lastattendance = await attendance.findOne().sort({_id:-1})

            if(!lastattendance) attendance.id = 1
            else attendance.id = lastattendance.id + 1
        }
        
    }
    catch(e){
        console.log(e.message)
    }

})

attendance = mongoose.model('attendance', attendanceSchema)
module.exports = attendance