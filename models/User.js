const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const UserSchema = new Schema({
    email: {
        type: String,
        unique: true,
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address'],
        required: [true, "Please provide e email"]
    },
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
    },
    password: {
        type: String, 
        required: true,
        selected: false
    },
    status: {
        type: Boolean,
        default: true,
    },
    isBlocked: {
        type: Boolean,
        default: false
    },
    role: {
        type: String,
        enum: ["admin", "user"],
        default: 'user'
    }
},
{
    timestamps: true,
    versionKey: false,
});

module.exports =  mongoose.model('User', UserSchema);

