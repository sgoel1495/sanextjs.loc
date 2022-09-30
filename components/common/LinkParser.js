/**
 *
 * @param {para} props
 *
 */

import React, {Fragment} from "react";
import Link from "next/link";

function LinkParser(props){
    const replacementArray = ["contactus","signin","shippingreturns","giftcards","br"];
    const splitString = props.para.split("***");
    let newString = null;
    splitString.forEach(stringPart=>{
        const isKeyword = replacementArray.includes(stringPart);
        newString = <Fragment>
            {newString}
            {(isKeyword)
                ?keywordReplace(stringPart)
                :stringPart}
        </Fragment>;
    });
    return newString;
}

const keywordReplace = (keyword)=>{
    let returnValue = null;
    switch (keyword){
        case "contactus":
            returnValue=<Link href="/salt/contact-us">
                <a>Contact Us</a>
            </Link>;
            break;
        case "signin":
            returnValue=<Link href="/homepage/signin">
                <a>My Account</a>
            </Link>;
            break;
        case "shippingreturns":
            returnValue=<Link href="/salt/shipping-returns">
                <a>Shipping & Returns Policy</a>
            </Link>;
            break;
        case "giftcards":
            returnValue=<Link href="/giftcards">
                <a>Gift Cards</a>
            </Link>;
            break;
        case "br":
            returnValue=<br/>;
            break;
        default:
            break;
    }

    return returnValue;
}

export default LinkParser;