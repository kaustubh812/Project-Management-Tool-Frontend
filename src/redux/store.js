// Import the configureStore function from Redux Toolkit
import {configureStore} from "@reduxjs/toolkit";
// Import the reducers from the user and checklist slices
import UserReducer from "./Userslice";
import ChecklistReducer from "./Checklistslice";

// Configure the Redux store
const store = configureStore({
    // Specify the reducers that make up the store's state
    reducer: {
        user: UserReducer, // Associate the UserReducer with the 'user' state slice
        checklist: ChecklistReducer // Associate the ChecklistReducer with the 'checklist' state slice
    }
});

// Export the configured store
export default store;
