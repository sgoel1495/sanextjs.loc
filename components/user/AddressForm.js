import {useRouter} from "next/router";
import AppWideContext from "../../store/AppWideContext";
import {useContext} from "react";

function AddressForm(props){
    const router = useRouter();
    const { dataStore,updateDataStore } = useContext(AppWideContext);

    const saveAndReturn = ()=>{


    }

    const mobileView = null;
    const browserView = <div>

    </div>;

    return (dataStore.mobile) ? mobileView : browserView
}

export default AddressForm;