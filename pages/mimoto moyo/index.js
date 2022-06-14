import React from "react";
import MimotoPage from "../../components/mimoto-page/MimotoPage";
import fetchMimotoData from "../../components/mimoto-page/fetchMimotoData";


function MimotoMoyoPage(props){
    return <MimotoPage  category={"moyo"} hpid={"mimoto-moyo"} data={props.data}/>
}
export async function getStaticProps() {
    return {
        props: {
            data:await fetchMimotoData("moyo")
        }
    }
}

export default MimotoMoyoPage
