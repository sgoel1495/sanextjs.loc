import {createSlice} from "@reduxjs/toolkit"
import {userState} from "../initialStates"

const userSlice = createSlice({
    name: "user",
    initialState: userState,
    reducers: {
        // login: (state, action) => {
        //     if (state.token !== null) {
        //         state.token = action.payload;
        //     }
        // },
        setBasicDetails: (state, action) => {
            state.basicDetails = action.payload;
        },
        addOtherAddress: (state, action) => {
            state.otherAddresses.push(action.payload)
        },
        setDefaultAddress: (state, action) => {
            state.defaultAddress = {}
            state.defaultAddress = {...action.payload}
        }

    }
})
