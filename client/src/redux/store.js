import { configureStore } from "@reduxjs/toolkit";
import cardReducer from "./cardSlice";

export default configureStore({
    reducer: {
        card: cardReducer,
    },
    devTools: false
})