// Import necessary React and Redux functionalities
import React from 'react'
import styles from "./Logout.module.css" // Import CSS module for styling
import { useDispatch } from 'react-redux' // Hook to dispatch actions
import { resetuser } from '../../redux/Userslice' // Action to reset user state

// Logout component accepts props for controlling the visibility of the logout confirmation
const Logout = ({ delet, setdelet }) => {
  const dispatch = useDispatch() // Initialize useDispatch hook

  // Function to handle logout confirmation
  function confirmlogout() {
    dispatch(resetuser()) // Dispatch the resetuser action to clear user data
    setdelet(false) // Close the logout confirmation dialog
  }

  // Render the logout confirmation dialog
  return (
    <div className={styles.maincontainer}>
        <div className={styles.deletecard}>
            <h2>Are you sure you want to Logout?</h2>
            {/* Button to confirm logout */}
            <button onClick={confirmlogout}>Yes, Logout</button>
            {/* Button to cancel logout and close the dialog */}
            <button onClick={() => setdelet(false)}>Cancel</button>
        </div>
    </div>
  )
}

export default Logout
