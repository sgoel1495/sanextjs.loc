/**
 *
 * @param props has category
 * @returns {JSX.Element}
 * @constructor
 */

import React, {useEffect, useRef} from 'react';

function CategoryHeaderVideo(props) {
    const WEBASSETS = process.env.NEXT_PUBLIC_WEBASSETS;
    const videoRef = useRef(null);

    useEffect(() => {
        videoRef.current?.load();
    }, [props.category]);

    let category = props.category;
    category = category.split("-")
    let superText = ""
    if (category.length > 1) {
        superText = category[0];
        category = category[1]
    } else {
        category = category[0]
    }

    let titleStyle = " text-right float-left"
    let textStyle = "text-6xl"
    let containerStyle = ""
    let subText = ""
    switch (category) {
        case "skirts":
            subText = "(Select 'T' as the size option and enter your measurements)"
            titleStyle = " text-left float-right"
            break;
        case "pants":
            subText = "(Select 'T' as the size option and enter your measurements)"
            titleStyle = " text-left float-left pl-28"
            break;
        case "dresses":
        case "belts":
            titleStyle = " text-left float-right"
            break;
        case "tops":
        case "sweaters":
        case "shirts":
        case "shorts":
            titleStyle = " text-left float-left pl-28"
            break;
        case "tunics":
            containerStyle = "flex justify-center items-center h-fit"
            titleStyle = " text-center w-[23%]"
            break;
        case "jumpsuits":
            containerStyle = "flex justify-center items-center h-fit"
            titleStyle = " text-center"
            break;
        case "jewellery":
        case "outerwear":
            titleStyle = " text-left float-left pl-28"
            textStyle = "text-5xl"
            break;
        case "masks":
            titleStyle = " text-left float-left pl-28"
    }

    //@TODO We do not have any carousel data.
    return (
        <section>
            {props.children}
            {(category==="best-selling")
                ? null
                : <span className={"relative block overflow-hidden"}>
                <video autoPlay muted className={`w-full h-fit`} loop
                       style={{background: `no-repeat url("${WEBASSETS}/assets/videos/${category}.jpg")`}}
                       ref={videoRef}>
                    <source
                        src={WEBASSETS + "/assets/videos/" + category + ".mp4"}
                        type="video/mp4"
                    />
                    Your browser does not support video tag. Please upgrade.
                </video>
            </span>}
            {(category === "best-selling")
                ? null
                : <div className={`absolute inset-0 top-[40vh] h-fit ` + containerStyle}>
                    <div className={`bg-black pt-10 pb-4 px-[2vw] w-[32%] text-white leading-none ` + titleStyle}>
                        {superText && <><span
                            className={`block text-md uppercase font-semibold font-cursive`}>{superText}</span><br/></>}
                        <span className={`block font-cursive uppercase ` + textStyle}>
                        {category === "masks" ? <>COTTON<br/>MASKS</> : category}
                    </span>}
                        {subText &&
                            <span className={`block text-sm leading-6 font-light mb-4 mt-[-15px]`}>{subText}</span>}
                    </div>
                </div>
            }
        </section>
    )
}

export default CategoryHeaderVideo;
