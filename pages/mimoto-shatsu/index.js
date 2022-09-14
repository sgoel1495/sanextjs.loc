import React from "react";
import MimotoPage from "../../components/mimoto-page/MimotoPage";
import fetchMimotoData from "../../components/mimoto-page/fetchMimotoData";


function MimotoShatsuPage(props){
    return <MimotoPage  category={"shatsu"} hpid={"mimoto-shatsu"} data={props.data}/>
}
export async function getStaticProps() {
    return {
        props: {
            data:await fetchMimotoData("shatsu")
        },
        revalidate: 3600,
    }
}

export default MimotoShatsuPage
