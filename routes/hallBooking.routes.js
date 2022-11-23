const express = require('express');

const router = express.Router();

let rooms = [
    {
      room_name: 'Suite',
      room_id: 1,
      seats: 5,
      amenities: ['Wifi,Food,AC,TV,Private_pool'],
      price_per_hour: 1500,
    },
    {
      room_name: 'Premium',
      room_id: 2,
      seats: 10,
      amenities: ['Wifi,Food,AC,TV'],
      price_per_hour: 2500,
    },
  ];
  
  let bookingDetails = [
    {
      customerName: 'Arun',
      room_name: 'Suite',
      booked_room_id: 1,
      date: new Date('2022-11-23'),
      start_time: '15:00',
      end_time: '17:00',
      status: 'booked',
    },
    {
      customerName: 'Arvindh',
      room_name: 'Premium',
      booked_room_id: 2,
      date: new Date('2022-12-01'),
      start_time: '07:00',
      end_time: '10:00',
      status: 'booked',
    },
  ];
  
router.post('/room/create', (req, res) => {
    let id = rooms.length + 1;
    req.body.room_id = id;
    rooms.push({
      room_name: req.body.room_name,
      room_id: req.body.room_id,
      seats: req.body.seats,
      amenities: req.body.amenities,
      price_per_hour: req.body.price_per_hour,
    });
    res.status(200).json(`The id ${id} with room is created successfully`);
  });
  
  // Booking a room
  
  router.post('/room/book', (req, res) => {
    let id = bookingDetails.length + 1;
    req.body.booked_room_id = id;
    try {
      req.body.date = new Date(req.body.date);
      let booking_detail = {
        customerName: req.body.customerName,
        booked_room_id: req.body.booked_room_id,
        room_name: req.body.room_name,
        date: req.body.date,
        start_time: req.body.start_time,
        end_time: req.body.end_time,
        status: 'booked',
      };
      let result = undefined;
      for (const book of bookingDetails) {
        if (
          book.date.getTime() == req.body.date.getTime() &&
          book.start_time === req.body.start_time
        ) {
          console.log(book.date.getTime(), req.body.date.getTime());
          result = 0;
          console.log('in booking');
          return res
            .status(400)
            .send({ error: 'The room is not available with this time slot' });
        } else {
          result = 1;
          bookingDetails.push(booking_detail);
          return res
            .status(200)
            .send(
              `Room is successfully booked with the id ${req.body.booked_room_id}`
            );
        }
      }
    } catch (error) {
      console.log(error);
      res.status(400).send('internal error');
    }
  });
  
  // List all rooms with booked data
  
  router.get('/room/booked-details', (req, res) => {
    let roomArray = [];
  
    bookingDetails.forEach((customer) => {
      let roomObj = {};
  
      roomObj.room_name = customer.room_name;
      roomObj.status = customer.status;
      roomObj.customerName = customer.customerName;
      roomObj.date = customer.date;
      roomObj.start_time = customer.start_time;
      roomObj.end_time = customer.end_time;
      roomArray.push(roomObj);
    });
  
    res.status(200).send(roomArray);
  });
  
  // List all customers with booked data
  
  router.get('/room/customer-details', (req, res) => {
    let customerArray = [];
  
    bookingDetails.forEach((customer) => {
      let customerObj = {};
      customerObj.customerName = customer.customerName;
      customerObj.room_name = customer.room_name;
      customerObj.date = customer.date;
      customerObj.start_time = customer.start_time;
      customerObj.end_time = customer.end_time;
      customerArray.push(customerObj);
    });
  
    res.status(200).send(customerArray);
  });

  module.exports = router;