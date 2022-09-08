import {createSlice} from "@reduxjs/toolkit"
import {ordersState} from "../initialStates";

const userSlice = createSlice({
    name: "orders",
    initialState: ordersState,
    reducers: {
        setOrders: (state, action) => {
            state.orderHistory = action.payload
        }
    }
})
