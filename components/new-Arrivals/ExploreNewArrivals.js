import React, {useContext} from 'react';
import useApiCall from "../../hooks/useApiCall";
import AppWideContext from "../../store/AppWideContext";
import Image from "next/image";

const ExploreNewArrivals = () => {
    const WEBASSETS = process.env.NEXT_PUBLIC_WEBASSETS;
    const {dataStore} = useContext(AppWideContext);
    const resp = useApiCall("exploreNewArrivals", dataStore.apiToken);
    return (
        <div>
            <a href={"/new-arrivals/all"}>Explore All New Arrivals</a>
            <div className={"grid grid-cols-2 grid-rows-1"}>
                <div className={"grid text-right"}>
                    {resp && resp.response && resp.response.left_text.map((item, index) => {
                        return <a href={item.link + "?sorted_by=created-at-desc"} className="text-uppercase" key={index}>
                            {item.category}
                        </a>
                    })}
                </div>
                <div className={"overflow-x-scroll flex"}>
                    {resp && resp.response && resp.response.right_img.map((item, index) => {
                        return <a href={item.link + "?sorted_by=created-at-desc"} className="h-[300px] w-[150px]" key={index}>
                            <span className="block relative h-[300px] w-[150px]">
                                 <Image
                                     src={WEBASSETS + item.asset_id}
                                     layout="fill"
                                     objectFit="cover"
                                     alt={item.category}
                                 />
                            </span>
                        </a>
                    })}
                </div>

            </div>
        </div>
    );
};

export default ExploreNewArrivals;