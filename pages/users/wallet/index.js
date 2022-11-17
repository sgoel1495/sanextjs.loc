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
import {connect} from "react-redux";
import {setCart} from "../../../ReduxStore/reducers/shoppingCartSlice";
import {setUserState} from "../../../ReduxStore/reducers/userSlice";
import {setOrderHistory} from "../../../ReduxStore/reducers/orderSlice";

function UsersWalletPage({appConfig, userConfig, userData, ...props}) {
    const [mobile, setMobile] = useState(false);
    const router = useRouter();
    const [voucher, setVoucher] = useState('')
    const [walletAmount, setWalletAmount] = useState(null);

    useEffect(() => {
        if (!userData.userServe.email)
            router.replace("/"); //illegal direct access
    }, [userData.userServe.email, router])

    useEffect(() => {
        setMobile(isMobile)
    }, [])

    useEffect(() => {
        apiCall("userWallet", appConfig.apiToken, {contact: userData.userServe.email})
            .then(pData => {
                if (pData.msg === 'Found' && pData.user) {
                    setWalletAmount(pData.user.WalletAmount)
                }
            })
            .catch(e => console.log(e.message))
    }, [userData.userServe.email, appConfig.apiToken]);

    const [message, setMessage] = useState(null);
    const [show, setShow] = useState(false);

    const redeemVoucher = async () => {
        if (voucher === "")
            return
        if (!userData.userServe.email) {
            setMessage("You need to be logged in to redeem voucher")
            setShow(true)
            return
        }

        const userO = getUserObject(userData)
        const queryO = {
            user: userO,
            voucher: {
                email: userData.userServe.email,
                voucher: voucher
            }
        }

        const voucherCall = await apiCall("redeemVoucher", appConfig.apiToken, queryO)

        if (voucherCall.status === 200) {
            setMessage(voucherCall.msg)
            if (voucherCall.msg && voucherCall.msg === "Gift Card Voucher redeem successfully!!") {
                // we update the whole storage
                const updateData = await updateUserDataAfterLogin(userData.userServe, appConfig.apiToken, {}, [])
                props.setCart(updateData.shoppingCart)
                props.setUserState(updateData.userState);
                props.setOrderHistory(updateData.setOrderHistory)
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
                    className={"text-black font-700"}>{userConfig.currSymbol} {walletAmount}</span>
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
                                Available Balance: <span className={"font-600 text-black"}>{userConfig.currSymbol} {walletAmount}</span>
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

const mapStateToProps = (state) => {
    return {
        userData: state.userData,
        shoppingCart: state.shoppingCart,
        appConfig: state.appConfig,
        userConfig: state.userConfig
    }
}

export default connect(mapStateToProps, {setCart, setUserState, setOrderHistory})(UsersWalletPage);
