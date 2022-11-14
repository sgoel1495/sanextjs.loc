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
        },
        setPrivilegedUser: (state, action) => {
            state.privilegedUser = action.payload
        }
    }
})

export const {setUserServe, setUserState, setUserAddresses, setPrivilegedUser} = userSlice.actions;
export default userSlice.reducer;