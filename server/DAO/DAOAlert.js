'use strict';
const sqlite = require('sqlite3');
const db = new sqlite.Database('./tables.db', (err) => {
    if (err) {
        throw (err);
    } else {
        console.log('Loading DB done. \n');
    }
})

//add alert
exports.addAlert = (alert) => {
    return new Promise((resolve, reject) => {
        const sql = "INSERT INTO ALERT(description, callId, depId) values (?,?,?)";
        db.run(sql, [alert.description, alert.callId, alert.departmentId], function (err) {
            if (err) {
                reject(err);
                return;
            } else {
                resolve(this.id);
            }
        })
    });
}