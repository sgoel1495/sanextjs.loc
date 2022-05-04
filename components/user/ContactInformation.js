import AppWideContext from "../../store/AppWideContext";
import Link from "next/link";
import { useContext } from "react";

function ContactInformation(props) {
    const { dataStore } = useContext(AppWideContext);

    const mobileView = null;
    const browserView = (
        <div className="p-4 bg-[#f1f2f3] w-1/2">
            <p className="text-xl font-500 mb-2">Contact Information</p>
            <p className="font-700">{dataStore.userServe.user_name}</p>
            <p className="text-[#777]">{dataStore.userServe.email}</p>
            <div className="flex gap-2">
                <Link href="/users/account">
                    <a className="underline">Change Password</a>
                </Link>
                <span>|</span>
                <Link href="/users/account">
                    <a className="underline">Edit</a>
                </Link>
            </div>
        </div>
    );

    return (props.mobile) ? mobileView : browserView;
}
export default ContactInformation;