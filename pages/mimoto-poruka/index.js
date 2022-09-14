import React from "react";
import MimotoPage from "../../components/mimoto-page/MimotoPage";
import fetchMimotoData from "../../components/mimoto-page/fetchMimotoData";


function MimotoPorukaPage(props){
    return <MimotoPage  category={"poruka"} hpid={"mimoto-poruka"} data={props.data}/>
}
export async function getStaticProps() {
    return {
        props: {
            data:await fetchMimotoData("poruka")
        },
        revalidate: 3600,
    }
}

export default MimotoPorukaPage
