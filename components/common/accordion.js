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
        <div className={`salt_accordion`}>
            <div className={`bg-black/10 py-4 px-6 flex gap-x-5`} onClick={toggleAccordion}>
                <div className={`flex-1 ${props.style}`}>{props.title}</div>
                {setActive
                    ? <div className="block h-4 w-4">
                        <svg xmlns="http://www.w3.org/2000/svg" className={`w-4 h-4`} viewBox="0 0 24 24">
                            <path d="M5 11h14v2H5z"/>
                        </svg>
                    </div>
                    : <div className="block h-4 w-4">
                        <svg xmlns="http://www.w3.org/2000/svg" className={`w-4 h-4`} viewBox="0 0 24 24">
                            <path d="M19 11h-6V5h-2v6H5v2h6v6h2v-6h6z"/>
                        </svg>
                    </div>
                }
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
