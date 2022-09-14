import React from "react";
import MimotoPage from "../../components/mimoto-page/MimotoPage";
import fetchMimotoData from "../../components/mimoto-page/fetchMimotoData";


function MimotoNoorPage(props){
    return <MimotoPage  category={"noor"} hpid={"mimoto-noor"} data={props.data}/>
}
export async function getStaticProps() {
    return {
        props: {
            data:await fetchMimotoData("noor")
        },
        revalidate: 3600,
    }
}

export default MimotoNoorPage
