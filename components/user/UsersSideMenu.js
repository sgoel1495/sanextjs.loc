import Link from "next/link";
import { useRouter } from 'next/router';
import { Fragment } from "react";

const links = [
    { title: "Profile", link: "/users/profile" },
    { title: "Account", link: "/users/account" },
    { title: "Address Book", link: "/users/addressbook" },
    { title: "My Orders", link: "/users/orderhistory" },
    { title: "My Wallet", link: "/users/wallet" },
    { title: "Redeem Voucher", link: "/users/wallet" },
    { title: "My Favourites", link: "/users/favourites" },
    { title: "My Measurements", link: "/users/measurements" },
    { title: "My Referral", link: "/users/my-referral" }
]

function UsersSideMenu(props) {
    const router = useRouter();

    const mobileView = null;
    const browserView = () => {
        let returnValue = null;
        links.forEach((link, index) => {
            returnValue = <Fragment>
                {returnValue}
                <li key={index}>
                    <Link href={link.link}>
                        <a className={'block hover:bg-[#f1f2f3] py-2 tracking-wide text-[#555] font-500 ' + [router.asPath == link.link ? "bg-[#f1f2f3]" : null]} >{link.title}</a>
                    </Link>
                </li>
            </Fragment>;
        })
        return (
            <ul className="flex-1">
                {returnValue}
            </ul>
        );
    };

    return (props.mobile) ? mobileView : browserView();
}

export default UsersSideMenu;