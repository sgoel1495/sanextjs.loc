import { Fragment } from "react";
import Link from "next/link";

function MeasurementBlock({ measurement, index, mobile }) {
    //<MeasurementBlock measurement={dataStore.userMeasurements[key]} index={index} mobile={dataStore.mobile} />
    const mobileView = null;
    const browserView = <Fragment>
        <div>
            <div>{index}. Measurement Profile</div>
            <div>Measurement ID: {measurement.measure_id}</div>
            <div>Bust: {measurement.bust}</div>
            <div>Waist: {measurement.waist}</div>
            <div>Hips: {measurement.hips}</div>
            <div>Height: {measurement.height_f}ft {measurement.height_i}inch(es)</div>
            <div>Biceps: {measurement.biceps}</div>
            <div>Wearing Waist: {measurement.wearing_waist}</div>
            <div>Shoulder: {measurement.shoulder}</div>
            <div>Others: {measurement.others}</div>
        </div>
        <div>
            <Link href={"/users/measurements/edit/" + index.toString()}><a>EDIT</a></Link>
        </div>
        <div>
            <Link href={"/users/measurements/delete/" + index.toString()}><a>DELETE</a></Link>
        </div>
    </Fragment>

    return (mobile) ? mobileView : browserView;
}

export default MeasurementBlock;

/*
{
  "measure_id": "",
  "bust": "",
  "waist": "",
  "hips": "",
  "height_f": "",
  "height_i" : "",
  "wearing_waist": "",
  "biceps": "",
  "fitting": "",
  "abdomen": "",
  "biceps_fit": "",
  "others": "",
  "shoulder": "",
  "length": "",
  "size": "",
  "bre_size": "",
  "bra_size_other": "",
  "jeans_pant": "",
  "jeans_pant_other": "",
  "brand_top": "",
  "brand_top_other": "",
  "brand_top_size": "",
  "brand_top_size_other": "",
  "brand_pant": "",
  "brand_pant_other": "",
  "brand_pant_size": "",
  "brand_pant_size_other": "",
  "brand_dress": "",
  "brand_dress_other": "",
  "brand_dress_size": "",
  "brand_dress_size_other": "",
  "selected_sleeve": "",
  "selected_length": ""
}

 */