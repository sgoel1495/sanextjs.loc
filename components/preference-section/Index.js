import React, {useContext} from 'react';
import AppWideContext from "../../store/AppWideContext";
import useApiCall from "../../hooks/useApiCall";
import Image from "next/image";
import Link from 'next/link'
import {connect} from "react-redux";

const Index = ({appConfig}) => {
    const WEBASSETS = process.env.NEXT_PUBLIC_WEBASSETS;
    const resp = useApiCall("getPreferencesData", appConfig.apiToken);

    if (resp && resp.response)
        return (
            <section title='Shop By Preferences'>
                {resp.response.filter(item => item.home_visible).map((item, index) => {
                    return (
                        <div style={{background: item['bg_color'].replace(";", "")}} key={index}>
                            {index === 0 && (
                                <>
                                    <h3 className={"text-h3 font-900 uppercase tracking-widest mx-4"} style={{color: "var(--very-light-brown)"}}>SHOP</h3>
                                    <h3 className={"text-h3 font-600 font-cursive italic mx-4 leading-none sentence mb-6"} style={{color: "var(--very-light-brown)"}}>by
                                        preferences</h3>
                                </>
                            )}
                            <div className='py-3 mx-4'>
                                <Link href={item['home_url']}>
                                    <a className={"block text-sm uppercase font-900 uppercase tracking-widest mb-2"} style={{color: item['title_color'].replace(";", "")}}>
                                        {item['display_name']}
                                    </a>
                                </Link>
                                <div className={"grid " + [item['template_count'] === 3 ? "grid-cols-2 gap-5" : "grid-cols-3 gap-2"]}>
                                    {item['products'].map((product, index) => {
                                        return (
                                            <Link href={"/" + product["old_product_id"]} key={index}>
                                                <a className={"block"}>
                                                    <div className={"relative h-full aspect-square border-2 border-white rounded-[35%] overflow-hidden shadow-sm"}>
                                                        <Image
                                                            src={WEBASSETS + "/assets/" + product["old_product_id"] + "/new.jpg"}
                                                            layout="fill"
                                                            objectFit="cover"
                                                            alt={product["old_product_id"]}
                                                        />
                                                    </div>
                                                </a>
                                            </Link>
                                        )
                                    })
                                    }
                                    <Link key={index} href={item['home_url']}>
                                        <a className={"block"}>
                                            <div
                                                className={"h-full aspect-square border-2 border-white rounded-[35%] shadow-sm grid place-items-center text-center content-center tracking-widest uppercase text-[9px]"}>
                                                <span>tap here</span>
                                                <span>to see more</span>
                                            </div>
                                        </a>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    )
                })
                }
            </section>
        );
    else
        return <></>
};

const mapStateToProps = (state) => {
    return {
        appConfig: state.appConfig
    }
}

export default connect(mapStateToProps)(Index);