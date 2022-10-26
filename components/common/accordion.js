import React, {useRef, useState} from "react";

const Accordion = props => {
    const [setActive, setActiveState] = useState(false);
    const [setHeight, setHeightState] = useState("0px");

    const content = useRef(null);

    function toggleAccordion() {
        setActiveState(!setActive);
        setHeightState(
            setActive ? "0px" : props.auto?"1000vh":`${content.current.scrollHeight}px`
        );
    }

    return (
        <div className={props.style}>
            <div
                className={`flex items-center gap-x-5 cursor-pointer ${props.titleStyle}`}
                onClick={toggleAccordion}
            >
                {props.titleIcon && <span className="block relative h-10 w-10">{props.titleIcon}</span>}
                <div className={`flex-1 ${props.titleTextStyle}`} onClick={props.onClick}>
                    {props.title}
                </div>
                <span className="block relative h-4 w-4">
                    {setActive
                        ? props.accordionIconOpen
                            ? props.accordionIconOpen
                            : <svg xmlns="http://www.w3.org/2000/svg" className={`w-4 h-4`} viewBox="0 0 24 24">
                                <path d="M5 11h14v2H5z"/>
                            </svg>
                        : props.accordionIconClose
                            ? props.accordionIconClose
                            : <svg xmlns="http://www.w3.org/2000/svg" className={`w-4 h-4`} viewBox="0 0 24 24">
                                <path d="M19 11h-6V5h-2v6H5v2h6v6h2v-6h6z"/>
                            </svg>
                    }
                </span>
            </div>
            <div
                ref={content}
                style={{maxHeight: `${setHeight}`}}
                className={`scrollbar-hide ${props.animationDuration ? props.animationDuration : 'duration-500'} ${setActive ? 'overflow-y-auto' : 'overflow-hidden'} ${props.bodyStyle}`}
            >
                {props.children}
            </div>
        </div>
    )
}

export default Accordion;
