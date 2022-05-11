import {useRouter} from "next/router";
import {Fragment, useEffect} from "react";
import AppWideContext from "../../../../store/AppWideContext";
import {apiCall} from "../../../../helpers/apiCall";

function MeasurementsDeletePage(){
    const router = useRouter();
    const query = router.query;
    const {dataStore,updateDataStore} = useContext(AppWideContext);
    const measurementId = query.pageid;
    if( !measurementId || dataStore.userData.contact==null || !dataStore.userAddresses.length < (measurementId+1) )
        router.replace("/"); // no illegal access

    /*
    {
   "user" : { "email" : "",
     "is_guest" : true,
     "temp_user_id" : "1599477182"
   },
   "measurments" : {
       "measure_id": "1576481216959_m"
   },
  "token" : "b16ee1b2bcb512f67c3bca5fac24a924fcc2241bcbfe19ddfdde33ecd24114a0"
}
     */
    const measurementKeys = Object.keys(dataStore.userMeasurements);

    const processOnLoad = async ()=> {
        const resp = await apiCall("removeMeasurements", dataStore.apiToken, {
            "user": {
                email: dataStore.userData.contact,
                is_guest: false,
                temp_user_id: dataStore.userServe.temp_user_id
            },
            "measurments": {
                "measure_id": dataStore.userMeasurements[measurementKeys[measurementId]]
            }
        });
        if (resp.status == 200) {
            const measurementCall = await apiCall("userMeasurements", dataStore.apiToken, {
                "user": {
                    email: dataStore.userData.contact,
                    is_guest: false,
                    temp_user_id: dataStore.userServe.temp_user_id
                }
            });
            if (measurementCall.hasOwnProperty("response") && measurementCall.response)
                updateDataStore("userMeasurements", measurementCall.response);
        }
        router.back();
    }

    useEffect(()=>{
        processOnLoad();
    },[]);

    return <Fragment>Deleting Measurement</Fragment>;
}

export default MeasurementsDeletePage;