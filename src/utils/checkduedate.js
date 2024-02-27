// Export the checkduedate function for use in other parts of the application
export const checkduedate = (duedate) => {
    // Retrieve the current month, date, and year
    const currentmonth = new Date().getMonth() + 1; // getMonth() returns 0-11, so add 1 for human-readable format
    const currentdate = new Date().getDate();
    const currentyear = new Date().getFullYear();

    // Parse the due date string into year, month, and date components
    const date = parseInt(duedate.split("-")[2]); // Day part of the due date
    const month = parseInt(duedate.split("-")[1]); // Month part of the due date
    const year = parseInt(duedate.split("-")[0]); // Year part of the due date

    // Compare the year, month, and date of the due date with the current date
    if(year > currentyear) return true; // The due date is in a future year
    if(year < currentyear) return false; // The due date is in a past year
    if(month > currentmonth) return true; // The due date is in a future month of the current year
    if(month < currentmonth) return false; // The due date is in a past month of the current year
    if(date >= currentdate) return true; // The due date is today or in the future of the current month
    if(date < currentdate) return false; // The due date is in the past of the current month
}
