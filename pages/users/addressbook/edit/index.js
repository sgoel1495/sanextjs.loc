import {useRouter} from "next/router";
import {Fragment} from "react";

function UsersAddressEditPage(){
    const router=useRouter();
    router.replace("/");

    return <Fragment>No Direct Access</Fragment>;
}

export default UsersAddressEditPage;