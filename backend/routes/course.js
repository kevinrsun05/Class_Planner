const express = require('express');
const router = express.Router();
const pool = require('../db');

// create a class
router.post('/', async (req, res) => {
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
router.get('/', async (req, res) => {
    try {
        const allClasses = await pool.query("SELECT * FROM classes");
        res.json(allClasses.rows);
    } catch (err) {
        console.error(err.message);
    }
});

// get a class
router.get('/:code', async (req, res) => {
    try {
        const { code } = req.params;
        const classInfo = await pool.query("SELECT * FROM classes WHERE code = $1", [code]);

        res.json(classInfo.rows[0]);
    } catch (err) {
        console.error(err.message);
    }
});

// update a class
router.put("/:code", async (req, res) => {
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
router.delete("/:code", async (req, res) => {
    try {
        const { code } = req.params;
        const deleteClass = await pool.query("DELETE FROM classes WHERE code = $1", [code]);

        res.json("Class was deleted");
    } catch (err) {
        console.error(err.message);
    }
});

module.exports = router;