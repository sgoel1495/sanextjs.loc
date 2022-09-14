import React from "react";
import MimotoPage from "../../components/mimoto-page/MimotoPage";
import fetchMimotoData from "../../components/mimoto-page/fetchMimotoData";


function MimotoRadiancePage(props){
    return <MimotoPage  category={"radiance"} hpid={"mimoto-radiance"} data={props.data}/>
}
export async function getStaticProps() {
    return {
        props: {
            data:await fetchMimotoData("radiance")
        },
        revalidate: 3600,
    }
}

export default MimotoRadiancePage
