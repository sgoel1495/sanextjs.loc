import Link from "next/link";
import Image from "next/image";
import React from "react";

function SocialShare(props) {
    const WEBASSETS = process.env.NEXT_PUBLIC_WEBASSETS;

    const mobileView = null;
    const browserView = (
        <div className={`flex items-center justify-end gap-x-3`}>
            <Link href="#fb">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill={`currentColor`} viewBox="0 0 24 24">
                    <path
                        d="M20 3H4a1 1 0 0 0-1 1v16a1 1 0 0 0 1 1h8.615v-6.96h-2.338v-2.725h2.338v-2c0-2.325 1.42-3.592 3.5-3.592.699-.002 1.399.034 2.095.107v2.42h-1.435c-1.128 0-1.348.538-1.348 1.325v1.735h2.697l-.35 2.725h-2.348V21H20a1 1 0 0 0 1-1V4a1 1 0 0 0-1-1z"/>
                </svg>
            </Link>
            <Link href="#twitter">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill={`currentColor`} viewBox="0 0 24 24">
                    <path
                        d="M19.633 7.997c.013.175.013.349.013.523 0 5.325-4.053 11.461-11.46 11.461-2.282 0-4.402-.661-6.186-1.809.324.037.636.05.973.05a8.07 8.07 0 0 0 5.001-1.721 4.036 4.036 0 0 1-3.767-2.793c.249.037.499.062.761.062.361 0 .724-.05 1.061-.137a4.027 4.027 0 0 1-3.23-3.953v-.05c.537.299 1.16.486 1.82.511a4.022 4.022 0 0 1-1.796-3.354c0-.748.199-1.434.548-2.032a11.457 11.457 0 0 0 8.306 4.215c-.062-.3-.1-.611-.1-.923a4.026 4.026 0 0 1 4.028-4.028c1.16 0 2.207.486 2.943 1.272a7.957 7.957 0 0 0 2.556-.973 4.02 4.02 0 0 1-1.771 2.22 8.073 8.073 0 0 0 2.319-.624 8.645 8.645 0 0 1-2.019 2.083z"/>
                </svg>
            </Link>
            <Link href="#share">
                <span className="grid place-items-center w-6 h-6">
                    <Image src={WEBASSETS + "/assets/images/share_icon.svg"} height={18} width={18}/>
                </span>
            </Link>
        </div>
    );

    return (props.isMobile) ? mobileView : browserView;

}

export default SocialShare;
