import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "@reduxjs/toolkit";

import producSlice from "./slice/ProductSlice"

const reducer = combineReducers({
    product:producSlice
})

 const store = configureStore({
    reducer
})

export default store

