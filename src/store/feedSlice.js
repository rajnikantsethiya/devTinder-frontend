import { createSlice } from "@reduxjs/toolkit";

const feedSlice = createSlice({
    name: "feed",
    initialState: {
        feed: []
    },
    reducers: {
        setFeed: (state, action) => {
            state.feed = action.payload;
        },
        removeUserFromFeed: (state, action) => {
            state.feed = state.feed.filter(item => item._id !== action.payload);
        }
    }
});
export const { setFeed, removeUserFromFeed } = feedSlice.actions;
export default feedSlice.reducer;