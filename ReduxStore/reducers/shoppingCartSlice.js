import {createSlice} from "@reduxjs/toolkit"
import {shoppingCartState} from "../initialStates";

const userSlice = createSlice({
    name: "shoppingCart",
    initialState: shoppingCartState,
    reducers: {
        setCart: (state, action) => {
            if (!state.cart)
                state.cart = action.payload
            else if (state.cart.length >= 1) {
                action.payload.map((item) => {
                    state.cart.push(item)
                })
            }
        }
    }
})
