import React, {Fragment, useContext, useEffect, useState} from "react";
import AppWideContext from "../../../store/AppWideContext";
import {useRouter} from "next/router";
import PageHead from "../../../components/PageHead";
import Header from "../../../components/navbar/Header";
import Footer from "../../../components/footer/Footer";
import UserPageTemplate from "../../../components/user/UserPageTemplate";
import {isMobile} from "react-device-detect";
import Toast from "../../../components/common/Toast";
import {apiCall} from "../../../helpers/apiCall";
import UsersMenu from "../../../components/user/UsersMenu";
import {updateUserDataAfterLogin} from "../../../helpers/updateUserDataAfterLogin";
import {getUserObject} from "../../../helpers/addTocart";

function UsersWalletPage() {
    const [mobile, setMobile] = useState(false);
    const router = useRouter();
    const [voucher, setVoucher] = useState('')
    const {dataStore, updateDataStore} = useContext(AppWideContext);
    const [walletAmount, setWalletAmount] = useState(null);

    useEffect(() => {
        if (dataStore.userData.contact == null)
            router.replace("/"); //illegal direct access
    }, [dataStore.userData.contact, router])

    useEffect(() => {
        setMobile(isMobile)
        console.log('datastore', dataStore)
    }, [])

    useEffect(() => {
        apiCall("userWallet", dataStore.apiToken, {contact: dataStore.userData.contact})
            .then(pData => {
                if (pData.msg === 'Found' && pData.user) {
                    setWalletAmount(pData.user.WalletAmount)
                }
            })
            .catch(e => console.log(e.message))
    }, [dataStore.userData.contact, dataStore.apiToken]);

    const [message, setMessage] = useState(null);
    const [show, setShow] = useState(false);

    const redeemVoucher = async () => {
        if (voucher === "")
            return
        if (!dataStore.userData.contact) {
            setMessage("You need to be logged in to redeem voucher")
            setShow(true)
            return
        }

        const userO = getUserObject(dataStore, updateDataStore)
        const queryO = {
            user: userO,
            voucher: {
                email: dataStore.userData.contact,
                voucher: voucher
            }
        }

        const voucherCall = await apiCall("redeemVoucher", dataStore.apiToken, queryO)

        if (voucherCall.status = 200) {
            setMessage(voucherCall.msg)
            if (voucherCall.msg && voucherCall.msg === "Gift Card Voucher redeem successfully!!") {
                // we update the whole storage
                const updateData = await updateUserDataAfterLogin(dataStore.userData.contact, dataStore.apiToken, {}, [])
                Object.keys(updateData).forEach((key) => {
                    updateDataStore(key, updateData[key]);
                })
                localStorage.setItem("userData", JSON.stringify(updateData["userData"]));
            }
        } else
            setMessage("Voucher could not be redeemed. Please ensure it is valid")
        setShow(true)
    }

    const mobileView = <UserPageTemplate mobile={true}>
        <p className="text-[28px] my-2">My Wallet</p>
        <div className="bg-[#f1f2f3] px-8 py-5 w-full">
            <p className="text-[20px] mb-2">SALT Store Credit</p>
            {walletAmount >= 0 ? <p className="text-[#777] font-500 mt-4">
                    Available Balance: <span
                    className={"text-black font-700"}>{dataStore.currSymbol} {walletAmount}</span>
                </p>
                :
                ""}
        </div>
        <div className="flex justify-center bg-[#f1f2f3] px-8 py-5 w-full">
            <form action="" className="flex flex-col gap-x-5 flex-1">
                <input type="text" placeholder="Redeem Gift Voucher"
                       className="py-2.5 min-w-[30%] flex-1 text-sm bg-transparent border-black focus:border-black focus:ring-transparent placeholder:text-black"/>
                <button type="submit"
                        className="flex-1 bg-black mx-[25%] text-center mt-3 py-2 px-8 text-white uppercase">Redeem
                </button>
            </form>
        </div>
    </UserPageTemplate>
    const browserView = (
        <div className="xl:w-3/5 mx-auto flex divide-x items-start gap-x-8 min-h-[80vh]">
            <div className="flex-1 py-3">
                <UsersMenu/>
            </div>
            <div className="pl-8 flex-[3] flex flex-col items-start gap-4">
                <p className="text-[28px] mb-2">My Wallet</p>
                <div className="bg-[#f1f2f3] px-8 py-5 w-full">
                    <p className="text-[28px] mb-2">SALT Store Credit</p>
                    {
                        walletAmount >= 0 ? <p className="text-[#777] font-500 mt-4">
                                Available Balance: <span className={"font-600 text-black"}>{dataStore.currSymbol} {walletAmount}</span>
                            </p>
                            :
                            ""
                    }
                </div>
                <div className="bg-[#f1f2f3] px-8 py-5 w-full">
                    <div className="flex gap-x-5">
                        <input type="text" placeholder="Redeem Gift Voucher" value={voucher}
                               onChange={e => setVoucher(e.target.value)}
                               className="py-2.5 px-2 min-w-[30%] text-sm bg-transparent border-black focus:border-black focus:ring-transparent placeholder:text-black"/>
                        <button type="submit" className="bg-black py-2 px-8 text-white uppercase"
                                onClick={redeemVoucher}>Redeem
                        </button>
                    </div>
                </div>
            </div>
        </div>

    )
    return (
        <Fragment>
            <PageHead url={"/users/wallet"} id={"profile"} isMobile={mobile}/>
            <Header type={mobile ? "minimal" : "shopMenu"} isMobile={mobile}/>
            {(mobile) ? mobileView : browserView}
            <Footer isMobile={mobile} minimal={true}/>
            <Toast show={show} hideToast={() => setShow(false)}>
                <span>{message}</span>
            </Toast>
        </Fragment>
    )
}

export default UsersWalletPage;
