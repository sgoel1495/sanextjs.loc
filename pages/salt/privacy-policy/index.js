import React, { Fragment, useContext, useEffect, useState } from 'react';
import AppWideContext from "../../../store/AppWideContext";
import PageHead from "../../../components/PageHead";
import Footer from "../../../components/footer/Footer";
import CategoryHeaderImage from "../../../components/common/CategoryHeaderImage";
import Header from "../../../components/navbar/Header";

/**
 * @todo @Sambhav css
 * @returns {JSX.Element}
 */


function SaltPrivacyPolicyPage() {
    const { dataStore } = useContext(AppWideContext);

    const category = "Privacy Policy";

    const mobileView = (
        <div className='w-full px-[13%] mx-auto text-[#525252d6] mt-10 mb-36'>
            <span className={"block text-2xl text-center text-black py-5"}>Privacy Policy</span>
            <p>
                We view protection of your privacy as a very important principle. This privacy policy (the
                &quot;Policy&quot;),
                is published pursuant to Section 43A of the Information Technology Act, 2000 (the &quot;Act&quot;), and the
                Rules thereunder . We understand clearly that You and Your Personal Information is one of our most
                important assets. We store and process Your Information including any sensitive financial
                information
                collected (as defined under the Act and the Rules), if any, on computers that may be protected by
                physical as well as reasonable technological security measures and procedures in accordance with the
                Act and the Rules. If you object to our current Privacy Policy and your information being
                transferred
                or used in this way please do not use Website.<br /><br />
                While using our Service, we may ask you to provide us with certain personally identifiable information that can be used to contact or identify you (&quot;Personal Data&quot;). Personally identifiable information may include but is not limited to:<br />
                1. Email address<br />
                2. First name and last name<br />
                3. Phone number<br />
                4. Address, Country, State, Province, ZIP/Postal code, City<br />
                5. Cookies and Usage Data<br /><br />
                We may use your Personal Data to contact you with newsletters, marketing or promotional materials and other information that may be of interest to you. You may opt-out of receiving any, or all, of these communications from us by following the unsubscribe link.<br />
                We may also collect information that your browser sends whenever you visit our Service or when you access Service by or through any device (&quot;Usage Data&quot;).<br />
                This Usage Data may include information such as your computer’s Internet Protocol address (e.g. IP address), browser type, browser version, the pages of our Service that you visit, the time and date of your visit, the time spent on those pages, unique device identifiers and other diagnostic data.<br />
                When you access Service with a device, this Usage Data may include information such as the type of device you use, your device unique ID, the IP address of your device, your device operating system, the type of Internet browser you use, unique device identifiers and other diagnostic data.<br />
                We may use and store information about your location if you give us permission to do so (&quot;Location Data&quot;). We use this data to provide features of our Service, to improve and customize our Service.<br />
                You can enable or disable location services when you use our Service at any time by way of your device settings.<br />
                We use cookies and similar tracking technologies to track the activity on our Service and we hold certain information. Cookies are files with a small amount of data which may include an anonymous unique identifier. Cookies are sent to your browser from a website and stored on your device. Other tracking technologies are also used such as beacons, tags and scripts to collect and track information and to improve and analyze our Service.<br />
                You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent. However, if you do not accept cookies, you may not be able to use some portions of our Service.<br /><br />
                Saltattire may use the information that we collect from you when you register, make a purchase, sign up for our newsletter, respond to a survey or marketing communication, surf the website, or use certain other site features in the following ways:<br />
                To quickly process your transactions<br />
                To personalize user&apos;s experience and to allow us to deliver the type of content and product offerings in which you are most interested<br />
                To allow us to better service you in responding to your customer service requests<br />
                Saltattire collects several different types of information for various purposes to provide and improve our Service to you.<br /><br />
                If you have any questions regarding our Privacy Statement or if you need to update, change or remove information, you can do so by contacting us at care@saltattire.com
            </p>
        </div>
    );

    const browserView = (
        <div className='w-1/2 mx-auto text-[#777] my-20'>
            <p>
                We view protection of your privacy as a very important principle. This privacy policy (the
                &quot;Policy&quot;),
                is published pursuant to Section 43A of the Information Technology Act, 2000 (the &quot;Act&quot;), and the
                Rules thereunder . We understand clearly that You and Your Personal Information is one of our most
                important assets. We store and process Your Information including any sensitive financial
                information
                collected (as defined under the Act and the Rules), if any, on computers that may be protected by
                physical as well as reasonable technological security measures and procedures in accordance with the
                Act and the Rules. If you object to our current Privacy Policy and your information being
                transferred
                or used in this way please do not use Website.<br /><br />
                While using our Service, we may ask you to provide us with certain personally identifiable information that can be used to contact or identify you (&quot;Personal Data&quot;). Personally identifiable information may include but is not limited to:<br />
                1. Email address<br />
                2. First name and last name<br />
                3. Phone number<br />
                4. Address, Country, State, Province, ZIP/Postal code, City<br />
                5. Cookies and Usage Data<br /><br />
                We may use your Personal Data to contact you with newsletters, marketing or promotional materials and other information that may be of interest to you. You may opt-out of receiving any, or all, of these communications from us by following the unsubscribe link.<br />
                We may also collect information that your browser sends whenever you visit our Service or when you access Service by or through any device (&quot;Usage Data&quot;).<br />
                This Usage Data may include information such as your computer’s Internet Protocol address (e.g. IP address), browser type, browser version, the pages of our Service that you visit, the time and date of your visit, the time spent on those pages, unique device identifiers and other diagnostic data.<br />
                When you access Service with a device, this Usage Data may include information such as the type of device you use, your device unique ID, the IP address of your device, your device operating system, the type of Internet browser you use, unique device identifiers and other diagnostic data.<br />
                We may use and store information about your location if you give us permission to do so (&quot;Location Data&quot;). We use this data to provide features of our Service, to improve and customize our Service.<br />
                You can enable or disable location services when you use our Service at any time by way of your device settings.<br />
                We use cookies and similar tracking technologies to track the activity on our Service and we hold certain information. Cookies are files with a small amount of data which may include an anonymous unique identifier. Cookies are sent to your browser from a website and stored on your device. Other tracking technologies are also used such as beacons, tags and scripts to collect and track information and to improve and analyze our Service.<br />
                You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent. However, if you do not accept cookies, you may not be able to use some portions of our Service.<br /><br />
                Saltattire may use the information that we collect from you when you register, make a purchase, sign up for our newsletter, respond to a survey or marketing communication, surf the website, or use certain other site features in the following ways:<br />
                To quickly process your transactions<br />
                To personalize user&apos;s experience and to allow us to deliver the type of content and product offerings in which you are most interested<br />
                To allow us to better service you in responding to your customer service requests<br />
                Saltattire collects several different types of information for various purposes to provide and improve our Service to you.<br /><br />
                If you have any questions regarding our Privacy Statement or if you need to update, change or remove information, you can do so by contacting us at care@saltattire.com
            </p>
        </div>
    );

    return (
        <Fragment>
            <PageHead url="/salt/privacy-policy" id="privacypolicy" isMobile={dataStore.mobile} />
            <Header type={dataStore.mobile ? "minimal" : "shopMenu"} isMobile={dataStore.mobile} />
            <CategoryHeaderImage category={category} />
            {(dataStore.mobile) ? mobileView : browserView}
            <Footer isMobile={dataStore.mobile} minimal={true} color={"#f5f5f5"} />
        </Fragment>
    );
}

export default SaltPrivacyPolicyPage;
