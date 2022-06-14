import React from "react";
import MimotoPage from "../../components/mimoto-page/MimotoPage";
import fetchMimotoData from "../../components/mimoto-page/fetchMimotoData";


function MimotoKoshiPage(props){
    return <MimotoPage  category={"koshi"} hpid={"mimoto-koshi"} data={props.data}/>
}
export async function getStaticProps() {
    return {
        props: {
            data:await fetchMimotoData("koshi")
        }
    }
}

export default MimotoKoshiPage
