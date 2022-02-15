import SocialShare from "./SocialShare";
import Image from "next/image";
import Link from "next/link";

/**
 * @todo @Sambhav Css
 * @todo clicks on social and share
 * @param props have isMobile, main
 * @constructor
 */

function StylingServices(props){
    const WEBASSETS = process.env.NEXT_PUBLIC_WEBASSETS;
    const mobileView = null;
    const browserView = <div>
        <div>Styling Services</div>
        {(props.main)
            ? <SocialShare isMobile={false}/>
            : null
        }
        <Image src={WEBASSETS + "/assets/images/styling_service_800.jpg"} width="300" height="300" alt="Styling Service" />
        <p>
            Need a Wardrobe Refresh or Need to decide what to wear for an event that's coming up?
            Not sure about the silhouette that will flatter you? or the color you should pick?
            Well, we've got your back!We provide Styling Services too!
            Whether you need to pick for an event, your everyday clothing, or if you have any questions based on what style, color, or silhouette would suit you best, we have in-house stylists to answer your queries.
            <Link href="/get-appointment">
                <b><u>Book Your Free Styling Appointment in Store Now</u></b>
            </Link>
            , or Contact Us, email care@saltattire.com, call or whatsapp +91 9015904904 for a Virtual Styling Session!
        </p>
    </div>;

    return (props.isMobile)? mobileView : browserView;
}

export default StylingServices;