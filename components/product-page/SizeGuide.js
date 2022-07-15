import React, { Fragment } from "react";
import Link from "next/link";
import Image from "next/image";

function SizeGuide({ closeModal, isMobile }) {
    const WEBASSETS = process.env.NEXT_PUBLIC_WEBASSETS;
    const upperProductArray = ["Tops/Shirts", "Tunics", "Dresses", "Outerwear"]
    const lowerProductArray = ["Jumpsuits", "Shorts", "Pants"]
    const upperProducts = () => {
        let returnValues = null;
        upperProductArray.forEach(p => {
            returnValues = (
                <div className="text-center mb-10">
                    {returnValues}
                    <p className="font-600 text-lg mb-5">
                        {p} (Body Measurements)
                    </p>
                    <table className="size_guide_table">
                        <thead>
                            <tr>
                                <th></th>
                                <th>BUST</th>
                                <th>HIPS</th>
                                <th>LENGTH</th>
                                <th>SHOULDER</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <th>XS</th>
                                <td>32&quot;</td>
                                <td>35&quot;</td>
                                <td>23&quot;</td>
                                <td>13.5&quot;</td>
                            </tr>
                            <tr>
                                <th>S</th>
                                <td>34&quot;</td>
                                <td>37&quot;</td>
                                <td>23&quot;</td>
                                <td>14&quot;</td>
                            </tr>
                            <tr>
                                <th>M</th>
                                <td>36&quot;</td>
                                <td>39&quot;</td>
                                <td>24&quot;</td>
                                <td>14.5&quot;</td>
                            </tr>
                            <tr>
                                <th>L</th>
                                <td>38&quot;</td>
                                <td>41&quot;</td>
                                <td>24&quot;</td>
                                <td>15&quot;</td>
                            </tr>
                            <tr>
                                <th>L</th>
                                <td>40&quot;</td>
                                <td>43&quot;</td>
                                <td>25&quot;</td>
                                <td>15.5&quot;</td>
                            </tr>
                            <tr>
                                <th>XXL</th>
                                <td>42&quot;</td>
                                <td>45&quot;</td>
                                <td>26&quot;</td>
                                <td>16&quot;</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            )
        })
        return returnValues
    }
    const lowerProducts = () => {
        let returnValues = null;
        lowerProductArray.forEach(p => {
            returnValues = (
                <div className="text-center mb-10">
                    {returnValues}
                    <p className="font-600 text-lg mb-5">
                        {p} (Body Measurements)
                    </p>
                    <table className="size_guide_table">
                        <thead>
                            <tr>
                                <th></th>
                                <th>BUST</th>
                                <th>WAIST</th>
                                <th>HIPS</th>
                                <th>LENGTH</th>
                                <th>SHOULDER</th>
                                <th>THIGH</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <th>XS</th>
                                <td>32&quot;</td>
                                <td>26&quot;</td>
                                <td>35&quot;</td>
                                <td rowSpan={6}>Standard lengths fit average heights of 5&apos;2&quot; to 5&apos;4&quot;</td>
                                <td>13.5&quot;</td>
                                <td>21&quot;</td>
                            </tr>
                            <tr>
                                <th>S</th>
                                <td>34&quot;</td>
                                <td>28&quot;</td>
                                <td>37&quot;</td>
                                <td>14&quot;</td>
                                <td>22&quot;</td>
                            </tr>
                            <tr>
                                <th>M</th>
                                <td>36&quot;</td>
                                <td>30&quot;</td>
                                <td>39&quot;</td>
                                <td>14.5&quot;</td>
                                <td>23&quot;</td>
                            </tr>
                            <tr>
                                <th>L</th>
                                <td>38&quot;</td>
                                <td>32&quot;</td>
                                <td>41&quot;</td>
                                <td>15&quot;</td>
                                <td>24&quot;</td>
                            </tr>
                            <tr>
                                <th>XL</th>
                                <td>40&quot;</td>
                                <td>34&quot;</td>
                                <td>43&quot;</td>
                                <td>15.5&quot;</td>
                                <td>24&quot;</td>
                            </tr>
                            <tr>
                                <th>XXL</th>
                                <td>42&quot;</td>
                                <td>36&quot;</td>
                                <td>45&quot;</td>
                                <td>16&quot;</td>
                                <td>25&quot;</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            )
        })
        return returnValues
    }
    const skirtProducts = () => {
        return (
            <div className="text-center mb-10">
                <p className="font-600 text-lg mb-5">
                    Skirts (Body Measurements)
                </p>
                <table className="size_guide_table">
                    <thead>
                        <tr>
                            <th></th>
                            <th>Waist</th>
                            <th>HIPS</th>
                            <th>LENGTH</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <th>XS</th>
                            <td>26&quot;</td>
                            <td>35&quot;</td>
                            <td>21&quot;</td>
                        </tr>
                        <tr>
                            <th>S</th>
                            <td>28&quot;</td>
                            <td>37&quot;</td>
                            <td>22&quot;</td>
                        </tr>
                        <tr>
                            <th>M</th>
                            <td>30&quot;</td>
                            <td>39&quot;</td>
                            <td>23&quot;</td>
                        </tr>
                        <tr>
                            <th>L</th>
                            <td>32&quot;</td>
                            <td>41&quot;</td>
                            <td>24&quot;</td>
                        </tr>
                        <tr>
                            <th>XL</th>
                            <td>34&quot;</td>
                            <td>43&quot;</td>
                            <td>25&quot;</td>
                        </tr>
                        <tr>
                            <th>XXL</th>
                            <td>36&quot;</td>
                            <td>45&quot;</td>
                            <td>26&quot;</td>
                        </tr>
                        <tr>
                            <th>Tailored</th>
                            <td colSpan={3}>You can enter your measurements, including customized LENGTH and we will tailor it for you!</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        )
    }
    const beltProducts = () => {
        return (
            <div className="text-center mb-10">
                <p className="font-600 text-lg mb-5">
                    Belts (Body Measurements)
                </p>
                <table className="size_guide_table">
                    <thead>
                        <tr>
                            <th></th>
                            <th>TO FIT WAIST</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <th>S</th>
                            <td>28&quot; to 32&quot;</td>
                        </tr>
                        <tr>
                            <th>M</th>
                            <td>32&quot; to 36&quot;</td>
                        </tr>
                        <tr>
                            <th>L</th>
                            <td>34&quot; to 38&quot;</td>
                        </tr>
                        <tr>
                            <th>XL</th>
                            <td>36&quot; to 40&quot;</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        )
    }

    const mobileView = ()=> {
        return (
            <div className="bg-black/60 h-screen w-screen fixed inset-0 z-50 grid place-items-center" onClick={closeModal}>
                <div className="bg-white relative h-[90vh] flex flex-col overflow-y-auto" onClick={e => e.stopPropagation()}>
                    <button className="absolute top-0 right-4 text-2xl z-50" onClick={closeModal}>X</button>
                    <div className="text-center my-8">
                        <p className="text-h2 mb-2">Size Guide</p>
                        <p className="text-lg">The measurements below are Body Measurements</p>
                    </div>
                    <div className="px-12">
                        <div>{upperProducts()}</div>
                        <div>{lowerProducts()}</div>
                        <div>{skirtProducts()}</div>
                        <div>{beltProducts()}</div>
                    </div>
                    <div className="text-center text-[#777] mb-5">Measurement Guide</div>
                    <div className="relative h-60 aspect-square">
                        <Image
                            src={"/assets/images/Measurement.png"}
                            layout={`fill`}
                            objectFit={`cover`}
                            alt={"measurement guide"}
                            // objectPosition={"72% 32px"}
                        />
                    </div>
                    <div className="text-[#777] p-10">
                        *The waist measurement in the table is that of your natural waist. All are pants fit on the Wearing waist. As shown in the figure.
                        Please
                        <Link href="/salt/contact-us">
                            <a className="cursor-pointer text-[#333]"> Contact Us </a>
                        </Link>
                        if you have any questions about your fit.
                    </div>
                </div>
            </div>
        )
    }
    const browserView = () => {
        return (
            <div className="bg-black/60 h-screen w-screen fixed inset-0 z-50 grid place-items-center" onClick={closeModal}>
                <div className="bg-white relative h-[90vh] w-[920px] flex flex-col overflow-y-auto" onClick={e => e.stopPropagation()}>
                    <button className="absolute top-0 right-4 text-2xl z-50" onClick={closeModal}>X</button>
                    <div className="text-center my-8">
                        <p className="text-h2 mb-2">Size Guide</p>
                        <p className="">The measurements below are Body Measurements</p>
                    </div>
                    <div className="px-10">
                        <div>{upperProducts()}</div>
                        <div>{lowerProducts()}</div>
                        <div>{skirtProducts()}</div>
                        <div>{beltProducts()}</div>
                    </div>
                    <div className="text-center text-[#777] mb-5">Measurement Guide</div>
                    <div className="relative h-60 aspect-square">
                        <Image
                            src={"/assets/images/Measurement.png"}
                            layout={`fill`}
                            objectFit={`cover`}
                            alt={"measurement guide"}
                            // objectPosition={"72% 32px"}
                        />
                    </div>
                    <div className="text-[#777] p-10">
                        *The waist measurement in the table is that of your natural waist. All are pants fit on the Wearing waist. As shown in the figure.
                        Please
                        <Link href="/salt/contact-us">
                            <a className="cursor-pointer text-[#333]"> Contact Us </a>
                        </Link>
                        if you have any questions about your fit.
                    </div>
                </div>
            </div>
        )
    }

    return (isMobile) ? mobileView() : browserView()
}

export default SizeGuide;