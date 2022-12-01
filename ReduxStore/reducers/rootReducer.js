import {combineReducers} from "redux";
import appConfigSlice from "./appConfigSlice";
import userSlice from "./userSlice";
import shoppingCartSlice from "./shoppingCartSlice";
import userConfigSlice from "./userConfigSlice";
import orderSlice from "./orderSlice";
import filterSlice from "./filterSlice";
import intentSlice from "./intentSlice";


const rootReducer = combineReducers({
    userData: userSlice,
    appConfig: appConfigSlice,
    shoppingCart: shoppingCartSlice,
    userConfig: userConfigSlice,
    orderData: orderSlice,
    filters: filterSlice,
    intent: intentSlice
});
export default rootReducer;
