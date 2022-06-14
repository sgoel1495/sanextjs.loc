import React from "react";
import MimotoPage from "../../components/mimoto-page/MimotoPage";
import fetchMimotoData from "../../components/mimoto-page/fetchMimotoData";


function MimotoNatsuPage(props){
    return <MimotoPage  category={"natsu"} hpid={"mimoto-natsu"} data={props.data}/>
}
export async function getStaticProps() {
    return {
        props: {
            data:await fetchMimotoData("natsu")
        }
    }
}

export default MimotoNatsuPage
