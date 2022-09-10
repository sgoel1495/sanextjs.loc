import {combineReducers} from "redux";
import appConfigSlice from "./appConfigSlice";
import userSlice from "./userSlice";
import shoppingCartSlice from "./shoppingCartSlice";
import userConfigSlice from "./userConfigSlice";
import orderSlice from "./orderSlice";
import filterSlice from "./filterSlice";


const rootReducer = combineReducers({
    userData: userSlice,
    appConfig: appConfigSlice,
    shoppingCart: shoppingCartSlice,
    userConfig: userConfigSlice,
    orderData: orderSlice,
    filters: filterSlice
});
export default rootReducer;
