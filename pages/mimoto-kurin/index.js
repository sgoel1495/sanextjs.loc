import React from "react";
import MimotoPage from "../../components/mimoto-page/MimotoPage";
import fetchMimotoData from "../../components/mimoto-page/fetchMimotoData";


function MimotoKurinPage(props){
    return <MimotoPage  category={"kurin"} hpid={"mimoto-kurin"} data={props.data}/>
}
export async function getServerSideProps() {
    return {
        props: {
            data:await fetchMimotoData("kurin")
        }
    }
}

export default MimotoKurinPage
