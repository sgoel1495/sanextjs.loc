import React, {useContext, useEffect, useState} from 'react';
import AppWideContext from "../../../../store/AppWideContext";
import ProductCard from "../../../shop-page/ProductCard";
import useApiCall from "../../../../hooks/useApiCall";
import Link from "next/link";
import {apiDictionary} from "../../../../helpers/apiDictionary";

const ExploreSections = (props) => {
    const {dataStore} = useContext(AppWideContext);
    const [data, setData] = useState([])

    const fetchData = () => {

        const callObject = apiDictionary(props.api, dataStore.apiToken, props.query);

        fetch(callObject.url, callObject.fetcher)
            .then(response => {
                return response.json();
            })
            .then(json => {
                if (json && json.status === 200)
                    setData(json.response.data);
            })
    }

    useEffect(() => {
        fetchData()
    }, [props.id])
    console.log(props.title, data)
    return (
        <div>
            <span className={"block"}>{props.title}</span>
            <div className={"flex justify-center"}>
                {
                    data.map((product, i) => {
                        return <div className={"w-[20vw]"}>
                            <ProductCard prod={product} key={i}/>
                        </div>
                    })
                }
            </div>
            {
                props.more && <Link href={""}>
                    <span>EXPLORE MORE</span>
                </Link>
            }
        </div>
    );
};

export default ExploreSections;