/**
 * @params {isMobile} props
 * @constructor
 */

import Link from "next/link";
import React from 'react';


function Footer(props) {
    const mobileView = null;
    const blockHeader = "font-500 text-black-200 mb-2 leading-none"
    const browserView = (
        <footer className={"bg-[#f5f5f5] text-black/50 pt-10 grid grid-cols-3"}>
            <div className={"px-4"}>
                <h6 className={blockHeader}>GET ON OUR LIST FOR MORE!</h6>
                <p className={"mb-4"}>Sign Up for new looks, insider styling tips, exclusive offers and more.</p>
                <form className={"flex items-stretch mb-4"}>
                    <input className={"px-1 py-2 w-3/5 border border-black focus:border-black focus:shadow-none outline-0 focus:outline-0 "} type="text" name="signup_email" id="signup_email" placeholder="Email Address"/>
                    <button className={"bg-black text-white px-10"} type="button" name="signup_btn">+</button>
                </form>
                <p>
                    By entering your email, you agree to our<br/>
                    <Link href="/salt/terms-and-condition">
                        <span className={"font-500 underline"}>Terms &amp; Conditions</span>
                    </Link>
                    <span className={"font-500"}>+</span>
                    <Link href="/salt/privacy-policy">
                        <span className={"font-500 underline"}>Privacy Policy</span>
                    </Link>
                    , including receipt of emails and promotions. You can unsubscribe at any time.
                </p>
            </div>
            <div className={"px-4 border-x grid grid-cols-2"}>
                <div>
                    <h6 className={blockHeader}>CUSTOMER SERVICE</h6>
                    <ul className="footerlist">
                        <li key="shipping-returns">
                            <Link href="/salt/shipping-returns"><a target="_blank">
                                Shipping &amp; Returns
                            </a></Link>
                        </li>
                        <li key="cancellation-modifications">
                            <Link href="/salt/cancellation-modifications"><a target="_blank">
                                Cancellation &amp; Modifications
                            </a></Link>
                        </li>
                        <li key="faq">
                            <Link href="/salt/faq"><a target="_blank">
                                FAQ
                            </a></Link>
                        </li>
                        <li key="sitemap">
                            <Link href="/salt/sitemap"><a target="_blank">
                                Site Map
                            </a></Link>
                        </li>
                        <li key="contact-us">
                            <Link href="/salt/contact-us"><a target="_blank">
                                Contact Us
                            </a></Link>
                        </li>
                    </ul>
                </div>
                <div>
                    <h6 className={blockHeader}>LEGAL &amp; COOKIES</h6>
                    <ul>
                        <li key="terms-and-condition">
                            <Link href="/salt/terms-and-condition"><a target="_blank">
                                Terms &amp; Conditions
                            </a></Link>
                        </li>
                        <li key="privacy-policy">
                            <Link href="/salt/privacy-policy"><a target="_blank">
                                Privacy Policy
                            </a></Link>
                        </li>
                    </ul>
                </div>
                <div className="col-start-1 col-end-3 mt-2">
                    <h6 className={blockHeader + " text-center"}>FOLLOW US ON</h6>
                    <ul className={"flex gap-5 justify-center mt-2"}>
                        <li key="instagram">
                            <a className={"block text-center"} href="https://www.instagram.com/saltattire" target="_blank">
                                <i className="fa fa-instagram fa_font_style"/>
                                <span className={"block"}>Instagram</span>
                            </a>
                        </li>
                        <li key="facebook">
                            <a className={"block text-center"} href="https://www.facebook.com/saltattire" target="_blank">
                                <i className="fa fa-facebook fa_font_style"/>
                                <span className="block">Facebook</span>
                            </a>
                        </li>
                        <li key="twitter">
                            <a className={"block text-center"} href="https://twitter.com/saltattire" target="_blank">
                                <i className="fa fa-twitter fa_font_style"/>
                                <span className="block">Twitter</span>
                            </a>
                        </li>
                        <li key="google">
                            <a className={"block text-center"} href="https://plus.google.com/113620197761223008326" target="_blank">
                                <i className="fa fa-google-plus fa_font_style"/>
                                <span className="block">Google+</span>
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
            <div className="px-4 flex items-center justify-center">
                <button className={"px-10 py-3 bg-black text-white"}>Contact Us</button>
            </div>
            <div className={"px-4 my-2"}>
                <ul className={"flex gap-2"}>
                    <li key="mastercard"><i className="fa fa-cc-mastercard"/>Cards</li>
                    <li key="visa"><i className="fa fa-cc-visa"/>Card</li>
                    <li key="amex"><i className="fa fa-cc-amex"/>Card</li>
                </ul>
            </div>
        </footer>
    );

    return (
        (props.isMobile) ? mobileView : browserView
    )

}

export default Footer;
