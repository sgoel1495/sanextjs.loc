import Image from "next/image";
import {apiCall} from "../../helpers/apiCall";
import AppWideContext from "../../store/AppWideContext";
import {Fragment, useContext, useEffect, useState} from "react";
import Link from "next/link";

function MimotoSlider({data}) {
    const WEBASSETS = process.env.NEXT_PUBLIC_WEBASSETS;
    const {dataStore} = useContext(AppWideContext);
    const [collectionArray, setCollectionArray] = useState([])
    console.log("DATA MIMOTO SLIDER", data)

    useEffect(() => {
        const fetchMimotoCollection = async () => {
            const resp = await apiCall("getMimotoCollection", dataStore.apiToken)
            if (resp.hasOwnProperty("response") && resp.response.hasOwnProperty("mimoto"))
                setCollectionArray([...resp.response.mimoto])
            console.log(resp)
        }
        if (dataStore && dataStore.apiToken)
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
                        </a>
                    </Link>
                </Fragment>
        })

        return returnValue
    }

    return (data)
        ? <div>
            <div>
                <Link href={data.mimoto_collection.url}>
                    <a>
                    <span className={"block relative w-14 aspect-square"}>
                        <Image src={WEBASSETS + data.mimoto_collection.mob_img_path} layout={`fill`} objectFit={`cover`}
                               alt={data.mimoto_collection.collection_id}/>
                        <span>
                            <span>{data.mimoto_collection.display_name}</span>
                            <span>{data.mimoto_collection.tagline}</span>
                            <span>{data.mimoto_collection.description}</span>
                        </span>
                    </span>
                    </a>
                </Link>
            </div>
            <div>{displayCollection()}</div>
        </div>
        : null

}

export default MimotoSlider