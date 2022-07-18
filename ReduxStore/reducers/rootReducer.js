import {combineReducers} from "redux";
import masterDataSlice from "./masterDataSlice";
import userSlice from "./userSlice";
import volatileDataSlice from "./volatileDataSlice";
import mdInfoSlice from "./mdInfoSlice";
import notificationSlice from "./notificationSlice";
import supportTicketSlice from "./supportTicketSlice";
import liveClassSlice from "./liveClassSlice";

const rootReducer = combineReducers({
    '': '',
});
export default rootReducer;
