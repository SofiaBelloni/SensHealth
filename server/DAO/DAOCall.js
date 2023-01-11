'use strict';
const sqlite = require('sqlite3');
const Call = require('../backend/Call');
const db = new sqlite.Database('./tables.db', (err) => {
    if (err) throw (err);
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

// Get all Calls ordered by CallID DESC
exports.listCallsAsc = () => new Promise((resolve, reject) => {
    const sql = 'SELECT * FROM CALL ORDER BY id';
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

// Get all Calls ordered by Active
exports.orderbyActiveCalls = () => new Promise((resolve, reject) => {
    const sql = 'SELECT * FROM CALL ORDER BY status';
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

// Get all Calls ordered by Closed
exports.orderbyClosedCalls = () => new Promise((resolve, reject) => {
    const sql = 'SELECT * FROM CALL ORDER BY status DESC';
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

// Update Status Call (The Location will be hidden in the frontend when the Status will be 'Closed')
exports.updateCall = (call) => {
    return new Promise((resolve, reject) => {
        const sql = 'UPDATE CALL SET status=? WHERE id=?';
        db.run(sql, [call.status, call.id], function (err) {
            if (err) reject(err);
            else resolve(call.id);
        });
    });
};

// Get informations about a call giving its callID
exports.getCallById = (callId) => new Promise((resolve, reject) => {
    const sql = 'SELECT * FROM CALL WHERE id = ?';
    db.get(sql, [callId], (err, row) => {
        if (err) {
            reject(err);
            return;
        }
        if (row != undefined) {
            const singleCall = new Call(
                row.id,
                row.status,
                row.location,
                row.time,
                row.name,
                row.surname,
                row.colorCode,
                row.ambStatus,
                row.img)
            
            resolve(singleCall);
        } else {
            resolve(null);
        }
    })
})