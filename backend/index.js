const express = require('express');
const app = express();
const cors = require('cors');
const pool = require('./db');
const courseRoutes = require('./routes/course');

// middleware
app.use(cors());
app.use(express.json());

//ROUTES//

app.use('/classes', courseRoutes);

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});