import React from "react";
import MimotoPage from "../../components/mimoto-page/MimotoPage";
import fetchMimotoData from "../../components/mimoto-page/fetchMimotoData";


function MimotoSubetePage(props){
    return <MimotoPage  category={"subete"} hpid={"mimoto-subete"} data={props.data}/>
}
export async function getStaticProps() {
    return {
        props: {
            data:await fetchMimotoData("subete")
        },
        revalidate: 3600,
    }
}

export default MimotoSubetePage
