import React, {Fragment, useContext} from "react";
import AppWideContext from "../../../store/AppWideContext";
import PageHead from "../../../components/PageHead";
import Header from "../../../components/navbar/Header";
import UsersSideMenu from "../../../components/user/UsersSideMenu";
import ContactInformation from "../../../components/user/ContactInformation";
import DefaultAddressBookInformation from "../../../components/user/DefaultAddressBookInformation";
import {useRouter} from "next/router";

function ProfilePage(){
    const router=useRouter();
    const {dataStore} = useContext(AppWideContext);
    if(dataStore.userData.contact==null)
        router.replace("/"); //illegal direct access

    const mobileView=null;
    const browserView=<Fragment>
            <UsersSideMenu mobile={false} />
            <div>
                <ContactInformation mobile={false}/>
            </div>
            <div>
                <DefaultAddressBookInformation mobile={false}/>
            </div>
        </Fragment>;


    return  <Fragment>
        <PageHead url={"/" + props.hpid} id={props.hpid} isMobile={dataStore.mobile}/>
        <Header type={"shopMenu"}/>
        {(dataStore.mobile) ? mobileView : browserView}
    </Fragment>

}

export default ProfilePage;