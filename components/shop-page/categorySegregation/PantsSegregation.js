import React, {useState} from 'react';
import Image from "next/image";

const PantsSegregation = () => {
    const WEBASSETS = process.env.NEXT_PUBLIC_WEBASSETS;
    const [hoverOn, setHoverOn] = useState(0)
    return (
        <div className={"grid grid-cols-5 gap-x-1 my-8"}>
            <div/>
            <div className={"my-8 px-5 border-r-2 border-[#BE997F]"}>
                <div className={"relative aspect-[33/28]"}  onMouseEnter={() => setHoverOn(1)} onMouseLeave={() => setHoverOn(0)}>
                    <Image src={WEBASSETS + [hoverOn === 1 ? "/assets/pants_cate/crop/mo.thumb.jpg" : "/assets/pants_cate/crop/thumb.jpg"]} alt={"crop pants"} layout={`fill`}
                           objectFit={`contain`}/>
                </div>
            </div>
            <div className={"my-8 pl-4 pr-5 border-r-2 border-[#BE997F]"} >
                <div className={"relative aspect-[33/28]"} onMouseEnter={() => setHoverOn(2)} onMouseLeave={() => setHoverOn(0)}>
                    <Image src={WEBASSETS + [hoverOn === 2 ? "/assets/pants_cate/culotte/mo.thumb.jpg" : "/assets/pants_cate/culotte/thumb.jpg"]} alt={"culotte pants"} layout={`fill`}
                           objectFit={`contain`}/>
                </div>
            </div>
            <div className={"my-8 pl-4 pr-5"}>
                <div className={"relative aspect-[33/28]"} onMouseEnter={() => setHoverOn(3)} onMouseLeave={() => setHoverOn(0)}>
                    <Image src={WEBASSETS + [hoverOn === 3 ? "/assets/pants_cate/pull-on/mo.thumb.jpg" : "/assets/pants_cate/pull-on/thumb.jpg"]} alt={"pull-on pants"} layout={`fill`}
                           objectFit={`contain`}/>
                </div>
            </div>
            <div/>
            <div/>
            <div className={"my-8 px-5 border-r-2 border-[#BE997F]"}>
                <div className={"relative aspect-[33/28]"} onMouseEnter={() => setHoverOn(4)} onMouseLeave={() => setHoverOn(0)}>
                    <Image src={WEBASSETS + [hoverOn === 4 ? "/assets/pants_cate/signature_straight/mo.thumb.jpg" : "/assets/pants_cate/signature_straight/thumb.jpg"]}
                           alt={"signature straight pants"} layout={`fill`} objectFit={`contain`}/>
                </div>
            </div>
            <div className={"my-8 pl-4 pr-5"}>
                <div className={"relative aspect-[33/28]"} onMouseEnter={() => setHoverOn(5)} onMouseLeave={() => setHoverOn(0)}>
                    <Image src={WEBASSETS + [hoverOn === 5 ? "/assets/pants_cate/wide-leg/mo.thumb.jpg" : "/assets/pants_cate/wide-leg/thumb.jpg"]} alt={"wide-leg pants"}
                           layout={`fill`} objectFit={`contain`}/>
                </div>
            </div>
        </div>
    );
};

export default PantsSegregation;