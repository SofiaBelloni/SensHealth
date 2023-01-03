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

const API={
    getCallById, 
    getAllCalls, 
    getAllCallsOrderbyId, 
    getAllCallsOrderbyActive, 
    getAllCallsOrderbyClosed, 
    setStatusCall,
    getAllDepartments
};
export default API;