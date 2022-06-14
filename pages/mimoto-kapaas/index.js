import React from "react";
import MimotoPage from "../../components/mimoto-page/MimotoPage";
import fetchMimotoData from "../../components/mimoto-page/fetchMimotoData";


function MimotoKapaasPage(props){
    return <MimotoPage  category={"kapaas"} hpid={"mimoto-kapaas"} data={props.data}/>
}
export async function getStaticProps() {
    return {
        props: {
            data:await fetchMimotoData("kapaas")
        }
    }
}

export default MimotoKapaasPage
