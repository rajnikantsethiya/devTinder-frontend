import { createSlice } from "@reduxjs/toolkit";

const connectionSlice = createSlice({
    name: 'connections',
    initialState: {
        connections: []
    },
    reducers: {
        setConnection: (state, action) => {
            state.connections = action.payload;
        }
    }
});

export const { setConnection } = connectionSlice.actions;
export default connectionSlice.reducer;