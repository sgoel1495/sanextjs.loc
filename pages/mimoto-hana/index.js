import React from "react";
import MimotoPage from "../../components/mimoto-page/MimotoPage";
import fetchMimotoData from "../../components/mimoto-page/fetchMimotoData";


function MimotoHanaPage(props){
    return <MimotoPage  category={"hana"} hpid={"mimoto-hana"} data={props.data}/>
}
export async function getStaticProps() {
    return {
        props: {
            data:await fetchMimotoData("hana")
        }
    }
}

export default MimotoHanaPage
