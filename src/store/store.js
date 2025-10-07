import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import feedReducer from "./feedSlice";
import requestsReducer from "./requestsSlice";
import connectionReducer from "./connectionSlice";

export const store = configureStore({
    reducer: {
        user: userReducer,
        feed: feedReducer,
        requests: requestsReducer,
        connections: connectionReducer
    }
});