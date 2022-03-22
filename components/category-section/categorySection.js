import React, {useContext} from 'react';
import useApiCall from "../../hooks/useApiCall";
import AppWideContext from "../../store/AppWideContext";
import Image from "next/image";

const CategorySection = () => {
    const WEBASSETS = process.env.NEXT_PUBLIC_WEBASSETS;
    const {dataStore} = useContext(AppWideContext);
    const resp = useApiCall("getCategoryCircle", dataStore.apiToken);
    return (
        <div className={"py-2"}>
            <div className={"flex"}>
                {resp && resp.response && resp.response.map((item, index) => (
                    <div key={index}>
                        <Image src={WEBASSETS + item.asset_id} height={30} width={30}/>
                        <span className={"text-black"}>{item.category}</span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CategorySection;