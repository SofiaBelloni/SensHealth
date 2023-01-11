'use strict';
const sqlite = require('sqlite3');
const Department = require('../backend/Department');
const db = new sqlite.Database('./tables.db', (err) => {
    if (err) {
        throw (err);
    } else {
        console.log('Loading DB done. \n');
    }
})

// Get all Departments ordered by ID DESC
exports.listDepartments = () => new Promise((resolve, reject) => {
    const sql = 'SELECT * FROM DEPARTMENT ORDER BY id DESC';
    db.all(sql, [], (err, rows) => {
        if (err) reject(err);
        else {
            if (rows !== undefined) {
                const depList = rows.map((row) => new Department(
                    row.id,
                    row.name)
                )
                resolve(depList);
            } else {
                resolve(null);
            }
        }
    })
})