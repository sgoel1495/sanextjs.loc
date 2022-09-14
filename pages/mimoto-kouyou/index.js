import React from "react";
import MimotoPage from "../../components/mimoto-page/MimotoPage";
import fetchMimotoData from "../../components/mimoto-page/fetchMimotoData";


function MimotoKouyouPage(props){
    return <MimotoPage  category={"kouyou"} hpid={"mimoto-kouyou"} data={props.data}/>
}
export async function getStaticProps() {
    return {
        props: {
            data:await fetchMimotoData("kouyou")
        },
        revalidate: 3600,
    }
}

export default MimotoKouyouPage
