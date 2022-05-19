import React, {Fragment} from "react";
import Link from "next/link";
import Image from "next/image";

function SizeGuide({closeModal, isMobile}) {
    const WEBASSETS = process.env.NEXT_PUBLIC_WEBASSETS;
    const upperProductArray = ["Tops/Shirts", "Tunics", "Dresses", "Outerwear"]
    const lowerProductArray = ["Jumpsuits", "Shorts", "Pants"]
    const upperProducts = () => {
        let returnValues = null;
        upperProductArray.forEach(p => {
            returnValues = <Fragment>
                {returnValues}
                <div>
                    {p}
                </div>
                <div>
                    BUST HIPS LENGTH SHOULDER
                </div>
                <div>
                    XS 32" 35" 23" 13.5"
                </div>
                <div>
                    S 34" 37" 23" 14"
                </div>
                <div>
                    M 36" 39" 24" 14.5"
                </div>
                <div>
                    L 38" 41" 24" 15"
                </div>
                <div>
                    XXL 42" 45" 26" 16"
                </div>
            </Fragment>
        })
        return returnValues
    }
    const lowerProducts = () => {
        let returnValues = null;
        lowerProductArray.forEach(p => {
            returnValues = <Fragment>
                {returnValues}
                <div>
                    {p}
                </div>
                <div>
                    BUST WAIST HIPS LENGTH SHOULDER THIGH
                </div>
                <div>
                    XS 32" 26" 35" Standard lengths
                    fit average heights
                    of 5'2" to 5'4" 13.5" 21"
                </div>
                <div>
                    S 34" 28" 37" 14" 22"
                </div>
                <div>
                    M 36" 30" 39" 14.5" 23"
                </div>
                <div>
                    L 38" 32" 41" 15" 24"
                </div>
                <div>
                    XL 40" 34" 43" 15.5" 24"
                </div>
                <div>
                    XXL 42" 36" 45" 16" 25"
                </div>
            </Fragment>
        })
        return returnValues
    }
    const skirtProducts = () => {
        return <Fragment>
            <div>
                Skirts
            </div>
            <div>
                WAIST HIPS LENGTH
            </div>
            <div>
                XS 26" 35" 21"
            </div>
            <div>
                S 28" 37" 22"
            </div>
            <div>
                M 30" 39" 23"
            </div>
            <div>
                L 32" 41" 24"
            </div>
            <div>
                XL 34" 43" 25"
            </div>
            <div>
                XXL 36" 45" 26"
            </div>
        </Fragment>
    }
    const beltProducts = () => {
        return <Fragment>
            <div>
                Belts
            </div>
            <div>
                FITS WAIST
            </div>
            <div>
                S28" to 32"
            </div>
            <div>
                M32" to 36"
            </div>
            <div>
                L34" to 38"
            </div>
            <div>
                XL36" to 40"
            </div>
        </Fragment>
    }

    const mobileView = null;
    const browserView = () => {
        return <Fragment>
            <div onClick={closeModal}>X</div>
            <div>Size Guide</div>
            <div>The measurements below are Body Measurements</div>
            <div>{upperProducts()}</div>
            <div>{lowerProducts()}</div>
            <div>{skirtProducts()}</div>
            <div>{beltProducts()}</div>
            <div>Measurement Guide</div>
            <Image
                src={"/assets/images/Measurement.png"}
                layout={`fill`}
                objectFit={`cover`}
                alt={"measurement guide"}
                objectPosition={"72% 32px"}
            />
            <div>
                *The waist measurement in the table is that of your natural waist. All are pants fit on the Wearing waist. As shown in the figure.
                Please
                <Link href="/salt/contact-us">
                    <a> Contact Us </a>
                </Link>
                if you have any questions about your fit.
            </div>
        </Fragment>
    }

    return (isMobile) ? mobileView : browserView()
}

export default SizeGuide;