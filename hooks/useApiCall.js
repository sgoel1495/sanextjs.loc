/**
 * @params word is the api dictionary word, apiToken is required to make calls, queryObject has special params as may be required
 */
import {useEffect, useState} from "react";
import {apiDictionary} from "../helpers/apiDictionary";

function useApiCall(word,apiToken=null, queryObject={}){
    const [result,setResult] = useState(null);
    let key = null;
    if(apiToken!=null) {
        if (queryObject)
            key = word + apiToken + JSON.stringify(queryObject);
        else
            key = word + apiToken;
    }

    useEffect(()=>{
        if(apiToken!=null) {
            const callObject = apiDictionary(word,apiToken,queryObject);
            if(callObject!=null) {
                const gotLocalData = localStorage.getItem(key);
                if(gotLocalData) {
                    setResult(JSON.parse(gotLocalData));
                } else {
                    fetch(callObject.url, callObject.fetcher)
                        .then(response => {
                            return response.json();
                        })
                        .then(data => {
                            localStorage.setItem(key, JSON.stringify(data));
                            setResult(data);
                        });
                }
            }
        }
    },[])

    if (apiToken === null)
        return null;
    else
        return result;

}

export default useApiCall;