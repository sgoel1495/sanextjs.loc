import {createStore} from "redux";
import {persistReducer, persistStore} from "redux-persist";
import rootReducer from "./reducers/rootReducer";
import storage from 'redux-persist/lib/storage'
import {
    userState,
    appConfigState, shoppingCartState, userConfigState, orderState, filterState
} from "./initialStates";


const persistConfig = {
    key: "root",
    storage,
    blacklist: ['orderData']
};

const configureStore = (preloadedState) => {
    const mainReducer = (state, action) => {
        if (action.type === "RESET") {
            let temp = JSON.parse(JSON.stringify(state));
            temp.user.token = null;
            temp.user.basicDetails.id = null;
            temp.user.report = {
                vData: {
                    recent: [],
                },
            };
            return temp;
        } else if (action.type === "RESET_APP") {
            return preloadedState;
        }
        return rootReducer(state, action);
    };
    const persistedReducer = persistReducer(persistConfig, mainReducer);
    return createStore(persistedReducer, preloadedState);
};

export const store = configureStore({
    userData: userState,
    appConfig: appConfigState,
    shoppingCart: shoppingCartState,
    userConfig: userConfigState,
    orderData: orderState,
    filters: filterState
});

export const persistor = persistStore(store);