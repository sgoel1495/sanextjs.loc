import React from "react";
import MimotoPage from "../../components/mimoto-page/MimotoPage";
import fetchMimotoData from "../../components/mimoto-page/fetchMimotoData";


function MimotoSubetePage(props){
    return <MimotoPage  category={"subete"} hpid={"mimoto-subete"} data={props.data}/>
}
export async function getServerSideProps() {
    return {
        props: {
            data:await fetchMimotoData("subete")
        }
    }
}

export default MimotoSubetePage
