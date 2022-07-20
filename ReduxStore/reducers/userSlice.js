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
        setUsername: (state, action) => {
            state.basicDetails = action.payload
        },
        setUserWallet: (state, action) => {
            state.wallet = {...action.payload}
        },
        setBasicDetails: (state, action) => {
            state.basicDetails = {...action.payload};
        },
        setOtherAddress: (state, action) => {
            state.basicDetails.otherAddresses = [...action.payload]
        },
        setDefaultAddress: (state, action) => {
            state.basicDetails.defaultAddress = {...action.payload}
        },
        setMeasurements: (state, action) => {
            state.measurements = {...action.payload}
        }
    }
})
