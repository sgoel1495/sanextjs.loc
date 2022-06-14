import React from "react";
import MimotoPage from "../../components/mimoto-page/MimotoPage";
import fetchMimotoData from "../../components/mimoto-page/fetchMimotoData";


function MimotoChanderiPage(props){
    return <MimotoPage  category={"chanderi"} hpid={"mimoto-chanderi"} data={props.data}/>
}

export async function getStaticProps() {
    return {
        props: {
            data:await fetchMimotoData("chanderi")
        }
    }
}

export default MimotoChanderiPage
