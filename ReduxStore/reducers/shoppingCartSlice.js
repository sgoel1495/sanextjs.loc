import {createSlice} from "@reduxjs/toolkit"
import {shoppingCartState} from "../initialStates";

const shoppingCartSlice = createSlice({
    name: "shoppingCart",
    initialState: shoppingCartState,
    reducers: {
        setCart: (state, action) => {
            state.cart = action.payload;
        }
    }
})

export const {setCart} = shoppingCartSlice.actions;
export default shoppingCartSlice.reducer;