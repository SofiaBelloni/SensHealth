import Alert from "./modules/Alert";
import Call from "./modules/Call";
import Department from "./modules/Department";
const APIURL = 'http://localhost:3001/api';

/* Get a Call by its ID */
async function getCallById(callId){
    const url = APIURL + '/call/' + callId;
    try {
        const response = await fetch(url);
        if(response.ok){
            const callGet = await response.json();
            if (callGet) {
                const call = new Call(callGet.id, callGet.status, callGet.location, callGet.time, callGet.name, callGet.surname, 
                    callGet.colorCode, callGet.ambStatus, callGet.img);
                return call; 
            } else {
                return null;
            }
        }
        else {
            const text = response.text();
            throw new TypeError(text);
        }
    } catch (error) {
        throw(error);
    }
}

/* Get all the call list */
async function getAllCalls() {
    const url = APIURL + '/calls';
    try {
        const response = await fetch(url);
        if (response.ok) {
            const list = await response.json();
            const calls = list.map(callGet => new Call(callGet.id, callGet.status, callGet.location, callGet.time, callGet.name, callGet.surname, 
                callGet.colorCode, callGet.ambStatus, callGet.img));
                return calls;

        } else {
            const text = response.text();
            throw new TypeError(text);
        }
    } catch (e) {
        throw (e);
    }
};


/* Get all the call active */
async function getAllCallsActive() {
    const url = APIURL + '/callsactive';
    try {
        const response = await fetch(url);
        if (response.ok) {
            const list = await response.json();
            const calls = list.map(callGet => new Call(callGet.id, callGet.status, callGet.location, callGet.time, callGet.name, callGet.surname, 
                callGet.colorCode, callGet.ambStatus, callGet.img));
                return calls;

        } else {
            const text = response.text();
            throw new TypeError(text);
        }
    } catch (e) {
        throw (e);
    }
};


/* Get all the call list order by IDs*/
async function getAllCallsOrderbyId() {
    const url = APIURL + '/calls/order/id';
    try {
        const response = await fetch(url);
        if (response.ok) {
            const list = await response.json();
            const calls = list.map(callGet => new Call(callGet.id, callGet.status, callGet.location, callGet.time, callGet.name, callGet.surname, 
                callGet.colorCode, callGet.ambStatus, callGet.img));
                return calls;

        } else {
            const text = response.text();
            throw new TypeError(text);
        }
    } catch (e) {
        throw (e);
    }
};

/* Get all the call list order by status 'Active'*/
async function getAllCallsOrderbyActive() {
    const url = APIURL + '/calls/order/active';
    try {
        const response = await fetch(url);
        if (response.ok) {
            const list = await response.json();
            const calls = list.map(callGet => new Call(callGet.id, callGet.status, callGet.location, callGet.time, callGet.name, callGet.surname, 
                callGet.colorCode, callGet.ambStatus, callGet.img));
                return calls;

        } else {
            const text = response.text();
            throw new TypeError(text);
        }
    } catch (e) {
        throw (e);
    }
};

/* Get all the call list order by IDs*/
async function getAllCallsOrderbyClosed() {
    const url = APIURL + '/calls/order/closed';
    try {
        const response = await fetch(url);
        if (response.ok) {
            const list = await response.json();
            const calls = list.map(callGet => new Call(callGet.id, callGet.status, callGet.location, callGet.time, callGet.name, callGet.surname, 
                callGet.colorCode, callGet.ambStatus, callGet.img));
                return calls;

        } else {
            const text = response.text();
            throw new TypeError(text);
        }
    } catch (e) {
        throw (e);
    }
};

/* Set a status of a given call given its ID */
async function setStatusCall(callId, status) {
    const url = APIURL + '/call/' + callId;
    const body = {
        "id": callId,
        "status": status
    }
    try {
        const response = await fetch(url, {
            method: 'PUT',
            body: JSON.stringify(body),
            headers: {
                'Content-Type': 'application/json'
            }, 
            credentials: 'include'
        });
        
        if (response.ok) {
            return true;
        } else {
            const text = await response.text();
            throw new TypeError(text);
        }
    } catch (ex) {
        throw ex;
    }
}

async function setPath(callId, newPath){
    const url = APIURL + "/call/" + callId + "/path";
    const body = {
        "new_filename" : newPath
    };
    try {
        const response = await fetch(url, {
            method: 'PUT',
            body: JSON.stringify(body),
            headers: {
                'Content-Type' : 'application/json'
            },
            credentials: 'include'
        });
        if (response.ok) {
            return true;
        } else {
            const text = await response.text();
            throw new TypeError(text);
        }
    } catch (e) {
        throw(e);
    }
}
    
/* Get all departments */
async function getAllDepartments() {
    const url = APIURL + '/departments';
    try {
        const response = await fetch(url);
        if (response.ok) {
            const list = await response.json();
            const departmentsList = list.map(dep => new Department(dep.id, dep.name));
            return departmentsList;

        } else {
            const text = response.text();
            throw new TypeError(text);
        }
    } catch (e) {
        throw (e);
    }
};

/* Send new alert */
async function sendAlert(description, callId, departmentId) {
    // POST api/sendAlert
    const body = {
        "description": description,
        "callId": callId,
        "departmentId": departmentId,
    }
    const url = APIURL + '/sendAlert';
     
    return new Promise((resolve, reject) => {
      fetch(url, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      }).then((response) => {
        if (response.ok) {
            resolve(null);
        } else {
          response.json()
            .then((message) => { reject(message); })
            .catch(() => { reject({ error: "Cannot parse server response." }) });
        }
      }).catch(() => { reject({ error: "Cannot communicate with server." }) });
    });
  }

/* Get Alerts by call ID */
async function getAlerts(callId){
    const url = APIURL + '/alerts/' + callId;
    try {
        const response = await fetch(url);
        if(response.ok){
            const list = await response.json();
            if (list) {
            const alerts = list.map(alert => new Alert(alert.id, alert.description, alert.callId, alert.department));
                return alerts; 
            } else {
                return null;
            }
        }
        else {
            const text = response.text();
            throw new TypeError(text);
        }
    } catch (error) {
        throw(error);
    }
}


const API={
    getCallById, 
    getAllCalls,
    getAllCallsActive, 
    getAllCallsOrderbyId, 
    getAllCallsOrderbyActive, 
    getAllCallsOrderbyClosed, 
    setStatusCall,
    getAllDepartments,
    sendAlert,
    getAlerts,
    setPath
};
export default API;