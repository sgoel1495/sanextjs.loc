import Link from "next/link";

/**
 * @todo We do now know where in api to get the submenu data
 * @params {isMobile, menu} props
 * @constructor
 */

function SubMenu(props) {
    const mobileView = null;
    let browserView = null;

    if (!props.isMobile && props.menu == "accessories")
        browserView = (
            <>
                <ul className="accessories-class absolute top-[100%] bg-white w-full text-center hidden group-hover:block z-10 text-xs text-black/60">
                    <li>
                        <Link href="/shop-scarves">
                            <a className={"block px-4 py-2 border-b border-transparent hover:border-black"}>Scarves</a>
                        </Link>
                    </li>
                    <li>
                        <Link href="/shop-belts">
                            <a className={"block px-4 py-2 border-b border-transparent hover:border-black"}>Belts</a>
                        </Link>
                    </li>
                    <li>
                        <Link href="/shop-jewellery">
                            <a className={"flex flex-col items-start px-4 py-2 border-b border-transparent hover:border-black leading-none"}>
                                <span className={"bg-black text-xs text-white leading-none"}>New</span>
                                Jewellery
                            </a>
                        </Link>
                    </li>
                    <li>
                        <Link href="/shop-masks">
                            <a className={"flex flex-col items-start px-4 py-2 border-b border-transparent hover:border-black leading-none"}>
                                <span className={"bg-black text-xs text-white leading-none"}>New</span>
                                Masks
                            </a>
                        </Link>
                    </li>
                </ul>
            </>
        )


    return (
        (props.isMobile) ? mobileView : browserView
    )

}

export default SubMenu;
