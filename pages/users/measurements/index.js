import React, {useContext} from "react";
import AppWideContext from "../../../store/AppWideContext";

function MeasurementsPage(){
    const {dataStore} = useContext(AppWideContext);

    const mobileView=null;
    const browserView=null;

    return (dataStore.mobile) ? mobileView : browserView;
}

export default MeasurementsPage;