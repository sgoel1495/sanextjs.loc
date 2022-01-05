import '../styles/globals.css';
import AppWideContext from "../store/AppWideContext";
import { useEffect, useState } from 'react';
import { isMobile } from 'react-device-detect';

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


  return (
    <AppWideContext.Provider value={{
      dataStore: dataStore, updateDataStore: updateDataStore
    }}>
      <Component {...pageProps} />
    </AppWideContext.Provider>
  )
}

export default MyApp

