import { configureStore } from '@reduxjs/toolkit'
import showSideBarReducer from '../states/index'

const store = configureStore({
    reducer: {
        showSidebar: showSideBarReducer
    }
})

export default store