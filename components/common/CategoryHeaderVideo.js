/**
 *
 * @param props has category
 * @returns {JSX.Element}
 * @constructor
 */

import React from 'react';

function CategoryHeaderVideo(props) {
    const WEBASSETS = process.env.NEXT_PUBLIC_WEBASSETS;
    const category = props.category;

    return (
        <section className={`relative mt-8`}>
            <video autoPlay muted className={`w-full h-fit`} loop>
                <source
                    src={WEBASSETS + "/assets/videos/" + category + ".mp4"}
                    type="video/mp4"
                    poster={WEBASSETS + "/assets/videos/" + category + ".jpg"}
                />
                Your browser does not support video tag.
            </video>
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

export default CategoryHeaderVideo;
