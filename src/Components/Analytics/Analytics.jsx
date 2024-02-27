import React, { useEffect, useState } from 'react'
import styles from "./Analytics.module.css" // Importing CSS module for styling
import Ellipse2img from "../../images/Ellipse2img.png" // Importing image for use in the UI
import { useSelector } from 'react-redux' // Importing useSelector hook for accessing Redux store state
import { commonapiurl } from '../../Constant' // Importing base URL for API requests
import axios from 'axios' // Importing axios for making HTTP requests
import { checkduedate } from '../../utils/checkduedate' // Importing utility function to check due dates

// Analytics component definition
const Analytics = () => {
  // State hooks for various task counts
  const [backlogcount, setbacklogcount] = useState(0)
  const [todocount, settodocount] = useState(0)
  const [progresscount, setprogresscount] = useState(0)
  const [donecount, setdonecount] = useState(0)
  const [moderatecount, setmoderatecount] = useState(0)
  const [lowcount, setlowcount] = useState(0)
  const [highcount, sethighcount] = useState(0)
  const [duedatecount, setduedatecount] = useState(0)

  // Using useSelector to access userid and checklist filter setting from the Redux store
  const userid = useSelector(store => store.user.userid)
  const filterchecklist = useSelector(store => store.checklist.filterchecklist)

  // useEffect hook to fetch checklist data when the component mounts
  useEffect(() => {
    let query = "all" // Default query parameter
    if (filterchecklist === "Today") { // Adjust query based on filter setting
      query = new Date().getDate()
    }
    // Making GET request to fetch checklist data
    axios.get(`${commonapiurl}checklist/getchecklist/${userid}?time=${query}`)
      .then((response) => {
        const allchecklist = response.data.allchecklist // Extracting checklist data from response
        // Temporary variables for counting tasks based on various criteria
        let tempbackcount = 0, temptodocount = 0, tempprocount = 0, tempdonecount = 0,
          tempmoderatecnt = 0, temphighcnt = 0, templowcnt = 0, tempduedatecount = 0
        
        // Iterating through checklist items to count them based on criteria
        allchecklist.forEach(item => {
          // Counting items based on section type and priority, and checking due dates
          switch(item.sectiontype) {
            case "backlog":
              tempbackcount += 1;
              break;
            case "todo":
              temptodocount += 1;
              break;
            case "inprogress":
              tempprocount += 1;
              break;
            case "done":
              tempdonecount += 1;
              break;
          }
          if(item.duedate !== "" && checkduedate(item.duedate)) {
            tempduedatecount += 1;
          }
          // Counting items based on priority
          if(item.priority === "moderate") tempmoderatecnt += 1;
          if(item.priority === "low") templowcnt += 1;
          if(item.priority === "high") temphighcnt += 1;
        });
        // Setting state with the counted values, ensuring single-digit numbers are prefixed with "0"
        setduedatecount(tempduedatecount < 10 ? `0${tempduedatecount}` : tempduedatecount);
        setmoderatecount(tempmoderatecnt < 10 ? `0${tempmoderatecnt}` : tempmoderatecnt);
        setlowcount(templowcnt < 10 ? `0${templowcnt}` : templowcnt);
        sethighcount(temphighcnt < 10 ? `0${temphighcnt}` : temphighcnt);
        setbacklogcount(tempbackcount < 10 ? `0${tempbackcount}` : tempbackcount);
        settodocount(temptodocount < 10 ? `0${temptodocount}` : temptodocount);
        setprogresscount(tempprocount < 10 ? `0${tempprocount}` : tempprocount);
        setdonecount(tempdonecount < 10 ? `0${tempdonecount}` : tempdonecount);
      })
      .catch((err) => {
        console.log(err); // Logging any errors that occur during the fetch operation
      });
  }, [filterchecklist, userid]); // Dependencies array to re-run effect if these values change

  // Render method for displaying the analytics UI
  return (
    <div className={styles.maincontainer}>
      <h2>Analytics</h2>
      <div>
        {/* Sections for displaying task counts */}
        <div className={styles.section}>
          <div>
            <div>
              <img src={Ellipse2img} alt="" />
              <h3>Backlogs Tasks</h3>
            </div>
            <p>{backlogcount}</p>
          </div>
          <div>
            <div>
              <img src={Ellipse2img} alt="" />
              <h3>To-do Tasks</h3>
            </div>
            <p>{todocount}</p>
          </div>
          <div>
            <div>
              <img src={Ellipse2img} alt="" />
              <h3>In-Progress Tasks</h3>
            </div>
            <p>{progresscount}</p>
          </div>
          <div>
            <div>
              <img src={Ellipse2img} alt="" />
              <h3>Completed Tasks</h3>
            </div>
            <p>{donecount}</p>
          </div>
        </div>
        <div className={styles.priority}>
          <div>
            <div>
              <img src={Ellipse2img} alt="" />
              <h3>Low Priority</h3>
            </div>
            <p>{lowcount}</p>
          </div>
          <div>
            <div>
              <img src={Ellipse2img} alt="" />
              <h3>Moderate Priority</h3>
            </div>
            <p>{moderatecount}</p>
          </div>
          <div>
            <div>
              <img src={Ellipse2img} alt="" />
              <h3>High Priority</h3>
            </div>
            <p>{highcount}</p>
          </div>
          <div>
            <div>
              <img src={Ellipse2img} alt="" />
              <h3>Due Date Tasks</h3>
            </div>
            <p>{duedatecount}</p>
          </div>
        </div>
      </div>
    </div>
  )
}
export default Analytics