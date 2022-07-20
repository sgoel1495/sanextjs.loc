import {createSlice} from "@reduxjs/toolkit"
import {appConfigState} from "../initialStates"

const appConfigSlice = createSlice({
    name: "appConfig",
    initialState: appConfigState,
    reducers: {}
})
