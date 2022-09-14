import React from "react";
import MimotoPage from "../../components/mimoto-page/MimotoPage";
import fetchMimotoData from "../../components/mimoto-page/fetchMimotoData";


function MimotoHuePage(props){
    return <MimotoPage  category={"hue"} hpid={"mimoto-hue"} data={props.data}/>
}
export async function getStaticProps() {
    return {
        props: {
            data:await fetchMimotoData("hue")
        },
        revalidate: 3600,
    }
}

export default MimotoHuePage
