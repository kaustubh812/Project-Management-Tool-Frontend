// Import the createSlice function from Redux Toolkit
import { createSlice } from "@reduxjs/toolkit";

// Function to safely retrieve the initial state from localStorage
const getInitialState = () => {
  try {
    // Attempt to parse the 'user' item from localStorage
    const user = JSON.parse(localStorage.getItem("user"));
    // Return the initial state, using values from localStorage if available
    return {
      userid: user?.userid || "",
      jwt: user?.jwt || "",
      name: user?.name || "",
      checklisteditid: null,
    };
  } catch {
    // Return a default initial state if there's an error (e.g., localStorage is empty)
    return {
      userid: "",
      jwt: "",
      name: "",
      checklisteditid: null,
    };
  }
};

// Define the slice
const userslice = createSlice({
  name: "user", // Name of the slice
  initialState: getInitialState(), // Set the initial state using the function above
  reducers: { // Reducers to handle actions
    adduser: (state, action) => {
      // Destructure payload
      const { userid, jwttoken, name } = action.payload;
      // Update state with new user info
      state.userid = userid;
      state.jwt = jwttoken;
      state.name = name;
      // Update localStorage with new user info
      localStorage.setItem("user", JSON.stringify({ userid, jwt: jwttoken, name }));
    },
    resetuser: (state) => {
      // Reset state to initial state
      Object.assign(state, getInitialState());
      // Remove the 'user' item from localStorage
      localStorage.removeItem("user");
    },
    setchecklistid: (state, action) => {
      // Set the checklist edit ID
      state.checklisteditid = action.payload;
    },
    resetchecklistid: (state) => {
      // Reset the checklist edit ID to null
      state.checklisteditid = null;
    },
  },
});

// Export the actions and reducer
export const { adduser, resetuser, setchecklistid, resetchecklistid } = userslice.actions;
export default userslice.reducer;
