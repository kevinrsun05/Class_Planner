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
            ('CS_35L', 4, 'Lower-div CS'),
            ('CS_M51A', 4, 'Lower-div CS'),

            ('MATH_31A', 4, 'Lower-div Math'),
            ('MATH_31B', 4, 'Lower-div Math'),
            ('MATH_32A', 4, 'Lower-div Math'),
            ('MATH_32B', 4, 'Lower-div Math'),
            ('MATH_33A', 4, 'Lower-div Math'),
            ('MATH_33B', 4, 'Lower-div Math'),
            ('MATH_61', 4, 'Lower-div Math'),

            ('PHYS_1A', 5, 'Lower-div Physics'),
            ('PHYS_1B', 5, 'Lower-div Physics'),
            ('PHYS_1C', 5, 'Lower-div Physics'),
            ('PHYS_4AL', 2, 'Lower-div Physics (Sel 1)'),
            ('PHYS_4BL', 2, 'Lower-div Physics (Sel 1)'),

            ('CS_111', 4, 'Upper-div CS'),
            ('CS_118', 4, 'Upper-div CS'),
            ('CS_131', 4, 'Upper-div CS'),
            ('CS_180', 4, 'Upper-div CS'),
            ('CS_181', 4, 'Upper-div CS'),
            ('CS_M151B', 4, 'Upper-div CS'),
            ('CS_M152A', 2, 'Upper-div CS'),
            ('CS_130', 4, 'Upper-div CS (Sel 1)'),
            ('CS_152B', 4, 'Upper-div CS (Sel 1)'),

            ('STATS_100A', 4, 'Probability (Sel 1)'),
            ('MATH_170E', 4, 'Probability (Sel 1)'),
            ('MATH_170A', 4, 'Probability (Sel 1)'),
            ('ECE_131A', 4, 'Probability (Sel 1)'),
            ('C&EE_110', 4, 'Probability (Sel 1)'),

            ('CS_Elec_1', 4, 'Upper-div CS Elective'),
            ('CS_Elec_2', 4, 'Upper-div CS Elective'),
            ('CS_Elec_3', 4, 'Upper-div CS Elective'),
            ('CS_Elec_4', 4, 'Upper-div CS Elective'),
            ('CS_Elec_5', 4, 'Upper-div CS Elective'),

            ('TechBr_1', 4, 'Technical Breadth'),
            ('TechBr_2', 4, 'Technical Breadth'),
            ('TechBr_3', 4, 'Technical Breadth'),

            ('SciTech_1', 4, 'Science & Technology'),
            ('SciTech_2', 4, 'Science & Technology'),
            ('SciTech_3', 4, 'Science & Technology'),

            ('GE_1', 5, 'General Education'),
            ('GE_2', 5, 'General Education'),
            ('GE_3', 5, 'General Education'),
            ('GE_4', 5, 'General Education'),
            ('GE_5', 5, 'General Education'),

            ('Ethics_Wri', 4, 'Other')
        `);

        console.log('✅ Data inserted successfully');
    } catch (err) {
        console.error('❌ Error inserting data:', err.message);
    } finally {
        pool.end(); // Close DB connection once done
    }
};

insertClasses();
