import {createSlice} from "@reduxjs/toolkit"
import {intentState} from "../initialStates";

const intentSlice = createSlice({
    name: "intent",
    initialState: intentState,
    reducers: {
        addCartIntent: (state, action) => {
            state.cart += 1
        },
        addCheckoutIntent: (state, action) => {
            state.checkout += 1
        },
        addWithoutAddressIntent: (state, action) => {
            state.withoutAddress += 1
        },
        addWithAddressIntent: (state, action) => {
            state.withAddress += 1
        },
        addOnPaymentIntent: (state, action) => {
            state.onPayment += 1
        },
        addBackFromPaymentIntent: (state, action) => {
            state.backFromPayment += 1
        },
        reset: (state, action) => {
            state = intentState
        }
    }
})
export const {
    addCartIntent,
    addCheckoutIntent,
    addWithoutAddressIntent,
    addWithAddressIntent,
    addOnPaymentIntent,
    addBackFromPaymentIntent,
    reset
} = intentSlice.actions;
export default intentSlice.reducer;