// Import the array of month abbreviations
import { montharr } from "../Constant";

// Export the createdate function for use in other parts of the application
export const createdate = () => {
    // Get the current date, month, and year
    let date = new Date().getDate(); // Day of the month
    let month = new Date().getMonth(); // Month index (0-based)
    let yyyy = new Date().getFullYear(); // Year

    // Format the date into a string: "DDth Month, YYYY"
    // If the date is less than 10, prepend a '0' to maintain a two-digit format
    let tempdate = (date < 10 ? "0" + date : date) + "th " + montharr[month] + ", " + yyyy;

    // Return the formatted date string
    return tempdate;
}
