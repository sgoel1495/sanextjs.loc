import {Fragment, useState} from "react";

function MeasurementModal1({closeModal, isMobile, measurement, setMeasurement, nextModal, saveModal}){
    const [refresh,setRefresh]=useState(true);

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
                <option value={x.toString()}>x</option>
            </Fragment>

        return returnValues
    }

    const shoulderOptions = ()=>{
        let returnValues=<option value="">Select</option>
        for(let x=13;x<17.5;x=x+0.5)
            returnValues=<Fragment>
                {returnValues}
                <option value={x.toString()}>x</option>
            </Fragment>

        returnValues=<Fragment>
            {returnValues}
            <option value="custom">Other</option>
        </Fragment>

        return returnValues
    }

    const mobileView = null;
    const browserView = <Fragment>
        <div>
            Height:
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
            Shoulder
            <select name="shoulder" value={measurement.shoulder} onChange={e=>updateValues("shoulder",e.target.value)}>
                {shoulderOptions()}
            </select>
            {(measurement.shoulder=="custom")
                ?<input name="shoulder_o" type="text" value={(measurement.shoulder=="custom")?"":measurement.shoulder}
                        onChange={e=>updateValues("height_f",e.target.value)} />
                :null
            }
        </div>
    </Fragment>

    return (isMobile) ? mobileView : browserView;
}
export default MeasurementModal1;