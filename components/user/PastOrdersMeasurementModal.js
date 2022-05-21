import {Fragment, useContext} from "react";
import AppWideContext from "../../store/AppWideContext";
import Image from "next/image"

function PastOrdersMeasurementModal ({ closeModal, isMobile, sizeByProduct }){
    const { dataStore } = useContext(AppWideContext)
    const WEBASSETS = process.env.NEXT_PUBLIC_WEBASSETS
    const getCategory=(i)=>{
        const splitItem = i.split("-")
        return splitItem[0]
    }
    const availableSizes =()=>{
        let returnValues=null
        const orderKeys=Object.keys(dataStore.userOrderHistory)
        orderKeys.forEach(key=>{
            const currentItems = dataStore.userOrderHistory[key].item
            currentItems.forEach(i=>{
                if(i.measurement && i.measurement!=""){
                    returnValues=<Fragment>
                        {returnValues}
                        <div onClick={()=>sizeByProduct(i)}>
                            <div>
                                <Image src={WEBASSETS+"/assets/"+i.asset_id+"/thumb.mob.jpg"}
                                       layout={`fill`} objectFit={`cover`} alt={i.asset_id}/>
                            </div>
                            <div>
                                <div>{getCategory(i.asset_id)}:</div>
                                <div>{i.name}</div>
                                <div>MEASUREMENTS</div>
                                <div>BUST: {i.measurement.bust}</div>
                                <div>WAIST: {i.measurement.waist}</div>
                                <div>WEARING WAIST: {i.measurement.wearing_waist}</div>
                                <div>HIPS: {i.measurement.hips}</div>
                                <div>BICEPS: {i.measurement.biceps}</div>
                                <div>HEIGHT: {i.measurement.height_f} FT {i.measurement.height_i} INCH</div>
                                <div>SHOULDER: {i.measurement.shoulder}</div>
                            </div>
                        </div>
                    </Fragment>
                }
            })
        })
    }
    const mobileView = null;
    const browserView = <Fragment>
        <div onClick={closeModal}>X</div>
        <div>TAP TO SELECT ITEM</div>
        {availableSizes()}
    </Fragment>;


    return (isMobile) ? mobileView : browserView;

}

export default PastOrdersMeasurementModal

/*
{
  "status": 200,
  "msg": "success",
  "response": {
  "1599203701210": {
  "order_id": "1599203701210",
  "order_date_time": "2020-09-04T12:45:01.210Z",
  "phone": "7739526906",
  "email": "shailaja.s@algowire.com",
  "isreturn": true,
  "total": 2450.0,
  "payable": 2530.0,
  "payment_mode": "COD",
  "payment_status": "Not Paid",
  "order_status": "Order Confirmed",
  "discount": 0.0,
  "cancel_reason": "",
  "pending_amount": 2530.0,
  "delivery_charges": 80.0,
  "billing_address": {
  "name": "Test",
  "lastname": "Test",
  "phone": "7739526906",
  "email": "shailaja.s@algowire.com",
  "address": "vikas marg",
  "landmark": "",
  "pincode": "110096",
  "city": "New Delhi",
  "state": "Delhi",
  "country": "India"
  },
  "delivery_address": {
  "name": "Test",
  "lastname": "Test",
  "phone": "7739526906",
  "email": "shailaja.s@algowire.com",
  "address": "vikas marg",
  "landmark": "",
  "pincode": "110096",
  "city": "New Delhi",
  "state": "Delhi",
  "country": "India"
  },
  "promo_code": "",
  "have_promo_discount": true,
  "ex_rate": 1.0,
  "curr_currency": "inr",
  "item": [
  {
  "is_return": false,
  "returned": false,
  "name": "Ashwem",
  "tagline": "Slit sleeve top",
  "old_product_id": "Tops-Ashwem-Slitsleevetop",
  "qty": 1,
  "size": "L",
  "color": "indigo blue",
  "measurement": "",
  "ord_status": "Order Confirmed",
  "delivery_time": "",
  "delivery_charges": "",
  "cancel_reason": "N/A",
  "delivered_by": "",
  "discount": 0,
  "price": 2450.0,
  "total": 2450.0,
  "totalpayable": 2450,
  "payment_status": "Not Paid",
  "TrackInfo": "",
  "HSN": "3204",
  "asset_id": "Tops-Ashwem-Slitsleevetop",
  "is_sale": false,
  "sale_price": null,
  "in_stock": "false"
  }
  ]
  },
  "1599203507578": {
  "order_id": "1599203507578",
  "order_date_time": "2020-09-04T12:41:47.578Z",
  "phone": "7739526906",
  "email": "shailaja.s@algowire.com",
  "isreturn": true,
  "total": 2450.0,
  "payable": 2530.0,
  "payment_mode": "COD",
  "payment_status": "Not Paid",
  "order_status": "Order Confirmed",
  "discount": 0.0,
  "cancel_reason": "",
  "pending_amount": 2530.0,
  "delivery_charges": 80.0,
  "billing_address": {
  "name": "Test",
  "lastname": "Test",
  "phone": "7739526906",
  "email": "shailaja.s@algowire.com",
  "address": "vikas marg",
  "landmark": "",
  "pincode": "110096",
  "city": "New Delhi",
  "state": "Delhi",
  "country": "India"
  },
  "delivery_address": {
  "name": "Test",
  "lastname": "Test",
  "phone": "7739526906",
  "email": "shailaja.s@algowire.com",
  "address": "vikas marg",
  "landmark": "",
  "pincode": "110096",
  "city": "New Delhi",
  "state": "Delhi",
  "country": "India"
  },
  "promo_code": "",
  "have_promo_discount": true,
  "ex_rate": 1.0,
  "curr_currency": "inr",
  "item": [
  {
  "is_return": false,
  "returned": false,
  "name": "Ashwem",
  "tagline": "Slit sleeve top",
  "old_product_id": "Tops-Ashwem-Slitsleevetop",
  "qty": 1,
  "size": "L",
  "color": "indigo blue",
  "measurement": "",
  "ord_status": "Order Confirmed",
  "delivery_time": "",
  "delivery_charges": "",
  "cancel_reason": "N/A",
  "delivered_by": "",
  "discount": 0,
  "price": 2450.0,
  "total": 2450.0,
  "totalpayable": 2450,
  "payment_status": "Not Paid",
  "TrackInfo": "",
  "HSN": "3204",
  "asset_id": "Tops-Ashwem-Slitsleevetop",
  "is_sale": false,
  "sale_price": null,
  "in_stock": "false"
  }
  ]
  }
 */