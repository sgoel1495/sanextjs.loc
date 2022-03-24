import React, {useContext} from 'react';
import AppWideContext from "../../store/AppWideContext";
import useApiCall from "../../hooks/useApiCall";
import Image from "next/image";

const Index = (props) => {
    const WEBASSETS = process.env.NEXT_PUBLIC_WEBASSETS;
    const {dataStore} = useContext(AppWideContext);
    const resp = useApiCall("getPreferencesData", dataStore.apiToken);

    if (resp && resp.response)
        return (
            <div>
                {
                    resp.response.filter(item => item.home_visible).map((item, index) => {
                        return <div style={{background: item['bg_color'].replace(";", "")}} className={"p-2"} key={index}>
                            {
                                index === 0 && <>
                                    <span className={"block"} style={{color: "var(--very-light-brown)"}}>SHOP</span>
                                    <span className={"block"} style={{color: "var(--very-light-brown)"}}>by preferences</span>
                                </>
                            }
                            <a style={{color: item['title_color'].replace(";", "")}} className={"block uppercase"} href={item['home_url']}>{item['name']} ></a>
                            <div className={"grid " + [item['template_count'] === 3 ? "grid-cols-2 p-4" : "grid-cols-3"]}>
                                {
                                    item['products'].map((product, index) => {
                                        return <a className={"block p-2"} key={index} href={"/" + product["old_product_id"]}>
                                            <span className={"relative block h-full aspect-square border-2 border-white rounded-[35%] overflow-hidden shadow-sm"}>
                                                <Image
                                                    src={WEBASSETS + "/assets/" + product["old_product_id"] + "/new.jpg"}
                                                    layout="fill"
                                                    objectFit="cover"
                                                    alt={product["old_product_id"]}
                                                />
                                            </span>
                                        </a>
                                    })
                                }
                                <a className={"block p-2"} key={index} href={item['home_url']}>
                                    <span className={"block h-full aspect-square border-2 border-white rounded-[35%] shadow-sm grid grid-cols-1"}>
                                        <span className={"uppercase text-[0.6rem] self-end text-center"}>tap here</span>
                                        <span className={"uppercase text-[0.6rem] self-start text-center"}>to see more</span>
                                    </span>
                                </a>
                            </div>
                        </div>
                    })
                }
            </div>
        );
    else
        return <></>
};

export default Index;