const mongoose = require('mongoose');
const { Schema } = mongoose;

const InquirySchema = new Schema({
    room: {
        type: Schema.Types.ObjectId,
        ref: 'room',
        required: true,
    },
    tenant: {
        type: Schema.Types.ObjectId,
        ref: 'user',
        required: true,
    },
    status: {
        type: String,
        enum: ['pending', 'contacted', 'accepted', 'rejected'],
        default: 'pending',
    },
    contactNumber: {
        type: String,
        required: [true, 'Please provide a contact number'],
        match: [/^\d{10}$/, 'Please enter a valid 10-digit phone number'],
    },
    message: {
        type: String,
        required: [true, 'Please provide an inquiry message'],
        maxlength: [500, 'Message cannot exceed 500 characters'],
    },
    date: {
        type: Date,
        default: Date.now
    }
});

const Inquiry = mongoose.model('inquiry', InquirySchema);
module.exports = Inquiry;