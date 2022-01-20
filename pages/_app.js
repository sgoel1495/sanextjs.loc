import '../styles/globals.css';
import AppWideContext from "../store/AppWideContext";
import { useEffect, useState } from 'react';
import { isMobile } from 'react-device-detect';
import {apiDictionary} from "../helpers/apiDictionary";

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

  return (
    <AppWideContext.Provider value={{
      dataStore: dataStore, updateDataStore: updateDataStore
    }}>
      <Component {...pageProps} />
    </AppWideContext.Provider>
  )
}

MyApp.getInitialProps = async () => {
  const returnObject = {apiToken:null};
  const callObject = apiDictionary("getToken");
  const response = await fetch(callObject.url,{
    method:callObject.method,
    headers: {
      'Accept': 'application/json; charset=UTF-8',
      'Content-Type': 'application/json; charset=UTF-8'
    }
  });
  const data = await response.json();
  if(data
      && data.hasOwnProperty("status")
      && data.status == 200
      && data.hasOwnProperty("response")
      && data.response.hasOwnProperty("token")
  )
    returnObject.apiToken = data.response.token

  return { pageProps: returnObject };
}

export default MyApp;

