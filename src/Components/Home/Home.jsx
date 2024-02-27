// Import necessary React functionality and CSS module for styling
import React, { useState } from 'react';
import styles from "./Home.module.css";
// Import component modules for different sections of the application
import Analytics from '../Analytics/Analytics';
import Dashboard from '../Dashboard/Dashboard';
import Settings from '../Settingcomponent/Settings'; // Ensure this import path matches your file structure
// Import image assets used in the sidebar for navigation
import projectimg from "../../images/projectimg.png";
import boardimg from "../../images/boardimg.png";
import analyticsimg from "../../images/analyticsimg.png";
import settingimg from "../../images/settingimg.png";
import Logoutimg from "../../images/Logoutimg.png";
// Hooks for navigation and accessing the current URL
import { useLocation, useNavigate } from 'react-router-dom';
// Import the Logout component for logging out functionality
import Logout from '../Logout/Logout';

const Home = () => {
  // Extract the last segment of the URL to determine which view to render
  const location = useLocation().pathname.split("/");
  const navigate = useNavigate();
  const url = location[location.length - 1];
  // State to control the visibility of the logout confirmation
  const [showLogout, setShowLogout] = useState(false);

  return (
    <>
      <div className={styles.maincontainer}>
        {/* Sidebar container for navigation */}
        <div className={styles.leftcontainer}>
          {/* Project branding */}
          <div>
            <img src={projectimg} alt="" />
            <h1>Pro Manage</h1>
          </div>
          {/* Navigation items - Board, Analytics, Settings */}
          <div onClick={() => navigate("/board")} className={url === "board" ? styles.selectedtype : ''}>
            <img src={boardimg} alt="" />
            <h2>Board</h2>
          </div>
          <div onClick={() => navigate("/analytics")} className={url === "analytics" ? styles.selectedtype : ''}>
            <img src={analyticsimg} alt="" />
            <h2>Analytics</h2>
          </div>
          <div onClick={() => navigate("/settings")} className={url === "settings" ? styles.selectedtype : ''}>
            <img src={settingimg} alt="" />
            <h2>Settings</h2>
          </div>
          {/* Logout option */}
          <div onClick={() => setShowLogout(true)}>
            <img src={Logoutimg} alt="" />
          </div>
        </div>
        {/* Container for the main content area where different views are rendered */}
        <div className={styles.rightcontainer}>
          {url === "board" && <Dashboard />}
          {url === "analytics" && <Analytics />}
          {url === "settings" && <Settings />}
        </div>
      </div>
      {/* Render the Logout component if showLogout is true */}
      {showLogout && <Logout delet={showLogout} setdelet={setShowLogout} />}
    </>
  );
};

export default Home;
