/**
 *
 * @param props has category
 * @returns {JSX.Element}
 * @constructor
 */

import React, {useContext, useState} from 'react';
import Image from "next/image";
import AppWideContext from "../../store/AppWideContext";
import {isMobile} from "react-device-detect";

function CategoryHeaderImage(props) {
    const WEBASSETS = process.env.NEXT_PUBLIC_WEBASSETS;
    const category = props.category;
    const [mobile, setMobile] = useState(false)

    React.useEffect(() => {
        setMobile(isMobile)
    }, [])

    let showCategoryName = true;
    let imageSource = WEBASSETS + "/assets/";
    let imageClass = "";
    let objectPosition = "";
    switch (category) {
        case "FAQ":
            imageSource = imageSource + "images/TnC.2.jpg";
            break;
        case "Shipping & Returns":
            imageSource = imageSource + "images/TnC.2.jpg";
            imageClass = "ml-[-72vw]";
            objectPosition = "74% 0";
            break;
        case "Cancellation & Modifications":
            imageSource = imageSource + "images/TnC.2.jpg";
            objectPosition = "45% 0";
            break;
        case "Contact Us":
            imageSource = imageSource + (mobile ? "images/ContactUs.mob.2_v1.jpg" : "images/ContactUs.2_v1.jpg");
            break;
        case "Terms & Conditions":
            imageSource = imageSource + "images/TnC.1.jpg";
            objectPosition = "45% 0";
            break;
        case "Privacy Policy":
            imageSource = imageSource + "images/TnC.1.jpg";
            break;
        case "Get Virtual Appointment":
            imageSource = imageSource + "images/ContactUs.2_v1.jpg";
            showCategoryName = false;
            break;
        case "About Salt":
            imageSource = imageSource + "images/about_salt_banner_800.jpg";
            showCategoryName = false;
            break;
        default:
            objectPosition = "72% 32px"
            break;
    }

    let mobileView = <div className={"relative w-full h-[300px]"}>
        <Image
            src={imageSource}
            layout={`fill`}
            objectFit={`cover`}
            alt={category}
            objectPosition={objectPosition}
        />
    </div>
    let browserView = <section className={`relative`}>
            <span className={`block relative w-full h-[70vh]`}>
                <Image src={imageSource} alt={category} layout={`fill`} objectFit={`cover`}/>
            </span>
        {(showCategoryName)
            ? <div className={`absolute inset-0 flex items-center justify-start`}>
                <div className={`bg-black pt-12 pb-6 pl-32 pr-10 w-[28%] text-white font-cursive italic leading-none`}>
                        <span className={`text-5xl`}>
                            {category}
                        </span>
                </div>
            </div>
            : null
        }
    </section>
    return mobile ? mobileView : browserView
}

export default CategoryHeaderImage;
