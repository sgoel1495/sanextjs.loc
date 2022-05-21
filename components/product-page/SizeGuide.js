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
                    XS 32&quot; 35&quot; 23&quot; 13.5&quot;
                </div>
                <div>
                    S 34&quot; 37&quot; 23&quot; 14&quot;
                </div>
                <div>
                    M 36&quot; 39&quot; 24&quot; 14.5&quot;
                </div>
                <div>
                    L 38&quot; 41&quot; 24&quot; 15&quot;
                </div>
                <div>
                    XXL 42&quot; 45&quot; 26&quot; 16&quot;
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
                    XS 32&quot; 26&quot; 35&quot; Standard lengths
                    fit average heights
                    of 5&apos;2&quot; to 5&apos;4&quot; 13.5&quot; 21&quot;
                </div>
                <div>
                    S 34&quot; 28&quot; 37&quot; 14&quot; 22&quot;
                </div>
                <div>
                    M 36&quot; 30&quot; 39&quot; 14.5&quot; 23&quot;
                </div>
                <div>
                    L 38&quot; 32&quot; 41&quot; 15&quot; 24&quot;
                </div>
                <div>
                    XL 40&quot; 34&quot; 43&quot; 15.5&quot; 24&quot;
                </div>
                <div>
                    XXL 42&quot; 36&quot; 45&quot; 16&quot; 25&quot;
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
                XS 26&quot; 35&quot; 21&quot;
            </div>
            <div>
                S 28&quot; 37&quot; 22&quot;
            </div>
            <div>
                M 30&quot; 39&quot; 23&quot;
            </div>
            <div>
                L 32&quot; 41&quot; 24&quot;
            </div>
            <div>
                XL 34&quot; 43&quot; 25&quot;
            </div>
            <div>
                XXL 36&quot; 45&quot; 26&quot;
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
                S28&quot; to 32&quot;
            </div>
            <div>
                M32&quot; to 36&quot;
            </div>
            <div>
                L34&quot; to 38&quot;
            </div>
            <div>
                XL36&quot; to 40&quot;
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