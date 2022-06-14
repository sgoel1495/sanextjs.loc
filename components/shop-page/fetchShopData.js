import {apiCall} from "../../helpers/apiCall";

export default async function fetchShopData(category){
    let gotData = false;
    const callObject = await apiCall("getProducts", process.env.API_TOKEN,
        {category: category,limit: 10000,skip: 0}
    )
    if (callObject.hasOwnProperty("response") && callObject.response.hasOwnProperty("data")) {
        if (callObject
            && callObject.response
            && callObject.response.data
        )
            gotData = true;
    }
    return (gotData) ? callObject.response : null
}