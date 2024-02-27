// Import necessary modules and components
import React from 'react'; // Import React to build components
import ReactDOM from 'react-dom/client'; // Import ReactDOM for DOM manipulation
import './index.css'; // Import CSS for styling
import App from './App'; // Import the main App component
import store from './redux/store'; // Import the Redux store
import { Provider } from 'react-redux'; // Import Provider from react-redux to connect Redux store with React

// Create a root DOM node for React application
const root = ReactDOM.createRoot(document.getElementById('root'));

// Render the application
root.render(
    // Wrap the App component with the Provider component to make the Redux store available to all components
    <Provider store={store}>
        <App />
    </Provider>
);
