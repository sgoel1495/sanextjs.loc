import React, { useContext, useEffect, useState, useCallback } from 'react';
import AppWideContext from "../../../../store/AppWideContext";
import ProductCard from "../../../shop-page/ProductCard";
import Link from "next/link";
import { apiDictionary } from "../../../../helpers/apiDictionary";
import BlockHeader from '../../../common/blockHeader';
import {connect} from "react-redux";

const ExploreSections = (props) => {
    const [data, setData] = useState([])

    const fetchData = useCallback(() => {
        const callObject = apiDictionary(props.api, props.appConfig.apiToken, props.query);
        fetch(callObject.url, callObject.fetcher)
            .then(response => {
                return response.json();
            })
            .then(json => {
                if (json && json.status === 200)
                    setData(json.response.data);
            })
    }, [props.appConfig.apiToken, props.api, props.query])

    useEffect(() => {
        fetchData()
    }, [fetchData, props.id])

    return (
        <div>
            <BlockHeader space={'py-6'} titleStyle="text-h4 font-500">{props.title}</BlockHeader>
            <div className={"flex gap-8 justify-center my-12"}>
                {data.map((product, i) => {
                    return (
                        <div className={"w-[20vw]"} key={i}>
                            <ProductCard prod={product} />
                        </div>
                    )
                })}
            </div>
            {props.more && <div className='flex justify-center mb-12'>
                <Link href={props.href}><a className='p-2 text-sm uppercase bg-black/70 text-white'>&gt;&nbsp;&nbsp;click here to load more&nbsp;&nbsp;&lt;</a></Link>
            </div>
            }
        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        appConfig: state.appConfig
    }
}

export default connect(mapStateToProps)(ExploreSections);