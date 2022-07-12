import React, {useContext, useState} from 'react';
import WishListButton from '../../../common/WishListButton';
import AppWideContext from '../../../../store/AppWideContext';
import appSettings from '../../../../store/appSettings';
import Image from 'next/image';
import Accordion from '../../../common/accordion';
import SizeSelect from "./SizeSelect";
import {apiCall} from "../../../../helpers/apiCall";
import Link from "next/link";
import NotifyMe from "./NotifyMe";

const ProductDetails = ({data, hpid}) => {
    const WEBASSETS = process.env.NEXT_PUBLIC_WEBASSETS;

    const {dataStore} = useContext(AppWideContext);
    const [pincode, setPinCode] = useState(null)
    const [showShare, setShowShare] = useState(false)
    const [deliveryAvailable, setDeliveryAvailable] = useState(null)
    const currCurrency = dataStore.currCurrency;
    const currencyData = appSettings('currency_data');
    const currencySymbol = currencyData[currCurrency].curr_symbol;

    let feature_icons = {};

    data.icon_assets.forEach((icon) => {
        feature_icons = {...feature_icons, ...icon};
    });

    const checkDelivery = async () => {
        if (pincode == null)
            return;
        const resp = await apiCall("cityByZipcode", dataStore.apiToken, {zipcode: pincode});
        setDeliveryAvailable(!!(resp.response_data && resp.response_data.city))
    }

    const shareOnTwitter = () => {
        let url = 'https://twitter.com/intent/tweet?url=' + `https://saltattire.com/${data.asset_id}&text=${data.asset_id}`;
        window.open(url, 'TwitterWindow', "width = 1200, height = 600");
        return false;
    }
    const shareOnFB = () => {
        let url = 'https://www.facebook.com/dialog/share?app_id=253839508451663&display=popup&href=' + `https://saltattire.com/${data.asset_id}`;
        window.open(url, 'FacebookWindow', "width = 1200, height = 600");
        return false;
    }
    return (
        <div>
            <div className='px-5 pt-5'>
                <div className={'flex justify-between mb-10'}>
                    <div className='leading-none'>
                        <div className={"flex items-center"}>
                            <button className={"relative block h-6 w-6"} onClick={() => setShowShare(!showShare)}>
                                <Image src={WEBASSETS + "/assets/images/share-1.svg"} layout={`fill`} objectFit={`cover`}/>
                            </button>
                            {
                                showShare &&
                                <>
                                    <span title="share on facebook" className="ml-4" onClick={shareOnFB}>
                                        <svg width="25" height="25" className="mt-[-6px] ml-[-6px]">
                                            <path
                                                d="M23.2 5H5.8a.8.8 0 0 0-.8.8V23.2c0 .44.35.8.8.8h9.3v-7.13h-2.38V13.9h2.38v-2.38c0-2.45 1.55-3.66 3.74-3.66 1.05 0 1.95.08 2.2.11v2.57h-1.5c-1.2 0-1.48.57-1.48 1.4v1.96h2.97l-.6 2.97h-2.37l.05 7.12h5.1a.8.8 0 0 0 .79-.8V5.8a.8.8 0 0 0-.8-.79"/>
                                        </svg>
                                    </span>
                                    <span title="share on twitter" className="ml-4" onClick={shareOnTwitter}>
                                        <svg width="25" height="25" className="mt-[-7px] ml-[-3px]">
                                            <path
                                                d="M22.05 7.54a4.47 4.47 0 0 0-3.3-1.46 4.53 4.53 0 0 0-4.53 4.53c0 .35.04.7.08 1.05A12.9 12.9 0 0 1 5 6.89a5.1 5.1 0 0 0-.65 2.26c.03 1.6.83 2.99 2.02 3.79a4.3 4.3 0 0 1-2.02-.57v.08a4.55 4.55 0 0 0 3.63 4.44c-.4.08-.8.13-1.21.16l-.81-.08a4.54 4.54 0 0 0 4.2 3.15 9.56 9.56 0 0 1-5.66 1.94l-1.05-.08c2 1.27 4.38 2.02 6.94 2.02 8.3 0 12.86-6.9 12.84-12.85.02-.24 0-.43 0-.65a8.68 8.68 0 0 0 2.26-2.34c-.82.38-1.7.62-2.6.72a4.37 4.37 0 0 0 1.95-2.51c-.84.53-1.81.9-2.83 1.13z"/></svg>
                                    </span>
                                </>
                            }
                        </div>
                        <p className={'font-900 text-h4 text-[#5a5958]'}>{data.name}</p>
                        <p className={'text-sm uppercase font-300'}>{data.tag_line}</p>
                    </div>
                    <div className={'text-right leading-none'}>
                        <WishListButton pid={hpid} isMobile={true}/>
                        <p className={''}>
                            {currencySymbol} {currCurrency === 'inr' ? data.price : data.usd_price}
                        </p>
                        <p className={'text-[8px]'}>INCLUSIVE OF TAXES</p>
                    </div>
                </div>
                <div className={'flex flex-wrap mb-4'}>
                    {Object.keys(data.icons_fea)
                        .filter((key) => data.icons_fea[key])
                        .map((key, index) => {
                            return (
                                <div className={'text-center inline-flex flex-col justify-start items-center w-[25%] mb-4'} key={index}>
                                    <div className={'relative aspect-square h-11 mb-1'}>
                                        <Image src={WEBASSETS + feature_icons[key]} alt='' layout={'fill'} objectFit={`cover`}/>
                                    </div>
                                    <p className={'text-[10px] uppercase leading-none'}>{key.replace('9_', '9-').replace(/_/g, ' ')}</p>
                                </div>
                            );
                        })}
                </div>
                <div className={'flex flex-col items-center relative'}>
                    <div className={"absolute h-full w-full"}>
                        <div className={"h-full w-full bg-white/75 rounded-[8vw] grid place-items-center px-4 text-xs"}>
                            <div className={"w-full bg-[#f6f1ef] text-[#997756] py-4 flex flex-col items-center rounded-[8vw]"}>
                                <span>We&apos;re sorry, this item is temporarily SOLD OUT!</span>
                                <span>We can notify you when back in stock.</span>
                                <NotifyMe prod={data}/>
                            </div>
                        </div>
                    </div>
                    <p className={'text-sm font-800 tracking-widest uppercase mb-4'}>select a size</p>
                    <SizeSelect inStock={data.in_stock === "true"}/>
                    <p className={'mb-4 uppercase'}>size guide</p>
                    <button className={'bg-[#4eb16d] mb-5 uppercase text-white font-900 text-xs text-center rounded-2xl py-4 px-10 tracking-widest shadow-lg'}>add to bag</button>
                </div>
                <p className={'text-xs mb-5 mt-5 uppercase text-center'}>return policy</p>
                <div className='flex justify-start flex-wrap w-full'>
                    {['shirts', 'Long Sleeves'].map((item, index) => {
                        return (
                            <p className={'rounded-full capitalize font-cursive italic font-600 bg-[#faede3] border-2 border-white px-3 pt-1 text-sm mb-4 mr-4'} key={index}>
                                {item}
                            </p>
                        );
                    })}
                </div>
            </div>
            <Accordion title={'highlights'} style={'bg-[#EFEAE6] p-5'} titleStyle={'uppercase font-bold tracking-[2.5px]'}>
                <ul className="list-['>'] p-2">
                    {data['description'].map((value, index) => {
                        if (value)
                            return (
                                <li className={'p-2.5 text-xs'} key={index}>
                                    {value}
                                </li>
                            );
                    })}
                </ul>
            </Accordion>
            <Accordion title={'fabric & care'} style={'p-5'} titleStyle={'uppercase font-bold tracking-[2.5px]'}>
                <ul className="list-['>'] p-2">
                    {data['fabric'].map((value, index) => {
                        if (value)
                            return (
                                <li className={'p-2.5 text-xs'} key={index}>
                                    {value}
                                </li>
                            );
                    })}
                    {data['fabric_care'].map((value, index) => {
                        if (value)
                            return (
                                <li className={'p-2.5 text-xs'} key={index}>
                                    {value}
                                </li>
                            );
                    })}
                </ul>
            </Accordion>
            <Accordion title={'details'} style={'bg-[#EFEAE6] p-5'} titleStyle={'uppercase font-bold tracking-[2.5px]'}>
                <ul className="list-['>'] p-2">
                    {data['details'].map((value, index) => {
                        if (value)
                            return (
                                <li className={'p-2.5 text-xs'} key={index}>
                                    {value}
                                </li>
                            );
                    })}
                </ul>
            </Accordion>
            <div className='px-5 py-6'>
                <h3 className='text-h3 font-cursive italic font-500 mb-10'>Why buy from us ?</h3>
                <div className={'grid grid-cols-2 content-center gap-y-8 gap-x-4 mb-10'}>
                    <div className={'text-center flex flex-col justify-center items-center'}>
                        <div className={'relative aspect-square w-20 mb-2'}>
                            <Image src={WEBASSETS + '/assets/images/icons_v1/Made-To-Measure.icon.svg'} alt='' layout={'fill'} objectFit={`contain`}/>
                        </div>
                        <p className={'font-cursive italic text-lg leading-none'}>Made To Measure</p>
                        <p className={'text-[8px] font-600 tracking-wide'}>FITS YOU LIKE A GLOVE</p>
                    </div>
                    <div className={'text-center flex flex-col justify-center items-center'}>
                        <div className={' relative aspect-square w-20 mb-2'}>
                            <Image src={WEBASSETS + '/assets/images/icons_v1/Premium-Fabric.icon.svg'} alt='' layout={'fill'} objectFit={`contain`}/>
                        </div>
                        <p className={'font-cursive italic text-lg leading-none'}>Premium Fabrics</p>
                        <p className={'text-[8px] font-600 tracking-wide'}>BREATHABLE & COMFORTABLE</p>
                    </div>
                    <div className={'text-center flex flex-col justify-center items-center'}>
                        <div className={'relative aspect-square w-20 mb-2'}>
                            <Image src={WEBASSETS + '/assets/images/icons_v1/Styling-Services.icon.svg'} alt='' layout={'fill'} objectFit={`contain`}/>
                        </div>
                        <p className={'font-cursive italic text-lg leading-none'}>Styling Services</p>
                        <p className={'text-[8px] font-600 tracking-wide'}>PERSONALISED SHOPPING</p>
                    </div>
                    <div className={'text-center flex flex-col justify-center items-center'}>
            <span className={' relative aspect-square w-20 mb-2'}>
              <Image src={WEBASSETS + '/assets/images/icons_v1/Free-Alterations.icon.svg'} alt='' layout={'fill'} objectFit={`contain`}/>
            </span>
                        <span className={'font-cursive italic text-lg leading-none'}>Free Alterations</span>
                        <span className={'text-[8px] font-600 tracking-wide'}>FIT GUARANTEE</span>
                    </div>
                </div>
                <div className={"text-center"}>
                    <Link href={"/blog/about-salt"} className={"text-center"}>
                        <a className={'text-center text-sm font-600 uppercase'}>tap to read about us</a>
                    </Link>
                </div>
            </div>
            <div className={'bg-[#EFEAE6] px-5 py-8 text-center'}>
                <span className={'block uppercase tracking-wider text-xs'}>please enter pin code</span>
                <span className={'block uppercase tracking-wider text-xs'}>to check delivery availability</span>
                <div className={'flex justify-center mt-2'}>
                    <input placeholder={'ENTER YOUR PINCODE'} className={'w-[50%] p-3.5 text-[10px] tracking-wider border-2 border-[#959595]'}
                           onChange={e => setPinCode(e.target.value)}/>
                    <div className={'text-white bg-[#d35c56] p-4 text-[10px] ml-2'} onClick={checkDelivery}>CHECK</div>
                </div>
                {(deliveryAvailable == null)
                    ? null
                    : (deliveryAvailable)
                        ? <div className={"text-green-900 font-700 text-sm mt-1"}>Delivery Available!</div>
                        : <div className={"text-red-500 font-700 text-xs mt-1"}>
                            Sorry! Delivery not available to this location.
                            <br/>
                            <Link href="/salt/contact-us" key="contact">
                                <a className={"underline text-purple-900"}> Contact Us</a>
                            </Link>
                            &nbsp;if you do not see your pincode.
                        </div>
                }
            </div>
        </div>
    );
};

export default ProductDetails;
