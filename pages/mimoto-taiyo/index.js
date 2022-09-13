import React from "react";
import MimotoPage from "../../components/mimoto-page/MimotoPage";
import fetchMimotoData from "../../components/mimoto-page/fetchMimotoData";


function MimotoTaiyoPage(props){
    return <MimotoPage  category={"taiyo"} hpid={"mimoto-taiyo"} data={props.data}/>
}
export async function getServerSideProps() {
    return {
        props: {
            data:await fetchMimotoData("taiyo")
        }
    }
}

export default MimotoTaiyoPage
