import Link from "next/link";
import {Fragment} from "react";

/**
 * @todo We do now know where in api to get the submenu data. Hardcoded in defaultData
 * @params {isMobile, menu, data} props
 * @constructor
 */

function SubMenu(props) {
    const mobileView = null;
    let browserView = null;

    const showMenu = ()=>{
        let showMenuData = null;
        if(props.menu == "accessories"){
            props.data.forEach(ele=>{
                showMenuData = <Fragment>
                    {showMenuData}
                    <li>
                        <Link href={ele.link}>
                            {(ele.new)
                                ?<a className={"flex flex-col items-start px-4 py-2 border-b border-transparent hover:border-black leading-none"}>
                                    <span className={"bg-black text-xs text-white leading-none"}>New</span>
                                    {ele.category}
                                </a>
                                :<a className={"block px-4 py-2 border-b border-transparent hover:border-black"}>
                                    {ele.category}
                                </a>
                            }
                        </Link>
                    </li>
                </Fragment>;
            });
        }
        return <ul className="accessories-class absolute top-[100%] bg-white w-full text-center hidden group-hover:block z-10 text-xs text-black/60">
            {showMenuData}
        </ul>;
    }

    if (!props.isMobile && props.menu == "accessories")
        browserView = showMenu();


    return (
        (props.isMobile) ? mobileView : browserView
    )

}

export default SubMenu;
