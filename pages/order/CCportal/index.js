import React from 'react';
import Image from "next/image";
import {useRouter} from "next/router";

const Index = () => {
    const WEBASSETS = process.env.NEXT_PUBLIC_WEBASSETS;
    const router = useRouter();

    return (
        <div>
            <div className='relative mt-5 mx-3 text-center'>
                <span className={"px-4 py-2 font-600 border-2 absolute left-2 top-[50%] translate-y-[-50%]"} onClick={router.back}>
                    {"<"}
                </span>
                <Image src={WEBASSETS + "/assets/SALT_logo.png"} alt='fav' width={150} height={60}/>
            </div>
            <iframe width={"100%"} style={{height: "90vh"}} frameBorder="0" id="paymentFrame"
                    src={"https://secure.ccavenue.com/transaction/transaction.do?command=initiateTransaction&merchant_id=130447&encRequest=" + router.query.token + "&access_code="+router.query.access_code}>
            </iframe>
        </div>
    );
};

export default Index;