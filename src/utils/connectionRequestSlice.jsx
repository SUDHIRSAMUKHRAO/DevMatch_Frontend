import { createSlice } from "@reduxjs/toolkit";

const connectionRequestsSlice = createSlice({
    name: "connectionRequests",
    initialState: [],
    reducers: {
        addRequest: (state, action) => action.payload,  // Updating state with new data
        removeConnection: (state,action) =>{
            const newArray = state.filter((r)=>r._id !== action.payload)
            return newArray;
        },  // Reset state when needed
    },
}); 

export const { addRequest, removeConnection } = connectionRequestsSlice.actions;
export default connectionRequestsSlice.reducer;
