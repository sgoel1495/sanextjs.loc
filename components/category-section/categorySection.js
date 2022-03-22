import React, { useContext } from 'react';
import useApiCall from "../../hooks/useApiCall";
import AppWideContext from "../../store/AppWideContext";
import Image from "next/image";

const ImageBlock = props => (
    <div className='relative w-[100px] aspect-square rounded-[35%] border-2 border-white overflow-hidden shadow-[4px_4px_14px_0.8px_#00000008]'>
        <Image
            src={props.src}
            alt={props.alt}
            layout={'fill'}
            objectFit={'cover'}
        />
    </div>
)

const CategorySection = () => {
    const WEBASSETS = process.env.NEXT_PUBLIC_WEBASSETS;
    const { dataStore } = useContext(AppWideContext);
    const resp = useApiCall("getCategoryCircle", dataStore.apiToken);
    return (
        <div className={"py-6 w-screen overflow-x-scroll scrollbar-none bg-[#f0eae6]"}>
            <div className={"flex gap-2"}>
                {resp && resp.response && resp.response.map((item, index) => (
                    <div key={index} className='inline-flex flex-col items-center gap-3'>
                        <ImageBlock src={WEBASSETS + item.asset_id} />
                        <span className={"text-black text-[10px] uppercase tracking-wide font-600"}>{item.category}</span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CategorySection;