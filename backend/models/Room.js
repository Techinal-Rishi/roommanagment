const mongoose= require('mongoose');
const {Schema}= mongoose;

const RoomSchema = new Schema({

    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'user'
    },
    title:{
        type:String,
        required: true
    },
    description:{
        type:String,
        required: true,
        unique: false
    },
    contact: {
    type: String,
    required: true,
},
    place:{
        type:String,
        required: true
    },
    date:{
        type:Date,
        default: Date.now
    },
});

const Room = mongoose.model('room', RoomSchema);
module.exports = Room;