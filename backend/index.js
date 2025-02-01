const express = require('express');
const app = express();
const cors = require('cors');
const pool = require('./db');

// middleware
app.use(cors());
app.use(express.json());

//ROUTES//

// create a class
app.post('/classes', async (req, res) => {
    try {
        const { code, units, category } = req.body;

        const newClass = await pool.query(
            "INSERT INTO classes (code, units, category) VALUES($1, $2, $3) RETURNING *",
            [code, units, category]
        );

        res.json(newClass.rows[0]);
    } catch(err) {
        console.error(err.message);
    }

});

// get all classes
app.get('/classes', async (req, res) => {
    try {
        const allClasses = await pool.query("SELECT * FROM classes");
        res.json(allClasses.rows);
    } catch (err) {
        console.error(err.message);
    }
});

// get a class
app.get('/classes/:code', async (req, res) => {
    try {
        const { code } = req.params;
        const classInfo = await pool.query("SELECT * FROM classes WHERE code = $1", [code]);

        res.json(classInfo.rows[0]);
    } catch (err) {
        console.error(err.message);
    }
});

// update a class
app.put("/classes/:code", async (req, res) => {
    try {
        const { code } = req.params;
        const { units, category } = req.body;

        const updateClass = await pool.query(
            "UPDATE classes SET units = $1, category = $2 WHERE code = $3",
            [units, category, code]
        );

        res.json("Class was updated");
    } catch (err) {
        console.error(err.message);
    }
});

// delete a class
app.delete("/classes/:code", async (req, res) => {
    try {
        const { code } = req.params;
        const deleteClass = await pool.query("DELETE FROM classes WHERE code = $1", [code]);

        res.json("Class was deleted");
    } catch (err) {
        console.error(err.message);
    }
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});