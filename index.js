const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

const products = require('./data/products');
const connectDB = require('./config/db')
const  { productsRouter }  = require('./routes/productsRoutes')
const  { usersRouter }  = require('./routes/usersRoutes');
const { ordersRouter } = require('./routes/orderRoutes');

const bodyParser = require('body-parser');
const paypal = require('paypal-rest-sdk');
const { CheckoutNodeJssdk } = require('@paypal/checkout-server-sdk');



dotenv.config();

connectDB();

const app = express();
const port = process.env.PORT;
// Set up CORS
app.use(cors());

// to accept post json data
app.use(express.json())

app.use(express.urlencoded())
app.use(express.static('./public'))


app.get('/', (req, res)=> {
    res.send('API is running')
})


// app.use('/api/config/payment', (req, res) => 
//     res.send(process.env.PAYPAL_CLIENT_ID)
// )

// PayPal configuration
paypal.configure({
    mode: 'sandbox', // Set to 'live' for production
    client_id: 'AcdIue6OSWJoAFIRAmsyu4fkXqYSqY7VtLOuaGqfxq2yRrczxaDMXKLT8KGpP5D2-2_Rh-xVV54Eg3lj',
    client_secret: 'EJHFq0TL6jek0pIkXmfXpx4L32sQU20Y_5MjXY3qNgnTRXzeYQ3apDtKRFA5SqPCDBslwy7t8cAueE0H',
});

app.use(bodyParser.json());

app.use(['/api/products', '/api/product'], productsRouter) 
app.use(['/api/users', '/api/user'], usersRouter) 
app.use(['/api/orders', '/api/order'], ordersRouter) 


//   // Create PayPal payment
//   app.post('/create-payment', (req, res) => {
//     console.log('create');
//     const paymentData = {
//       intent: 'sale',
//       payer: {
//         payment_method: 'paypal',
//       },
//       redirect_urls: {
//         return_url: 'http://localhost:3000/success',
//         cancel_url: 'http://localhost:3000/cancel',
//       },
//       transactions: [
//         {
//           amount: {
//             total: '10.00',
//             currency: 'USD',
//           },
//           description: 'Sample description',
//         },
//       ],
//     };
  
//     paypal.payment.create(paymentData, (error, payment) => {
//       if (error) {
//         console.error(error);
//         res.sendStatus(500);
//       } else {
//         // Redirect the user to the approval_url
//         const { links } = payment;
//         const approvalUrl = links.find(link => link.rel === 'approval_url');
//         res.redirect(approvalUrl.href);
//       }
//     });
//   });
  
  // Capture PayPal payment
//   app.post('/capture-payment', (req, res) => {
//     console.log('capture');

//     const { paymentId, payerId } = req.body;
  
//     const captureData = {
//       amount: {
//         currency: 'USD',
//         total: '10.00',
//       },
//     };
  
//     paypal.payment.capture(paymentId, captureData, (error, capture) => {
//       if (error) {
//         console.error(error);
//         res.sendStatus(500);
//       } else {
//         // Payment captured successfully
//         res.json({ status: 'success', capture });
//       }
//     });
//   });

  





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