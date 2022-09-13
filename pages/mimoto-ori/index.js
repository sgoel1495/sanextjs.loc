import React from "react";
import MimotoPage from "../../components/mimoto-page/MimotoPage";
import fetchMimotoData from "../../components/mimoto-page/fetchMimotoData";


function MimotoOriPage(props){
    return <MimotoPage  category={"ori"} hpid={"mimoto-ori"} data={props.data}/>
}
export async function getServerSideProps() {
    return {
        props: {
            data:await fetchMimotoData("ori")
        }
    }
}

export default MimotoOriPage
