import React from "react";
import {Parallax} from "react-parallax";

const ParallaxBlock = props => {
    return (
        <Parallax
            bgImage={props.bgImage}
            bgClassName={"max-w-none"}
            bgStyle={{maxWidth:"auto"}}
            strength={200}
        >
            <div className="h-screen">
                <div className={`absolute inset-0 flex flex-col ${props.verticalAlign ? props.verticalAlign : 'justify-center'} ${props.bodyStyle}`}>
                    {props.children}
                </div>
            </div>
        </Parallax>
    )
}

export default ParallaxBlock;
