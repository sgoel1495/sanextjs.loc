import SocialShare from "./SocialShare";
import Image from "next/image";
import Link from "next/link";
import React from "react";


function StylingServices(props) {
    const WEBASSETS = process.env.NEXT_PUBLIC_WEBASSETS;
    const mobileView = null;
    const browserView = (
        <section className={`flex flex-col gap-y-5 font-cursive text-2xl my-10`}>
            <p className={`text-4xl font-600 text-center`}>Styling Services</p>
            {(props.main)
                ? <SocialShare isMobile={false}/>
                : null
            }
            <span className="block relative w-4/5 aspect-square self-center">
                <Image src={WEBASSETS + "/assets/images/styling_service_800.jpg"} alt="Styling Service" layout={`fill`} objectFit={`cover`}/>
            </span>
            <p>
                Need a Wardrobe Refresh or Need to decide what to wear for an event that&apos;s coming up?
                Not sure about the silhouette that will flatter you? or the color you should pick?
                Well, we&apos;ve got your back!We provide Styling Services too!
                Whether you need to pick for an event, your everyday clothing, or if you have any questions based on what style, color, or silhouette would suit you best, we have in-house stylists to
                answer your queries.
                <Link href="/get-appointment" passHref>
                    <b><u>Book Your Free Styling Appointment in Store Now</u></b>
                </Link>
                , or Contact Us, email care@saltattire.com, call or whatsapp +91 9015904904 for a Virtual Styling Session!
            </p>
        </section>
    );

    return (props.isMobile) ? mobileView : browserView;
}

export default StylingServices;
