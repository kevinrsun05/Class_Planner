const express = require('express');
const app = express();
const cors = require('cors');
const pool = require('./db');
const courseRoutes = require('./routes/course');
const scheduleRoutes = require('./routes/schedule');

// middleware
app.use(cors());
app.use(express.json());

//ROUTES//

app.use('/classes', courseRoutes);
app.use('/schedule', scheduleRoutes);

app.listen(3001, () => {
    console.log('Server is running on port 3001');
});