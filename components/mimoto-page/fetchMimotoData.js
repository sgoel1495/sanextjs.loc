import {apiCall} from "../../helpers/apiCall";

export default async function fetchMimotoData(category){
    const callObject = await apiCall("getMimotoProducts", process.env.API_TOKEN, { name: category })
    return (callObject.hasOwnProperty("response")
        && callObject.hasOwnProperty("msg")
    ) ? callObject.response : {}

}