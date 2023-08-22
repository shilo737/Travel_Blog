import axios from "axios";
import { TOKEN_KEY } from "../constant/url";

export const apiGet = async (_url,_bodyData) => {
    try {
        const resp = await axios.get(_url,{
            headers:{
                'Content-Type': 'application/json',
                'x-api-key':localStorage[TOKEN_KEY]
            }
        })
        return resp;
    } catch (err) {
        throw err;
    } 
}

export const apiPost = async (_url,_bodyData) =>{
    try {
        const resp = await axios({
            url:_url,
            data:JSON.stringify(_bodyData),
            method:'POST',
            headers:{
                'Content-Type': 'application/json',
                'x-api-key':localStorage[TOKEN_KEY]
            }
        })
        return resp
    } catch (err) {
        throw err;
    }
}

export const apiPut = async (_url, _bodyData) => {
    try {
        const resp = await axios({
            url: _url,
            data: JSON.stringify(_bodyData),
            method:'PUT',
            headers: {
                'Content-Type': 'application/json',
                'x-api-key':localStorage[TOKEN_KEY]
            }
        });
        return resp;
    } catch (err) {
        throw err;
    }
}

export const apiPatch = async (_url, _bodyData = {}) => {
    try {
        const resp = await axios({
            url: _url,
            data: JSON.stringify(_bodyData),
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'x-api-key': localStorage[TOKEN_KEY]
            }
        });
        return resp.data;
    } catch (err) {
        console.error('Error making PATCH request:', err);
        throw err;
    }
}

export const apiDelete = async (_url, _bodyData = {}) => {
    try {
        const resp = await axios({
            url: _url,
            data: JSON.stringify(_bodyData),
            method:'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'x-api-key':localStorage[TOKEN_KEY]
            }
        });
        return resp;
    } catch (err) {
        throw err;
    }
}