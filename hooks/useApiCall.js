/**
 * @params word is the api dictionary word, apiToken is required to make calls, queryObject has special params as may be required
 */
import {useEffect, useState} from "react";
import {apiDictionary} from "../helpers/apiDictionary";

function useApiCall(word,apiToken=null, queryObject={}){
    const [result,setResult] = useState(null);

    useEffect(()=>{
        if(apiToken!=null) {
            console.log("Sending data for call object>>",word,apiToken,queryObject);
            const callObject = apiDictionary(word,apiToken,queryObject);
            console.log("CALL OBJECT",callObject);
            if(callObject!=null) {
                console.log("ACTUALLY CALLING WITH <<<>>>>",callObject);
                fetch(callObject.url, callObject.fetcher)
                    .then(response => {
                        return response.json();
                    })
                    .then(data => {
                        setResult(data);
                    });
            }
        }
    },[])

    if (apiToken === null)
        return null;
    else
        return result;

}

export default useApiCall;