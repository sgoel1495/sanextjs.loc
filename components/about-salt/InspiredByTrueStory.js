import React from 'react';
import {gsap} from "gsap";

/**
 * @todo @Sambhav css pls
 * @param props
 * @returns {null|JSX.Element}
 * @constructor
 */

function InspiredByTrueStory(props) {

    let GSAPText = React.useRef(null);

    React.useEffect(() => {
        gsap.fromTo(
            GSAPText,
            {
                width: 0
            },
            {
                repeat: 1,
                ease: `power3`,
                duration: 2,
                width: GSAPText.offsetWidth
            }
        )
    },[])

    const mobileView = null;
    const browserView = (
        <div className={`h-screen flex items-center justify-end`} ref={el => {GSAPText = el}}>
            <p className={`text-6xl text-black/50 font-300`}>Inspired by a true story !</p>
        </div>
    );

    return props.isMobile ? mobileView : browserView

}

export default InspiredByTrueStory;
