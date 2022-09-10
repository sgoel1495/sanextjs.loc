import {createSlice} from "@reduxjs/toolkit"
import {appConfigState} from "../initialStates"

const appConfigSlice = createSlice({
    name: "appConfig",
    initialState: appConfigState,
    reducers: {
        setIsMobile:(state, action)=>{
            state.isMobile = action.payload
        }
    }
})
export const {setIsMobile} = appConfigSlice.actions;
export default appConfigSlice.reducer;