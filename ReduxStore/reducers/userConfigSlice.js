import {createSlice} from "@reduxjs/toolkit"
import {userConfigState} from "../initialStates"

const userConfigSlice = createSlice({
    name: "userConfig",
    initialState: userConfigState,
    reducers: {
        setCurrency: (state, action) => {
            state.currCurrency = action.payload
        },
        setCurrencySymbol: (state, action) => {
            state.currSymbol = action.payload
        },
        setShowLogin: (state, action) => {
            state.showLogin = action.payload
        }
    }
})
export const {setCurrency, setCurrencySymbol, setShowLogin} = userConfigSlice.actions;
export default userConfigSlice.reducer;