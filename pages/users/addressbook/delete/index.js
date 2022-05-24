import {useRouter} from "next/router";
import {Fragment, useEffect} from "react";

function UsersAddressDeletePage(){
    const router=useRouter();
    useEffect(()=>{
        router.replace("/")
    },[router])


    return <Fragment>No Direct Access</Fragment>;
}

export default UsersAddressDeletePage;