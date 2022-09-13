import React from "react";
import MimotoPage from "../../components/mimoto-page/MimotoPage";
import fetchMimotoData from "../../components/mimoto-page/fetchMimotoData";


function MimotoRidaPage(props) {
    return <MimotoPage category={"reza"} hpid={"mimoto-reza"} data={props.data}/>
}

export async function getServerSideProps() {
    return {
        props: {
            data: await fetchMimotoData("reza")
        }
    }
}

export default MimotoRidaPage
