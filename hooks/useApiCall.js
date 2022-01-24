/**
 * @params word is the api dictionary word, apiToken is required to make calls, queryObject has special params as may be required
 */
import {useContext, useEffect, useState} from "react";
import {apiDictionary} from "../helpers/apiDictionary";
import AppWideContext from "../store/AppWideContext";

function useApiCall(word,apiToken=null, queryObject={}){
    const {dataStore,updateDataStore} = useContext(AppWideContext);
    const [result,setResult] = useState(null);
    let key = null;
    if(queryObject)
        key = word + apiToken + JSON.stringify(queryObject);
    else
        key = word + apiToken;

    useEffect(()=>{
        if(apiToken!=null) {
            const callObject = apiDictionary(word,apiToken,queryObject);
            if(callObject!=null) {
                if(dataStore.hasOwnProperty(key)) {
                    setResult(JSON.parse(dataStore[key]));
                } else {
                    fetch(callObject.url, callObject.fetcher)
                        .then(response => {
                            return response.json();
                        })
                        .then(data => {
                            updateDataStore(key, JSON.stringify(data));
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