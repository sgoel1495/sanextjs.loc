import React from "react";
import MimotoPage from "../../components/mimoto-page/MimotoPage";
import fetchMimotoData from "../../components/mimoto-page/fetchMimotoData";


function MimotoSakuraPage(props){
    return <MimotoPage  category={"sakura"} hpid={"mimoto-sakura"} data={props.data}/>
}
export async function getStaticProps() {
    return {
        props: {
            data:await fetchMimotoData("sakura")
        }
    }
}

export default MimotoSakuraPage
