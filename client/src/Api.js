const APIURL = 'http://localhost:3001/api';


async function getCallById(callId){
    const url = APIURL + '/call/' + callId;
    try {
        const response = await fetch(url);
        if(response.ok){
            const call = await response.json();
            return call;
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