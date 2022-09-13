import React from "react";
import MimotoPage from "../../components/mimoto-page/MimotoPage";
import fetchMimotoData from "../../components/mimoto-page/fetchMimotoData";


function MimotoKonjaPage(props){
    return <MimotoPage  category={"konja"} hpid={"mimoto-konja"} data={props.data}/>
}
export async function getServerSideProps() {
    return {
        props: {
            data:await fetchMimotoData("konja")
        }
    }
}

export default MimotoKonjaPage
