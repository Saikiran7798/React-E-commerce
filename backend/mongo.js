const mongoose = require('mongoose')
mongoose.connect('mongodb+srv://sai:3294@e-commerce.n0ggzd5.mongodb.net/E-Commerce?retryWrites=true&w=majority&appName=E-Commerce')
const productSchema = new mongoose.Schema({
    id: {
        type: Number,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    new_price: {
        type: Number,
        required: true
    },
    old_price: {
        type: Number,
        required: true
    },
    date: {
        type: Date,
        default: Date.now()
    },
    available: {
        type: Boolean,
        default: true
    }
})

module.exports =  mongoose.model("Product", productSchema)

