import {createSlice} from "@reduxjs/toolkit"
import {orderState} from "../initialStates";

const orderSlice = createSlice({
    name: "orderData",
    initialState: orderState,
    reducers: {
        setOrderHistory: (state, action) => {
            state.orderHistory = action.payload
        },
        setCurrentOrderID: (state, action) => {
            state.currentOrderId = action.payload
        },
        setOrderSummary: (state, action) => {
            state.orderSummary = action.payload
        }
    }
})

export const {setOrderHistory, setCurrentOrderID, setOrderSummary} = orderSlice.actions;
export default orderSlice.reducer;
