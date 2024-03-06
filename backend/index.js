const PORT = 4000;
const express = require('express')
const app = express()
const multer = require('multer')
const jwt = require('jsonwebtoken') 
const path = require('path')
const cors = require('cors')
const Product = require('./mongo')

app.use(express.json())
app.use(cors())

const storage = multer.diskStorage({
    destination: './upload/images',
    filename: (req, file, cb) => {
        cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`)
    } 
})

const upload = multer({storage: storage})
app.use('/images', express.static('upload/images'))

app.post('/upload', upload.single('product'), (req, res) => {
    res.json({
        success: 1,
        image_url: `http://localhost:${PORT}/images/${req.file.filename}`
    })
})

app.post("/addProduct", async(req, res) => {
    let products = await Product.find({})
    let id = 1;
    if(products.length > 0){
        let last_product_array = products.slice(-1)
        let last_product = last_product_array[0]
        id = last_product.id + 1
    }
    try{
        const newProduct = Product({
            id:id,
            name: req.body.name,
            image: req.body.image,
            category:req.body.category,
            new_price:req.body.new_price,
            old_price:req.body.old_price
        })
        console.log(newProduct)
        await newProduct.save()
        console.log("Saved")
        res.json({
            success:true,
            name:req.body.name
        })
    }catch(error){
        console.log("Error", error)
        res.status(500).json({
            error: "Internal Server Error"
        })
    }
})

app.delete('/removeproduct', async(req,res) => {
    try{
        await Product.findOneAndDelete({id:req.body.id})
        console.log("Removed")
        res.json({
            success:true,
            id: req.body.id
        })
    }catch(error){
        res.status(500).json({
            error:"Unable to delete id"
        })
    }
})

app.get("/allproducts", async(req,res) => {
    try{
        let allProducts = await Product.find({})
        res.send(allProducts)
        console.log("all products fetched")
    } catch(error){
        res.status(500).send("Error")
    }
})

app.listen(PORT, () => {
    console.log("Listening")
})

