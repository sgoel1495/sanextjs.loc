import {Fragment} from "react";
import Link from "next";

function UsersSideMenu(props){
    const links=[
        {title:"Profile",link:"/users/profile"},
        {title:"Account",link:"/users/account"},
        {title:"Address Book",link:"/users/addressbook"},
        {title:"My Orders",link:"/users/orderhistory"},
        {title:"My Wallet",link:"/users/wallet"},
        {title:"Redeem Voucher",link:"/users/wallet"},
        {title:"My Favourites",link:"/users/favourites"},
        {title:"My Measurements",link:"/users/measurements"},
        {title:"My Referral",link:"/users/my-referral"}
    ]
    const mobileView=null;
    const browserView=()=>{
        let returnValue=null;
        links.forEach((link,index)=>{
            returnValue=<Fragment>
                {returnValue}
                <li key={index}>
                    <Link href={link.link}>
                        <a>link.title</a>
                    </Link>
                </li>
            </Fragment>;
        })
        return <ul>
            {returnValue}
        </ul>;
    };

    return <Fragment>
        (props.mobile) ? mobileView : browserView();
    </Fragment>;
}

export default UsersSideMenu;