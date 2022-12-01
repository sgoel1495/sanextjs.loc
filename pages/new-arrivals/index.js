import React from 'react';
import NewArrivalsAllPage from './all/index'
import {apiCall} from "../../helpers/apiCall";
export async function getStaticProps() {
    const fetchData = async () => {
        let gotData = false;
        const callObject = await apiCall("getProducts", process.env.API_TOKEN, {
            category: "new-arrivals",
            limit: 90,
            skip: 0
        })
        if (callObject.hasOwnProperty("response") && callObject.response.hasOwnProperty("data"))
            gotData = true;

        return (gotData) ? callObject : {}
    }

    const newData = await fetchData()
    return {
        props: {
            data: newData.response,
            carousal: newData.new_arr_carousal
        },
        revalidate: 3600,
    }
}
export default NewArrivalsAllPage;
