import React, { useState } from 'react';
import WishListButton from "../common/WishListButton";
import Image from "next/image";
import ExpandedLook from "./ExpandedLook";

const LookDataBlockImage = (props) => (
    <span className={`block relative w-full h-full aspect-square`}>
        <Image src={props.src} alt={props.name} layout={`fill`} objectFit={`cover`} />
    </span>
)

const LooksItem = ({ data, isMobile }) => {
    const WEBASSETS = process.env.NEXT_PUBLIC_WEBASSETS;
    const [expandLook, setExpandLook] = useState({});
    let showLookData = null;
    let look_ids = []
    if (!data || !data.hasOwnProperty("look") || data.look.length < 1) return null;
    else {
        data.look.forEach((look, index) => {
            look_ids.push(look.look_id)
            if (isMobile) {
                showLookData = (
                    <>
                        {showLookData}
                        {
                            index % 2 === 0 && <LookDataBlockImage src={WEBASSETS + look.img_path} alt={look.name} onClick={() => setExpandLook(look)} />
                        }
                        <div
                            className={"text-white text-center font-600 tracking-wider flex flex-col justify-center"}
                            style={{ background: look.bg_color }}>
                            <div className={"flex-1"} />
                            <div className={`flex-1 flex flex-col justify-center`}>
                                <p className={`mb-1 text-[15.4px]`}>{look.heading}</p>
                                <p className={`text-[9.9px] font-cursive italic`}>{look.details}</p>
                            </div>
                            <div className={"flex-1 flex flex-col justify-end relative"}>
                                <p className={`uppercase text-[11px] mb-8`} onClick={() => setExpandLook(look)}>{'>'} Shop the look</p>
                                {(look.look_id === expandLook.look_id) && <div className={"h-10 w-10 bg-white absolute left-[50%] translate-x-[-50%] rotate-45 translate-y-[50%] "} />}
                            </div>
                        </div>
                        {
                            index % 2 === 1 && <LookDataBlockImage src={WEBASSETS + look.img_path} alt={look.name} onClick={() => setExpandLook(look)} />
                        }
                        {(look.look_id === expandLook.look_id) ? <ExpandedLook expandLook={expandLook} setExpandLook={setExpandLook} data={data} isMobile={true} /> : null}
                    </>
                );
            } else {
                showLookData = (
                    <>
                        {showLookData}
                        <div
                            onClick={() => setExpandLook(look)}
                            className={`relative group cursor-pointer z-0`}
                            id={look.look_id}
                        >
                            <WishListButton className={`absolute right-4 top-4 z-10`} pid={look.look_id} />
                            <LookDataBlockImage src={WEBASSETS + look.img_path} alt={look.name} />
                            <div
                                className={"hidden group-hover:grid place-items-center absolute inset-0 opacity-95 text-white text-center font-600 tracking-wider"}
                                style={{ background: look.bg_color }}>
                                <div className={`self-end`}>
                                    <p className={`mb-2 text-h5`}>{look.heading}</p>
                                    <p className={`text-h5 font-cursive italic`}>{look.details}</p>
                                </div>
                                <p className={`uppercase text-sm`}>{'>'} Shop the look</p>
                            </div>
                        </div>
                        {(index % 3 === 2 && expandLook && look_ids.slice(index - 2, index + 1).includes(expandLook.look_id)) ?
                            <ExpandedLook expandLook={expandLook} setExpandLook={setExpandLook} data={data} /> : null}
                    </>
                );
            }
        });
    }
    return showLookData;
};

export default LooksItem;