import React, {Fragment} from "react";
import Link from "next/link";
import Image from "next/image";

function SizeGuide({closeModal, isMobile}) {
    const WEBASSETS = process.env.NEXT_PUBLIC_WEBASSETS;
    const upperProducts = [
        {
            heading: "Tops/Shirts (Body Measurements)",
            columns: ["TO FIT BUST (in)", "TO FIT HIPS (in)", "LENGTH", "SHOULDER"],
            rows: [
                ["XS", "32\"", "35\"", "23\"", "13.5\""],
                ["S", "34\"", "37\"", "23\"", "14\""],
                ["M", "36\"", "39\"", "24\"", "14.5\""],
                ["L", "38\"", "41\"", "24\"", "15\""],
                ["XL", "40\"", "43\"", "25\"", "15.5\""],
                ["XXL", "42\"", "45\"", "26\"", "16\""]
            ]
        },
        {
            heading: "Tunics (Body Measurements)",
            columns: ["TO FIT BUST (in)", "TO FIT HIPS (in)", "LENGTH", "SHOULDER"],
            rows: [
                ["XS", "32\"", "35\"", "27.5\"", "13.5\""],
                ["S", "34\"", "37\"", "28\"", "14\""],
                ["M", "36\"", "39\"", "28\"", "14.5\""],
                ["L", "38\"", "41\"", "29\"", "15\""],
                ["XL", "40\"", "43\"", "29.5\"", "15.5\""],
                ["XXL", "42\"", "45\"", "30\"", "16\""]
            ]
        },
        {
            heading: "Dresses (Body Measurements)",
            columns: ["TO FIT BUST (in)", "TO FIT WAIST (in)", "TO FIT HIPS (in)", "KNEE LENGTH", "SHOULDER"],
            rows: [
                ["XS", "32\"", "26\"", "35\"", "36.5\"", "13.5\""],
                ["S", "34\"", "28\"", "37\"", "37\"", "14\""],
                ["M", "36\"", "30\"", "39\"", "37.5\"", "14.5\""],
                ["L", "38\"", "32\"", "41\"", "38\"", "15\""],
                ["XL", "40\"", "34\"", "43\"", "38.5\"", "15.5\""],
                ["XXL", "42\"", "36\"", "45\"", "39\"", "16\""]
            ]
        },
        {
            heading: "Outerwear (Body Measurements)",
            columns: ["TO FIT BUST (in)", "TO FIT WAIST (in)", "TO FIT HIPS (in)"],
            rows: [
                ["XS", "32\"", "26\"", "35\""],
                ["S", "34\"", "28\"", "37\""],
                ["M", "36\"", "30\"", "39\""],
                ["L", "38\"", "32\"", "41\""],
                ["XL", "40\"", "34\"", "43\""],
                ["XXL", "42\"", "36\"", "45\""]
            ]
        },
        {
            heading: "Jumpsuits (Body Measurements)",
            columns: ["TO FIT BUST (in)", "TO FIT WAIST (in)", "TO FIT HIPS (in)", "LENGTH", "SHOULDER", "TO FIT THIGH (in)"],
            rows: [
                ["XS", "32\"", "26\"", "35\"", "", "13.5\"", "21\""],
                ["S", "34\"", "28\"", "37\"", "", "14\"", "22\""],
                ["M", "36\"", "30\"", "39\"", "", "14.5\"", "23\""],
                ["L", "38\"", "32\"", "41\"", "", "15\"", "24\""],
                ["XL", "40\"", "34\"", "43\"", "", "15.5\"", "24\""],
                ["XXL", "42\"", "36\"", "45\"", "", "16\"", "25\""]
            ]
        },
        {
            heading: "Shorts (Body Measurements)",
            columns: ["TO FIT WAIST (in)", "TO FIT HIPS (in)", "LENGTH", "TO FIT THIGH (in)"],
            rows: [
                ["XS", "26\"", "35\"", "", "21\""],
                ["S", "28\"", "37\"", "", "22\""],
                ["M", "30\"", "39\"", "", "23\""],
                ["L", "32\"", "41\"", "", "24\""],
                ["XL", "34\"", "43\"", "", "24\""],
                ["XXL", "36\"", "45\"", "", "25\""],
                ["TAILORED", "You can enter your measurements, including customized LENGTH and we will tailor it for you!"]
            ]
        },
        {
            heading: "Pants (Body Measurements)",
            columns: ["TO FIT WAIST (in)", "TO FIT HIPS (in)", "LENGTH", "TO FIT THIGH (in)"],
            rows: [
                ["XS", "26\"", "35\"", "", "21\""],
                ["S", "28\"", "37\"", "", "22\""],
                ["M", "30\"", "39\"", "", "23\""],
                ["L", "32\"", "41\"", "", "24\""],
                ["XL", "34\"", "43\"", "", "24\""],
                ["XXL", "36\"", "45\"", "", "25\""],
                ["TAILORED", "You can enter your measurements, including customized LENGTH and we will tailor it for you!"]
            ]
        },
        {
            heading: "Skirts (Body Measurements)",
            columns: ["TO FIT WAIST (in)", "TO FIT HIPS (in)", "LENGTH"],
            rows: [
                ["XS", "26\"", "35\"", "21\""],
                ["S", "28\"", "37\"", "22\""],
                ["M", "30\"", "39\"", "23\""],
                ["L", "32\"", "41\"", "24\""],
                ["XL", "34\"", "43\"", "24\""],
                ["XXL", "36\"", "45\"", "25\""],
                ["TAILORED", "You can enter your measurements, including customized LENGTH and we will tailor it for you!"]
            ]
        },
        {
            heading: "Belts (Body Measurements)",
            columns: ["TO FIT WAIST (in)", ""],
            rows: [
                ["S", "28\" to 32\"", ""],
                ["M", "32\" to 36\"", ""],
                ["L", "34\" to 38\"", ""],
                ["XL", "36\" to 40\"", ""]
            ]
        }
    ]

    const productTable = () => {
        return <div>
            {
                upperProducts.map((item, index) => (
                    <div className="text-center mb-10" key={index}>
                        <p className="font-600 text-lg mb-5">
                            {item.heading}
                        </p>
                        <table className="size_guide_table">
                            <thead>
                            <tr>
                                <th></th>
                                {
                                    item.columns.map((heading, headIndex) => (
                                        <th key={headIndex}>{heading}</th>
                                    ))
                                }
                            </tr>
                            </thead>
                            <tbody>
                            {
                                item.rows.map((row, rowIndex) => (
                                    <tr key={rowIndex}>
                                        {
                                            row.map((cell, cellIndex) => {
                                                if (cellIndex === 0) {
                                                    return <th key={cellIndex}>{cell}</th>
                                                } else {
                                                    if (cell === "" && item.columns[cellIndex - 1] !== "") {
                                                        if (rowIndex === 0) {
                                                            return <td rowSpan={item.rows.length + (item.rows[item.rows.length - 1][0] === "TAILORED" ? -1 : 0)} key={cellIndex}>Standard lengths
                                                                fit average heights of 5&apos;2&quot; to 5&apos;4&quot;</td>
                                                        }
                                                    } else {
                                                        return <td colSpan={row.length === 2 ? item.columns.length : ""} key={cellIndex}>{cell}</td>
                                                    }
                                                }
                                            })
                                        }
                                    </tr>
                                ))
                            }
                            </tbody>
                        </table>
                    </div>
                ))
            }
        </div>
    }

    const mobileView = () => {
        return (
            <div className="bg-black/60 h-screen w-screen fixed inset-0 z-modal2 grid place-items-center" onClick={closeModal}>
                <div className="bg-white relative h-full flex flex-col overflow-y-auto" onClick={e => e.stopPropagation()}>
                    <button className="absolute top-0 right-4 text-2xl z-50" onClick={closeModal}>X</button>
                    <div className="text-center mt-10 mb-7">
                        <p className="text-h2 mb-2">Size Guide</p>
                        <p className="text-lg leading-[1.2]">The measurements below are<br/>Body Measurements</p>
                    </div>
                    <div className="px-5 lg:px-12">
                        {productTable()}
                    </div>
                    <div className="text-center text-[#777] mb-5">Measurement Guide</div>
                    <div className="px-10">
                        <span className="relative block w-full aspect-square">
                            <Image
                                src={WEBASSETS + "/assets/images/Measurement.png"}
                                layout={`fill`}
                                objectFit={`contain`}
                                alt={"measurement guide"}
                                // objectPosition={"72% 32px"}
                            />
                        </span>
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
                        {productTable()}
                    </div>
                    <div className="text-center text-[#777] mb-5">Measurement Guide</div>
                    <div className="px-40">
                        <span className="relative block w-full aspect-square">
                            <Image
                                src={WEBASSETS + "/assets/images/Measurement.png"}
                                layout={`fill`}
                                objectFit={`contain`}
                                alt={"measurement guide"}
                                // objectPosition={"72% 32px"}
                            />
                        </span>
                    </div>
                    <div className="text-[#777] p-10">
                        *The waist measurement in the table is that of your natural waist. All are pants fit on the Wearing waist. As shown in the figure.
                        Please
                        <Link href={"/salt/contact-us"}>
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