import React, { Fragment, useContext, useEffect } from "react";
import AppWideContext from "../../../store/AppWideContext";
import { useRouter } from "next/router";
import PageHead from "../../../components/PageHead";
import Header from "../../../components/navbar/Header";
import Footer from "../../../components/footer/Footer";
import UserPageTemplate from "../../../components/user/UserPageTemplate";

function UsersWalletPage() {
    const router = useRouter();
    const { dataStore } = useContext(AppWideContext);
    useEffect(() => {
        if (dataStore.userData.contact == null)
            router.replace("/"); //illegal direct access
    }, [dataStore.userData.contact, router])

    const mobileView = null;
    const browserView = (
        <UserPageTemplate>
            <p className="text-[28px] mb-2">My Wallet</p>
            <div className="bg-[#f1f2f3] px-8 py-5 w-full">
                <p className="text-[#777] font-500 mt-4">No Record Found!</p>
            </div>
            <div className="bg-[#f1f2f3] px-8 py-5 w-full">
                <form action="" className="flex gap-x-5">
                    <input type="text" placeholder="Redeem Gift Voucher" className="py-2.5 px-2 min-w-[30%] text-sm bg-transparent border-black focus:border-black focus:ring-transparent placeholder:text-black" />
                    <button type="submit" className="bg-black py-2 px-8 text-white uppercase">Redeem</button>
                </form>
            </div>
        </UserPageTemplate>
    )
    return (
        <Fragment>
            <PageHead url={"/users/wallet"} id={"profile"} isMobile={dataStore.mobile} />
            <Header type={"shopMenu"} />
            {(dataStore.mobile) ? mobileView : browserView}
            <Footer isMobile={dataStore.mobile}/>
        </Fragment>
    )
}

export default UsersWalletPage;