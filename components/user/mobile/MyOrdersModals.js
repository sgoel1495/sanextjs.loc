import React, {useContext, useEffect} from 'react';
import StarSVG from "./StarSVG";
import AppWideContext from "../../../store/AppWideContext";
import {apiCall} from "../../../helpers/apiCall";
import {connect} from "react-redux";

const MyOrdersModals = ({data, index, itemIndex, setShowModal, setToastMsg, isMobile, getOrderHistory, appConfig, userData}) => {
    const [fit, setFit] = React.useState(0)
    const [fabric, setFabric] = React.useState(0)
    const [service, setService] = React.useState(0)
    const [comment, setComment] = React.useState("")
    const [userAddresses, setUserAddresses] = React.useState([])
    const [address, setAddress] = React.useState("-1")
    const [reason, setReason] = React.useState("")
    const [trackingData, setTrackingData] = React.useState({})

    useEffect(() => {
        apiCall("userAddresses", appConfig.apiToken, {user: {email: userData.userServe.email}})
            .then(pData => {
                if (pData.status === 200 && pData.response) {
                    setUserAddresses(pData.response)
                }
            })
            .catch(e => console.log(e.message))
    }, [userData.userServe.email, appConfig.apiToken]);

    const getData = () => {
        let body;
        if (index === 2) {
            body = {
                "user_params": {
                    "email": userData.userServe.email,
                    "index": itemIndex,
                    "order_id": data.order_id,
                    "phone": userData.userServe.phone_number,
                    "prod_id": data.item[itemIndex].asset_id
                },
            }
            apiCall("getRating", appConfig.apiToken, body).then(resp => {
                if (resp.msg === "data found") {
                    setFit(resp.review.fit_rating)
                    setFabric(resp.review.fabric_rating)
                    setService(resp.review.service_rating)
                    setComment(resp.review.review)
                }
            })
        }
        if (index === 4) {
            body = {
                "tracking_params": {
                    "order_id": data.order_id,
                    "item_index": itemIndex
                }
            }
            apiCall("getTrackingInfo", appConfig.apiToken, body).then(resp => {
                console.log(resp)
                if (resp.status === 200) {
                    setTrackingData(resp.track_info)
                }
            })
        }
    }
    React.useEffect(() => {
        getData()
    }, [])

    const saveRating = () => {
        if (fit === 0) {
            setToastMsg("Please Rate for Fit.")
            return
        }
        if (fabric === 0) {
            setToastMsg("Please Rate for Fabric Quality.")
            return
        }
        if (service === 0) {
            setToastMsg("Please Rate for SALT Service.")
            return
        }
        let body = {
            "review_params": {
                "fab_rate": fabric,
                "fit_rate": fit,
                "serv_rate": service,
                "index": itemIndex,
                "order_id": data.order_id,
                "phone": userData.userServe.phone_number,
                "prod_id": data.item[itemIndex].asset_id,
                "review": comment,
                "user_id": userData.userServe.email
            },
        }
        apiCall("saveRating", appConfig.apiToken, body)
        setToastMsg("Thank you so much. Your review has been saved")
        setShowModal(false)
    }

    const changeAddress = () => {
        apiCall("editShippingAddress", appConfig.apiToken, {
            "order_id": data.order_id,
            "address": userAddresses[address],
        })
        setTimeout(() => {
            getOrderHistory()
        }, 1000)
        setShowModal(false)
    }

    const cancelOrder = () => {
        apiCall("cancelOrder", appConfig.apiToken, {
            "user":
                {
                    "order_id": data.order_id,
                    "item_index": itemIndex,
                    "reason": reason,
                    "token": "b16ee1b2bcb512f67c3bca5fac24a924fcc2241bcbfe19ddfdde33ecd24114a0"
                }
        })
        setTimeout(() => {
            getOrderHistory()
        }, 1000)
        setShowModal(false)
    }

    const element = [
        {
            innerHTML: (
                <>
                    <span
                        className={"absolute -top-1 right-1"}
                        onClick={() => {
                            setShowModal(false)
                        }}
                    >
                        X
                    </span>
                    <h1 className={"text-3xl mb-5"}>Edit Shipping Address</h1>
                    <div className={"flex flex-col text-xs font-600"}>
                        <span className={"flex flex-col"}>
                            Shipping Address
                            <span> {data.delivery_address.name} {data.delivery_address.lastname}<br/>{data.delivery_address.address}</span>
                            <span>{data.delivery_address.landmark}</span>
                            <span>{data.delivery_address.city}, {data.delivery_address.state}, {data.delivery_address.zip_code}</span>
                            <span>{data.delivery_address.country}</span>
                        </span>
                        <span className="my-3"> T :{data.delivery_address.phone} </span>
                    </div>

                    <div className={"flex flex-col text-[#5f6061]"}>
                        <label className={"text-xs"}>Choose Address</label>
                        <select name="cars" id="cars" placeholder={"Please Select Address"} onChange={(e) => setAddress(e.target.value)}>
                            <option value="-1">Please Select Address</option>
                            {
                                userAddresses.map((item, index) => {
                                    return <option value={index} key={index}>{item.address},{item.city},{item.state},{item.zip_code}</option>
                                })
                            }
                        </select>

                    </div>
                    <button
                        onClick={changeAddress}
                        className="bg-black px-4 py-1.5 text-white uppercase text-sm font-500 shadow-md my-10">
                        save
                    </button>
                </>
            ),
            style: "h-[90vh] p-6"
        },
        {
            innerHTML: (
                <>
                    <span
                        className={"absolute top-1 right-2 p-2"}
                        onClick={() => {
                            setShowModal(false)
                        }}
                    >
                        X
                    </span>
                    <div className={"flex flex-col my-5"}>
                        <div className={"uppercase text-center flex flex-col px-10"}>
                            <h1 className={"my-5 uppercase text-[#333333] font-600"}>Rating and Review</h1>
                            <span className={"text-[#333333] text-[15px]"}>
                                (#{data.order_id})
                            </span>
                            <span className={"text-[#333333] font-800 text-[15px]"}>
                                {data.item[itemIndex].name}
                            </span>
                        </div>
                        <div className={"w-full h-full flex flex-col gap-4"}>
                            <div className={"flex flex-between"}>
                                <label className={"flex-1 text-[#777] font-800"}>Fit</label>
                                <StarSVG type={"fiveStarRating"} onChange={setFit} value={fit}/>
                            </div>
                            <div className={"flex flex-between"}>
                                <label className={"flex-1 text-[#777] font-800"}>Fabric Quality</label>
                                <StarSVG type={"fiveStarRating"} onChange={setFabric} value={fabric}/>
                            </div>
                            <div className={"flex flex-between"}>
                                <label className={"flex-1 text-[#777] font-800"}>SALT Customer Service</label>
                                <StarSVG type={"fiveStarRating"} onChange={setService} value={service}/>
                            </div>
                            <textarea placeholder={"Other..."} name="" id="" cols="10" rows="2" onChange={e => setComment(e.target.value)} value={comment}/>
                        </div>
                    </div>
                    <div className={"text-center"}>
                        <button
                            onClick={saveRating}
                            className="bg-black text-base font-900 px-4 py-1.5 text-white uppercase text-sm font-500 shadow-md my-10"
                        >
                            submit
                        </button>
                    </div>
                </>
            ),
            style: isMobile ? "p-3" : "p-8"
        },
        {
            innerHTML: (
                <>
                    <span
                        className={"absolute -top-1 right-1 p-3"}
                        onClick={() => {
                            setShowModal(false)
                        }}
                    >
                        X
                    </span>
                    <div className={"flex flex-col"}>
                        <div className={"text-[#333] text-sm font-700 mt-5"}>Are you sure you want to cancel your order: {data.order_id}?</div>
                        <input
                            type="text"
                            placeholder={"Any specific reason you want to cancel your order?*"}
                            className={" mt-10 placeholder:text-black bg-[#F1F2F3] text-sm"}
                            onChange={(e) => setReason(e.target.value)}
                            value={reason}
                        />
                        <div className={"grid grid-cols-2 place-items-start"}>
                            <button
                                onClick={cancelOrder}
                                className="bg-black px-4 py-1.5 text-white uppercase text-sm font-500 shadow-md my-10">
                                CANCEL ORDER
                            </button>
                            <button
                                onClick={() => {
                                    setShowModal(false)
                                }}
                                className="bg-black px-4 py-1.5 text-white uppercase text-sm font-500 shadow-md my-10">
                                NO, THANKS
                            </button>
                        </div>
                    </div>
                </>
            ),
            style: "p-3 h-[60vh]"
        },
        {
            innerHTML: (
                <>
                    <span
                        className={"absolute top-2 right-2"}
                        onClick={() => {
                            setShowModal(false)
                        }}
                    >
                        X
                    </span>
                    <div className={"flex flex-col "}>
                        <div className={"mt-10 uppercase items-center justify-center flex text-lg text-[#333] font-600 px-10 text-center mb-5"}>
                            Track your order (#{data.order_id})
                        </div>
                        {
                            Object.keys(trackingData).map((date, index) => {
                                return <>
                                    <span className="text-xs mt-1">
                                        {date}
                                    </span>
                                    {
                                        Object.keys(trackingData[date]).map((time, index) => {
                                            return <div className="flex gap-2 mt-4" key={index}>
                                                <span className="text-gray-800 text-xs">
                                                    {time}
                                                </span>
                                                <span className="border-r-[1px] border-black"/>
                                                <span>
                                                    <h6>{trackingData[date][time].split("@")[0]}</h6>
                                                    <p className="text-gray-800 text-xs">{trackingData[date][time].split("@")[1]}</p>
                                                </span>
                                            </div>
                                        })
                                    }

                                </>
                            })
                        }
                    </div>
                </>
            ),
            style: "p-3 h-[60vh]"
        }
    ]

    return (
        <div className={"bg-black/60 h-full w-full fixed inset-0 z-50 grid place-items-center"}>
            <div
                className={[`flex-1 bg-white border-2 border-black relative ${isMobile ? "w-[95vw]" : "w-[50vw] "}`, element[index - 1]['style']].join(" ")}
            >
                {element[index - 1]['innerHTML']}
            </div>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        userData: state.userData,
        appConfig: state.appConfig
    }
}

export default connect(mapStateToProps)(MyOrdersModals);
