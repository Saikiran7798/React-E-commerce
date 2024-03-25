const express = require('express')
const app = express()
const multer = require('multer')
const jwt = require('jsonwebtoken')
const path = require('path')
const cors = require('cors')
const { Product, User } = require('./mongo')
const fs = require('fs').promises;


app.use(express.json())
app.use(cors())
app.use(express.static("build"))

const storage = multer.diskStorage({
    destination: './upload/images',
    filename: (req, file, cb) => {
        cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`)
    }
})

const upload = multer({ storage: storage })
app.use('/images', express.static('upload/images'))

app.post('/upload', upload.single('product'), (req, res) => {
    res.json({
        success: 1,
        image_url: `http://localhost:${PORT}/images/${req.file.filename}`,
        file_path: req.file.path
    })
})

app.post("/addProduct", async (req, res) => {
    let products = await Product.find({})
    let id = 1;
    if (products.length > 0) {
        let last_product_array = products.slice(-1)
        let last_product = last_product_array[0]
        id = last_product.id + 1
    }
    try {
        const newProduct = Product({
            id: id,
            name: req.body.name,
            image: req.body.image,
            category: req.body.category,
            new_price: req.body.new_price,
            old_price: req.body.old_price,
            file_path: req.body.file_path
        })
        console.log(newProduct)
        await newProduct.save()
        console.log("Saved")
        res.json({
            success: true,
            name: req.body.name
        })
    } catch (error) {
        console.log("Error", error)
        res.status(500).json({
            error: "Internal Server Error"
        })
    }
})

app.delete('/removeproduct', async (req, res) => {
    try {
        await Product.findOneAndDelete({ id: req.body.id })
        await fs.unlink(req.body.file_path)
        console.log("Removed")
        res.json({
            success: true,
            id: req.body.id
        })
    } catch (error) {
        res.status(500).send("Unable to delete id")
    }
})

app.get("/allproducts", async (req, res) => {
    try {
        let allProducts = await Product.find({})
        res.send(allProducts)
    } catch (error) {
        res.status(500).send("Error")
    }
})

app.get("/newCollections", async (req, res) => {
    try {
        let all_products = await Product.find({})
        let new_collection = all_products.slice(-8)
        res.json(new_collection)
    } catch (error) {
        res.status(500).send("Error")
    }
})
app.get("/popularWomen", async (req, res) => {
    try {
        let all_products = await Product.find({ category: "women" })
        let popular_products = all_products.slice(0, 4)
        res.json(popular_products)
    } catch (error) {
        res.status(500).send("Error")
    }
})

app.post("/signup", async (req, res) => {
    let user = await User.findOne({ email: req.body.email });
    if (user) {
        return res.status(400).json({
            success: false,
            error: "Existing User"
        })
    }
    try {
        const newUser = new User({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password
        })
        await newUser.save()
        const data = {
            user: {
                id: newUser.id
            }
        }
        const token = jwt.sign(data, 'secret_ecom')
        res.json({ success: true, token })
    } catch (error) {
        res.status(500).send("Server Error")
    }
})

app.post("/login", async (req, res) => {
    try {
        let user = await User.findOne({ email: req.body.email })
        if (user) {
            const passCompare = req.body.password === user.password
            if (passCompare) {
                const data = {
                    user: {
                        id: user.id
                    }
                }
                const token = jwt.sign(data, 'secret_ecom')
                res.json({
                    success: true, token
                })
            }
            else {
                res.status(400).json({
                    success: false,
                    error: "Invalid Password"
                })
            }
        }
        else {
            res.status(400).json({
                success: false,
                error: "Invalid Account"
            })
        }
    } catch (error) {
        res.status(500).send("Error")
    }
})

const fetchUserInfo = async (req, res, next) => {
    const token = req.header('auth-token')
    if (!token) {
        res.status(400).send("Inavlid Token")
    } else {
        try {
            const data = jwt.verify(token, 'secret_ecom')
            req.user = data.user
            next()
        } catch (error) {
            res.status(400).json("Token Error")
        }
    }
}

app.get('/defaultCart', fetchUserInfo, async (req, res) => {
    try {
        const user = await User.findById(req.user.id )
        res.json(user.cartData)
    } catch (error) {
        res.status(500).send("Server Error")
    }
})

app.post('/updateCart', fetchUserInfo, async (req, res) => {
    try {
        // const user = await User.findById({ id: req.user.id })
        console.log(req.body)
        await User.findOneAndUpdate({_id: req.user.id}, {cartData: req.body.data})
        res.send('Succesfully updated')
    } catch (error) {
        res.status(500).send("Error")
    }
})

const PORT = process.env.PORT || 4000
app.listen(PORT, () => {
    console.log("Listening")
})

