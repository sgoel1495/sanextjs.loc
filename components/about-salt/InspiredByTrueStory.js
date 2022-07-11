import React from 'react';

/**
 * @todo @Sambhav css pls
 * @param props
 * @returns {null|JSX.Element}
 * @constructor
 */

function InspiredByTrueStory(props) {

    const afterStyle = `after:absolute after:inset-0 ${props.isMobile ? 'after:w-[1px]' : 'after:w-[2px]'} after:bg-black/50 after:animate-typewriter`;
    const beforeStyle = `before:absolute before:inset-0 before:bg-white before:animate-typewriter`;

    const mobileView = (
        <div className={`h-screen flex items-start justify-end`}>
            <p className={`text-base leading-normal text-black/50 font-300 w-max relative inspired_story mr-20 mt-20 ${afterStyle} ${beforeStyle}`}>
                Inspired by a true story !
            </p>
        </div>
    );
    const browserView = (
        <div className={`h-screen flex items-center justify-end`}>
            <p className={`text-6xl leading-normal text-black/50 font-300 w-max relative inspired_story mr-20 ${afterStyle} ${beforeStyle}`}>
                Inspired by a true story !
            </p>
        </div>
    );

    return props.isMobile ? mobileView : browserView

}

export default InspiredByTrueStory;
