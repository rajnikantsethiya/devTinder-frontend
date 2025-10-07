import { createSlice } from "@reduxjs/toolkit";

const requestsSlice = createSlice({
    name: 'requests',
    initialState: {
        requests: []
    },
    reducers: {
        setRequests: (state, action) => {
            state.requests = action.payload;
        },
        removeUserFromRequests: (state, action) => {
            state.requests = state.requests.filter(request => request._id !== action.payload);
        }
    }
});

export const { setRequests, removeUserFromRequests } = requestsSlice.actions;
export default requestsSlice.reducer;