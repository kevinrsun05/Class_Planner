const { Pool } = require('pg');

const pool = new Pool({
    user: 'postgres',
    password: 'password0531',
    host: 'localhost',
    port: 5432,
    database: 'classplanner'
});

const insertClasses = async () => {
    try {
        // Insert CS classes into the 'classes' table
        await pool.query(`
            INSERT INTO classes (code, units, category) VALUES
            ('CS_31', 4, 'Lower-div CS'),
            ('CS_32', 4, 'Lower-div CS'),
            ('CS_33', 5, 'Lower-div CS'),
            ('MATH_31A', 4, 'Lower-div Math'),
            ('MATH_31B', 4, 'Lower-div Math'),
            ('PHYS_1A', 5, 'Lower-div Physics'),
            ('PHYS_1B', 5, 'Lower-div Physics'),
            ('CS_180', 4, 'Upper-div CS'),
            ('CS_M146', 4, 'Upper-div CS Elective'),
            ('CS_M148', 4, 'Upper-div CS Elective'),
            ('GE_1', 5, 'General Education'),
            ('GE_2', 5, 'General Education')
        `);

        console.log('✅ Data inserted successfully');
    } catch (err) {
        console.error('❌ Error inserting data:', err.message);
    } finally {
        pool.end(); // Close DB connection once done
    }
};

insertClasses();
