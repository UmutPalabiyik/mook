import { configureStore } from "@reduxjs/toolkit";
import userSlice from "../Features/User/userSlice";


export default configureStore({
    reducer: {
        user: userSlice
    }
})