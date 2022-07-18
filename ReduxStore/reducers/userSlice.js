import {createSlice} from "@reduxjs/toolkit"
import {userState} from "../initialStates"

const userSlice = createSlice({
    name: "user",
    initialState: userState,
    reducers: {
        login: (state, action) => {
            if (state.token !== null) {
                state.token = action.payload;
            }
        },
        setBasicDetails: (state, action) => {
            state.basicDetails = action.payload;
        },
        addAddress: (state, action) => {
            state.addresses.push(action.payload)
        },
        setDefaultAddress: (state, action) => {
            state.addresses.unshift(action.payload)
        }

    }
})
