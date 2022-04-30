import AppWideContext from "../../store/AppWideContext";
import {useRouter} from "next/router";
import {Fragment, useContext, useEffect} from "react";

function Logout() {
    const {updateDataStore} = useContext(AppWideContext);
    const router = useRouter();
    useEffect(() => {
        const userData={
            "contact": null
        };
        updateDataStore("userData", userData);
        router.replace("/");
    }, []);

    return <Fragment></Fragment>;
}

export default Logout;