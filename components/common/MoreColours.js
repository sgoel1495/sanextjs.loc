import React, {Fragment, useContext, useEffect, useState} from "react";
import {apiCall} from "../../helpers/apiCall";
import AppWideContext from "../../store/AppWideContext";
import Image from "next/image";
import Link from "next/link";

function MoreColours ({hpid}) {
    const WEBASSETS = process.env.NEXT_PUBLIC_WEBASSETS;
    const { dataStore } = useContext(AppWideContext)
    const [data,setData] = useState([])

    useEffect(()=>{
        apiCall("getProduct", dataStore.apiToken,{product_id:hpid})
            .then(pData=>{
                if (pData.response && pData.response.pattern_no){
                    const queryObject = {
                        "category": "same-pattern",
                        "skip": 0,
                        "limit": 10,
                        "category-name": pData.response.pattern_no,
                        "curr-product-id": hpid
                    }
                    apiCall("getProducts",dataStore.apiToken,queryObject)
                        .then(cData=>{
                            if(cData.response && cData.response.data)
                                setData(cData.response.data)
                        })
                        .catch(e=>console.log(e.message))
                }
            })
            .catch(e=>console.log(e.message))

    },[hpid,dataStore.apiToken])

    const mobileView = null
    const browserView = ()=>{
        let returnValue = null
        data.forEach(p=>{
            returnValue = <Fragment>
                {returnValue}
                <Link href={"/"+p.asset_id}>
                    <a className="h-11 w-11 relative border border-[#afafaf] rounded-full m-2">
                        <Image className={"rounded-full"} src={WEBASSETS+'/assets/'+p.asset_id+'/Macro.mob.jpg'} alt={p.asset_id} layout={`fill`} objectFit={`cover`}/>
                    </a>
                </Link>
            </Fragment>
        })

        return <div>
            <span className={"block text-[13px] text-[#555555] text-center font-bold"}>More Colors</span>
            <div className={"flex flex-wrap justify-center"}>
                {returnValue}
            </div>
        </div>

    }
    return (dataStore.mobile)? mobileView:browserView()

}

export default MoreColours