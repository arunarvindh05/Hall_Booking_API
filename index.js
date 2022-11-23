require('dotenv').config();
const express = require('express');

//Import all routes
const hallBookingRoutes = require('./routes/hallBooking.routes');


const app = express();

app.use(express.json());

app.get('/', (req, res) => {
res.status(200).send('Welcome to my hall booking Application')
})

app.use(hallBookingRoutes);

const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log(`App is running on PORT ${PORT}`)
})