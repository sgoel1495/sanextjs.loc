import React, {useState} from 'react';
import Image from "next/image";

const JewellerySegregation = () => {
    const WEBASSETS = process.env.NEXT_PUBLIC_WEBASSETS;
    const [hoverOn, setHoverOn] = useState(0)
    return (
        <div className={"grid grid-cols-6 gap-x-1 my-8"}>
            <div/>
            <div className={"my-8 px-5 border-r-2 border-[#BE997F]"}>
                <div className={"relative aspect-[282/239]"} onMouseEnter={() => setHoverOn(1)} onMouseLeave={() => setHoverOn(0)}>
                    <Image src={WEBASSETS + [hoverOn === 1 ? "/assets/jewellery_cate/bracelet/mo.thumb.jpg" : "/assets/jewellery_cate/bracelet/thumb.jpg"]}
                           alt={"bracelet jewellery"} layout={`fill`}
                           objectFit={`contain`}/>
                </div>
            </div>
            <div className={"my-8 pl-4 pr-5 border-r-2 border-[#BE997F]"}>
                <div className={"relative aspect-[282/239]"} onMouseEnter={() => setHoverOn(2)} onMouseLeave={() => setHoverOn(0)}>
                    <Image src={WEBASSETS + [hoverOn === 2 ? "/assets/jewellery_cate/earring/mo.thumb.jpg" : "/assets/jewellery_cate/earring/thumb.jpg"]} alt={"earring jewellery"}
                           layout={`fill`}
                           objectFit={`contain`}/>
                </div>
            </div>
            <div className={"my-8 pl-4 pr-5 border-r-2 border-[#BE997F]"}>
                <div className={"relative aspect-[282/239]"} onMouseEnter={() => setHoverOn(3)} onMouseLeave={() => setHoverOn(0)}>
                    <Image src={WEBASSETS + [hoverOn === 3 ? "/assets/jewellery_cate/fullset/mo.thumb.jpg" : "/assets/jewellery_cate/fullset/thumb.jpg"]} alt={"fullset jewellery"}
                           layout={`fill`}
                           objectFit={`contain`}/>
                </div>
            </div>
            <div className={"my-8 pl-4 pr-5"}>
                <div className={"relative aspect-[282/239]"} onMouseEnter={() => setHoverOn(4)} onMouseLeave={() => setHoverOn(0)}>
                    <Image src={WEBASSETS + [hoverOn === 4 ? "/assets/jewellery_cate/necklace/mo.thumb.jpg" : "/assets/jewellery_cate/necklace/thumb.jpg"]} alt={"necklace jewellery"}
                           layout={`fill`}
                           objectFit={`contain`}/>
                </div>
            </div>
            <div/>
            <div/>
            <div className={"my-8 px-5 border-r-2 border-[#BE997F]"}>
                <div className={"relative aspect-[282/239]"} onMouseEnter={() => setHoverOn(5)} onMouseLeave={() => setHoverOn(0)}>
                    <Image src={WEBASSETS + [hoverOn === 5 ? "/assets/jewellery_cate/pendant/mo.thumb.jpg" : "/assets/jewellery_cate/pendant/thumb.jpg"]}
                           alt={"pendant jewellery"} layout={`fill`} objectFit={`contain`}/>
                </div>
            </div>
            <div className={"my-8 pl-4 pr-5"}>
                <div className={"relative aspect-[282/239]"} onMouseEnter={() => setHoverOn(6)} onMouseLeave={() => setHoverOn(0)}>
                    <Image src={WEBASSETS + [hoverOn === 6 ? "/assets/jewellery_cate/ring/mo.thumb.jpg" : "/assets/jewellery_cate/ring/thumb.jpg"]} alt={"ring jewellery"}
                           layout={`fill`} objectFit={`contain`}/>
                </div>
            </div>
        </div>
    );
};

export default JewellerySegregation;