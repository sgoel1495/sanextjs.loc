/**
 * @todo OPTIONAL At the API server, you can restrict the token call only from the webserver ip for security
 */
import '../styles/globals.scss';
import '../styles/variables.css';
import '../styles/zoomInSwiper.scss';
import AppWideContext from "../store/AppWideContext";
import React, {useEffect, useState, useCallback} from 'react';
import {apiDictionary} from "../helpers/apiDictionary";
import App from "next/app";
import {isMobile} from "react-device-detect";

function MyApp({Component, pageProps}) {
    const dataStoreDefault = require('../store/defaultDataStore.json');
    dataStoreDefault.apiToken = pageProps.apiToken;
    const [dataStore, setDataStore] = useState(dataStoreDefault);
    const [refresh, setRefresh] = useState(true);
    
    const updateDataStore = useCallback((key, value) => {
        dataStore[key] = value;
        setDataStore({...dataStore});
        setRefresh(!refresh);
    },[dataStore, refresh])

    useEffect(()=>{
        if(isMobile!=dataStoreDefault.mobile)
            updateDataStore("mobile",isMobile);
    },[dataStoreDefault.mobile, updateDataStore]);

    return (
        <AppWideContext.Provider value={{
            dataStore: dataStore, updateDataStore: updateDataStore
        }}>
            <Component {...pageProps} />
        </AppWideContext.Provider>
    )
}

MyApp.getInitialProps = async (appContext) => {
    const returnObject = {apiToken: null};
    const callObject = apiDictionary("getToken");
    const response = await fetch(callObject.url, callObject.fetcher);
    const data = await response.json();
    if (data
        && data.hasOwnProperty("status")
        && data.status == 200
        && data.hasOwnProperty("response")
        && data.response.hasOwnProperty("token")
    )
        returnObject.apiToken = data.response.token;
    const appProps = await App.getInitialProps(appContext);
    return {pageProps: {...appProps.pageProps, ...returnObject}};
}

export default MyApp;
