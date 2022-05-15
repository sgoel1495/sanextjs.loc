import {Fragment, useState} from "react";

function MeasurementModal2({closeModal, isMobile, measurement, setMeasurement, lastModal, nextModal, saveModal}) {
    const [refresh, setRefresh] = useState(true);
    const labelMessage = {
        "bust": {"offFocus": "BUST", "onFocus": "(MEASURE AROUND THE FULLEST PART OF YOUR CHEST)"},
        "waist": {
            "offFocus": "WAIST",
            "onFocus": "(MEASURE ACROSS THE NATURAL CURVE OF YOUR WAIST. THIS IS USUALLY ABOVE THE BELLY BUTTON)"
        },
        "wearing_waist": {
            "offFocus": "WEARING WAIST",
            "onFocus": "(MEASURE WHERE PANTS NORMALLY SIT. THIS IS USUALLY ON OR BELOW THE BELLY BUTTON)"
        },
        "hips": {"offFocus": "HIPS", "onFocus": "(MEASURE AT THE FULLEST PART OF YOUR HIPS)"}
    }
    const [bust, setBust] = useState(bust.offFocus);
    const [waist, setWaist] = useState(waist.offFocus);
    const [wearing_waist, setWearing_waist] = useState(wearing_waist.offFocus);
    const [hips, setHips] = useState(hips.offFocus);

    const updateValues = (key, value) => {
        measurement[key] = value;
        setMeasurement(measurement);
        setRefresh(refresh);
    }

    const braSizeOptions = () => {
        let returnValues = <option value="">Select</option>;
        const sizes = [
            "30 C", "30 D", "30 DD", "30 E", "30 F", "30 FF", "30G", "30 H",
            "32 A", "32 B", "32 C", "32 D", "32 DD", "32 E", "32 F", "32 G", "32 H",
            "34 A", "34 B", "34 C", "34 D", "34 DD", "34 E", "34 F", "34 FF", "34 G",
            "36 B", "36 C", "36 D", "36 DD", "36 E", "36 F", "36 FF", "36 G", "36 H",
            "38 B", "38 C", "38 D", "38 DD", "38 E", "38 F", "38 FF", "38 G", "38 H",
            "40 A", "40 B", "40 C"
        ]
        sizes.forEach(size => {
            returnValues = <Fragment>
                {returnValues}
                <option value={size}>{size}</option>
            </Fragment>
        })

        returnValues = <Fragment>
            {returnValues}
            <option value="custom">Other</option>
        </Fragment>

        return returnValues;
    }
    const jeansPantSizeOptions = () => {
        let returnValues = <option value="">Select</option>
        for (let x = 26; x < 40; x += 2)
            returnValues = <Fragment>
                {returnValues}
                <option value={x.toString()}>{x}</option>
            </Fragment>

        returnValues = <Fragment>
            {returnValues}
            <option value="custom">Other</option>
        </Fragment>

        return returnValues
    }

    const brandOptions = () => {
        let returnValues = <option value="">Select</option>;
        const brands = [
            "Marks & Sprencer's","Zara","H&M","Allen Sally","Van Heusen","Vero Moda","Mango"
        ]
        brands.forEach(brand => {
            returnValues = <Fragment>
                {returnValues}
                <option value={brand}>{brand}</option>
            </Fragment>
        })

        returnValues = <Fragment>
            {returnValues}
            <option value="custom">Other</option>
        </Fragment>

        return returnValues;
    }
    const sizeOptions = () => {
        let returnValues = <option value="">Select</option>;
        const sizes = [
            "UK 6","UK 8","UK 10","UK 12","UK 14","UK 16","UK 18",
            "EU 34","EU 36","EU 38","EU 40","EU 42","EU 44","EU 46",
            "x-Small","Medium","Large","X-Large"
        ]
        sizes.forEach(size => {
            returnValues = <Fragment>
                {returnValues}
                <option value={size}>{size}</option>
            </Fragment>
        })

        returnValues = <Fragment>
            {returnValues}
            <option value="custom">Other</option>
        </Fragment>

        return returnValues;
    }

    const mobileView = null;
    const browserView = <Fragment>
        <div>
            Step 2/3
            <span>SIZE REVIEW</span>
        </div>
        <div>
            <div>WHAT'S YOUR TYPICAL SIZE?</div>
            <div>
                <label htmlFor="bre_size">BRA SIZE:</label>
                <select name="bre_size" value={measurement.bre_size}
                        onChange={e => updateValues("bre_size", e.target.value)}>
                    {braSizeOptions()}
                </select>
                {(measurement.bre_size == "custom")
                    ? <input name="bra_size_other" type="text" value={measurement.bra_size_other}
                             onChange={e => updateValues("bra_size_other", e.target.value)}/>
                    : null
                }
            </div>
            <div>
                <label htmlFor="jeans_pant">JEANS/PANT SIZE:</label>
                <select name="jeans_pant" value={measurement.jeans_pant}
                        onChange={e => updateValues("jeans_pant", e.target.value)}>
                    {jeansPantSizeOptions()}
                </select>
                {(measurement.jeans_pant == "custom")
                    ? <input name="jeans_pant_other" type="text" value={measurement.jeans_pant_other}
                             onChange={e => updateValues("jeans_pant_other", e.target.value)}/>
                    : null
                }
            </div>
        </div>

        <div>
            <div>ANY STANDARD SIZES OR BRANDS THAT FIT YOU CLOSEST?</div>
            <div>
                <div>FOR TOPS</div>
                <div>
                    <label htmlFor="brand_top">BRAND NAME:</label>
                    <select name="brand_top" value={measurement.brand_top}
                            onChange={e => updateValues("brand_top", e.target.value)}>
                        {brandOptions()}
                    </select>
                    {(measurement.brand_top == "custom")
                        ? <input name="brand_top_other" type="text" value={measurement.brand_top_other}
                                 onChange={e => updateValues("brand_top_other", e.target.value)}/>
                        : null
                    }
                </div>
                <div>
                    <label htmlFor="brand_top_size">SIZES:</label>
                    <select name="brand_top_size" value={measurement.brand_top_size}
                            onChange={e => updateValues("brand_top_size", e.target.value)}>
                        {sizeOptions()}
                    </select>
                    {(measurement.brand_top_size == "custom")
                        ? <input name="brand_top_size_other" type="text" value={measurement.brand_top_size_other}
                                 onChange={e => updateValues("brand_top_size_other", e.target.value)}/>
                        : null
                    }
                </div>
            </div>
            <div>
                <div>FOR PANTS</div>
                <div>
                    <label htmlFor="brand_pant">BRAND NAME:</label>
                    <select name="brand_pant" value={measurement.brand_pant}
                            onChange={e => updateValues("brand_pant", e.target.value)}>
                        {brandOptions()}
                    </select>
                    {(measurement.brand_pant == "custom")
                        ? <input name="brand_pant_other" type="text" value={measurement.brand_pant_other}
                                 onChange={e => updateValues("brand_pant_other", e.target.value)}/>
                        : null
                    }
                </div>
                <div>
                    <label htmlFor="brand_pant_size">SIZES:</label>
                    <select name="brand_pant_size" value={measurement.brand_pant_size}
                            onChange={e => updateValues("brand_pant_size", e.target.value)}>
                        {sizeOptions()}
                    </select>
                    {(measurement.brand_pant_size == "custom")
                        ? <input name="brand_pant_size_other" type="text" value={measurement.brand_pant_size_other}
                                 onChange={e => updateValues("brand_pant_size_other", e.target.value)}/>
                        : null
                    }
                </div>
            </div>
            <div>
                <div>FOR DRESSES</div>
                <div>
                    <label htmlFor="brand_dress">BRAND NAME:</label>
                    <select name="brand_dress" value={measurement.brand_dress}
                            onChange={e => updateValues("brand_dress", e.target.value)}>
                        {brandOptions()}
                    </select>
                    {(measurement.brand_dress == "custom")
                        ? <input name="brand_dress_other" type="text" value={measurement.brand_dress_other}
                                 onChange={e => updateValues("brand_dress_other", e.target.value)}/>
                        : null
                    }
                </div>
                <div>
                    <label htmlFor="brand_dress_size">SIZES:</label>
                    <select name="brand_dress_size" value={measurement.brand_dress_size}
                            onChange={e => updateValues("brand_dress_size", e.target.value)}>
                        {sizeOptions()}
                    </select>
                    {(measurement.brand_dress_size == "custom")
                        ? <input name="brand_dress_size_other" type="text" value={measurement.brand_dress_size_other}
                                 onChange={e => updateValues("brand_dress_size_other", e.target.value)}/>
                        : null
                    }
                </div>
            </div>
        </div>

        <div>
            <div onClick={lastModal()}>
                &lt; BACK
            </div>
            <span>REVIEW</span>
            <div onClick={nextModal()}>
                NEXT &gt;
            </div>
            <span>REVIEW</span>
        </div>
    </Fragment>

    return (isMobile) ? mobileView : browserView;
}

export default MeasurementModal2;