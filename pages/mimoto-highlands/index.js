import React from "react";
import MimotoPage from "../../components/mimoto-page/MimotoPage";
import fetchMimotoData from "../../components/mimoto-page/fetchMimotoData";


function MimotoHighlandsPage(props){
    return <MimotoPage  category={"highlands"} hpid={"mimoto-highlands"} data={props.data}/>
}
export async function getStaticProps() {
    return {
        props: {
            data:await fetchMimotoData("highlands")
        }
    }
}

export default MimotoHighlandsPage
