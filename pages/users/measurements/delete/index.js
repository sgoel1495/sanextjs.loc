import {useRouter} from "next/router";
import {Fragment} from "react";

function AddressDeletePage(){
    const router=useRouter();
    router.replace("/");

    return <Fragment>No Direct Access</Fragment>;
}

export default AddressDeletePage;