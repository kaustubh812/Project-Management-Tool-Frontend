import React, { useState } from 'react'
import styles from "./Createcard.module.css" // CSS module for styling
import Ellipseimg from "../../images/Ellipseimg.png" // Importing priority images
import Ellipse2img from "../../images/Ellipse2img.png"
import Ellipse3img from "../../images/Ellipse3img.png"
import addimg from "../../images/addimg.png" // Image for adding a new checklist item
import deleteimg from "../../images/deleteimg.png" // Image for deleting a checklist item
import { useDispatch, useSelector } from "react-redux" // Hooks for Redux
import axios from "axios" // Axios for HTTP requests
// Importing actions from Redux slices
import { addchecklist, addname, addpriority, deletechecklist, resetchecklist, setdate, updatechecklistcheckbox, updatechecklistdata } from '../../redux/Checklistslice'
import { commonapiurl } from '../../Constant' // Base URL for API requests
import { Validatechecklist } from '../../utils/Validatechecklist' // Function for validating checklist data
import { resetchecklistid } from '../../redux/Userslice'

// The Createcard component for creating or editing checklist items
const Createcard = ({ setCreatecardshow, checklistchanged, setchecklistchanged }) => {
  // State from Redux store
  const priority = useSelector(store => store.checklist.priority)
  const name = useSelector(store => store.checklist.name)
  const checklistarr = useSelector(store => store.checklist.checklistarr)
  const markedval = useSelector(store => store.checklist.markedval)
  const duedate = useSelector(store => store.checklist.duedate)
  const sectiontype = useSelector(store => store.checklist.sectiontype)
  const checklistid = useSelector(store => store.user.checklisteditid)
  const userid = useSelector(store => store.user.userid)
  const [saving, setsaving] = useState(false) // Local state for tracking save operation
  const dispatch = useDispatch() // To dispatch actions

  // Cancel and reset the form
  function handlecancel() {
    setCreatecardshow(false)
    dispatch(resetchecklistid())
    dispatch(resetchecklist())
  }

  // Handlers for form inputs and buttons
  function handlename(e) {
    dispatch(addname(e.target.value))
  }

  function handlepriority(priorityval) {
    dispatch(addpriority(priorityval))
  }

  function addnewchecklist() {
    dispatch(addchecklist())
  }

  function updatechecklistcheckfun(index) {
    dispatch(updatechecklistcheckbox(index))
  }

  function updatechecklistdatafun(e, index) {
    dispatch(updatechecklistdata({ data: e.target.value, index }))
  }

  function deletechecklistfun(index) {
    dispatch(deletechecklist(index))
  }

  function setdatefun(e) {
    dispatch(setdate(e.target.value))
  }

  // Save checklist to backend
  function savechecklist() {
    const isValid = Validatechecklist(name, priority, checklistarr)
    if (!isValid) {
      alert("Either fields are Empty or Checklist 0")
      return
    }
    setsaving(true)
    // Check if editing or creating new checklist
    const apiUrl = checklistid ? `${commonapiurl}checklist/updatechecklist/${checklistid}` : `${commonapiurl}checklist/addchecklist`;
    const method = checklistid ? axios.patch : axios.post;
    method(apiUrl, {
      name, priority, checklistarr, duedate, markedval, userid, sectiontype, createdAt: checklistid ? undefined : new Date().getDate()
    })
      .then(() => {
        dispatch(resetchecklist()) // Reset checklist in Redux store
        dispatch(resetchecklistid()) // Reset checklist ID in Redux store
        setchecklistchanged(!checklistchanged) // Toggle to refresh checklist view
        setCreatecardshow(false) // Close the create card view
      })
      .catch((err) => {
        console.log(err); // Log any errors
      })
  }

  // Render the component UI
  return (
    <div className={styles.maincontainer}>
        {/* Form for creating or editing checklist items */}
        <div className={styles.createcard}>
            <h2>Title <span>*</span></h2>
            <input type="text" 
            placeholder='Enter Task Title'
            onChange={(e) => handlename(e)}
            value={name}
            />
            <div className={styles.selectpriority}>
                <p>Select Priority <span>*</span></p>
                <button className={priority=="high" && styles.selectedbtn} onClick={() => handlepriority("high")}>
                    <img src={Ellipseimg} alt="" />
                    <p>HIGH PRIORITY</p>
                </button>
                <button className={priority=="moderate"&&styles.selectedbtn} onClick={()=>handlepriority("moderate")}>
                    <img src={Ellipse2img} alt="" />
                    <p>MODERATE PRIORITY</p>
                </button>
                <button className={priority=="low"&&styles.selectedbtn} onClick={()=>handlepriority("low")}>
                    <img src={Ellipse3img} alt="" />
                    <p>LOW PRIORITY</p>
                </button>
            </div>
            <p>Checklist ({markedval}/{checklistarr.length}) <span>*</span></p>
            <div className={styles.checklistcontainer}>
                {
                    checklistarr.map((checklistobj, index) => {
                        return(
                            <div>
                                <input type="checkbox" 
                                checked={checklistobj.mark}
                                onClick={() => updatechecklistcheckfun(index)}
                                />
                                <input type="text" 
                                value={checklistobj.data}
                                placeholder='Add a task'
                                onChange={(e) => updatechecklistdatafun(e, index)}
                                />
                                <img src={deleteimg} alt="" 
                                onClick={()=>deletechecklistfun(index)}
                                />
                            </div>        
                        )
                    })
                }
            </div>
            <div className={styles.addnew}
            onClick={addnewchecklist}
            >
                <img src={addimg} alt="" />
                <p>Add New</p>
            </div>
            <div className={styles.savebutton}>
                <input type="date"
                onChange={(e) => setdatefun(e)}
                value={duedate}
                />
                <div>
                    <button onClick={handlecancel}>Cancel</button>
                    <button onClick={savechecklist}>{saving ? "Saving..." : "Save"}</button>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Createcard