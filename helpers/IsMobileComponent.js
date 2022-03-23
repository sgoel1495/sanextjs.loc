import React from 'react';
import {isMobile} from 'react-device-detect';

const IsMobileComponent = (props) => {
    console.log(isMobile)
    return <div className="device-layout-component">{props.children(isMobile)}</div>
}

export default IsMobileComponent;