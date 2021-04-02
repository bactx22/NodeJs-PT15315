import mongoose from 'mongoose';

const categorySchema = mongoose.Schema({
    name: {
        type: String,
        strim: true,
        maxLength: 32,
        require: true
    },
    photo: {
        data: Buffer,
        contentType: String  
    },
}, { timestamps: true });


module.exports = mongoose.model("Category", categorySchema);