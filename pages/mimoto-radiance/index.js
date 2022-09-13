import React from "react";
import MimotoPage from "../../components/mimoto-page/MimotoPage";
import fetchMimotoData from "../../components/mimoto-page/fetchMimotoData";


function MimotoRadiancePage(props){
    return <MimotoPage  category={"radiance"} hpid={"mimoto-radiance"} data={props.data}/>
}
export async function getServerSideProps() {
    return {
        props: {
            data:await fetchMimotoData("radiance")
        }
    }
}

export default MimotoRadiancePage
