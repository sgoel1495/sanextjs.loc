import React from "react";
import MimotoPage from "../../components/mimoto-page/MimotoPage";
import fetchMimotoData from "../../components/mimoto-page/fetchMimotoData";


function MimotoShiroPage(props){
    return <MimotoPage  category={"shiro"} hpid={"mimoto-shiro"} data={props.data}/>
}
export async function getServerSideProps() {
    return {
        props: {
            data:await fetchMimotoData("shiro")
        }
    }
}

export default MimotoShiroPage
