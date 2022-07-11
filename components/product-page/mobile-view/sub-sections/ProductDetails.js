import React, { useContext, useState } from 'react';
import ReactDom from 'react-dom';
import WishListButton from '../../../common/WishListButton';
import AppWideContext from '../../../../store/AppWideContext';
import appSettings from '../../../../store/appSettings';
import Image from 'next/image';
import Accordion from '../../../common/accordion';
import SizeGuide from '../../SizeGuide';
import MeasurementModal0 from '../../../user/MeasurementModal0';
import MeasurementModal1 from '../../../user/MeasurementModal1';
import MeasurementModal2 from '../../../user/MeasurementModal2';
import MeasurementModal3 from '../../../user/MeasurementModal3';
import StandardSizeModal from '../StandardSizewModal'

const ProductDetails = ({ data, hpid }) => {
  const WEBASSETS = process.env.NEXT_PUBLIC_WEBASSETS;

  const { dataStore } = useContext(AppWideContext);
  const currCurrency = dataStore.currCurrency;
  const currencyData = appSettings('currency_data');
  const currencySymbol = currencyData[currCurrency].curr_symbol;
  const [showStandardSize, setShowStandardSize] = useState(false);
  const [selectedSize, setSelectedSize] = useState(null);
  const [showModal0, setShowModal0] = useState(false);
  const [showModal1, setShowModal1] = useState(false);
  const [showModal2, setShowModal2] = useState(false);
  const [showModal3, setShowModal3] = useState(false);
  const [showModalPastOrders, setShowModalPastOrders] = useState(false);
  const [currentProduct, setCurrentProduct] = useState(null);
  const [currentMeasureProduct, setCurrentMeasurementProduct] = useState(null);
  const [currentMeasurement, setCurrentMeasurement] = useState(null);
  const [sizeModal, setSizeModal] = useState(false);

  let feature_icons = {};

  data.icon_assets.forEach((icon) => {
    feature_icons = { ...feature_icons, ...icon };
  });
  const nextModal = () => {
    if (showModal0) {
      setShowModal0(false);
      setShowModal1(true);
      setShowModal2(false);
      setShowModal3(false);
    } else if (showModal1) {
      setShowModal0(false);
      setShowModal1(false);
      setShowModal2(true);
      setShowModal3(false);
    } else if (showModal2) {
      setShowModal0(false);
      setShowModal1(false);
      setShowModal2(false);
      setShowModal3(true);
    }
  };
  const lastModal = () => {
    if (showModal1) {
      setShowModal0(true);
      setShowModal1(false);
      setShowModal2(false);
      setShowModal3(false);
    } else if (showModal2) {
      setShowModal0(false);
      setShowModal1(true);
      setShowModal2(false);
      setShowModal3(false);
    } else if (showModal3) {
      setShowModal1(false);
      setShowModal1(false);
      setShowModal2(true);
      setShowModal3(false);
    }
  };
  const updateValues = (key, value) => {
    currentMeasurement[key] = value;
    setCurrentMeasurement(currentMeasurement);
    setRefresh(!refresh);
  };
  const addNewModal = (m) => {
    setCurrentProduct(data);
    setCurrentMeasurement(m);
    nextModal();
  };
  const pastOrdersModal = () => {
    setShowModal0(false);
    setShowModal1(false);
    setShowModal2(false);
    setShowModal3(false);
    setShowModalPastOrders(true);
  };
  const closeModal = () => {
    setShowStandardSize(false);
    setShowModal0(false);
    setShowModal1(false);
    setShowModal2(false);
    setShowModal3(false);
    setShowModalPastOrders(false);
  };
  const addTailorToCart = async () => {};
  const saveModal = async () => {
    // if (currentMeasurement.measure_id == "") {
    //     // add new
    //     currentMeasurement.measure_id = getNewKey();
    // } else {
    //     //case update - we simply remove and add
    //     await delMeasurement(currentMeasurement)
    // }
    // if(dataStore.userData.contact) {
    //     // we have a valid user
    //     await apiCall("addMeasurements", dataStore.apiToken, {
    //         "user": getUserO(dataStore),
    //         "measurments": currentMeasurement
    //     })
    //     // update DataStore
    //     await refreshDataStore()
    // } else {
    //     //non logged in case
    //     dataStore.userMeasurements[currentMeasurement.measure_id]=currentMeasurement
    //     updateDataStore("userMeasurements",dataStore.userMeasurements)
    // }
    // closeModal()
  };

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
            <WishListButton pid={hpid} />
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
                    <Image src={WEBASSETS + feature_icons[key]} alt='' layout={'fill'} objectFit={`cover`} />
                  </div>
                  <p className={'text-[10px] uppercase leading-none'}>{key.replace('9_', '9-').replace(/_/g, ' ')}</p>
                </div>
              );
            })}
        </div>
        <div className={'flex flex-col items-center'}>
          <p className={'text-sm font-800 tracking-widest uppercase mb-4'}>select a size</p>
          <div className={'inline-flex items-center gap-6 mb-5'}>
            <div
              className={'border-4 border-white bg-[#faede3] shadow-xl text-center px-4 py-2.5 leading-none rounded-[5vw]'}
              onClick={() => {
                setShowStandardSize(!showStandardSize);
              }}
            >
              <p className={'uppercase font-900 text-xs'}>standard</p>
              <p className={' uppercase font-400 text-xs'}>size</p>
            </div>
            <p className={''}>OR</p>
            <div
              className={'border-4 border-white bg-[#faede3] shadow-xl text-center px-4 py-2.5 leading-none rounded-[5vw]'}
              onClick={() => {
                setShowModal0(true);
              }}
            >
              <p className={'uppercase font-900 text-xs'}>Tailored</p>
              <p className={'uppercase font-400 text-xs'}>size</p>
            </div>
          </div>
          <p className={'mb-4 uppercase'}>size guide</p>
          <button className={'bg-[#4eb16d] mb-10 uppercase text-white font-900 text-xs text-center rounded-2xl py-4 px-10 tracking-widest shadow-lg'}>add to bag</button>
          <p className={'text-xs mb-5 uppercase'}>return policy</p>
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
              <Image src={WEBASSETS + '/assets/images/icons_v1/Made-To-Measure.icon.svg'} alt='' layout={'fill'} objectFit={`contain`} />
            </div>
            <p className={'font-cursive italic text-lg leading-none'}>Made To Measure</p>
            <p className={'text-[8px] font-600 tracking-wide'}>FITS YOU LIKE A GLOVE</p>
          </div>
          <div className={'text-center flex flex-col justify-center items-center'}>
            <div className={' relative aspect-square w-20 mb-2'}>
              <Image src={WEBASSETS + '/assets/images/icons_v1/Premium-Fabric.icon.svg'} alt='' layout={'fill'} objectFit={`contain`} />
            </div>
            <p className={'font-cursive italic text-lg leading-none'}>Premium Fabrics</p>
            <p className={'text-[8px] font-600 tracking-wide'}>BREATHABLE & COMFORTABLE</p>
          </div>
          <div className={'text-center flex flex-col justify-center items-center'}>
            <div className={'relative aspect-square w-20 mb-2'}>
              <Image src={WEBASSETS + '/assets/images/icons_v1/Styling-Services.icon.svg'} alt='' layout={'fill'} objectFit={`contain`} />
            </div>
            <p className={'font-cursive italic text-lg leading-none'}>Styling Services</p>
            <p className={'text-[8px] font-600 tracking-wide'}>PERSONALISED SHOPPING</p>
          </div>
          <div className={'text-center flex flex-col justify-center items-center'}>
            <span className={' relative aspect-square w-20 mb-2'}>
              <Image src={WEBASSETS + '/assets/images/icons_v1/Free-Alterations.icon.svg'} alt='' layout={'fill'} objectFit={`contain`} />
            </span>
            <span className={'font-cursive italic text-lg leading-none'}>Free Alterations</span>
            <span className={'text-[8px] font-600 tracking-wide'}>FIT GUARANTEE</span>
          </div>
        </div>
        <p className={'text-center text-sm font-600 uppercase'}>tap to read about us</p>
      </div>
      <div className={'bg-[#EFEAE6] px-5 py-8 text-center'}>
        <span className={'block uppercase tracking-wider text-xs'}>please enter pin code</span>
        <span className={'block uppercase tracking-wider text-xs'}>to check delivery availability</span>
        <div className={'flex justify-center mt-2'}>
          <input placeholder={'ENTER YOUR PINCODE'} className={'w-[50%] p-3.5 text-[10px] tracking-wider border-2 border-[#959595]'} />
          <div className={'text-white bg-[#d35c56] p-4 text-[10px] ml-2'}>CHECK</div>
        </div>
      </div>
      {sizeModal && ReactDom.createPortal(<SizeGuide closeModal={() => setSizeModal(false)} isMobile={dataStore.isMobile} />, document.getElementById('measurementmodal'))}
      {showStandardSize &&
        ReactDom.createPortal(
          <StandardSizeModal
            closeModal={closeModal.bind(this)}
            standardSizes={[
              { size: 'XS', bust: '32', hips: '35' },
              { size: 'S', bust: '34', hips: '37' },
            ]}
          />,
          document.getElementById('measurementmodal'),
        )}
      {showModal0 &&
        ReactDom.createPortal(
          <MeasurementModal0 closeModal={closeModal.bind(this)} isMobile={true} addNew={addNewModal.bind(this)} pastOrders={pastOrdersModal.bind(this)} measureProduct={currentMeasureProduct} />,
          document.getElementById('measurementmodal'),
        )}
      {showModal1 &&
        ReactDom.createPortal(
          <MeasurementModal1
            closeModal={closeModal.bind(this)}
            isMobile={true}
            measurement={currentMeasurement}
            lastModal={lastModal.bind(this)}
            nextModal={nextModal.bind(this)}
            updateValues={updateValues.bind(this)}
            product={currentProduct}
          />,
          document.getElementById('measurementmodal'),
        )}
      {showModal2 &&
        ReactDom.createPortal(
          <MeasurementModal2
            closeModal={closeModal.bind(this)}
            isMobile={true}
            measurement={currentMeasurement}
            nextModal={nextModal.bind(this)}
            lastModal={lastModal.bind(this)}
            updateValues={updateValues.bind(this)}
            product={currentProduct}
          />,
          document.getElementById('measurementmodal'),
        )}
      {showModal3 &&
        ReactDom.createPortal(
          <MeasurementModal3
            closeModal={closeModal.bind(this)}
            isMobile={true}
            measurement={currentMeasurement}
            lastModal={lastModal.bind(this)}
            saveModal={saveModal.bind(this)}
            addTailorToCart={addTailorToCart.bind(this)}
            product={currentProduct}
          />,
          document.getElementById('measurementmodal'),
        )}
    </div>
  );
};

export default ProductDetails;
