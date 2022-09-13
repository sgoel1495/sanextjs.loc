import React from "react";
import MimotoPage from "../../components/mimoto-page/MimotoPage";
import fetchMimotoData from "../../components/mimoto-page/fetchMimotoData";


function MimotoDoresshiPage(props){
    return <MimotoPage  category={"doresshi"} hpid={"mimoto-doresshi"} data={props.data}/>
}

export async function getServerSideProps() {
    return {
        props: {
            data:await fetchMimotoData("doresshi")
        }
    }
}

export default MimotoDoresshiPage
