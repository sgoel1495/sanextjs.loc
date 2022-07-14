import React, {useState} from 'react';
import Image from "next/image";
import ReactDom from "react-dom";

const StarSVG = (props) => {
    const [checked, setChecked] = useState(-1)
    let star = {
        filledBlackStar: (
            <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="star"
                 className="inline w-4 text-black mr-1" role="img" xmlns="http://www.w3.org/2000/svg"
                 viewBox="0 0 576 512">
                <path fill="currentColor"
                      d="M259.3 17.8L194 150.2 47.9 171.5c-26.2 3.8-36.7 36.1-17.7 54.6l105.7 103-25 145.5c-4.5 26.3 23.2 46 46.4 33.7L288 439.6l130.7 68.7c23.2 12.2 50.9-7.4 46.4-33.7l-25-145.5 105.7-103c19-18.5 8.5-50.8-17.7-54.6L382 150.2 316.7 17.8c-11.7-23.6-45.6-23.9-57.4 0z"/>
            </svg>
        ),
        fiveStarRating: (
            <span
                className={"flex gap-2"}
            >
                {
                    [1, 2, 3, 4, 5].map((num, index) => {
                        return (
                            <svg
                                onClick={() => {
                                    setChecked(index)
                                    props.onChange && props.onChange(index + 1)
                                }}
                                aria-hidden="true"
                                focusable="false"
                                data-prefix="fas"
                                data-icon="star"
                                className={["w-4 mr-1", index <= checked ? "text-yellow" : "text-[#777]"].join(" ")}
                                role="img"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 576 512">
                                <path
                                    fill="currentColor"
                                    d="M259.3 17.8L194 150.2 47.9 171.5c-26.2 3.8-36.7 36.1-17.7 54.6l105.7 103-25 145.5c-4.5 26.3 23.2 46 46.4 33.7L288 439.6l130.7 68.7c23.2 12.2 50.9-7.4 46.4-33.7l-25-145.5 105.7-103c19-18.5 8.5-50.8-17.7-54.6L382 150.2 316.7 17.8c-11.7-23.6-45.6-23.9-57.4 0z"
                                />
                            </svg>
                        )
                    })
                }
            </span>

        )
    }
    return star[props.type]
}

const Modal = (props) => {

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
                    className={"absolute -top-1 right-1"}
                    onClick={() => {
                        props.setShowModal(false)
                    }}
                >
                    X
                </span>
                    <div className={"flex flex-col items-center"}>
                        <div className={"uppercase text-center flex flex-col px-10"}>
                            <h1 className={"mb-5 uppercase"}>Rating and Review</h1>
                            <span>
                            ({props.data.orderID})
                        </span>
                            <span>
                            {props.data.title}
                        </span>
                        </div>
                        <div>

                        </div>

                        <button
                            onClick={() => {
                                props.setShowModal(false)
                            }}
                            className="bg-black px-4 py-1.5 text-white uppercase text-sm font-500 shadow-md my-10">
                            save
                        </button>
                    </div>
                </>
            ),
            style: ""
        },
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
                    <div className={"flex flex-col items-center"}>
                        <div className={"uppercase text-center flex flex-col px-10"}>
                            <h1 className={"mb-5 uppercase"}>Rating and Review</h1>
                            <span>
                            ({props.data.orderID})
                        </span>
                            <span>
                            {props.data.title}
                        </span>
                        </div>
                        <div>

                        </div>

                        <button
                            onClick={() => {
                                props.setShowModal(false)
                            }}
                            className="bg-black px-4 py-1.5 text-white uppercase text-sm font-500 shadow-md my-10">
                            save
                        </button>
                    </div>
                </>
            ),
            style: ""
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

const MyOrderProductCard = ({product}) => {
    const WEBASSETS = process.env.NEXT_PUBLIC_WEBASSETS;
    const [showModal, setShowModal] = useState(0)


    return (<>
        <div className={"flex flex-col bg-[#f7f7f7] mx-2 py-3"}>
            <div className={"flex justify-between gap-4"}>
                <div className={"flex flex-col"}>
                    <Image
                        src={WEBASSETS + product.img} alt="cart"
                        width="129" height="208"/>
                    <span className={"flex flex-col items-center"}>
                    <span> {product.title}</span>
                    <span className={"flex gap-2 text-xs"}>Qty: {product.qty}<span>SIZE {product.size}</span></span>
                    </span>
                </div>
                <div className={"flex flex-col"}>
                    <span className={"block text-xs"}>ORDER # {product.orderID}</span>
                    <div>
                        <strong>ORDER PLACED</strong>
                        <span className={"block mb-3"}>{product.date}</span>
                        <strong>TOTAL AMOUNT:</strong>
                        <span> {"Rs."}{product.price}</span>
                    </div>
                    <div className={"flex flex-col my-2"}>
                        <strong> SHIP TO:</strong>
                        <span className={"text-xs"}>A-66 10th Floor,Guru Nanak Pura</span>
                        <span className={"text-xs"}>India,Kerala</span>
                        <span className={"text-xs"}>Adimaly,682039</span>
                        <span
                            onClick={() => {
                                setShowModal(1)
                            }}
                            className={"text-xs"}
                        >
                            Change Shipping Address
                        </span>
                    </div>
                    <div className={"flex flex-col gap-1 mb-5"}>
                        <strong>
                            ORDER CONFIRMED
                        </strong>
                        <span
                            onClick={() => {
                                setShowModal(2)
                            }}
                        >
                            <StarSVG type={"filledBlackStar"}/>RATE &amp; REVIEW PRODUCT
                        </span>
                    </div>
                </div>
            </div>
            <div className={"flex flex-col items-center"}>
                <button
                    onClick={() => {
                        setShowModal(3)
                    }}
                    className="ml-3 w-[60%] bg-black px-4 py-1.5 text-white uppercase text-sm font-500 shadow-md my-2"
                >
                    CANCEL
                </button>
                <button
                    onClick={() => {
                        setShowModal(4)
                    }}
                    className="ml-3 w-[60%] bg-black px-4 py-1.5 text-white uppercase text-sm font-500 shadow-md my-2">
                    TRACK YOUR ORDER
                </button>
            </div>
        </div>
        {
            showModal
            && ReactDom.createPortal(
                <Modal
                    setShowModal={setShowModal}
                    index={showModal}
                    data={product}
                />,
                document.getElementById("measurementmodal")
            )
        }

    </>);
};

export default MyOrderProductCard;
