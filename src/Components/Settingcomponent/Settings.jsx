import React, { useState } from 'react';
import styles from "./Settings.module.css"; // CSS module for styling
// Importing image assets
import eyeimg from "../../images/eyeimg.png";
import passwordimg from "../../images/passwordimg.png";
import nameimg from "../../images/nameimg.png";
import { useSelector } from 'react-redux'; // Hook to access Redux store state
import axios from 'axios'; // Axios for making HTTP requests
import { commonapiurl } from '../../Constant'; // Base URL for API requests

const Settings = () => {
  // State hooks for managing input fields and visibility toggles
  const [oldpasswordtype, setOldPasswordType] = useState("password");
  const [newpasswordtype, setNewPasswordType] = useState("password");
  // State hooks for user input
  const [name, setName] = useState("");
  const [oldpassword, setOldPassword] = useState("");
  const [newpassword, setNewPassword] = useState("");
  const [error, setError] = useState(""); // For displaying form validation or request errors
  const [updating, setUpdating] = useState(false); // Indicates whether an update operation is in progress
  const userid = useSelector(store => store.user.userid); // User ID from Redux store

  // Functions to toggle visibility of password fields
  function toggleOldPasswordVisibility() {
    setOldPasswordType(oldpasswordtype === "password" ? "text" : "password");
  }

  function toggleNewPasswordVisibility() {  
    setNewPasswordType(newpasswordtype === "password" ? "text" : "password");
  }

  // Function to handle form submission and perform the update operation
  function handleUpdate() {
    // Form validation before submitting
    if (name === "" && oldpassword === "" && newpassword === "") {
      setError("Please fill in at least one field to update.");
      return;
    }
    if (oldpassword && newpassword && oldpassword === newpassword) {
      setError("New password must be different from the old password.");
      return;
    }
    if (newpassword && newpassword.length < 6) {
      setError("New password should be more than 6 characters.");
      return;
    }
    setError("");
    setUpdating(true); // Indicate that update is in progress

    // Making an HTTP PATCH request to update user settings
    axios.patch(`${commonapiurl}auth/updateuser/${userid}`, { name, oldPassword: oldpassword, newPassword: newpassword })
      .then(() => {
        // Handle successful update
        setUpdating(false);
        // Clear form fields
        setName("");
        setOldPassword("");
        setNewPassword("");
        alert("User updated successfully");
      })
      .catch((error) => {
        // Handle error during update
        console.error("Error occurred:", error);
        setError("An error occurred during the update.");
        setUpdating(false);
      });
  }

  // Render the settings form with conditional rendering for error messages and update button text
  return (
    <div className={styles.maincontainer}>
      <h2>Settings</h2>
      <div>
        <input type="text" placeholder='Name' onChange={(e) => setName(e.target.value)} value={name} />
        <img src={nameimg} alt="" />
      </div>
      <div>
        <input type={oldpasswordtype} placeholder="Old Password" onChange={(e) => setOldPassword(e.target.value)} value={oldpassword} />
        <img src={passwordimg} alt="" />
        <div onClick={toggleOldPasswordVisibility}>
          <img src={eyeimg} alt="Toggle visibility" />
        </div>
      </div>
      <div>
        <input type={newpasswordtype} placeholder="New Password" onChange={(e) => setNewPassword(e.target.value)} value={newpassword} />
        <img src={passwordimg} alt="" />
        <div onClick={toggleNewPasswordVisibility}>
          <img src={eyeimg} alt="Toggle visibility" />
        </div>
      </div>
      <p>{error}</p>
      <button onClick={handleUpdate}>{updating ? "Updating..." : "Update"}</button>
    </div>
  );
}

export default Settings;
