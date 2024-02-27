// Export the checkvalidatedata function for use in other parts of the application
export const checkvalidatedata = (field, signup) => {
    // Regular expression to validate the email format
    const isEmailvalid = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(field.email);
    // Check if the password is at least 6 characters long
    const isPasswordValid = field.password.length >= 6;
    // Check if the name field is not empty (only relevant for signup)
    const isNameValid = field.name !== "";
    // Check if the password and confirm password fields match (only relevant for signup)
    const isConfirmPassValid = field.password === field.confirmpass;

    // Validate each field and return an error message if any validation fails
    if (!isEmailvalid) return "Email not valid";
    if (!isPasswordValid) return "Password is less than 6 characters";
    // Additional checks for the signup form
    if (signup) {
        if (!isNameValid) return "Name cannot be empty";
        if (!isConfirmPassValid) return "Passwords do not match";
    }
    // Return an empty string if all validations pass, indicating no errors
    return "";
};
