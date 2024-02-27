// Import necessary React hooks and CSS module for styling
import React, { useState } from 'react'
import styles from "./Delete.module.css"
// Import Redux hooks for dispatching actions and accessing state
import { useDispatch, useSelector } from 'react-redux'
// Import action to reset the checklist ID
import { resetchecklistid } from '../../redux/Userslice'
// Axios for making HTTP requests
import axios from 'axios'
// Base URL for API requests from constants
import { commonapiurl } from '../../Constant'

// Delete component accepts props for managing checklist changes and showing/hiding the delete confirmation
const Delete = ({setchecklistchanged, checklistchanged, setdeletecontainershow}) => {
  // Access the checklist ID from Redux state
  const checklistid = useSelector(store=>store.user.checklisteditid)
  // Local state to manage the deleting status
  const [deleting, setdeleting] = useState(false)
  // Hook to dispatch actions to the Redux store
  const dispatch = useDispatch()

  // Function to cancel deletion and hide the delete confirmation
  function canceldelete(){
    // Reset the checklist ID in the Redux store
    dispatch(resetchecklistid())
    // Hide the delete confirmation modal
    setdeletecontainershow(false)
  }

  // Function to confirm deletion of the checklist item
  function confirmdelete(){
    // Indicate the deleting process has started
    setdeleting(true)
    // Make an HTTP DELETE request to remove the checklist item
    axios.delete(`${commonapiurl}checklist/deletechecklist/${checklistid}`)
    .then((response) => {
      // Once deleted, reset the checklist ID in the Redux store
      dispatch(resetchecklistid())
      // Toggle the state to refresh the checklist items
      setchecklistchanged(!checklistchanged)
      // Hide the delete confirmation modal
      setdeletecontainershow(false)
    })
    .catch(err => {
      // Log any errors encountered during the deletion process
      console.log(err);
    })
  }

  // Render the delete confirmation UI
  return (
    <div className={styles.maincontainer}>
        <div className={styles.deletecard}>
            <h2>Are you sure want to delete</h2>
            {/* Button to confirm deletion, shows "Deleting..." text while the deleting process is ongoing */}
            <button onClick={confirmdelete}>
              {deleting ? "Deleting..." : "Yes, Delete"}
            </button>
            {/* Button to cancel the deletion process */}
            <button onClick={canceldelete}>Cancel</button>
        </div>
    </div>
  )
}

// Export the Delete component for use in other parts of the application
export default Delete
