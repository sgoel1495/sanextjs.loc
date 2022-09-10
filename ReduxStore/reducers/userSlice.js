import {createSlice} from "@reduxjs/toolkit"
import {userState} from "../initialStates"

const userSlice = createSlice({
    name: "user",
    initialState: userState,
    reducers: {
        setUserServe: (state, action) => {
            state.userServe = action.payload
        },
        setUserState: (state, action) => {
            return action.payload
        },
        setUserAddresses: (state, action) => {
            state.userAddresses = action.payload
        }
    }
})

export const {setUserServe, setUserState, setUserAddresses} = userSlice.actions;
export default userSlice.reducer;