import React from "react";
import MimotoPage from "../../components/mimoto-page/MimotoPage";
import fetchMimotoData from "../../components/mimoto-page/fetchMimotoData";


function MimotoRujuPage(props){
    return <MimotoPage  category={"ruju"} hpid={"mimoto-ruju"} data={props.data}/>
}
export async function getServerSideProps() {
    return {
        props: {
            data:await fetchMimotoData("ruju")
        }
    }
}

export default MimotoRujuPage
