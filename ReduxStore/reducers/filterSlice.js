import {createSlice} from "@reduxjs/toolkit"
import {filterState} from "../initialStates";

const filterSlice = createSlice({
    name: "filters",
    initialState: filterState,
    reducers: {
        applyFilters: (state, action) => {
            state.refreshFilter = !state.refreshFilter;
        },
        setFilter: (state, action) => {
            state.filter = action.payload;
        },
        setFilterCheckbox: (state, action) => {
            state.filterCheckboxes = action.payload
        },
        setSortBy: (state, action) => {
            state.sortBy = action.payload
        }
    }
})
export const {applyFilters, setFilter, setFilterCheckbox, setSortBy} = filterSlice.actions;
export default filterSlice.reducer;