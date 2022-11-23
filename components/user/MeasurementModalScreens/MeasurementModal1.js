import React, {useRef, useState} from 'react';
import {biceps, bicepsCM, bicepsOptions, heightCMOptions, heightF, heightFOptions, heightIOptions, shoulder, shoulderCM, shoulderOptions} from "./dropdownOptions";
import {cmToInch, cmToInchP, inchToCm} from "../../../helpers/unitConverter";

function MeasurementModal1({closeModal, isMobile, measurement, updateValues, nextModal, lastModal, product, edit, setCurrentMeasurement, unit, setUnit}) {
    const labelMessage = {
        bust: {offFocus: 'BUST', onFocus: <span className={"text-[8px] bg-white"}>(MEASURE AROUND THE FULLEST PART OF YOUR CHEST)</span>},
        waist: {
            offFocus: 'WAIST',
            onFocus: <span className={"text-[8px] bg-white"}>(MEASURE ACROSS THE NATURAL CURVE OF YOUR WAIST. THIS IS USUALLY ABOVE THE BELLY BUTTON)</span>
        },
        wearing_waist: {
            offFocus: 'WEARING WAIST',
            onFocus: <span className={"text-[8px] bg-white"}>(MEASURE WHERE PANTS NORMALLY SIT. THIS IS USUALLY ON OR BELOW THE BELLY BUTTON)</span>
        },
        hips: {offFocus: 'HIPS', onFocus: <span className={"text-[8px] bg-white"}>(MEASURE AT THE FULLEST PART OF YOUR HIPS)</span>},
    };
    const textArea = useRef(null);
    const [bust, setBust] = useState(labelMessage.bust.offFocus);
    const [waist, setWaist] = useState(labelMessage.waist.offFocus);
    const [wearing_waist, setWearing_waist] = useState(labelMessage.wearing_waist.offFocus);
    const [hips, setHips] = useState(labelMessage.hips.offFocus);
    const [showPlaceholder, setShowPlaceholder] = useState(true)


    const blockClass = 'flex flex-col items-center max-w-max';
    const labelClass = 'text-xs font-700';
    const inputSelect = 'font-600 text-xs focus:ring-transparent focus:border-black';
    const inputSelectMobile = 'font-600 text-xs h-[35px] py-1 border-[#a8a8a8] focus:ring-transparent focus:border-[#a8a8a8]';
    const inputField = 'w-[105px] border border-black bg-white placeholder:text-black focus:bg-white focus:ring-transparent focus:border-black';
    const inputFieldMobile = edit ? inputField : 'w-[100px] border-2 border-[#997756] bg-white placeholder:text-slate/400 focus:ring-transparent focus:border-[#997756] px-1 py-1 text-sm';
    const textField = 'w-full h-full bg-white placeholder:text-slate/400 focus:ring-transparent focus:border-current px-1 py-1 text-sm';
    const textFieldMobile = edit ? textField : 'w-full h-full border-2 border-[#997756] bg-white placeholder:text-slate/400 focus:ring-transparent focus:border-[#997756] px-1 py-1 text-sm';

    const setFocus = (flag) => {
        if (flag) {
            textArea.current.focus();
        }
        setShowPlaceholder(false)
    }

    const mobileView = (
        <div className={'bg-black/60 h-screen fixed inset-0 z-modal grid place-items-center ' + [edit || "py-[8%] px-[3%]"]} onClick={closeModal}>
            <div className={'bg-white h-full w-full relative flex flex-col overflow-hidden ' + [edit || " border-4 border-[#b3aeab] text-[#997756] rounded-[10vw]"]}
                 onClick={(e) => e.stopPropagation()}>
                <div className='overflow-auto flex-1 px-5'>
                    <button className='absolute top-0 right-8 text-2xl z-50' onClick={closeModal}>
                        X
                    </button>
                    <div className='text-center my-5'>
                        <p className='font-cursive italic text-3xl mb-2'>Step 1/{product.is_customize ? 5 : 2}</p>
                        <p className={'tracking-wider leading-tight ' + [edit ? "text-sm text-[#606060]" : "text-lg font-900 "]}>MEASUREMENT AS PER YOUR SELECTION</p>
                    </div>
                    <p className='text-center uppercase mb-5'>
                        <span className={"cursor-pointer " + [unit !== "inch" ? "text-[#777]" : "font-600"]} onClick={() => setUnit("inches")}>inches</span> /
                        <span className={"cursor-pointer " + [unit !== "cm" ? "text-[#777]" : "font-600"]} onClick={() => setUnit("cm")}>cm</span>
                    </p>
                    <div className='measurementBlock1__sizes__mob relative !h-[465px]'>
                        <ul className={"text-center"}>
                            <li className={"my-2.5 relative"}>
                                <p className={labelClass}>SHOULDER</p>
                                <select className={inputSelectMobile} name='shoulder' value={measurement.shoulder} onChange={(e) => updateValues('shoulder', e.target.value)}>
                                    {shoulderOptions()}
                                </select>
                                {measurement.shoulder === 'custom' || (measurement.shoulder !== '' && !shoulder.includes(measurement.shoulder)) ? (
                                    <div className={"absolute right-0 bottom-0"}>
                                        <input
                                            className={inputFieldMobile}
                                            name='shoulder_o'
                                            type='text'
                                            value={measurement.shoulder === 'custom' ? '' : measurement.shoulder}
                                            onChange={(e) => updateValues('shoulder', e.target.value)}
                                        />
                                    </div>
                                ) : null}
                            </li>
                            <li className={"my-2.5 h-[8px]"}/>
                            <li className={"my-2.5 relative"}>
                                <p className={labelClass}>
                                    {bust}
                                </p>
                                <input
                                    className={inputFieldMobile}
                                    name='bust'
                                    type='text'
                                    value={measurement.bust}
                                    placeholder='inches'
                                    onChange={(e) => updateValues('bust', e.target.value)}
                                    onFocus={() => setBust(labelMessage.bust.onFocus)}
                                    onBlur={() => setBust(labelMessage.bust.offFocus)}
                                />
                                <div className={"absolute right-0 top-0 z-10"}>
                                    <p className={labelClass}>BICEPS</p>
                                    <select className={inputSelectMobile} name='biceps' value={measurement.biceps} onChange={(e) => updateValues('biceps', e.target.value)}>
                                        {bicepsOptions()}
                                    </select>
                                </div>
                            </li>
                            <li className={"text-right"}>
                                <input
                                    className={inputFieldMobile + [measurement.biceps === 'custom' || (measurement.biceps !== '' && !biceps.includes(measurement.biceps)) ? "" : " invisible"]}
                                    name='biceps_o' type='text' value={measurement.biceps === 'custom' ? '' : measurement.biceps}
                                    onChange={(e) => updateValues('biceps', e.target.value)}/>
                            </li>
                            <li>
                                <p className={labelClass}>
                                    {waist}
                                </p>
                                <input
                                    className={inputFieldMobile}
                                    name='waist'
                                    type='text'
                                    value={measurement.waist}
                                    placeholder={unit}
                                    onChange={(e) => updateValues('waist', e.target.value)}
                                    onFocus={() => setWaist(labelMessage.waist.onFocus)}
                                    onBlur={() => setWaist(labelMessage.waist.offFocus)}
                                />
                            </li>
                            <li className={"mt-2"}>
                                <p className={labelClass}>
                                    {wearing_waist}
                                </p>
                                <input
                                    className={inputFieldMobile}
                                    name='wearing_waist'
                                    type='text'
                                    value={measurement.wearing_waist}
                                    placeholder={unit}
                                    onChange={(e) => updateValues('wearing_waist', e.target.value)}
                                    onFocus={() => setWearing_waist(labelMessage.wearing_waist.onFocus)}
                                    onBlur={() => setWearing_waist(labelMessage.wearing_waist.offFocus)}
                                />
                            </li>
                            <li className={"mt-2"}>
                                <p className={labelClass}>
                                    {hips}
                                </p>
                                <input
                                    className={inputFieldMobile}
                                    name='hips'
                                    type='text'
                                    value={measurement.hips}
                                    placeholder={unit}
                                    onChange={(e) => updateValues('hips', e.target.value)}
                                    onFocus={() => setHips(labelMessage.hips.onFocus)}
                                    onBlur={() => setHips(labelMessage.hips.offFocus)}
                                />
                            </li>
                        </ul>
                    </div>
                    <div className={'text-center'}>
                        <span className={labelClass + ' text-sm mr-4'}>HEIGHT:</span>
                        <select className={inputSelectMobile + ' mr-2 w-[90px]'} name='height_f' value={measurement.height_f}
                                onChange={(e) => updateValues('height_f', e.target.value)}>
                            {heightFOptions()}
                        </select>
                        <select className={inputSelectMobile + " w-[90px]"} name='height_i' value={measurement.height_i} onChange={(e) => updateValues('height_i', e.target.value)}>
                            {heightIOptions()}
                        </select>
                        {measurement.height_f === 'custom' || (measurement.height_f !== '' && !heightF.includes(measurement.height_f)) ? (
                            <div className={"ml-12 mt-2"}>
                                <input
                                    className={inputFieldMobile + " mr-2 w-[80px]"}
                                    name='height_f_o'
                                    type='text'
                                    placeholder={"ft"}
                                    value={measurement.height_f === 'custom' ? '' : measurement.height_f}
                                    onChange={(e) => updateValues('height_f', e.target.value)}
                                />
                                <input
                                    className={inputFieldMobile + " w-[80px]"}
                                    name='height_i_o'
                                    type='text'
                                    placeholder={"in"}
                                    value={measurement.height_i}
                                    onChange={(e) => updateValues('height_i', e.target.value)}
                                />
                            </div>
                        ) : null}
                    </div>
                    <div className='my-10 flex flex-col items-center'>
                        <p className='font-700 text-center'>ANY PARTICULAR BODY PART YOU BOTHER ABOUT?</p>
                        <div className={"relative w-[75%] mt-2"} onClick={() => setFocus(true)}>
                                 <textarea
                                     ref={textArea}
                                     className={textFieldMobile}
                                     value={measurement.others}
                                     rows={4}
                                     onChange={(e) => updateValues('others', e.target.value)}
                                     onBlur={() => setShowPlaceholder(true)}
                                 />
                            {
                                measurement.others ? "" : showPlaceholder && <div className={"absolute top-0 left-0 w-full h-full py-4 font-500"}>
                                    <p className="text-center font-cursive italic">(e.g.: fuller biceps, tummy) </p>
                                    <p className="uppercase text-center mt-2">Anything at all</p>
                                </div>
                            }
                        </div>
                    </div>
                </div>
                <div className='bg-white text-center grid grid-cols-2'>
                    {
                        edit || <div className='bg-[#E5D5C5] py-2 cursor-pointer' onClick={lastModal}>
                            <button className='font-600'>&lt; BACK</button>
                            <p className='text-xs uppercase'>SELECT MEASUREMENTS</p>
                        </div>
                    }
                    <div className={'cursor-pointer font-600' + [edit && " col-span-2 border-t-2 py-2"]} onClick={nextModal}>
                        <button className='font-600'>NEXT &gt;</button>
                        <p className='text-xs uppercase'>{product.is_customize ? "FIT DETAILS" : "SIZE REVIEW"}</p>
                    </div>
                </div>
            </div>
        </div>
    );

    const browserView = (
        <div className='bg-black/60 h-screen w-screen fixed inset-0 z-50 grid place-items-center py-[8%] px-[10%]' onClick={closeModal}>
            <div className='bg-white border-2 border-black relative h-full w-[920px] flex flex-col' onClick={(e) => e.stopPropagation()}>
                <div className='overflow-auto flex-1 max-h-[72vh]'>
                    <button className='absolute top-0 right-8 text-2xl z-50' onClick={closeModal}>
                        X
                    </button>
                    <div className='text-center my-5'>
                        <p className='font-cursive italic text-3xl mb-2'>Step 1/{product.is_customize ? 5 : 2}</p>
                        <p className='text-lg font-500 text-[#777]'>MEASUREMENT AS PER YOUR SELECTION</p>
                    </div>
                    <p className='text-center uppercase mb-5'>
                        <span className={"cursor-pointer " + [unit !== "inches" ? "text-[#777]" : "font-600"]} onClick={() => setUnit("inches")}>inches</span> /
                        <span className={"cursor-pointer " + [unit !== "cm" ? "text-[#777]" : "font-600"]} onClick={() => setUnit("cm")}>cm</span>
                    </p>
                    <div className='measurementBlock1__sizes relative min-h-[20rem]'>
                        <div className={'absolute top-[7%] left-5'}>
                            <p className={labelClass + ' text-sm mb-4'}>HEIGHT:</p>
                            {
                                unit === "cm" ?
                                    <select className={inputSelect + ' mr-2'} name='height_f' value={measurement.height_cm}
                                            onChange={(e) => {
                                                let inch = cmToInch(e.target.value)
                                                let ft = Math.floor(inch / 12)
                                                inch = inch - (ft * 12)
                                                setCurrentMeasurement({...measurement, height_f: ft, height_i: inch, height_cm: e.target.value})
                                            }}>
                                        {heightCMOptions()}
                                    </select>
                                    :
                                    <>
                                        <select className={inputSelect + ' mr-2'} name='height_f' value={measurement.height_f}
                                                onChange={(e) => {
                                                    setCurrentMeasurement({
                                                        ...measurement,
                                                        height_f: e.target.value,
                                                        height_cm: inchToCm((e.target.value * 12) + parseInt(measurement.height_i))
                                                    })
                                                }}>
                                            {heightFOptions()}
                                        </select>
                                        <select className={inputSelect} name='height_i' value={measurement.height_i} onChange={(e) => {
                                            setCurrentMeasurement({
                                                ...measurement,
                                                height_i: e.target.value,
                                                height_cm: inchToCm((parseInt(measurement.height_f) * 12) + parseInt(e.target.value))
                                            })
                                        }}>
                                            {heightIOptions()}
                                        </select>
                                        <div>
                                            {measurement.height_f === 'custom' || (measurement.height_f !== '' && !heightF.includes(measurement.height_f.toString())) ? (
                                                <div className={"mt-2"}>
                                                    <input
                                                        className={inputField + " mr-2"}
                                                        name='height_f_o'
                                                        type='text'
                                                        placeholder={"ft"}
                                                        value={measurement.height_f === 'custom' ? '' : measurement.height_f}
                                                        onChange={(e) => updateValues('height_f', e.target.value)}
                                                    />
                                                    <input
                                                        className={inputField}
                                                        name='height_i_o'
                                                        type='text'
                                                        placeholder={"in"}
                                                        value={measurement.height_i}
                                                        onChange={(e) => updateValues('height_i', e.target.value)}
                                                    />
                                                </div>
                                            ) : null}
                                        </div>
                                    </>
                            }

                        </div>
                        <div className={blockClass + ' absolute top-[7%] left-1/2 -translate-x-1/2'}>
                            <p className={labelClass}>SHOULDER</p>
                            <select className={inputSelect} name='shoulder' value={unit === "cm" ? measurement.shoulder_cm : measurement.shoulder}
                                    onChange={(e) => {
                                        if (e.target.value === "custom") {
                                            setCurrentMeasurement({...measurement, shoulder: e.target.value, shoulder_cm: e.target.value})
                                        } else if (unit === "inches") {
                                            setCurrentMeasurement({...measurement, shoulder: e.target.value, shoulder_cm: inchToCm(e.target.value)})
                                        } else {
                                            setCurrentMeasurement({...measurement, shoulder: cmToInchP(e.target.value, 1), shoulder_cm: e.target.value})
                                        }
                                    }}>
                                {shoulderOptions(unit)}
                            </select>
                            <span className={"absolute bottom-0 left-full ml-2"}>
                                {measurement.shoulder === 'custom' || (measurement.shoulder !== '' && !(unit === "cm" ? shoulderCM.includes(measurement.shoulder_cm.toString()) : shoulder.includes(measurement.shoulder.toString()))) ? (
                                    <input
                                        className={inputField}
                                        name='shoulder_o'
                                        type='text'
                                        value={measurement.shoulder === 'custom' ? '' : unit === "cm" ? measurement.shoulder_cm : measurement.shoulder}
                                        onChange={(e) => {
                                            if (unit === "inches") {
                                                setCurrentMeasurement({...measurement, shoulder: e.target.value, shoulder_cm: inchToCm(e.target.value)})
                                            } else {
                                                setCurrentMeasurement({...measurement, shoulder: cmToInchP(e.target.value, 1), shoulder_cm: e.target.value})
                                            }
                                        }}
                                    />
                                ) : null}
                            </span>
                        </div>
                        <div className={blockClass + ' absolute top-[23%] left-1/2 -translate-x-1/2'}>
                            <label className={labelClass} htmlFor='bust'>
                                {bust}
                            </label>
                            <input
                                className={inputField}
                                name='bust'
                                type='text'
                                value={unit === "cm" ? inchToCm(measurement.bust) : measurement.bust}
                                placeholder={unit}
                                onChange={(e) => updateValues('bust', unit === "cm" ? cmToInch(e.target.value) : e.target.value)}
                                onFocus={() => setBust(labelMessage.bust.onFocus)}
                                onBlur={() => setBust(labelMessage.bust.offFocus)}
                            />
                        </div>
                        <div className={blockClass + ' absolute top-[23%] left-[77%] -translate-x-1/2'}>
                            <p className={labelClass}>BICEPS</p>
                            <select className={inputSelect} name='biceps' value={unit === "cm" ? inchToCm(measurement.biceps) : measurement.biceps}
                                    onChange={(e) => updateValues('biceps', unit === "cm" ? cmToInch(e.target.value) : e.target.value)}>
                                {bicepsOptions(unit)}
                            </select>
                            <span className={"absolute bottom-0 left-full ml-2"}>
                                {measurement.biceps === 'custom' || (measurement.biceps !== '' && !(unit === "cm" ? bicepsCM.includes(inchToCm(measurement.biceps).toString()) : biceps.includes(measurement.biceps.toString()))) ? (
                                    <input className={inputField} name='biceps_o' type='text'
                                           value={measurement.biceps === 'custom' ? '' : unit === "cm" ? inchToCm(measurement.biceps) : measurement.biceps}
                                           onChange={(e) => updateValues('biceps', unit === "cm" ? cmToInch(e.target.value) : e.target.value)}/>
                                ) : null}
                            </span>
                        </div>
                        <div className={blockClass + ' absolute top-[43%] left-1/2 -translate-x-1/2 w-5/6'}>
                            <label className={labelClass} htmlFor='waist'>
                                {waist}
                            </label>
                            <input
                                className={inputField}
                                name='waist'
                                type='text'
                                value={unit === "cm" ? inchToCm(measurement.waist) : measurement.waist}
                                placeholder={unit}
                                onChange={(e) => updateValues('waist', unit === "cm" ? cmToInch(e.target.value) : e.target.value)}
                                onFocus={() => setWaist(labelMessage.waist.onFocus)}
                                onBlur={() => setWaist(labelMessage.waist.offFocus)}
                            />
                        </div>
                        <div className={blockClass + ' absolute top-[53%] left-1/2 -translate-x-1/2 w-5/6'}>
                            <label className={labelClass} htmlFor='wearing_waist'>
                                {wearing_waist}
                            </label>
                            <input
                                className={inputField}
                                name='wearing_waist'
                                type='text'
                                value={unit === "cm" ? inchToCm(measurement.wearing_waist) : measurement.wearing_waist}
                                placeholder={unit}
                                onChange={(e) => updateValues('wearing_waist', unit === "cm" ? cmToInch(e.target.value) : e.target.value)}
                                onFocus={() => setWearing_waist(labelMessage.wearing_waist.onFocus)}
                                onBlur={() => setWearing_waist(labelMessage.wearing_waist.offFocus)}
                            />
                        </div>
                        <div className={blockClass + ' absolute top-[65%] left-1/2 -translate-x-1/2'}>
                            <label className={labelClass} htmlFor='hips'>
                                {hips}
                            </label>
                            <input
                                className={inputField}
                                name='hips'
                                type='text'
                                value={unit === "cm" ? inchToCm(measurement.hips) : measurement.hips}
                                placeholder={unit}
                                onChange={(e) => updateValues('hips', unit === "cm" ? cmToInch(e.target.value) : e.target.value)}
                                onFocus={() => setHips(labelMessage.hips.onFocus)}
                                onBlur={() => setHips(labelMessage.hips.offFocus)}
                            />
                        </div>
                    </div>

                    <div className='my-10 flex flex-col items-center'>
                        <p className='font-700 text-[#555]'>ANY PARTICULAR BODY PART YOU BOTHER ABOUT?</p>
                        <div className={"relative w-[25%] mt-2"} onClick={() => setFocus(true)}>
                                 <textarea
                                     ref={textArea}
                                     className={textField}
                                     value={measurement.others}
                                     rows={4}
                                     onChange={(e) => updateValues('others', e.target.value)}
                                     onBlur={() => setShowPlaceholder(true)}
                                 />
                            {
                                measurement.others ? "" : showPlaceholder && <div className={"absolute top-0 left-0 w-full h-full py-4 font-500"}>
                                    <p className="text-center font-cursive italic">(e.g.: fuller biceps, tummy) </p>
                                    <p className="uppercase text-center mt-2">Anything at all</p>
                                </div>
                            }
                        </div>
                    </div>
                </div>
                <div className='bg-white text-center grid grid-cols-2'>
                    <div className='bg-[#606060] py-2 cursor-pointer text-white' onClick={lastModal}>
                        <button className='font-600'>&lt; BACK</button>
                        <p className='text-xs uppercase'>SELECT MEASUREMENTS</p>
                    </div>
                    <div className='cursor-pointer font-600 text-[#777]' onClick={nextModal}>
                        <button className='font-600'>NEXT &gt;</button>
                        <p className='text-xs uppercase'>{product.is_customize ? "FIT DETAILS" : "SIZE REVIEW"}</p>
                    </div>
                </div>
            </div>
        </div>
    );

    return isMobile ? mobileView : browserView;
}

export default MeasurementModal1;
