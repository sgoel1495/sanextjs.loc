import {useEffect, useState} from "react";

function useApiCall(url,body,callType="POST"){

    url = process.env.API_SERVER + url;
    const [result,setResult] = useState(null);
    useEffect(()=>{
        fetch(url,{
            method:callType,
            headers: {
                'Accept': 'application/json; charset=UTF-8',
                'Content-Type': 'application/json; charset=UTF-8'
            },
            body: JSON.stringify(body)
        })
            .then(response=>{
                return response.json();
            })
            .then(data=> {
                setResult(data);
            });
    },[])

    return result;

}

export default useApiCall;