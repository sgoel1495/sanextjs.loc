import React from 'react';
import StarSVG from "./StarSVG";

const MyOrdersModals = (props) => {

    const onChange = (value) => {
        console.log(value)
    }
    const onChange2 = (value) => {
        console.log(value)
    }
    const onChange3 = (value) => {
        console.log(value)
    }

    const element = [
        {
            innerHTML: (
                <>
                    <span
                        className={"absolute -top-1 right-1"}
                        onClick={() => {
                            props.setShowModal(false)
                        }}
                    >
                        X
                    </span>
                    <h1 className={"text-3xl mb-5"}>Edit Shipping Address</h1>
                    <div className={"flex flex-col text-xs font-600"}>
                        <span className={"flex flex-col"}>
                            Shipping Address
                            <span> Test 4 <br/>A-66 10th Floor</span>
                            <span>Guru Nanak Pura,</span>
                            <span>Adimaly,Kerala, 682039</span>
                            <span>India</span>
                        </span>
                        <span className="my-3"> T :9162849957 </span>
                    </div>

                    <div className={"flex flex-col text-[#5f6061]"}>
                        <label className={"text-xs"}>Choose Address</label>
                        <select name="cars" id="cars" placeholder={"Please Select Address"}>
                            <option value="Please Select Address">Please Select Address</option>
                            <option value="mockAddress">Knowhere</option>
                        </select>

                    </div>
                    <button
                        onClick={() => {
                            props.setShowModal(false)
                        }}
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
                        className={"absolute -top-1 right-1 p-2"}
                        onClick={() => {
                            props.setShowModal(false)
                        }}
                    >
                        X
                    </span>
                    <div className={"flex flex-col my-5"}>
                        <div className={"uppercase text-center flex flex-col px-10"}>
                            <h1 className={"my-5 uppercase"}>Rating and Review</h1>
                            <span>
                                ({props.data.orderID})
                            </span>
                            <span>
                                {props.data.title}
                            </span>
                        </div>
                        <div className={"w-full h-full flex flex-col gap-4"}>
                            <div className={"flex flex-between"}>
                                <label className={"flex-1"}>Fit</label>
                                <StarSVG type={"fiveStarRating"} onChange={onChange}/>
                            </div>
                            <div className={"flex flex-between"}>
                                <label className={"flex-1"}>Fabric Quality</label>
                                <StarSVG type={"fiveStarRating"} onChange={onChange2}/>
                            </div>
                            <div className={"flex flex-between"}>
                                <label className={"flex-1"}>SALT Customer Service</label>
                                <StarSVG type={"fiveStarRating"} onChange={onChange3}/>
                            </div>
                            <textarea placeholder={"Other..."} name="" id="" cols="10" rows="2"/>
                        </div>
                    </div>
                    <button
                        onClick={() => {
                            props.setShowModal(false)
                        }}
                        className="bg-black text-base font-900 px-4 py-1.5 text-white uppercase text-sm font-500 shadow-md my-10"
                    >
                        submit
                    </button>

                </>
            ),
            style: "p-3"
        },
        {
            innerHTML: (
                <>
                    <span
                        className={"absolute -top-1 right-1 p-3"}
                        onClick={() => {
                            props.setShowModal(false)
                        }}
                    >
                        X
                    </span>
                    <div className={"flex flex-col"}>
                        <h1 className={"mb-5 uppercase"}>Cancel Order</h1>
                        <input
                            type="text"
                            placeholder={"Why do you want to cancel your order?"}
                            className={" mt-10 placeholder:text-black"}
                        />

                        <button
                            onClick={() => {
                                props.setShowModal(false)
                            }}
                            className="bg-black px-4 py-1.5 text-white w-[50%] uppercase text-sm font-500 shadow-md my-10">
                            save
                        </button>
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
                            props.setShowModal(false)
                        }}
                    >
                        X
                    </span>
                    <div className={"flex flex-col "}>
                        <div className={"mt-10 uppercase items-center flex flex-col px-10"}>
                            <h1 className={"mb-5"}>Track your order</h1>
                            <span>
                                (#{props.data.orderID})
                            </span>
                        </div>
                        <span className="text-xs mt-1">
                            {props.data.date}
                        </span>
                        <div className="flex gap-2 mt-4">
                            <span className="text-gray-800 text-xs">
                                01:30:47&nbsp;AM
                            </span>
                            <span className="border-r-[1px] border-black"/>
                            <span>
                                <h6>Order Confirmed</h6>
                                <p className="text-gray-800 text-xs">Thank you! We are excited to serve you!</p>
                            </span>
                        </div>
                    </div>
                </>
            ),
            style: "p-3 h-[60vh]"
        }
    ]

    return (
        <div className={"bg-black/60 h-full w-full fixed inset-0 z-50 grid place-items-center"}>
            <div
                className={["flex-1 bg-white border-2 border-black relative w-[95vw]", element[props.index - 1]['style']].join(" ")}
            >
                {element[props.index - 1]['innerHTML']}
            </div>
        </div>
    )
}

export default MyOrdersModals;
