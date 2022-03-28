import React, { useContext } from 'react';
import AppWideContext from "../../store/AppWideContext";
import useApiCall from "../../hooks/useApiCall";
import Image from "next/image";

const Index = () => {
    const WEBASSETS = process.env.NEXT_PUBLIC_WEBASSETS;
    const { dataStore } = useContext(AppWideContext);
    const resp = useApiCall("getMediaBuzz", dataStore.apiToken);
    if (resp && resp.status === 200) {
        return (
            <div className={"bg-[#fffaf7] pt-5 pb-10"}>
                <h3 className={"text-h3 font-900 uppercase tracking-widest mx-4 text-[#c3b1e1] leading-none mb-1"}>Media</h3>
                <h3 className={"text-h3 font-cursive italic capitalize mx-4 leading-none text-[#c3b1e1]"}>coverage</h3>
                <div className={"grid grid-cols-2 mx-4 mt-5 gap-5"}>
                    {resp.response.data.sort((a, b) => a.serial_no - b.serial_no).map((item, index) => {
                        return (
                            <a href={item.media_link} className='text-center w-2/3 mx-auto' target={"_blank"} rel="noreferrer" key={index}>
                                <p className={"text-[9px] font-cursive italic font-700"}>{item.title}</p>
                                <div className={"relative h-16 w-full mx-auto"}>
                                    <Image src={WEBASSETS + item.mob_img} alt={item.media_name} layout={`fill`} objectFit={`cover`} />
                                </div>
                            </a>
                        )
                    })
                    }
                </div>
            </div>
        );
    }
    else {
        return <></>
    }
};

export default Index;