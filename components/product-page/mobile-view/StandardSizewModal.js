import React, { useContext } from 'react';
import AppWideContext from '../../../store/AppWideContext';

function StandardSizeModal({ closeModal, standardSizes, setSizeModal }) {
    const { dataStore, updateDataStore } = useContext(AppWideContext);
    return (
      <div className={['bg-black/60 h-screen fixed inset-0 z-50 grid place-items-center py-[8%] px-[10%]']} onClick={closeModal}>
        <div className='bg-white border-2 border-black w-[360px] relative h-full flex flex-col' style={{ color: '#997567' }} onClick={(e) => e.stopPropagation()}>
          <button className='absolute top-0 right-8 text-2xl z-50' onClick={closeModal}>
            X
          </button>
          <div className='overflow-auto flex-1'>
            <h6 className='text-base font-semibold pt-10 pb-5 pl-20'>PLEASE SELECT A SIZE</h6>
            <div className='sizes-details'>
              <span className='pl-24 text-sm pb-2'>Measurements in inches</span>
              <ul className={'flex flex-row justify-evenly pt-2'}>
                <li className='sub-major-li odd sub-major-li-size'>
                  <span>SIZE</span>
                  <span className='pl-3'>|</span>
                </li>
                <li className=''>
                  <span>BUST</span>
                </li>{' '}
                <li className=''>
                  <span>HIPS</span>
                </li>
              </ul>
  
              {standardSizes.map((item, index) => {
                return (<ul key={index} className={'flex flex-row justify-evenly pt-2'}>
                <li className=''>
                  <span>{item.size}</span>
                  <span className='pl-3'>|</span>
                </li>
                <li className=''>
                  <span>{item.bust}</span>
                </li>{' '}
                <li className=''>
                  <span>{item.hips}</span>
                </li>
              </ul>);
              })}
              <span onClick={()=>{setSizeModal(true)}} className='uppercase tracking-widest text-xs pl-24 '>whats my size ?</span>
              <div
                className={'border-4 border-white bg-[#faede3] shadow-xl text-center mx-24 mt-4 px-6 py-2.5 leading-none rounded-[5vw] w-max'}
                onClick={() => {
                  setShowStandardSize(!showStandardSize);
                }}
              >
                <p className={'uppercase font-900 text-xs'}>Save Size</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
  export default StandardSizeModal;
  