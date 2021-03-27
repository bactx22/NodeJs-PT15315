import mongoose from 'mongoose';
const { ObjectId } = mongoose.Schema;
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
    category: {
        type: ObjectId,
        ref: "Category",
        require:true,
    }
    ,
    photo: {
        data: Buffer,
        contentType: String  
    },
    quantity: {
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
}, { timestamps: true });

module.exports = mongoose.model("Product",productSchema)