import React from "react";
import MimotoPage from "../../components/mimoto-page/MimotoPage";
import {apiCall} from "../../helpers/apiCall";


function MimotoChanderiPage(props){
    return <MimotoPage  category={"chanderi"} hpid={"mimoto-chanderi"} data={props.data}/>
}

export async function getStaticProps() {
    const fetchData = async () => {
        const callObject = await apiCall("getMimotoProducts", process.env.API_TOKEN, { name: "chanderi" })
        return (callObject.hasOwnProperty("response")
            && callObject.hasOwnProperty("msg")
            && callObject.msg === "Products Found"
        ) ? callObject.response : {}
    }

    const data = await fetchData()
    return {
        props: {
            data:data
        }
    }
}

export default MimotoChanderiPage
