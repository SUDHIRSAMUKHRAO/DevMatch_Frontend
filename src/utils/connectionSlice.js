import { createSlice } from "@reduxjs/toolkit";

const connectionSlice = createSlice({
    name: "connection",
    initialState: [],
    reducers: {
        addConnection: (state, action) => action.payload,  // Updating state with new data
        removeConnection: () => [],  // Reset state when needed
    },
});

export const { addConnection, removeConnection } = connectionSlice.actions;
export default connectionSlice.reducer;
