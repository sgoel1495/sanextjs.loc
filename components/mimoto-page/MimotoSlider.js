import Image from "next/image";
import {apiCall} from "../../helpers/apiCall";
import AppWideContext from "../../store/AppWideContext";
import {Fragment, useContext, useEffect, useState} from "react";
import Link from "next/link";

function MimotoSlider(){
    const WEBASSETS = process.env.NEXT_PUBLIC_WEBASSETS;
    const {dataStore} = useContext(AppWideContext);
    const [collectionArray,setCollectionArray] = useState([])

    useEffect(()=>{
        const fetchMimotoCollection = async ()=>{
            const resp = await apiCall("getMimotoCollection", dataStore.apiToken)
            if(resp.hasOwnProperty("response") && resp.response.hasOwnProperty("mimoto"))
                setCollectionArray([...resp.response.mimoto])
            console.log(resp)
        }
        fetchMimotoCollection().then(()=>{}).catch(e=>e.message)
    },[])

    const displayCollection = ()=>{
        let returnValue = null
        console.log(collectionArray)
        collectionArray.forEach(collection => {

            if(collection.visible)
            returnValue = <Fragment>
                {returnValue}
                <Link href={collection.url}><a>{collection.name} {collection.tagline}</a></Link>
            </Fragment>
        })

        return returnValue
    }

    return <div>
            <span className={"block relative w-14 aspect-square"}>
            <Image src={WEBASSETS + "/assets/images/nostalgia_v1.jpg"} layout={`fill`} objectFit={`cover`}
                   alt={"loader"}/>
            {displayCollection()}
        </span>

    </div>
}

export default MimotoSlider