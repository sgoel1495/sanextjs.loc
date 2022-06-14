import React from "react";
import MimotoPage from "../../components/mimoto-page/MimotoPage";
import fetchMimotoData from "../../components/mimoto-page/fetchMimotoData";


function MimotoKaansyaPage(props){
    return <MimotoPage  category={"kaansya"} hpid={"mimoto-kaansya"} data={props.data}/>
}
export async function getStaticProps() {
    return {
        props: {
            data:await fetchMimotoData("kaansya")
        }
    }
}

export default MimotoKaansyaPage
