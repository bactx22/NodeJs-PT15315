import mongoose from 'mongoose'
const productSchema = mongoose.Schema({
    name: {
        type: String,
        strim: true,
        maxLength: 32,
        require: true
    },
    description: {
        type: String,
        require: true,
        maxLength: 2000
    },
    price: {
        type: Number
    },
    shipping: {
        require: true,
        type: Boolean
    },
    sold: {
        type: Number,
        default: 0
    }
}, { timeStamps: true });

module.exports = mongoose.model("Product",productSchema)