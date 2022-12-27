'use strict';
const sqlite = require('sqlite3');
const db = new sqlite.Database('./tables.db', (err) => {
    if(err){
        throw(err);
    } else {
        console.log('Loading DB done. \n');
    }
})

exports.getCallById = (callId) => new Promise((resolve, reject) => {
    const sql = "SELECT * FROM CALL WHERE id = ?";
    db.all(sql, [callId], (err, rows) => {
        if(err) {
            reject(err);
            return;
        }
        resolve(rows);
    })
})