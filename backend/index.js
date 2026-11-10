const connectToMongo = require('./db');
const express = require('express');
var cors = require('cors');

connectToMongo(); 

const app = express();
const port = 5000;

// Adds headers: Access-Control-Allow-Origin: *
app.use(cors());
app.use(express.json()) // use this as MIDDLEWARE if u r using req.body

app.use('/api/auth', require('./routes/auth'));
app.use('/api/rooms', require('./routes/rooms'));
app.use('/api/inquiry', require('./routes/inquiry'));


app.listen(port, () => {
  console.log(`Roommanagment backend listening on port ${port}`);
});