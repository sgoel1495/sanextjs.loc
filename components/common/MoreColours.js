import {Fragment, useContext, useEffect, useState} from "react";
import {apiCall} from "../../helpers/apiCall";
import AppWideContext from "../../store/AppWideContext";
import Image from "next/image";
import Link from "next/link";

function MoreColours ({hpid}) {
    const WEBASSETS = process.env.NEXT_PUBLIC_WEBASSETS;
    const { dataStore } = useContext(AppWideContext)
    const [data,setData] = useState([])

    useEffect(()=>{
        /*
        {
"product": {
"token": "b16ee1b2bcb512f67c3bca5fac24a924fcc2241bcbfe19ddfdde33ecd24114a0",
"category": "same-color",
"skip": 0,
"limit": 10,
"category-name": "FAB_324_BROWN_MUSTARD_CHECKS_MOSSLYCRA",
"curr-product-id": "Dresses-Waffle-Dropshoulderdress"
}
{
  "product_id" : "Tops-Sale-Raisin-Green-AsymmetricOverlapTop",
  "token" : "b16ee1b2bcb512f67c3bca5fac24a924fcc2241bcbfe19ddfdde33ecd24114a0"
}
         */

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
                            console.log("============ getProducts DETAIL",cData)
                            if(cData.response && cData.response.data)
                                setData(cData.response.data)
                        })
                        .catch(e=>console.log(e.message))
                }
            })
            .catch(e=>console.log(e.message))

    },[hpid])

    const mobileView = null
    const browserView = ()=>{
        let returnValue = null
        data.forEach(p=>{
            returnValue = <Fragment>
                {returnValue}
                <Link href={"/"+p.asset_id}>
                    <a>
                        <Image className={"w-20 h-20 rounded-full"} src={WEBASSETS+'/assets/'+p.asset_id+'/Macro.mob.jpg'} alt={p.asset_id} width="20" height="20" />
                    </a>
                </Link>
            </Fragment>
        })

        return <div>
            <span className={"block"}>More Colors</span>
            <div className={"flex"}>
                {returnValue}
            </div>
        </div>

    }
    return (dataStore.mobile)? mobileView:browserView()

}

export default MoreColours