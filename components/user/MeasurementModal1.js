import {Fragment, useState} from "react";

function MeasurementModal1({closeModal, isMobile, measurement, setMeasurement, nextModal}){
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

    const updateValues=(key, value)=>{
        measurement[key]=value;
        setMeasurement(measurement);
        setRefresh(refresh);
    }
    const heightFOptions = ()=>{
        return <Fragment>
            <option value="">Select Ft</option>
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="6">6</option>
            <option value="custom">Other</option>
        </Fragment>
    }

    const heightIOptions = ()=>{
        let returnValues=<option value="">Select Inch</option>
        for(let x=0;x<12;x++)
            returnValues=<Fragment>
                {returnValues}
                <option value={x.toString()}>{x}</option>
            </Fragment>

        return returnValues
    }

    const shoulderOptions = ()=>{
        let returnValues=<option value="">Select</option>
        for(let x=13;x<17.5;x+=0.5)
            returnValues=<Fragment>
                {returnValues}
                <option value={x.toString()}>{x}</option>
            </Fragment>

        returnValues=<Fragment>
            {returnValues}
            <option value="custom">Other</option>
        </Fragment>

        return returnValues
    }


    const bicepsOptions = ()=>{
        let returnValues=<option value="">Select</option>
        for(let x=10;x<21;x++)
            returnValues=<Fragment>
                {returnValues}
                <option value={x.toString()}>{x}</option>
            </Fragment>

        returnValues=<Fragment>
            {returnValues}
            <option value="custom">Other</option>
        </Fragment>

        return returnValues
    }

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
            {(measurement.height_f=="custom")
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
            {(measurement.shoulder=="custom")
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
            {(measurement.biceps=="custom")
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