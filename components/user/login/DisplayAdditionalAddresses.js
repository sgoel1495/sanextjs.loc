import React, {useState} from "react";

function DisplayAdditionalAddresses({userAddresses, setEdit, mobile,deleteAddress}) {

    const browserAddressList = () => {
        let returnValue = null;
        userAddresses.forEach((address, index) => {
            returnValue = (
                <>
                    {returnValue}
                    <div className="p-4 bg-[#f1f2f3] w-full flex flex-col items-start">
                        <p className="text-[#777]">{address.name}</p>
                        <p className="text-[#777]">{address.address}
                            {(address.landmark === "")
                                ? null
                                : <span>, {address.landmark}</span>
                            }
                        </p>
                        <p className="text-[#777]">{address.city}, {address.state}, {address.zip_code} </p>
                        <p className="text-[#555]">T:{address.phone}</p>
                        <div className="flex gap-2 items-center mt-4 text-[#555]">
                            <button className="underline" onClick={() => setEdit(index)}>Edit</button>
                            <span>|</span>
                            <span
                                className="underline"
                                onClick={() => {
                                    confirm("Are you sure you want to delete this address!") ? deleteAddress(index) : ''
                                }}
                            >
                                Delete
                            </span>
                        </div>
                    </div>
                </>
            );
        });

        return (returnValue) ? returnValue :
            <p className="text-[#777] mb-10 font-500">No additional address on record</p>;
    }
    const mobileAddressList = () => {
        let returnValue = null;

        userAddresses.forEach((address, index) => {
            returnValue = (
                <>
                    {returnValue}
                    <div className="p-8 bg-[#f1f2f3] mx-3 my-4 flex flex-col items-start">
                        <p className="text-[#777]">{address.name}</p>
                        <p className="text-[#777]">{address.address}
                            {(address.landmark === "")
                                ? null
                                : <span>, {address.landmark}</span>
                            }
                        </p>
                        <p className="text-[#777]">{address.city}, {address.state}, {address.zip_code} </p>
                        <p className="text-[#555]">T:{address.phone}</p>
                        <div className="flex gap-2 items-center mt-4 text-[#555]">

                            <button className="underline" onClick={() => setEdit(index)}>Edit</button>
                            <span>|</span>
                            <span
                                key={index}
                                className="underline"
                                onClick={() => {
                                    confirm("Are you sure you want to delete this address!") ? deleteAddress(index) : ''
                                }}
                            >
                                Delete
                            </span>
                        </div>
                    </div>
                </>
            );
        });

        return (returnValue) ? returnValue :
            <p className="mx-3 text-[#777] mb-10 font-500">No additional address on record</p>;
    }

    const mobileView = <>
        <div>
            {mobileAddressList()}
        </div>
        <button className="ml-3 bg-black px-4 py-1.5 mr-[35%] text-center text-white uppercase text-sm font-500 shadow-md my-2" onClick={() => setEdit(-1)}>
            ADD NEW ADDRESSES
        </button>
    </>

    const browserView = (
        <>
            <div className="grid grid-cols-2 gap-8 w-full">
                {browserAddressList()}
            </div>
            <button className="bg-black px-4 py-1.5 block text-white uppercase text-sm font-500 tracking-wide shadow-md my-2" onClick={() => setEdit(-1)}>
                ADD NEW ADDRESSES
            </button>
        </>
    );

    return <>
        {(mobile) ? mobileView : browserView}

    </>;
}

export default DisplayAdditionalAddresses;