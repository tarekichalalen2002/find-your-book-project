import { createSlice } from "@reduxjs/toolkit"


const initialState = false

const sideBarSlice = createSlice({
    initialState,
    name: "showSidebar",
    reducers: {
        setShowSidebar: (state, action) => {
            const { value } = action.payload
            state = value
            return state
        }
    }
})

export const selectShowSideBar =  state => state.showSidebar
export const { setShowSidebar } = sideBarSlice.actions
export default sideBarSlice.reducer