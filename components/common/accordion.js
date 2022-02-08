import React, {useRef, useState} from "react";

const Accordion = props => {
    const [setActive, setActiveState] = useState(false);
    const [setHeight, setHeightState] = useState("0px");

    const content = useRef(null);

    function toggleAccordion() {
        setActiveState(!setActive);
        setHeightState(
            setActive ? "0px" : `${content.current.scrollHeight}px`
        );
    }

    return (
        <div className={`salt_accordion ${props.style}`}>
            <div className={`bg-black/10 py-4 px-6 flex items-center gap-x-5 cursor-pointer`} onClick={toggleAccordion}>
                {props.titleIcon && <span className="block relative h-8 w-8">{props.titleIcon}</span>}
                <div className={`flex-1 ${props.titleStyle}`}>{props.title}</div>
                <span className="block relative h-4 w-4">
                    {setActive
                        ? <svg xmlns="http://www.w3.org/2000/svg" className={`w-4 h-4`} viewBox="0 0 24 24">
                            <path d="M5 11h14v2H5z"/>
                        </svg>
                        : <svg xmlns="http://www.w3.org/2000/svg" className={`w-4 h-4`} viewBox="0 0 24 24">
                            <path d="M19 11h-6V5h-2v6H5v2h6v6h2v-6h6z"/>
                        </svg>
                    }
                </span>
            </div>
            <div
                ref={content}
                style={{maxHeight: `${setHeight}`}}
                className={`salt_accordion_body duration-500 bg-black/5 ${setActive? 'overflow-y-auto' :'overflow-hidden'}`}
            >
                <div className="px-6 py-4">
                    {props.children}
                </div>
            </div>
        </div>
    )
}

export default Accordion;
