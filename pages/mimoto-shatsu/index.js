import React from "react";
import MimotoPage from "../../components/mimoto-page/MimotoPage";
import fetchMimotoData from "../../components/mimoto-page/fetchMimotoData";


function MimotoShatsuPageprops(){
    return <MimotoPage  category={"shatsu"} hpid={"mimoto-shatsu"} data={props.data}/>
}
export async function getStaticProps() {
    return {
        props: {
            data:await fetchMimotoData("shatsu")
        }
    }
}

export default MimotoShatsuPage
