import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    mode: 'light'
}

export const settingsSlice = createSlice({
    name: 'settings',
    initialState,
    reducers: {
        toggleMode(state, action){
            state.mode = action.payload
        }
    }
})

export const settingsReducer = settingsSlice.reducer;
export const settingsAction = settingsSlice.actions;