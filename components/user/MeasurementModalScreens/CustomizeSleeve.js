import Image from "next/image";
import React from "react";

const CustomizeSleeve = ({closeModal, data, currentMeasurement, updateValues, defaultValue, lastModal, nextModal, product, isMobile}) => {
    const WEBASSETS = process.env.NEXT_PUBLIC_WEBASSETS;
    React.useEffect(() => {
        if (product.sleeve_length_opt.length <= 1) {
            nextModal()
        }
    }, [])
    let mobile = <div className={['bg-black/60 h-screen fixed inset-0 z-[90] grid place-items-center py-[8%] px-[3%]']}>
        <div className={"bg-white h-full w-full rounded-[10vw] border-4 border-[#b3aeab] flex flex-col items-center justify-between pt-5 overflow-hidden"}>
            <div className={"relative flex flex-col items-center tracking-wider text-lg text-[#997756] w-full"}>
                <button className="absolute top-[-1rem] right-4 text-2xl z-50" onClick={closeModal}>X</button>
                <p className='font-cursive italic text-3xl mb-2'>Step 4/5</p>
                <span className={"uppercase mt-4 text-base font-600"}>select your sleeve length</span>
                <div className={"px-4 grid grid-cols-2 w-full text-[#997756] text-base mt-8"}>
                    {
                        data.map((item, index) => {
                            return <div className={"p-2"} key={index}>
                                <div
                                    className={"w-full border-4 rounded-3xl overflow-hidden text-center pb-3 " + [currentMeasurement["selected_sleeve"] === item ? "border-[#997756]" : "border-[#b3aeab]"]}
                                    onClick={() => updateValues("selected_sleeve", item)}>
                                    <span className={"relative block w-full aspect-square mb-4"}>
                                        <Image src={WEBASSETS + `/assets/dresses-sleeve/${item.toLowerCase().replace(" ", "_").replace("/", "")}.jpg`} layout={`fill`}
                                               objectFit={`cover`}/>
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
            </div>
            <div className="bg-white text-center grid grid-cols-2 text-[#997756] w-full">
                <div className="bg-[#E5D5C5] py-2 cursor-pointer" onClick={lastModal}>
                    <button className="font-600">&lt; BACK</button>
                    <p className="text-xs uppercase">Size Review</p>
                </div>
                <div className="cursor-pointer font-600" onClick={nextModal}>
                    <button className="font-600">NEXT &gt;</button>
                    <p className="text-xs uppercase">
                        {
                            product.is_customize ?
                                product.dress_length_opt.length > 1 ? "customize length"
                                    : "Review" : "Review"
                        }
                    </p>
                </div>
            </div>
        </div>
    </div>

    let browser = <div className="bg-black/60 h-screen w-screen fixed inset-0 z-50 grid place-items-center py-[8%] px-[10%]" onClick={closeModal}>
        <div className="bg-white border-2 border-black relative h-full w-[920px] flex flex-col flex-1 overflow-auto" onClick={e => e.stopPropagation()}>
            <div className="overflow-auto flex-1">
                <button className="absolute top-0 right-8 text-2xl z-50" onClick={closeModal}>X</button>
                <div className="text-center my-5">
                    <p className="font-cursive italic text-3xl mb-2">Step 4/5</p>
                    <p className="text-base font-600 text-[#606060] uppercase">select your sleeve length</p>
                </div>
                <div className={"px-12 grid grid-cols-2 gap-x-12 w-full text-black text-base mt-8"}>
                    {
                        data.map((item, index) => {
                            return <div className={"p-2"} key={index}>
                                <div
                                    className={"w-full overflow-hidden text-center relative " + [currentMeasurement["selected_sleeve"] === item ? "border-black border-2" : ""]}
                                    onClick={() => updateValues("selected_sleeve", item)}>
                                    <span className={"relative block w-full aspect-[217/156] mb-8"}>
                                        <Image src={WEBASSETS + `/assets/dresses-sleeve/${item.toLowerCase().replace(" ", "_").replace("/", "")}.jpg`} layout={`fill`} objectFit={`cover`}/>
                                    </span>
                                    <span className={"absolute bottom-0 left-[50%] translate-x-[-50%] capitalize"}>{item}</span>

                                </div>
                                {
                                    defaultValue === item && <div className="text-black uppercase text-center text-[11px] font-500 tracking-wide leading-3 mt-1">
                                        <span className={"block"}>as shown</span>
                                        <span className={"block"}>(original)</span>
                                    </div>
                                }
                            </div>
                        })
                    }
                </div>
            </div>
            <div className="bg-white text-center grid grid-cols-2">
                <div className="bg-[#606060] py-2 cursor-pointer text-white" onClick={lastModal}>
                    <button className="font-600">&lt; BACK</button>
                    <p className="text-xs uppercase">Size Review</p>
                </div>
                <div className="cursor-pointer font-600 text-[#777]" onClick={nextModal}>
                    <button className="font-600">NEXT &gt;</button>
                    <p className="text-xs uppercase">
                        {
                            product.is_customize ?
                                product.dress_length_opt.length > 1 ? "customize length"
                                    : "Review" : "Review"
                        }
                    </p>
                </div>
            </div>
        </div>
    </div>

    return isMobile ? mobile : browser
}

export default CustomizeSleeve