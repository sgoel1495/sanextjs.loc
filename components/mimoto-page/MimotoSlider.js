import Image from "next/image";
import {apiCall} from "../../helpers/apiCall";
import AppWideContext from "../../store/AppWideContext";
import {Fragment, useContext, useEffect, useState} from "react";
import Link from "next/link";

function MimotoSlider() {
    const WEBASSETS = process.env.NEXT_PUBLIC_WEBASSETS;
    const {dataStore} = useContext(AppWideContext);
    const [collectionArray, setCollectionArray] = useState([])

    useEffect(() => {
        const fetchMimotoCollection = async () => {
            const resp = await apiCall("getMimotoCollection", dataStore.apiToken)
            if (resp.hasOwnProperty("response") && resp.response.hasOwnProperty("mimoto"))
                setCollectionArray([...resp.response.mimoto])
            console.log(resp)
        }
        if(dataStore && dataStore.apiToken)
            fetchMimotoCollection().then(() => {
            }).catch(e => e.message)
    }, [dataStore, dataStore.apiToken])

    const displayCollection = () => {
        let returnValue = null
        console.log(collectionArray)
        collectionArray.forEach(collection => {

            if (collection.visible)
                returnValue = <Fragment>
                    {returnValue}
                    <Link href={collection.url}>
                        <a>
                            <span>{collection.name}</span>
                            <span>{collection.tagline}</span>
                            <span>Nostalgia is a way of transporting ourselves to a time when we felt loved and safe. The collection has a range of shirts & tops with prints in familiar motifs that reminds us of our childhood and the feeling of comfort.</span>
                        </a>
                    </Link>
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