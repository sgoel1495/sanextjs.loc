import React from 'react';
import Image from "next/image";

const Index = () => {
    const WEBASSETS = process.env.NEXT_PUBLIC_WEBASSETS;
    return (
        <div className="p-5 pb-8" style={{background: "var(--beige-two)"}}>
            <span className="block font-black text-white text-3xl uppercase tracking-wider pb-7">our shop</span>
            <div className="px-9">
                <div className="grid grid-cols-2 mb-[-1vw] ml-[-1vw]">
                    <div className="pr-5">
                    <span className="block text-3xl text-right py-4">
                        <a href={"/shop-dresses"}>dresses</a>
                    </span>
                        <span className="block text-xs text-right py-3 tracking-wider">
                        <a href={"/group/sheath"}>SHEATH</a>
                    </span>
                        <span className="block text-xs text-right py-3 tracking-wider">
                        <a href={"/group/fit-&amp;-aline"}>FIT &amp; A-LINE</a>
                    </span>
                        <span className="block text-xs text-right py-3 tracking-wider">
                        <a href={"/group/fit-&amp;-flare"}>FIT &amp; FLARE</a>
                    </span>
                        <span className="block text-xs text-right py-3 tracking-wider">
                        <a href={"/group/shift-dresses"}>SHIFT DRESSES</a>
                    </span>
                        <span className="block text-xs text-right py-3 tracking-wider">
                        <a href={"/shop-dresses"}>ALL DRESSES</a>
                    </span>
                    </div>
                    <span className="block relative h-[80vw] border-white border-[1vw] shadow-sm">
                    <Image src={WEBASSETS + "/assets/Dresses-Stalwart-ShawlCollaredDress/Front.jpg"} layout={`fill`} objectFit={`cover`}/>
                </span>
                </div>
                <div className="grid grid-cols-2 mt-[-1vw] mr-[-1vw]">
                    <span className="block relative h-[80vw] border-white border-[1vw] shadow-sm">
                        <Image src={WEBASSETS + "/assets/Pants-Lupin-Taupe-FormalSideZipPant/new.jpg"} layout={`fill`} objectFit={`cover`}/>
                    </span>
                    <div className="pl-5">
                        <span className="block text-3xl text-left pb-3 pt-9">
                            <a href={"/shop-tailored-pants"}>trousers</a>
                        </span>
                        <span className="block text-xs text-left py-3 tracking-wider uppercase">
                            <a href={"/group/straight-pants"}>Straight</a>
                        </span>
                        <span className="block text-xs text-left py-3 tracking-wider uppercase">
                            <a href={"/group/slim-pants"}>SLIM</a>
                        </span>
                        <span className="block text-xs text-left py-3 tracking-wider uppercase">
                            <a href={"/group/wide-leg-pants"}>Wide Leg</a>
                        </span>
                        <span className="block text-xs text-left py-3 tracking-wider uppercase">
                            <a href={"/group/pleated-pegged"}>Pleated Pegged</a>
                        </span>
                        <span className="block text-xs text-left py-3 tracking-wider uppercase">
                            <a href={"/shop-tailored-pants"}>ALL TROUSERS</a>
                        </span>
                    </div>
                </div>
                <div className="grid grid-cols-2 mt-[-1vw] ml-[-1vw]">
                    <div className="pr-5">
                    <span className="block text-3xl text-right pb-4 pt-5">
                        <a href={"/shop-tops"}>tops</a>
                    </span>
                        <span className="block text-xs text-right py-4 tracking-wider">
                        <a href={"/shop-shirts"}>SHIRTS</a>
                    </span>
                        <span className="block text-xs text-right py-4 tracking-wider">
                        <a href={"/shop-tops"}>BLOUSES</a>
                    </span>
                        <span className="block text-xs text-right py-4 tracking-wider">
                        <a href={"/shop-tunics"}>TUNICS</a>
                    </span>
                        <span className="block text-xs text-right py-4 tracking-wider">
                        <a href={"/shop-tops"}>ALL TOPS</a>
                    </span>
                    </div>
                    <span className="block relative h-[80vw] border-white border-[1vw] shadow-sm">
                    <Image src={WEBASSETS + "/assets/look-711/Full.v1.jpg"} layout={`fill`} objectFit={`cover`}/>
                </span>
                </div>
                <div className="grid grid-cols-2 mt-[-1vw] mr-[-1vw]">
                    <span className="block relative h-[80vw] border-white border-[1vw] shadow-sm">
                        <Image src={WEBASSETS + "/assets/Outerwear-Astute-Dusty-Lavender-DoubleBreastedlonglineBlazer/Front.jpg"} layout={`fill`} objectFit={`cover`}/>
                    </span>
                    <div className="pl-5 break-normal">
                        <span className="block text-3xl text-left py-5">
                            <a href={"/shop-outerwear"}>outerwear</a>
                        </span>
                        <span className="block text-xs text-left py-4 tracking-wider uppercase ">
                            <a href={"/group/single-breasted"}>Single&nbsp;Breasted</a>
                        </span>
                        <span className="block text-xs text-left py-4 tracking-wider uppercase">
                            <a href={"/group/double-breasted"}>Double&nbsp;Breasted</a>
                        </span>
                        <span className="block text-xs text-left py-4 tracking-wider uppercase">
                            <a href={"/group/cardigan-style"}>Cardigan&nbsp;Style</a>
                        </span>
                        <span className="block text-xs text-left py-4 tracking-wider uppercase">
                            <a href={"/shop-outerwear"}>ALL&nbsp;OUTERWEAR</a>
                        </span>
                    </div>
                </div>
                <div className="grid grid-cols-2 mt-[-1vw] ml-[-1vw]">
                    <div className="pr-5">
                        <span className="block text-3xl text-right pb-5 pt-14 tracking-tight">
                            <a href={"/shop-jumpsuits"}>jumpsuits</a>
                        </span>
                        <span className="block text-xs text-right py-4 tracking-wider uppercase">
                            <a href={"/group/empire-seam-jumpsuits"}>Empire Seam</a>
                        </span>
                        <span className="block text-xs text-right py-4 tracking-wider uppercase">
                            <a href={"/group/waist-seam-jumpsuits"}>Waist Seam</a>
                        </span>
                        <span className="block text-xs text-right py-4 tracking-wider uppercase">
                            <a href={"/shop-jumpsuits"}>ALL JUMPSUITS</a>
                        </span>
                    </div>
                    <span className="block relative h-[80vw] border-white border-[1vw] shadow-sm">
                    <Image src={WEBASSETS + "/assets/Jumpsuits-TheDisco-V-neckjumpsuit/new.jpg"} layout={`fill`} objectFit={`cover`}/>
                </span>
                </div>
                <div className="grid grid-cols-2 mt-[-1vw] mr-[-1vw]">
                    <span className="block relative h-[80vw] border-white border-[1vw] shadow-sm">
                        <Image src={WEBASSETS + "/assets/Scarves-Pansy-TealReversiblescarf/Front.jpg"} layout={`fill`} objectFit={`cover`}/>
                    </span>
                    <div className="pl-5">
                        <span className="block text-3xl text-left py-5 tracking-tight">
                            <a href={"/group/accessories"}>accessories</a>
                        </span>
                        <span className="block text-xs text-left py-5 tracking-wider uppercase">
                            <a href={"/shop-masks"}>MASKS</a>
                        </span>
                        <span className="block text-xs text-left py-5 tracking-wider uppercase">
                            <a href={"/shop-jewellery"}>JEWELLERY</a>
                        </span>
                        <span className="block text-xs text-left py-5 tracking-wider uppercase">
                            <a href={"/shop-scarves"}>SCARVES</a>
                        </span>
                        <span className="block text-xs text-left py-5 tracking-wider uppercase">
                            <a href={"/shop-belts"}>BELTS</a>
                        </span>
                    </div>
                </div>
                <div className="grid grid-cols-2 mt-[-1vw] ml-[-1vw]">
                    <div className="pr-5">
                        <span className="block text-3xl text-right pb-7 pt-20 tracking-tighter">
                            <a href={"/giftcards"}>giftcards</a>
                        </span>
                        <span className="block text-xs text-right py-6 tracking-wider">
                            <a href={"/giftcards"}>ALL GIFTCARDS</a>
                        </span>
                    </div>
                    <span className="block relative h-[80vw] border-white border-[1vw] shadow-sm">
                    <Image src={WEBASSETS + "/assets/images/gift_ourshop.jpg"} layout={`fill`} objectFit={`cover`}/>
                </span>
                </div>
            </div>
        </div>
    );
};

export default Index;