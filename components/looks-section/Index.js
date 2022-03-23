import React, {useContext} from 'react';
import AppWideContext from "../../store/AppWideContext";
import useApiCall from "../../hooks/useApiCall";

const Index = () => {
    const WEBASSETS = process.env.NEXT_PUBLIC_WEBASSETS;
    const {dataStore} = useContext(AppWideContext);
    const resp = useApiCall("exploreNewArrivals", dataStore.apiToken);
    return (
        <div>
            <span>Looks</span>
            <span>handpicked for you</span>
        </div>
    );
};

export default Index;