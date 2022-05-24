
import {useRouter} from "next/router";
import {Fragment, useContext, useEffect} from "react";
import AppWideContext from "../../store/AppWideContext";

function LogInPage() {
    const {updateDataStore} = useContext(AppWideContext);
    const router = useRouter();
    useEffect(() => {
        updateDataStore("showSidebarMenuUser", true);
        router.back();
    }, [updateDataStore,router])
    return <Fragment></Fragment>;
}

export default LogInPage;