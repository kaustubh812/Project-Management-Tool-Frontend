// Necessary imports from React and other dependencies
import React, { useState } from 'react';
import styles from "./LoginSignup.module.css"; // CSS module for styling
// Importing image assets for the form
import Loginimg from "../../images/Loginimg.png";
import emailimg from "../../images/emailimg.png";
import passwordimg from "../../images/passwordimg.png";
import Backimg from "../../images/Backimg.png"; // Note: This import is not used in the provided code
import eyeimg from "../../images/eyeimg.png"; // Icon for toggling password visibility
import nameimg from "../../images/nameimg.png"; // Icon for the name input field (used in signup)
// Utility function for form validation
import { checkvalidatedata } from '../../utils/Validate';
// Base URL for making API requests
import { commonapiurl } from '../../Constant';
// Hooks for navigation and dispatching Redux actions
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import { useDispatch } from 'react-redux';
// Redux action for adding user data to the store
import { adduser } from '../../redux/Userslice';

const LoginSignup = () => {
  // State hooks for managing component state
  const[signup, setsignup] = useState(true); // Determines whether the form is in signup or login mode
  const[error, seterror] = useState(""); // For displaying form validation or request errors
  const[passwordtype, setpasswordtype] = useState("password"); // Controls password input field type for visibility
  const[confirmpasstype, setconfirmpasstype] = useState("password"); // Same as above, for confirm password field
  const[errorflag, seterrorflag] = useState(true); // Flag to control form submission feedback
  // Form input states
  const[name, setname] = useState("");
  const[email, setemail] = useState("");
  const[password, setpassword] = useState("");
  const[confirmpass, setconfirmpass] = useState("");
  // Hooks for navigation and dispatch
  const dispatch = useDispatch();
  const history = useNavigate();

  // Function to toggle between login and signup form
  function handleclick(e){
    e.preventDefault(); // Prevent form submission
    seterror(""); // Clear any existing errors
    setsignup(!signup); // Toggle form mode
  }

  // Function to handle form submission for both login and signup
  function handleloginsignup(e){
    e.preventDefault(); // Prevent form submission
    let temperror = checkvalidatedata({name, email, password, confirmpass}, signup); // Validate form data
    seterror(temperror); // Set any validation errors
    if(temperror !== "") return; // If there are errors, do not proceed
    seterrorflag(false); // Indicate form is processing

    // Conditional logic for handling signup or login
    if(signup){
      // POST request to register endpoint
      axios.post(`${commonapiurl}auth/register`, {name, email, password})
      .then((response) => {
        // Handle successful registration
        if(response.data.jwttoken){
          const { jwttoken, user: { _id: userid, name } } = response.data;
          dispatch(adduser({jwttoken, userid, name})); // Dispatch action to add user data to Redux store
          history("/board"); // Navigate to the dashboard
        }else{
          seterror("Email already in use"); // Handle registration error
          seterrorflag(true);
        }
      })
      .catch((error) => {
        console.log(error); // Log any request errors
      });
    }else{
      // POST request to login endpoint
      axios.post(`${commonapiurl}auth/login`, {email, password})
      .then((response) => {
        // Handle successful login
        if(response.data.jwttoken){
          const { jwttoken, user: { _id: userid, name } } = response.data;
          dispatch(adduser({jwttoken, userid, name})); // Dispatch action to add user data to Redux store
          history("/board"); // Navigate to the dashboard
        }else{
          seterror("Wrong Email or password"); // Handle login error
          seterrorflag(true);
        }
      })
      .catch((error) => {
        console.log(error); // Log any request errors
      });
    }
  }

  // Functions to toggle password and confirm password visibility
  function handlepasswordtype(){
    setpasswordtype(passwordtype === "password" ? "text" : "password");
  }
  function handleconfirmpasstype(){
    setconfirmpasstype(confirmpasstype === "password" ? "text" : "password");  
  }

  // JSX for rendering the login/signup form
  return (
    // Main container for the form
    <div className={styles.maincontainer}>
      {/* Left container with welcome message and graphic */}
      <div className={styles.leftcontainer}>
        <img src={Loginimg} alt="" />
        <h2>Welcome aboard my friend</h2>
        <h3>just a couple of clicks and we start</h3>
      </div>
      {/* Right container with form inputs and buttons */}
      <div className={styles.rightcontainer}>
        <form>
          <h3>{signup ? "Register" : "Login"}</h3>
          {/* Conditional rendering for name input field in signup mode */}
          {signup && (
            <div>
              <input type="text" name='text'
              placeholder='Name'
              onChange={(e)=>setname(e.target.value)}
              value={name}
              />
              <img src={nameimg} alt="" />
            </div>
          )}
          {/* Email input field */}
          <div>
            <input type="email" name='email'
            placeholder='Email'
            onChange={(e)=>setemail(e.target.value)}
            value={email}
            />
            <img src={emailimg} alt="" />
          </div>
          {/* Conditional rendering for confirm password input field in signup mode */}
          {signup && (
            <div>
              <input type={confirmpasstype} name='password'
              placeholder="Confirm Password"
              onChange={(e)=>setconfirmpass(e.target.value)}
              value={confirmpass}
              />
              <img src={passwordimg} alt="" />
              <div onClick={handleconfirmpasstype}>
                <img src={eyeimg} alt="" />
              </div>
            </div>
          )}
          {/* Password input field */}
          <div>
            <input type={passwordtype} name='password'
            placeholder="Password"
            onChange={(e)=>setpassword(e.target.value)}
            value={password}
            />
            <img src={passwordimg} alt="" />
            <div onClick={handlepasswordtype}>
              <img src={eyeimg} alt="" />
            </div>
          </div>
          {/* Display any form errors */}
          <h4>{error}</h4>
          {/* Submit button for form */}
          {signup ? (
            <button onClick={(e) => handleloginsignup(e)}>{errorflag ? "Register" : "Loading..."}</button>
          ) : (
            <button onClick={(e) => handleloginsignup(e)}>{errorflag ? "Log in" : "Loading..."}</button>
          )}
          {/* Toggle between login and signup forms */}
          <p>{signup ? "Have an account?" : "Have no account yet?"}</p>
          <button onClick={(e) => handleclick(e)}>{signup ? "Login" : "Register"}</button>
        </form>
      </div>
    </div>
  )
}

export default LoginSignup;
