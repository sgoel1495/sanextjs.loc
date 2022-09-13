import React from "react";
import MimotoPage from "../../components/mimoto-page/MimotoPage";
import fetchMimotoData from "../../components/mimoto-page/fetchMimotoData";


function MimotoJakadoPage(props){
    return <MimotoPage  category={"jakado"} hpid={"mimoto-jakado"} data={props.data}/>
}
export async function getServerSideProps() {
    return {
        props: {
            data:await fetchMimotoData("jakado")
        }
    }
}

export default MimotoJakadoPage
