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

    return (
        <div>
            <div className='px-5 pt-5'>
                <div className={'flex justify-between mb-10'}>
                    <div className='leading-none'>
                        <p className={''}>Share</p>
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
                                <span>We're sorry, this item is temporarily SOLD OUT!</span>
                                <span>We can notify you when back in stock.</span>
                                <NotifyMe name={data.name}/>
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
