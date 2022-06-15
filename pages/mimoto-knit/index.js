import React from "react";
import MimotoPage from "../../components/mimoto-page/MimotoPage";
import fetchMimotoData from "../../components/mimoto-page/fetchMimotoData";


function MimotoKnitPage(props){
    return <MimotoPage  category={"knit"} hpid={"mimoto-knit"} data={props.data}/>
}
export async function getStaticProps() {
    return {
        props: {
            data:await fetchMimotoData("knit")
        }
    }
}

export default MimotoKnitPage
