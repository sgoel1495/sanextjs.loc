import React from "react";
import MimotoPage from "../../components/mimoto-page/MimotoPage";
import fetchMimotoData from "../../components/mimoto-page/fetchMimotoData";


function MimotoSvarnamPage(props){
    return <MimotoPage  category={"svarnam"} hpid={"mimoto-svarnam"} data={props.data}/>
}
export async function getStaticProps() {
    return {
        props: {
            data:await fetchMimotoData("svarnam")
        }
    }
}

export default MimotoSvarnamPage
