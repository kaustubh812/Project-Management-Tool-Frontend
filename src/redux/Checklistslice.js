// Import the createSlice function from Redux Toolkit
import { createSlice } from "@reduxjs/toolkit";

// Define the slice
const checklistslice = createSlice({
  name: "checklist", // The name of the slice
  initialState: { // The initial state of the checklist slice
    priority: "",
    name: "",
    duedate: "",
    checklistarr: [],
    markedval: 0,
    sectiontype: "todo",
    filterchecklist: "This Month"
  },
  reducers: { // Reducers to handle actions
    // Each reducer function updates the state based on the action received
    addname: (state, action) => {
      state.name = action.payload;
    },
    addpriority: (state, action) => {
      state.priority = action.payload;
    },
    setfilterchecklist: (state, action) => {
      state.filterchecklist = action.payload;
    },
    addchecklist: (state) => {
      state.checklistarr.push({ mark: false, data: "" });
    },
    updatechecklistcheckbox: (state, action) => {
      const checklistobj = state.checklistarr[action.payload];
      if (checklistobj) {
        checklistobj.mark = !checklistobj.mark;
        state.markedval += checklistobj.mark ? 1 : -1;
      }
    },
    updatechecklistdata: (state, action) => {
      const { index, data } = action.payload;
      const checklistobj = state.checklistarr[index];
      if (checklistobj) {
        checklistobj.data = data;
      }
    },
    deletechecklist: (state, action) => {
      const checklistobj = state.checklistarr[action.payload];
      if (checklistobj && checklistobj.mark) {
        state.markedval -= 1;
      }
      state.checklistarr.splice(action.payload, 1);
    },
    setchecklistarr: (state, action) => {
      state.checklistarr = action.payload;
    },
    setchecklistmarkedval: (state, action) => {
      state.markedval = action.payload;
    },
    resetchecklist: (state) => {
      state.name = "";
      state.priority = "";
      state.duedate = "";
      state.checklistarr = [];
      state.markedval = 0;
      state.sectiontype = "todo";
    },
    setdate: (state, action) => {
      state.duedate = action.payload;
    },
    setsectiontype: (state, action) => {
      state.sectiontype = action.payload;
    }
  }
});

// Export the generated actions from the slice for use in dispatching
export const {
  addname,
  setchecklistarr,
  setfilterchecklist,
  setchecklistmarkedval,
  setsectiontype,
  setdate,
  deletechecklist,
  resetchecklist,
  addpriority,
  addchecklist,
  updatechecklistcheckbox,
  updatechecklistdata
} = checklistslice.actions;

// Export the reducer for inclusion in the store
export default checklistslice.reducer;
