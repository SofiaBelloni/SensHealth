import Call from "./modules/Call";
const APIURL = 'http://localhost:3001/api';

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

const API={getCallById};
export default API;