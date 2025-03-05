const express = require('express');
const router = express.Router();
const pool = require('../db');

router.post('/', async (req, res) => {
    try {
        const { class_id, year, quarter } = req.body;

        const newEntry = await pool.query(
            "INSERT INTO schedule (class_id, year, quarter) VALUES ($1, $2, $3) RETURNING *",
            [class_id, year, quarter]
        );

        res.json(newEntry.rows[0]);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: "Server error" });
    }
});

router.get('/', async (req, res) => {
    try {
        const schedule = await pool.query(
            "SELECT * FROM schedule ORDER BY year, quarter"
        );

        res.json(schedule.rows);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: "Server error" });
    }
});

router.delete('/', async (req, res) => {
    try {
        const { class_id, year, quarter } = req.body;

        await pool.query(
            "DELETE FROM schedule WHERE class_id = $1 RETURNING *",
            [class_id]
        );

        res.json({ message: "Class removed from schedule" });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: "Server error" });
    }
});


module.exports = router;