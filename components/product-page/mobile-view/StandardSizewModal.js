import React, { useContext } from 'react';
import AppWideContext from '../../../store/AppWideContext';

function StandardSizeModal({ closeModal, standardSizes, setSizeModal }) {
  const { dataStore, updateDataStore } = useContext(AppWideContext);
  return (
    <div className={['h-screen fixed inset-0 z-modal grid place-items-center p-[2.5%] py-[5%]']} onClick={closeModal}>
      <div className='bg-white border-[1.2vw] border-[#b3aeab] text-[#997756] rounded-[10vw] h-full w-full relative flex flex-col' onClick={(e) => e.stopPropagation()}>
        <button className='absolute top-2 right-5 text-2xl z-50' onClick={closeModal}>
          X
        </button>
        <div className='overflow-auto flex-1 text-center'>
          <h6 className='text-base font-semibold pt-16 pb-5'>PLEASE SELECT A SIZE</h6>
          <div className='sizes-details pt-[5%] pb-[20%] text-center'>
            <span className='text-sm pb-2'>Measurements in inches</span>
            <table className="size_guide_table">
                        <thead>
                            <tr>
                                <th>Size</th>
                                <th>BUST</th>
                                <th>HIPS</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <th>XS</th>
                                <td>32&quot;</td>
                                <td>35&quot;</td>
                            </tr>
                            <tr>
                                <th>S</th>
                                <td>34&quot;</td>
                                <td>37&quot;</td>
                            </tr>
                            <tr>
                                <th>M</th>
                                <td>36&quot;</td>
                                <td>39&quot;</td>
                            </tr>
                            <tr>
                                <th>L</th>
                                <td>38&quot;</td>
                                <td>41&quot;</td>
                            </tr>
                            <tr>
                                <th>L</th>
                                <td>40&quot;</td>
                                <td>43&quot;</td>
                            </tr>
                            <tr>
                                <th>XXL</th>
                                <td>42&quot;</td>
                                <td>45&quot;</td>
                            </tr>
                        </tbody>
                    </table>
            {/* {standardSizes.map((item, index) => {
              return (             
              );
            })} */}
            <span onClick={() => { setSizeModal(true) }} className='uppercase tracking-widest text-xs'>whats my size ?</span>
          </div>
          <button
            className={'border-[#997756] bg-white border-[3px] text-center px-6 py-2.5 mx-auto leading-none rounded-[5vw]'}
            onClick={() => {
              setShowStandardSize(!showStandardSize);
            }}
          >
            <p className={'uppercase font-900 text-xs'}>Save Size</p>
          </button>
        </div>
      </div>
    </div >
  );
}
export default StandardSizeModal;
