import React, {Fragment} from 'react';
import PageHead from "../../../components/PageHead";
import Header from "../../../components/navbar/Header";
import Footer from "../../../components/footer/Footer";
import {connect} from "react-redux";
import CategoryHeaderImage from "../../../components/common/CategoryHeaderImage";
import Accordion from "../../../components/common/accordion";
import useApiCall from "../../../hooks/useApiCall";
import Link from "next/link";

const Index = ({isMobile, apiToken, categories, accessories}) => {
    const resp = useApiCall("getMimotoCollection", apiToken);
    let mimotoList = null;
    if (resp && resp.status === 200) {
        resp.response.mimoto.filter(item => item.visible).reverse().forEach(ele => {
            mimotoList = <Fragment>
                {mimotoList}
                <div key={ele.collection_id}>
                    <Link href={ele.url}>
                        <a className={`block mb-3 leading-3 text-black uppercase`}>
                            {ele.name}
                        </a>
                    </Link>
                </div>
            </Fragment>;
        })
    }
    return (
        <>
            <PageHead url="/sitemap" id="sitemap" isMobile={isMobile}/>
            <Header type={isMobile ? "minimal" : "shopMenu"} isMobile={isMobile}/>
            <CategoryHeaderImage category={"Site Map"} isMobile={isMobile}/>
            <div className={"flex justify-start my-12 " + [isMobile ? "mx-8" : "container"]}>
                <Accordion title={<Link href={"/"}>HOME</Link>} auto={true}>
                    <div className={"ml-8"}>
                        <Accordion title={"SHOP"} bodyStyle={"overflow-none"} auto={true}>
                            <div className={"ml-8 mt-2"}>
                                {
                                    categories.map((item) => {
                                        return <div key={item.category}>
                                            <Link href={item.link}>
                                                <a className={`block mb-3 leading-3 text-black uppercase`}>
                                                    {item.category}
                                                </a>
                                            </Link>
                                        </div>
                                    })
                                }
                                {
                                    accessories.map((item) => {
                                        return <div key={item.category}>
                                            <Link href={item.link}>
                                                <a className={`block mb-3 leading-3 text-black uppercase`}>
                                                    {item.category}
                                                </a>
                                            </Link>
                                        </div>
                                    })
                                }
                            </div>
                        </Accordion>
                        <Accordion title={"MIMOTO"} auto={true}>
                            <div className={"ml-8 mt-2"}>
                                {mimotoList}
                            </div>
                        </Accordion>
                    </div>
                </Accordion>
            </div>
            <Footer isMobile={isMobile} minimal={isMobile}/>
        </>
    );
};

const mapStateToProps = (state) => {
    return {
        isMobile: state.appConfig.isMobile,
        apiToken: state.appConfig.apiToken,
        categories: state.appConfig.categories,
        accessories: state.appConfig.accessories

    }
}

export default connect(mapStateToProps)(Index);