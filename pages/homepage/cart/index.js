import React, {Fragment, useContext} from 'react';
import {CartModal} from "../../../components/sidebar/SidebarMenuCart";

function HomepageCartPage() {
    return <Fragment>
        <CartModal isMobile={true}/>
    </Fragment>
}

export default HomepageCartPage;

