import AppWideContext from "../../store/AppWideContext";
import Link from "next";

function ContactInformation(props) {
    const {dataStore} = useContext(AppWideContext);

    const mobileView = null;
    const browserView = <div>
        <div>Contact Information</div>
        <div>{dataStore.userServe.user_name}</div>
        <div>{dataStore.userServe.email}</div>
        <div>
            <Link href="/users/account"><a>Change Password</a></Link>
            | <Link href="/users/account"><a>Edit</a></Link>
        </div>
    </div>;

    return (props.mobile) ? mobileView : browserView;
}
export default ContactInformation;