'use strict';
const sqlite = require('sqlite3');
const Alert = require('../backend/Alert');
const db = new sqlite.Database('./tables.db', (err) => {
    if (err) throw (err);
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

// get alerts by call id
exports.getAlerts = (callId) => {
    return new Promise((resolve, reject) => {
      const sql = 'SELECT ALERT.id, description, callId, DEPARTMENT.name as depName FROM ALERT JOIN DEPARTMENT ON ALERT.depId=DEPARTMENT.id WHERE callId = ?';
      db.all(sql, [callId], (err, rows) => {
        if (err) {
          reject(err);
          return;
        }
        const alerts = rows.map(row => new Alert(row.id, row.description, row.callId, row.depName));
        resolve(alerts);
      });
    });
  };