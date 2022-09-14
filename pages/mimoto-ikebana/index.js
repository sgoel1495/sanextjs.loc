import React from "react";
import MimotoPage from "../../components/mimoto-page/MimotoPage";
import fetchMimotoData from "../../components/mimoto-page/fetchMimotoData";


function MimotoIkebanaPage(props){
    return <MimotoPage  category={"ikebana"} hpid={"mimoto-ikebana"} data={props.data}/>
}
export async function getStaticProps() {
    return {
        props: {
            data:await fetchMimotoData("ikebana")
        },
        revalidate: 3600,
    }
}

export default MimotoIkebanaPage
