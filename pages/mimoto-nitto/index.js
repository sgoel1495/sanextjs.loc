import React from "react";
import MimotoPage from "../../components/mimoto-page/MimotoPage";
import fetchMimotoData from "../../components/mimoto-page/fetchMimotoData";


function MimotoNittoPage(props){
    return <MimotoPage  category={"nitto"} hpid={"mimoto-nitto"} data={props.data}/>
}
export async function getStaticProps() {
    return {
        props: {
            data:await fetchMimotoData("nitto")
        }
    }
}

export default MimotoNittoPage
