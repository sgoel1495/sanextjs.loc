import AppWideContext from "../../../store/AppWideContext";

function NewArrivalsIdPage(){
    const { dataStore } = useContext(AppWideContext);

    const mobileView = null
    const browserView = null

    return dataStore.mobile ? mobileView : browserView
}
export default NewArrivalsIdPage