import {apiCall} from "./apiCall";

export async function fetchHomePageSwiper() {
    const callObject = await apiCall("getHomePageCarousal", process.env.API_TOKEN)

    return (callObject.hasOwnProperty("response")
        && callObject.hasOwnProperty("msg")
    ) ? callObject.response : {}

}

export async function fetchCategoryCircle(){
    const callObject = await apiCall("getCategoryCircle", process.env.API_TOKEN)

    return (callObject.hasOwnProperty("response")
        && callObject.hasOwnProperty("msg")
    ) ? callObject.response : []
}