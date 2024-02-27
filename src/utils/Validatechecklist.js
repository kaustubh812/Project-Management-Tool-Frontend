// Export the Validatechecklist function for use in other parts of the application
export const Validatechecklist = (name, priority, checklistarr) => {
    // Check if the name is not empty
    if(name === "") return false;
    // Check if the priority is not empty
    if(priority === "") return false;
    // Check if the checklist array is not empty
    if(checklistarr.length === 0) return false;
    // Iterate through each item in the checklist array
    for(let i = 0; i < checklistarr.length; i++){
        // Check if any checklist item's data is empty
        if(checklistarr[i].data === "") return false;
    }
    // Return true if all validations pass, indicating the checklist is valid
    return true;
};
