import React from "react";
import MimotoPage from "../../components/mimoto-page/MimotoPage";
import {apiCall} from "../../helpers/apiCall";
import fetchMimotoData from "../../components/mimoto-page/fetchMimotoData";


function MimotoDoresshiPage(props){
    return <MimotoPage  category={"doresshi"} hpid={"mimoto-doresshi"} data={props.data}/>
}

export async function getStaticProps() {
    return {
        props: {
            data:await fetchMimotoData("doresshi")
        }
    }
}

export default MimotoDoresshiPage
