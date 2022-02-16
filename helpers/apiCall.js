import {apiDictionary} from "./apiDictionary";

export async function apiCall(word, apiToken=null, queryObject={}){
    if(apiToken!=null) {
        const callObject = apiDictionary(word,apiToken,queryObject);
        if(callObject!=null) {
            const response = await fetch(callObject.url, callObject.fetcher);
            return await response.json();
        }
    } else
        return null;
}