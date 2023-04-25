const express = require('express');
const products = require('./data/products');
const dotenv = require('dotenv');
const connectDB = require('./config/db')
// import connectDB from './config/db';


dotenv.config();

connectDB();

const app = express();
const port = process.env.PORT;

app.get('/', (req, res)=> {
    res.send('API is running')
})

app.get('/products', (req, res)=> {
    res.json(products)
})
app.get('/products/:id', (req, res)=> {
    const product = products.find((item) => parseInt(item.id) === parseInt(req.params.id))
    res.json(product)
})


app.listen(port, console.log(`server running : http://localhost:${port}/`))