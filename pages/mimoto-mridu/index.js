import React from "react";
import MimotoPage from "../../components/mimoto-page/MimotoPage";
import fetchMimotoData from "../../components/mimoto-page/fetchMimotoData";


function MimotoMriduPage(props){
    return <MimotoPage  category={"mridu"} hpid={"mimoto-mridu"} data={props.data}/>
}
export async function getServerSideProps() {
    return {
        props: {
            data:await fetchMimotoData("mridu")
        }
    }
}

export default MimotoMriduPage
