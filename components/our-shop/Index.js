import React from 'react';
import Image from "next/image";
import Link from 'next/link';

const blockLeadClass = "block font-cursive italic leading-none text-3xl";
const blockLinkClass = "block text-xs text-[#302f2e] tracking-wider uppercase"

const ImageBlock = props => {
    const WEBASSETS = process.env.NEXT_PUBLIC_WEBASSETS;
    return (
        <div className={`relative h-[80vw] border-white border-4 shadow-sm` + [props.style]}>
            <Image
                src={WEBASSETS + props.src}
                alt={props.alt}
                layout={`fill`}
                objectFit={`cover`}
            />
        </div>
    )
};

const data = [
    {
        "blockLeadText": "dresses",
        "blockLeadLink": "/shop-dresses",
        "blockImageLink": "/assets/Dresses-Stalwart-ShawlCollaredDress/Front.jpg",
        "blockLinks": [
            {
                "linkText": "SHEATH",
                "linkURL": "/shop-dresses"
            },
            {
                "linkText": "FIT & A-LINE",
                "linkURL": "/group/fit-&-aline"
            },
            {
                "linkText": "FIT & FLARE",
                "linkURL": "/group/fit-&-FLARE"
            },
            {
                "linkText": "SHIFT DRESSES",
                "linkURL": "/group/shift-dresses"
            },
            {
                "linkText": "ALL DRESSES",
                "linkURL": "/shop-dresses"
            },
        ]
    },
    {
        "blockLeadText": "trousers",
        "blockLeadLink": "/shop-tailored-pants",
        "blockImageLink": "/assets/Pants-Lupin-Taupe-FormalSideZipPant/new.jpg",
        "blockLinks": [
            {
                "linkText": "Straight",
                "linkURL": "/group/straight-pants"
            },
            {
                "linkText": "SLIM",
                "linkURL": "/group/slim-pants"
            },
            {
                "linkText": "Wide Leg",
                "linkURL": "/group/wide-leg-pants"
            },
            {
                "linkText": "Pleated Pegged",
                "linkURL": "/group/pleated-pegged"
            },
            {
                "linkText": "ALL TROUSERS",
                "linkURL": "/shop-tailored-pants"
            },
        ]
    },
    {
        "blockLeadText": "tops",
        "blockLeadLink": "/shop-tops",
        "blockImageLink": "/assets/look-711/Full.v1.jpg",
        "blockLinks": [
            {
                "linkText": "SHIRTS",
                "linkURL": "/shop-shirts"
            },
            {
                "linkText": "BLOUSES",
                "linkURL": "/shop-tops"
            },
            {
                "linkText": "TUNICS",
                "linkURL": "/shop-tunics"
            },
            {
                "linkText": "ALL TOPS",
                "linkURL": "/shop-tops"
            }
        ]
    },
    {
        "blockLeadText": "outerwear",
        "blockLeadLink": "/shop-outerwear",
        "blockImageLink": "/assets/Outerwear-Astute-Dusty-Lavender-DoubleBreastedlonglineBlazer/Front.jpg",
        "blockLinks": [
            {
                "linkText": "Single Breasted",
                "linkURL": "/group/single-breasted"
            },
            {
                "linkText": "Double Breasted",
                "linkURL": "/group/double-breasted"
            },
            {
                "linkText": "Cardigan Style",
                "linkURL": "/group/cardigan-style"
            },
            {
                "linkText": "ALL OUTERWEAR",
                "linkURL": "/shop-outerwear"
            }
        ]
    },
    {
        "blockLeadText": "jumpsuits",
        "blockLeadLink": "/shop-jumpsuits",
        "blockImageLink": "/assets/Jumpsuits-TheDisco-V-neckjumpsuit/new.jpg",
        "blockLinks": [
            {
                "linkText": "Empire Seam",
                "linkURL": "/group/empire-seam-jumpsuits"
            },
            {
                "linkText": "Waist Seam",
                "linkURL": "/group/waist-seam-jumpsuits"
            },
            {
                "linkText": "ALL JUMPSUITS",
                "linkURL": "/shop-jumpsuits"
            }
        ]
    },
    {
        "blockLeadText": "accessories",
        "blockLeadLink": "/group/accessories",
        "blockImageLink": "/assets/Scarves-Pansy-TealReversiblescarf/Front.jpg",
        "blockLinks": [
            {
                "linkText": "MASKS",
                "linkURL": "/shop-masks"
            },
            {
                "linkText": "JEWELLERY",
                "linkURL": "/shop-jewellery"
            },
            {
                "linkText": "SCARVES",
                "linkURL": "/shop-scarves"
            },
            {
                "linkText": "BELTS",
                "linkURL": "/shop-belts"
            }
        ]
    },
    {
        "blockLeadText": "giftcards",
        "blockLeadLink": "/giftcards",
        "blockImageLink": "/assets/images/gift_ourshop.jpg",
        "blockLinks": [
            {
                "linkText": "ALL GIFTCARDS",
                "linkURL": "/giftcards"
            }
        ]
    },
]

const Index = () => {
    return (
        <div className="pt-5" style={{ background: "var(--beige-two)" }}>
            <span className="block font-black text-white text-3xl uppercase tracking-wider mx-4 mb-6">our shop</span>
            <div className="px-8">
                {data.map((item, index) => {
                    return (
                        <div className={`grid grid-cols-2 grid-rows-1` + [index == 0 ? ' mt-0' : ' -mt-1']} key={index}>
                            <div className={`pb-5 inline-flex flex-col justify-evenly ${index % 2 == 0 ? 'pr-5 text-right' : 'pl-5'}`}>
                                <Link href={item.blockLeadLink}>
                                    <a className={blockLeadClass}>{item.blockLeadText}</a>
                                </Link>
                                {item.blockLinks.map((item, index) => {
                                    return (
                                        <Link key={index} href={item.linkURL}>
                                            <a className={blockLinkClass}>{item.linkText}</a>
                                        </Link>
                                    )
                                })}
                            </div>
                            <ImageBlock
                                src={item.blockImageLink}
                                alt={item.blockLeadText}
                                style={index % 2 == 0 ? ' -ml-[2px]' : ' col-start-1 row-span-full -mr-[2px]'}
                            />
                        </div>
                    )
                })}
            </div>
        </div>
    );
};

export default Index;