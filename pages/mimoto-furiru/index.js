import React from "react";
import MimotoPage from "../../components/mimoto-page/MimotoPage";
import fetchMimotoData from "../../components/mimoto-page/fetchMimotoData";


function MimotoFuriruPage(props){
    return <MimotoPage  category={"furiru"} hpid={"mimoto-furiru"} data={props.data}/>
}
export async function getStaticProps() {
    return {
        props: {
            data:await fetchMimotoData("furiru")
        },
        revalidate: 3600,
    }
}

export default MimotoFuriruPage
