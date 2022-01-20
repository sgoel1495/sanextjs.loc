/**
 * @todo OPTIONAL At the API server, you can restrict the token call only from the webserver ip for security
 */
import '../styles/globals.css';
import AppWideContext from "../store/AppWideContext";
import { useEffect, useState } from 'react';
import { isMobile } from 'react-device-detect';
import {apiDictionary} from "../helpers/apiDictionary";
import App from "next/app";

function MyApp({ Component, pageProps }) {
  const dataStoreDefault = require('../store/defaultDataStore.json');
  const [dataStore, setDataStore] = useState(dataStoreDefault);
  const updateDataStore = (key, value) => {
    const newDataStore = { ...dataStore };
    newDataStore[key] = value;
    setDataStore(newDataStore);
  }

  useEffect(() => {
    updateDataStore("mobile", isMobile);
  }, [isMobile]);

  useEffect(()=>{
    updateDataStore("apiToken", pageProps.apiToken);
  },[pageProps.apiToken]);

  console.log("TOKEN",pageProps.apiToken);

  return (
    <AppWideContext.Provider value={{
      dataStore: dataStore, updateDataStore: updateDataStore
    }}>
      <Component {...pageProps} />
    </AppWideContext.Provider>
  )
}

MyApp.getInitialProps = async (appContext) => {
  const returnObject = {apiToken:null};
  const callObject = apiDictionary("getToken");
  const response = await fetch(callObject.url, callObject.fetcher);
  const data = await response.json();
  if(data
      && data.hasOwnProperty("status")
      && data.status == 200
      && data.hasOwnProperty("response")
      && data.response.hasOwnProperty("token")
  )
    returnObject.apiToken = data.response.token;
  const appProps = await App.getInitialProps(appContext);
  return { pageProps: {...appProps.pageProps,...returnObject} };
}

export default MyApp;

