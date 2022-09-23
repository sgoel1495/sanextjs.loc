import React from "react";
import MimotoPage from "../../components/mimoto-page/MimotoPage";
import fetchMimotoData from "../../components/mimoto-page/fetchMimotoData";


function MimotoKonjaPage(props){
    return <MimotoPage  category={"konjo"} hpid={"mimoto-konjo"} data={props.data}/>
}
export async function getStaticProps() {
    return {
        props: {
            data:await fetchMimotoData("konjo")
        },
        revalidate: 3600,
    }
}

export default MimotoKonjaPage
