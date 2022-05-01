import AppWideContext from "../../../store/AppWideContext";
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
        localStorage.setItem("userData", JSON.stringify(userData));
        router.replace("/");
    }, []);
    return <Fragment>Logging out ...</Fragment>;
}

export default Logout;