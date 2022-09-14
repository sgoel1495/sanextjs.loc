import React from "react";
import MimotoPage from "../../components/mimoto-page/MimotoPage";
import fetchMimotoData from "../../components/mimoto-page/fetchMimotoData";


function MimotoMriduPage(props){
    return <MimotoPage  category={"mridu"} hpid={"mimoto-mridu"} data={props.data}/>
}
export async function getStaticProps() {
    return {
        props: {
            data:await fetchMimotoData("mridu")
        },
        revalidate: 3600,
    }
}

export default MimotoMriduPage
