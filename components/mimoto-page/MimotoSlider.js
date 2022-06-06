import Image from "next/image";
import { apiCall } from "../../helpers/apiCall";
import AppWideContext from "../../store/AppWideContext";
import { Fragment, useContext, useEffect, useState } from "react";
import Link from "next/link";

function MimotoSlider({ data, ...props }) {
    const WEBASSETS = process.env.NEXT_PUBLIC_WEBASSETS;
    const { dataStore } = useContext(AppWideContext);
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
                        <a className="block">
                            <p className="text-h5">{collection.name}</p>
                            <p className="text-[10px] uppercase">{collection.tagline}</p>
                        </a>
                    </Link>
                </Fragment>
        })

        return returnValue
    }

    return (data)
        ? <div className={props.className}>
            <div>
                <Link href={data.mimoto_collection.url}>
                    <a>
                        <div className={"relative w-full aspect-square"}>
                            <Image src={WEBASSETS + data.mimoto_collection.mob_img_path} layout={`fill`} objectFit={`cover`} alt={data.mimoto_collection.collection_id} />
                            <span>
                                <span>{data.mimoto_collection.display_name}</span>
                                <span>{data.mimoto_collection.tagline}</span>
                                <span>{data.mimoto_collection.description}</span>
                            </span>
                        </div>
                    </a>
                </Link>
            </div>
            <div className="grid grid-cols-3 gap-2">{displayCollection()}</div>
        </div>
        : null

}

export default MimotoSlider