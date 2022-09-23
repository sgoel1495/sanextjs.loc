import React, {useState} from 'react';
import Image from "next/image";

const SkirtsSegregation = () => {
    const WEBASSETS = process.env.NEXT_PUBLIC_WEBASSETS;
    const [hoverOn, setHoverOn] = useState(0)
    return (
        <div className={"grid grid-cols-5 gap-x-1 my-8"}>
            <div/>
            <div className={"my-8 px-5 border-r-2 border-[#BE997F]"}>
                <div className={"relative aspect-[23/13]"}  onMouseEnter={() => setHoverOn(1)} onMouseLeave={() => setHoverOn(0)}>
                    <Image src={WEBASSETS + [hoverOn === 1 ? "/assets/skirts_cate/a-line/mo.thumb.jpg" : "/assets/skirts_cate/a-line/thumb.jpg"]} alt={"a-line skirts"} layout={`fill`}
                           objectFit={`contain`}/>
                </div>
            </div>
            <div className={"my-8 pl-4 pr-5 border-r-2 border-[#BE997F]"} >
                <div className={"relative aspect-[23/13]"} onMouseEnter={() => setHoverOn(2)} onMouseLeave={() => setHoverOn(0)}>
                    <Image src={WEBASSETS + [hoverOn === 2 ? "/assets/skirts_cate/flare/mo.thumb.jpg" : "/assets/skirts_cate/flare/thumb.jpg"]} alt={"flare skirts"} layout={`fill`}
                           objectFit={`contain`}/>
                </div>

            </div>
            <div className={"my-8 pl-4 pr-2"}>
                <div className={"relative aspect-[23/13]"} onMouseEnter={() => setHoverOn(3)} onMouseLeave={() => setHoverOn(0)}>
                    <Image src={WEBASSETS + [hoverOn === 3 ? "/assets/skirts_cate/straight/mo.thumb.jpg" : "/assets/skirts_cate/straight/thumb.jpg"]} alt={"straight skirts"} layout={`fill`}
                           objectFit={`contain`}/>
                </div>
            </div>
            <div/>
        </div>
    )
};

export default SkirtsSegregation;