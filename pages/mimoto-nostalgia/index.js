import React from "react";
import MimotoPage from "../../components/mimoto-page/MimotoPage";
import fetchMimotoData from "../../components/mimoto-page/fetchMimotoData";


function MimotoNostalgiaPage(props){
    return <MimotoPage  category={"nostalgia"} hpid={"mimoto-nostalgia"} data={props.data}/>
}
export async function getServerSideProps() {
    return {
        props: {
            data:await fetchMimotoData("nostalgia")
        }
    }
}

export default MimotoNostalgiaPage
