import React from "react";
import MimotoPage from "../../components/mimoto-page/MimotoPage";
import fetchMimotoData from "../../components/mimoto-page/fetchMimotoData";


function MimotoSaltPage(props){
    return <MimotoPage  category={"salt"} hpid={"mimoto-salt"} data={props.data}/>
}
export async function getStaticProps() {
    return {
        props: {
            data:await fetchMimotoData("salt")
        }
    }
}

export default MimotoSaltPage
