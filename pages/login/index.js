
import {useRouter} from "next/router";
import {Fragment, useContext, useEffect} from "react";
import AppWideContext from "../../store/AppWideContext";

function LogIn() {
    const {updateDataStore} = useContext(AppWideContext);
    const router = useRouter();
    useEffect(() => {
        updateDataStore("showSidebarMenuUser", true);
        router.back();
    }, []); // eslint-disable-line react-hooks/exhaustive-deps
    return <Fragment></Fragment>;
}

export default LogIn;