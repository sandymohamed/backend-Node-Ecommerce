const express = require('express');
const cors = require('cors');

const products = require('./data/products');
const dotenv = require('dotenv');
const connectDB = require('./config/db')
const  { productsRouter }  = require('./routes/productsRoutes')

dotenv.config();

connectDB();

const app = express();
const port = process.env.PORT;
// Set up CORS
app.use(cors());

app.use(express.json())
app.use(express.urlencoded())
app.use(express.static('./public'))


app.get('/', (req, res)=> {
    res.send('API is running')
})

app.use(['/api/products', '/api/product'], productsRouter) 

app.use(( req, res, next)=> {
    const error = new Error(`Not Found - ${req.originalurl}`)
    res.status(404);
    next(error);
})

app.use((err, req, res, next) => {
    const statusCode = res.statusCode === 200 ? 500 : res.statusCode

    res.status(statusCode)
    res.json(err.message)

})

app.listen(port, 
    console.log(`server running : http://localhost:${port}/`))