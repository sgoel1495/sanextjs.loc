import React, {useContext} from 'react';
import AppWideContext from "../../store/AppWideContext";
import useApiCall from "../../hooks/useApiCall";
import Image from "next/image";

const Index = () => {
    const WEBASSETS = process.env.NEXT_PUBLIC_WEBASSETS;
    const {dataStore} = useContext(AppWideContext);
    const resp = useApiCall("getMediaBuzz", dataStore.apiToken);
    if (resp && resp.status === 200)
        return (
            <div className={"bg-[#fffaf7]"}>
                <span className={"block"}>Media</span>
                <span className={"block"}>coverage</span>
                <div className={"grid grid-cols-2"}>
                    {
                        resp.response.data.sort((a, b) => a.serial_no - b.serial_no).map((item, index) => {
                            return <a href={item.media_link} target={"_blank"}>
                                <span className={"block"}>{item.title}</span>
                                <span className={"block relative"}>
                                    <Image src={WEBASSETS + item.mob_img} alt={item.media_name} layout={`fill`} objectFit={`cover`}/>
                                </span>
                            </a>
                        })
                    }
                </div>
            </div>
        );
    else {
        return <></>
    }
};

export default Index;