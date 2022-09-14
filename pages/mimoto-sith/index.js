import React from "react";
import MimotoPage from "../../components/mimoto-page/MimotoPage";
import fetchMimotoData from "../../components/mimoto-page/fetchMimotoData";


function MimotoSithPage(props){
    return <MimotoPage  category={"sith"} hpid={"mimoto-sith"} data={props.data}/>
}
export async function getStaticProps() {
    return {
        props: {
            data:await fetchMimotoData("sith")
        },
        revalidate: 3600,
    }
}

export default MimotoSithPage
