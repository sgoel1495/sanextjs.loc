import { Fragment, useState } from "react";

function MeasurementModal1({ closeModal, isMobile, measurement, updateValues, nextModal, lastModal, product }) {
    const [refresh, setRefresh] = useState(true);
    const labelMessage = {
        "bust": { "offFocus": "BUST", "onFocus": "(MEASURE AROUND THE FULLEST PART OF YOUR CHEST)" },
        "waist": { "offFocus": "WAIST", "onFocus": "(MEASURE ACROSS THE NATURAL CURVE OF YOUR WAIST. THIS IS USUALLY ABOVE THE BELLY BUTTON)" },
        "wearing_waist": { "offFocus": "WEARING WAIST", "onFocus": "(MEASURE WHERE PANTS NORMALLY SIT. THIS IS USUALLY ON OR BELOW THE BELLY BUTTON)" },
        "hips": { "offFocus": "HIPS", "onFocus": "(MEASURE AT THE FULLEST PART OF YOUR HIPS)" }
    }
    const [bust, setBust] = useState(labelMessage.bust.offFocus);
    const [waist, setWaist] = useState(labelMessage.waist.offFocus);
    const [wearing_waist, setWearing_waist] = useState(labelMessage.wearing_waist.offFocus);
    const [hips, setHips] = useState(labelMessage.hips.offFocus);

    const heightF = ["4", "5", "6"]
    const heightFOptions = () => {
        let returnValues = <option className={inputSelect} value="">Select Ft</option>;
        heightF.forEach(hf => {
            returnValues = <Fragment>
                {returnValues}
                <option className={inputSelect} value={hf}>{hf}</option>
            </Fragment>
        })

        returnValues = <Fragment>
            {returnValues}
            <option className={inputSelect} value="custom">Other</option>
        </Fragment>

        return returnValues;
    }

    const heightI = [
        "0", "1", "2", "3", "4", "5", "6", "7", "8", "9",
        "10", "11"
    ]
    const heightIOptions = () => {
        let returnValues = <option className={inputSelect} value="">Select Inch</option>;
        heightI.forEach(hf => {
            returnValues = <Fragment>
                {returnValues}
                <option className={inputSelect} value={hf}>{hf}</option>
            </Fragment>
        })

        returnValues = <Fragment>
            {returnValues}
            <option className={inputSelect} value="custom">Other</option>
        </Fragment>

        return returnValues;
    }
    const shoulder = [
        "13", "13.5", "14", "14.5", "15", "15.5", "16", "16.5", "17"
    ]
    const shoulderOptions = () => {
        let returnValues = <option className={inputSelect} value="">Select</option>;
        shoulder.forEach(hf => {
            returnValues = <Fragment>
                {returnValues}
                <option className={inputSelect} value={hf}>{hf}</option>
            </Fragment>
        })

        returnValues = <Fragment>
            {returnValues}
            <option className={inputSelect} value="custom">Other</option>
        </Fragment>

        return returnValues;
    }

    const biceps = [
        "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20"
    ]
    const bicepsOptions = () => {
        let returnValues = <option className={inputSelect} value="">Select</option>;
        biceps.forEach(hf => {
            returnValues = <Fragment>
                {returnValues}
                <option className={inputSelect} value={hf}>{hf}</option>
            </Fragment>
        })

        returnValues = <Fragment>
            {returnValues}
            <option className={inputSelect} value="custom">Other</option>
        </Fragment>

        return returnValues;
    }

    const blockClass = "flex flex-col items-center max-w-max";
    const labelClass = "text-xs font-700";
    const inputSelect = "font-600 text-xs focus:ring-transparent focus:border-black";
    const inputField = "w-[105px] border border-black bg-[#f1f2f3] placeholder:font-600 placeholder:text-black focus:bg-white focus:ring-transparent focus:border-black";

    const mobileView = null;
    const browserView = (
        <div className="bg-black/60 h-screen w-screen fixed inset-0 z-50 grid place-items-center py-[5%] px-[10%]" onClick={closeModal}>
            <div className="bg-white border-2 border-black relative h-[720px] w-[920px] flex flex-col" onClick={e => e.stopPropagation()}>
                <div className="overflow-auto flex-1">
                    <button className="absolute top-0 right-8 text-2xl z-50" onClick={closeModal}>X</button>
                    <div className="text-center my-5">
                        <p className="font-cursive italic text-3xl mb-2">Step 1/3</p>
                        <p className="text-lg font-500 text-[#777]">MEASUREMENT AS PER YOUR SELECTION</p>
                    </div>
                    <div className="measurementBlock1__sizes relative">
                        <div className={"absolute top-[7%] left-5"}>
                            <p className={labelClass + " text-sm mb-4"}>HEIGHT:</p>
                            <select className={inputSelect + ' mr-2'} name="height_f" value={measurement.height_f} onChange={e => updateValues("height_f", e.target.value)}>
                                {heightFOptions()}
                            </select>
                            {(measurement.height_f == "custom" || (measurement.height_f != "" && !heightF.includes(measurement.height_f)))
                                ? <input className={inputField} name="height_f_o" type="text" value={(measurement.height_f == "custom") ? "" : measurement.height_f}
                                    onChange={e => updateValues("height_f", e.target.value)} />
                                : null
                            }
                            <select className={inputSelect} name="height_i" value={measurement.height_i} onChange={e => updateValues("height_i", e.target.value)}>
                                {heightIOptions()}
                            </select>
                        </div>
                        <div className={blockClass + " absolute top-[7%] left-1/2 -translate-x-1/2"}>
                            <p className={labelClass}>SHOULDER</p>
                            <select className={inputSelect} name="shoulder" value={measurement.shoulder} onChange={e => updateValues("shoulder", e.target.value)}>
                                {shoulderOptions()}
                            </select>
                            {(measurement.shoulder == "custom" || (measurement.shoulder != "" && !shoulder.includes(measurement.shoulder)))
                                ? <input className={inputField} name="shoulder_o" type="text" value={(measurement.shoulder == "custom") ? "" : measurement.shoulder}
                                    onChange={e => updateValues("shoulder", e.target.value)} />
                                : null
                            }
                        </div>
                        <div className={blockClass + " absolute top-[23%] left-1/2 -translate-x-1/2"}>
                            <label className={labelClass} htmlFor="bust">{bust}</label>
                            <input className={inputField} name="bust" type="text" value={measurement.bust} placeholder="inches"
                                onChange={e => updateValues("bust", e.target.value)}
                                onFocus={() => setBust(labelMessage.bust.onFocus)} onBlur={() => setBust(labelMessage.bust.offFocus)}
                            />
                        </div>
                        <div className={blockClass + " absolute top-[23%] left-[77%] -translate-x-1/2"}>
                            <p className={labelClass}>BICEPS</p>
                            <select className={inputSelect} name="biceps" value={measurement.biceps} onChange={e => updateValues("biceps", e.target.value)}>
                                {bicepsOptions()}
                            </select>
                            {(measurement.biceps == "custom" || (measurement.biceps != "" && !biceps.includes(measurement.biceps)))
                                ? <input className={inputField} name="biceps_o" type="text" value={(measurement.biceps == "custom") ? "" : measurement.biceps}
                                    onChange={e => updateValues("biceps", e.target.value)} />
                                : null
                            }
                        </div>
                        <div className={blockClass + " absolute top-[43%] left-1/2 -translate-x-1/2 w-5/6"}>
                            <label className={labelClass} htmlFor="waist">{waist}</label>
                            <input className={inputField} name="waist" type="text" value={measurement.waist} placeholder="inches"
                                onChange={e => updateValues("waist", e.target.value)}
                                onFocus={() => setWaist(labelMessage.waist.onFocus)} onBlur={() => setWaist(labelMessage.waist.offFocus)}
                            />
                        </div>
                        <div className={blockClass + " absolute top-[53%] left-1/2 -translate-x-1/2 w-5/6"}>
                            <label className={labelClass} htmlFor="wearing_waist">{wearing_waist}</label>
                            <input className={inputField} name="wearing_waist" type="text" value={measurement.wearing_waist} placeholder="inches"
                                onChange={e => updateValues("wearing_waist", e.target.value)}
                                onFocus={() => setWearing_waist(labelMessage.wearing_waist.onFocus)} onBlur={() => setWearing_waist(labelMessage.wearing_waist.offFocus)}
                            />
                        </div>
                        <div className={blockClass + " absolute top-[65%] left-1/2 -translate-x-1/2"}>
                            <label className={labelClass} htmlFor="hips">{hips}</label>
                            <input className={inputField} name="hips" type="text" value={measurement.hips} placeholder="inches"
                                onChange={e => updateValues("hips", e.target.value)}
                                onFocus={() => setHips(labelMessage.hips.onFocus)} onBlur={() => setHips(labelMessage.hips.offFocus)}
                            />
                        </div>
                    </div>

                    <div className="my-10 flex flex-col items-center">
                        <p className="font-700 text-[#555]">ANY PARTICULAR BODY PART YOU BOTHER ABOUT?</p>
                    </div>
                </div>
                {(product)
                    ? <div className="bg-white text-center grid grid-cols-2">
                        <div className="bg-[#606060] py-2 cursor-pointer text-white" onClick={lastModal}>
                            <button className="font-600">&lt; BACK</button>
                            <p className="text-xs uppercase">SELECT MEASUREMENTS</p>
                        </div>
                        <div className="cursor-pointer font-600 text-[#777]" onClick={nextModal}>
                            <button className="font-600">NEXT &gt;</button>
                            <p className="text-xs uppercase">SIZE REVIEW</p>
                        </div>
                    </div>
                    : <div className="bg-white py-3 text-center flex flex-col items-center">
                        <div className="cursor-pointer font-600 text-[#777]" onClick={nextModal}>
                            <button className="font-600">NEXT &gt;</button>
                            <p className="text-xs uppercase">Size Review</p>
                        </div>
                    </div>
                }
            </div>
        </div>
    )

    return (isMobile) ? mobileView : browserView;
}
export default MeasurementModal1;