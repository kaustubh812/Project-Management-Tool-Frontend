import React, { useEffect, useState } from 'react';
import styles from "./Readonlychecklist.module.css"; // Importing CSS module for styling
// Importing image assets
import projectimg from "../../images/projectimg.png";
import Ellipseimg from "../../images/Ellipseimg.png";
import Ellipse2img from "../../images/Ellipse2img.png";
import Ellipse3img from "../../images/Ellipse3img.png";
import { useLocation } from 'react-router-dom'; // Hook to access the current URL
import axios from 'axios'; // Axios for making HTTP requests
import { commonapiurl, montharr } from '../../Constant'; // Importing constants for API URL and month array

const Readonlychecklist = () => {
    // State hook for storing the checklist fetched from the backend
    const [singlechecklist, setsinglechecklist] = useState("");
    // Extracting checklist ID from the URL
    const url = useLocation().pathname.split("/")[2];
    // State hook for formatted due date
    const [duedate, setduedate] = useState("");

    useEffect(() => {
        // Fetching single checklist data from the backend using the checklist ID from the URL
        axios.get(`${commonapiurl}checklist/getsinglechecklist/${url}`)
        .then((response) => {
            setsinglechecklist(response.data.singlechecklist); // Setting fetched checklist data to state
            // Formatting and setting the due date using montharr for month name
            setduedate(montharr[parseInt(response.data.singlechecklist.duedate.split("-")[1]) - 1] + " " + response.data.singlechecklist.duedate.split("-")[2] + "th");
        })
        .catch(err => {
            console.log(err); // Logging errors, if any
        });
    }, []); // Empty dependency array to run effect only once on mount

    return (singlechecklist != null) ? ( // Conditional rendering based on checklist data availability
        <>
            <div className={styles.title}>
                <img src={projectimg} alt="" />
                <h2>Pro Manage</h2>
            </div>
            <div className={styles.maincontainer}>
                <div className={styles.checklistcard}>
                    {/* Displaying checklist priority with corresponding icon and label */}
                    <div className={styles.priority}>
                        {singlechecklist.priority === "high" && <img src={Ellipseimg} alt="" />}
                        {singlechecklist.priority === "moderate" && <img src={Ellipse2img} alt="" />}
                        {singlechecklist.priority === "low" && <img src={Ellipse3img} alt="" />}
                        <p>{singlechecklist.priority.toUpperCase()} PRIORITY</p>
                    </div>
                    <h2>{singlechecklist.name}</h2> {/* Checklist name */}
                    {/* Displaying checklist completion status */}
                    <h3>Checklist ({singlechecklist.markedval}/{singlechecklist?.checklistarr?.length})</h3>
                    <div className={styles.checklistcardcontainer}>
                        {/* Mapping over checklist items to display them */}
                        {singlechecklist.checklistarr?.map(checklist => (
                            <div className={styles.inputbox}>
                                <input type="checkbox" checked={checklist.mark} readOnly />
                                <input type="text" value={checklist.data} readOnly />
                            </div>
                        ))}
                    </div>
                    {/* Displaying due date if available */}
                    {singlechecklist.duedate !== "" && (
                        <div className={styles.duedate}>
                            <p>Due Date</p>
                            <button>{duedate}</button>
                        </div>
                    )}
                </div>
            </div>
        </>
    ) : (
        <div>
            <h1>Page not found</h1> {/* Fallback content if checklist data is not available */}
        </div>
    );
}

export default Readonlychecklist;
