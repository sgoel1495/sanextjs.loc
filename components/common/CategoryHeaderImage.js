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
    let imageSource= WEBASSETS + "/assets/";
    switch (category){
        case "faq":
            imageSource = imageSource + "images/TnC.2.jpg";
        default:
            break;
    }
    console.log("Category Image Source", imageSource);

    return (
        <section className={`relative mt-8`}>
            <Image src={imageSource} alt={category} width="1000vw" height="300px" />
            <div className={`absolute inset-0 flex items-center justify-start`}>
                <div className={`bg-black pt-12 pb-6 pl-28 w-1/3 text-white font-cursive leading-none`}>
                    <span className={`text-6xl`}>
                        {category.toUpperCase()}
                    </span>
                </div>
            </div>
        </section>
    )
}

export default CategoryHeaderImage;