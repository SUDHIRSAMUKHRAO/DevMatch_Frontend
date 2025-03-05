import { configureStore } from '@reduxjs/toolkit'
import userReducer from "./userSlice"
import feedReducer from  "./feedslice"
import ConnectionReducer from "./connectionSlice"
import ConnectionsRequestsReducer from './connectionRequestSlice'

const appstore =  configureStore({
   reducer: {
    user: userReducer,  // Add other reducers here if needed.  For example, your posts slice could be added here.  See https://reduxjs.org/tutorials/fundamentals/part-3-state-management#defining-the-initial-state for more details.  The key should match the name of the slice in your store.js file.  For example, 'posts' in a postsSlice.js file would be stored in the state.posts object.  For more information, see https://redux-toolkit.js.org/api/createSlice.
    feed :feedReducer,  
    connection :ConnectionReducer,
    request: ConnectionsRequestsReducer  // Add other reducers here if needed.  For example, your posts slice could be added here.  See https://reduxjs.org/tutorials/fundamentals/part-3-state-management#defining-the-initial-state for more details.  The key should match the name of the slice in your store.js file.  For example, 'posts' in a postsSlice.js file would be stored in the state.
   
   }

  


})

export default appstore;