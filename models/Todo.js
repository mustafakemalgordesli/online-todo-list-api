const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const TodoSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
    },
    status: {
        type: Boolean,
        default: true,
    },
    userId: {
        type: Schema.Types.ObjectId, 
        ref: 'User'
    }
},
{
    timestamps: true,
    versionKey: false,
});

module.exports =  mongoose.model('Todo', TodoSchema);