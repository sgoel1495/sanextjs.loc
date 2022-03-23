/**
 *
 * @param props has category
 * @returns {JSX.Element}
 * @constructor
 */

import React from 'react';
import Image from "next/image";

function CategoryHeaderImage(props) {
    const WEBASSETS = process.env.NEXT_PUBLIC_WEBASSETS;
    const category = props.category;
    let showCategoryName = true;
    let imageSource= WEBASSETS + "/assets/";
    switch (category){
        case "FAQ":
            imageSource = imageSource + "images/TnC.2.jpg";
            break;
        case "Shipping & Returns":
            imageSource = imageSource + "images/TnC.2.jpg";
            break;
        case "Cancellation & Modifications":
            imageSource = imageSource + "images/TnC.2.jpg";
            break;
        case "Contact Us":
            imageSource = imageSource + "images/ContactUs.2_v1.jpg";
            break;
        case "Terms & Conditions":
            imageSource = imageSource + "images/TnC.1.jpg";
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
            break;
    }

    return (
        <section className={`relative mt-8`}>
            <span className={`block relative w-full h-[70vh]`}>
                <Image src={imageSource} alt={category} layout={`fill`} objectFit={`cover`} />
            </span>
            {(showCategoryName)
                ?<div className={`absolute inset-0 flex items-center justify-start`}>
                    <div className={`bg-black pt-12 pb-6 pl-32 pr-10 w-[28%] text-white font-cursive italic leading-none`}>
                        <span className={`text-5xl`}>
                            {category}
                        </span>
                    </div>
                </div>
                :null
            }
        </section>
    )
}

export default CategoryHeaderImage;
