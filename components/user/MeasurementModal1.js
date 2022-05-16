import {Fragment, useState} from "react";

function MeasurementModal1({closeModal, isMobile, measurement, updateValues, nextModal}){
    const [refresh,setRefresh]=useState(true);
    const labelMessage = {
        "bust": {"offFocus":"BUST","onFocus":"(MEASURE AROUND THE FULLEST PART OF YOUR CHEST)"},
        "waist": {"offFocus":"WAIST","onFocus":"(MEASURE ACROSS THE NATURAL CURVE OF YOUR WAIST. THIS IS USUALLY ABOVE THE BELLY BUTTON)"},
        "wearing_waist": {"offFocus":"WEARING WAIST","onFocus":"(MEASURE WHERE PANTS NORMALLY SIT. THIS IS USUALLY ON OR BELOW THE BELLY BUTTON)"},
        "hips": {"offFocus":"HIPS","onFocus":"(MEASURE AT THE FULLEST PART OF YOUR HIPS)"}
    }
    const [bust,setBust]=useState(labelMessage.bust.offFocus);
    const [waist,setWaist]=useState(labelMessage.waist.offFocus);
    const [wearing_waist,setWearing_waist]=useState(labelMessage.wearing_waist.offFocus);
    const [hips,setHips]=useState(labelMessage.hips.offFocus);

    const heightF=["4","5","6"]
    const heightFOptions = ()=>{
        let returnValues = <option value="">Select Ft</option>;
        heightF.forEach(hf => {
            returnValues = <Fragment>
                {returnValues}
                <option value={hf}>{hf}</option>
            </Fragment>
        })

        returnValues = <Fragment>
            {returnValues}
            <option value="custom">Other</option>
        </Fragment>

        return returnValues;
    }

    const heightI=[
        "0","1","2","3","4","5","6","7","8","9",
        "10","11"
    ]
    const heightIOptions = ()=>{
        let returnValues = <option value="">Select Inch</option>;
        heightI.forEach(hf => {
            returnValues = <Fragment>
                {returnValues}
                <option value={hf}>{hf}</option>
            </Fragment>
        })

        returnValues = <Fragment>
            {returnValues}
            <option value="custom">Other</option>
        </Fragment>

        return returnValues;
    }
    const shoulder=[
        "13","13.5","14","14.5","15","15.5","16","16.5","17"
    ]
    const shoulderOptions = ()=>{
        let returnValues = <option value="">Select</option>;
        shoulder.forEach(hf => {
            returnValues = <Fragment>
                {returnValues}
                <option value={hf}>{hf}</option>
            </Fragment>
        })

        returnValues = <Fragment>
            {returnValues}
            <option value="custom">Other</option>
        </Fragment>

        return returnValues;
    }

    const biceps=[
        "10","11","12","13","14","15","16","17","18","19","20"
    ]
    const bicepsOptions = ()=>{
        let returnValues = <option value="">Select</option>;
        biceps.forEach(hf => {
            returnValues = <Fragment>
                {returnValues}
                <option value={hf}>{hf}</option>
            </Fragment>
        })

        returnValues = <Fragment>
            {returnValues}
            <option value="custom">Other</option>
        </Fragment>

        return returnValues;
    }

    console.log("Shoulder",measurement.shoulder);
    console.log("Biceps",measurement.bisceps);

    const mobileView = null;
    const browserView = <Fragment>
        <div onClick={closeModal}>X</div>
        <div>
            Step 1/3
            <span>MEASUREMENT AS PER YOUR SELECTION</span>
        </div>
        <div>
            HEIGHT:
            <select name="height_f" value={measurement.height_f} onChange={e=>updateValues("height_f",e.target.value)}>
                {heightFOptions()}
            </select>
            {(measurement.height_f=="custom" || (measurement.height_f!="" && !heightF.includes(measurement.height_f)))
                ?<input name="height_f_o" type="text" value={(measurement.height_f=="custom")?"":measurement.height_f}
                        onChange={e=>updateValues("height_f",e.target.value)} />
                :null
            }
            <select name="height_i" value={measurement.height_i} onChange={e=>updateValues("height_i",e.target.value)}>
                {heightIOptions()}
            </select>
        </div>
        <div>
            SHOULDER
            <select name="shoulder" value={measurement.shoulder} onChange={e=>updateValues("shoulder",e.target.value)}>
                {shoulderOptions()}
            </select>
            {(measurement.shoulder=="custom" || (measurement.shoulder=="" && !shoulder.includes(measurement.shoulder)))
                ?<input name="shoulder_o" type="text" value={(measurement.shoulder=="custom")?"":measurement.shoulder}
                        onChange={e=>updateValues("shoulder",e.target.value)} />
                :null
            }
        </div>
        <div>
            <label htmlFor="bust">{bust}</label>
            <input name="bust" type="text" value={measurement.bust} placeholder="inches"
                   onChange={e=>updateValues("bust",e.target.value)}
                   onFocus={()=>setBust(labelMessage.bust.onFocus)} onBlur={()=>setBust(labelMessage.bust.offFocus)}
            />
        </div>
        <div>
            BICEPS
            <select name="biceps" value={measurement.biceps} onChange={e=>updateValues("biceps",e.target.value)}>
                {bicepsOptions()}
            </select>
            {(measurement.biceps=="custom" || (measurement.biceps!="" && !biceps.includes(measurement.biceps)))
                ?<input name="biceps_o" type="text" value={(measurement.biceps=="custom")?"":measurement.biceps}
                        onChange={e=>updateValues("biceps",e.target.value)} />
                :null
            }
        </div>
        <div>
            <label htmlFor="waist">{waist}</label>
            <input name="waist" type="text" value={measurement.waist} placeholder="inches"
                   onChange={e=>updateValues("waist",e.target.value)}
                   onFocus={()=>setWaist(labelMessage.waist.onFocus)} onBlur={()=>setWaist(labelMessage.waist.offFocus)}
            />
        </div>
        <div>
            <label htmlFor="wearing_waist">{wearing_waist}</label>
            <input name="wearing_waist" type="text" value={measurement.wearing_waist} placeholder="inches"
                   onChange={e=>updateValues("wearing_waist",e.target.value)}
                   onFocus={()=>setWearing_waist(labelMessage.wearing_waist.onFocus)} onBlur={()=>setWearing_waist(labelMessage.wearing_waist.offFocus)}
            />
        </div>
        <div>
            <label htmlFor="hips">{hips}</label>
            <input name="hips" type="text" value={measurement.hips} placeholder="inches"
                   onChange={e=>updateValues("hips",e.target.value)}
                   onFocus={()=>setHips(labelMessage.hips.onFocus)} onBlur={()=>setHips(labelMessage.hips.offFocus)}
            />
        </div>
        <div>
            ANY PARTICULAR BODY PART YOU BOTHER ABOUT?
            <div onClick={nextModal}>
                NEXT &gt;
                <span>Size Review</span>
            </div>
        </div>
    </Fragment>

    return (isMobile) ? mobileView : browserView;
}
export default MeasurementModal1;