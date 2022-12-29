'use strict';
const sqlite = require('sqlite3');
const Call = require('../backend/Call');
const db = new sqlite.Database('./tables.db', (err) => {
    if (err) {
        throw (err);
    } else {
        console.log('Loading DB done. \n');
    }
})

// Get all Calls ordered by CallID DESC
exports.listCalls = () => new Promise((resolve, reject) => {
    const sql = 'SELECT * FROM CALL ORDER BY id DESC';
    db.all(sql, [], (err, rows) => {
        if (err) reject(err);
        else {
            if (rows !== undefined) {
                const callsList = rows.map((row) => new Call(
                    row.id,
                    row.status,
                    row.location,
                    row.time,
                    row.name,
                    row.surname,
                    row.colorCode,
                    row.ambStatus,
                    row.img)
                )
                resolve(callsList);
            } else {
                resolve(null);
            }
        }
    })
})

// Get informations about a call giving its callID
exports.getCallById = (callId) => new Promise((resolve, reject) => {
    const sql = 'SELECT * FROM CALL WHERE id = ?';
    db.all(sql, [callId], (err, rows) => {
        if (err) {
            reject(err);
            return;
        }
        resolve(rows);
    })
})