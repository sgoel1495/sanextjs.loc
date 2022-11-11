import React from 'react';
import ReactDom from "react-dom";
import Image from "next/image";

const CustomizeLength = ({closeModal, data, selected, setSelected, defaultValue}) => {
    const WEBASSETS = process.env.NEXT_PUBLIC_WEBASSETS;
    return <div className={['bg-black/60 h-screen fixed inset-0 z-[90] grid place-items-center py-[8%] px-[5%]']}>
        <div className={"bg-white h-full w-full rounded-[8vw] border-4 border-[#b3aeab] flex flex-col items-center py-5"}>
            <div className={"relative flex flex-col items-center tracking-wider text-lg text-[#997756] w-full"}>
                <button className="absolute top-[-1rem] right-4 text-2xl z-50" onClick={closeModal}>X</button>
                <span className={"uppercase mt-8 text-base font-600"}>select your dress length</span>
                <div className={"px-4 grid grid-cols-2 w-full text-[#997756] text-base mt-8"}>
                    {
                        data.map((item, index) => {
                            return <div className={"p-2"} key={index}>
                                <div className={"w-full border-4 rounded-3xl overflow-hidden text-center pb-3 " + [selected.selected_length === item ? "border-[#997756]" : "border-[#b3aeab]"]}
                                     onClick={() => setSelected({...selected,"selected_length": item})}>
                                    <span className={"relative block w-full aspect-[123/160]"}>
                                        <Image src={WEBASSETS + `/assets/dresses-length/cap-${item.toLowerCase().replace(" ","_").replace("-","_")}.jpg`} layout={`fill`} objectFit={`cover`} alt={""}/>
                                        <span className={"absolute bottom-0 left-[50%] translate-x-[-50%] capitalize"}>{item}</span>
                                    </span>
                                </div>
                                {
                                    defaultValue === item && <div className="text-[#997756] uppercase text-center text-[11px] font-500 tracking-wide leading-3 mt-1">
                                        <span className={"block"}>as shown</span>
                                        <span className={"block"}>(original)</span>
                                    </div>
                                }
                            </div>
                        })
                    }
                </div>
                <button className="border-4 rounded-2xl border-[#997756] text-[#997756] text-xs font-900 px-8 py-2 mt-8 leading-4" onClick={closeModal}>SAVE<br/>LENGTH</button>
            </div>
        </div>
    </div>
}

const CustomizeSleeve = ({closeModal, data, selected, setSelected, defaultValue}) => {
    const WEBASSETS = process.env.NEXT_PUBLIC_WEBASSETS;
    return <div className={['bg-black/60 h-screen fixed inset-0 z-[90] grid place-items-center py-[8%] px-[5%]']}>
        <div className={"bg-white h-full w-full rounded-[8vw] border-4 border-[#b3aeab] flex flex-col items-center py-5"}>
            <div className={"relative flex flex-col items-center tracking-wider text-lg text-[#997756] w-full"}>
                <button className="absolute top-[-1rem] right-4 text-2xl z-50" onClick={closeModal}>X</button>
                <span className={"uppercase mt-8 text-base font-600"}>select your sleeve length</span>
                <div className={"px-4 grid grid-cols-2 w-full text-[#997756] text-base mt-8"}>
                    {
                        data.map((item, index) => {
                            return <div className={"p-2"} key={index}>
                                <div className={"w-full border-4 rounded-3xl overflow-hidden text-center pb-3 " + [selected.selected_sleeve === item ? "border-[#997756]" : "border-[#b3aeab]"]}
                                     onClick={() => setSelected({...selected,"selected_sleeve": item})}>
                                    <span className={"relative block w-full aspect-square mb-4"}>
                                        <Image src={WEBASSETS + `/assets/dresses-sleeve/${item.toLowerCase().replace(" ","_")}.jpg`} layout={`fill`} objectFit={`cover`} alt={""}/>
                                    </span>
                                    <span className={"capitalize"}>{item}</span>
                                </div>
                                {
                                    defaultValue === item && <div className="text-[#997756] uppercase text-center text-[11px] font-500 tracking-wide leading-3 mt-1">
                                        <span className={"block"}>as shown</span>
                                        <span className={"block"}>(original)</span>
                                    </div>
                                }
                            </div>
                        })
                    }
                </div>
                <button className="border-4 rounded-2xl border-[#997756] text-[#997756] text-xs font-900 px-8 py-2 mt-8 leading-4" onClick={closeModal}>SAVE<br/>SLEEVE</button>
            </div>
        </div>
    </div>
}

const Customize = ({data, selected, setSelected}) => {
    const [showLength, setShowLength] = React.useReducer((state, action) => {
        return !state
    }, false)
    const [showSleeve, setShowSleeve] = React.useReducer((state, action) => {
        return !state
    }, false)

    if (data.is_customize)
        return <>
            <div className={"grid grid-cols-3 gap-3 place-items-center text-[#4eb16d] text-xs font-900 tracking-widest"}>
                <span/>
                <span>
                    {
                        data.dress_length !== selected["selected_length"] && "SELECTED"
                    }
                </span>
                <span>
                    {
                        data.sleeve_length !== selected["selected_sleeve"] && "SELECTED"
                    }
                </span>
            </div>
            <div className={"grid grid-cols-3 gap-3 place-items-center text-[#997756] tracking-widest mb-6 " + [data.is_sale ? "pointer-events-none opacity-25" : ""]}>
                <span className={"text-base"}>CUSTOMIZE</span>
                <span
                    className={"shadow-lg border-white w-full h-full text-center rounded-3xl " + [data.dress_length_opt.length > 1 ? "" : "pointer-events-none opacity-25 "] + [data.dress_length !== selected["selected_length"] ? "leading-4 bg-[#4eb16d] border-0 text-white py-2" : "py-2.5 border-4 "]}
                    onClick={setShowLength}>
                    {
                        data.dress_length === selected["selected_length"] ?
                            <>
                                <span className={"text-[3.2vw] block"}>CHANGE</span>
                                <span className={"text-[3vw] font-900 block"}>LENGTH</span>
                            </>
                            :
                            <>
                                <span className={"text-[3.3vw] uppercase font-800 block"}>{selected["selected_length"]}</span>
                                <span className={"text-[3vw] font-700 block"}>LENGTH</span>
                                <span className={"text-[2.5vw] font-700 block"}>EDIT</span>
                            </>
                    }
                </span>

                <span
                    className={"shadow-lg border-white w-full h-full text-center rounded-3xl " + [data.sleeve_length_opt.length > 1 ? "" : "pointer-events-none opacity-25 "] + [data.sleeve_length !== selected["selected_sleeve"] ? "leading-4 bg-[#4eb16d] border-0 text-white py-2" : "py-2.5 border-4 "]}
                    onClick={setShowSleeve}>
                    {
                        data.sleeve_length === selected["selected_sleeve"] ?
                            <>
                                <span className={"text-[3.2vw] block"}>CHANGE</span>
                                <span className={"text-[3vw] font-900 block"}>SLEEVE</span>
                            </>
                            :
                            <>
                                <span className={"text-[3.3vw] uppercase font-800 block"}>{selected["selected_sleeve"]}</span>
                                <span className={"text-[3vw] font-700 block"}>SLEEVE</span>
                                <span className={"text-[2.5vw] font-700 block"}>EDIT</span>
                            </>
                    }
                </span>
                {
                    showSleeve && ReactDom.createPortal(
                        <CustomizeSleeve
                            closeModal={setShowSleeve}
                            data={data.sleeve_length_opt}
                            defaultValue={data.sleeve_length}
                            selected={selected}
                            setSelected={setSelected}
                        />, document.getElementById("measurementmodal"))
                }
                {
                    showLength && ReactDom.createPortal(
                        <CustomizeLength
                            closeModal={setShowLength}
                            data={data.dress_length_opt}
                            defaultValue={data.dress_length}
                            selected={selected}
                            setSelected={setSelected}
                        />, document.getElementById("measurementmodal"))
                }
            </div>
        </>
    return (
        <>
        </>
    );
};

export default Customize;