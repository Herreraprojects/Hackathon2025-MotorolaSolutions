# Summary:
This application simulates our implementation of the QR Code Troubleshooting tool utilizing React library
* Application generates random error
* When application detects error, shows error details and a QR code linking to support.
* Occasionally resets to "system ready" status.
* Uses React hooks for state and side effects.

# 1. Imports

``` jsx import React, { useState, useEffect } from "react";```
``` import { QRCode } from "react-qrcode-logo";```
* Imports React and two hooks: useState for managing state, useEffect for side effects.
* Imports QRCode component from react-qrcode-logo to generate QR codes.

# 2. Main Component: App
`function App() { `
* Defines the React functional component App.

# 3. System Errors List
``` const systemErrors = [
   {
    code: "120",
    message: "Error 120: Network timeout",
    url: "https://cmsosnow.service-now.com/kb?id=kb_article_view&sysparm_article=KB0021579",
  },
  {
    code: "051",
    message: "Error 051: Authentication failed",
    url: "https://cmsosnow.service-now.com/kb?id=kb_article_view&sysparm_article=KB0021579",
  },
  {
    code: "43",
    message: "Error 43: Server unavailable",
    url: "https://cmsosnow.service-now.com/kb?id=kb_article_view&sysparm_article=KB0021579",
  },
];
```
* An array of error objects, each with:
* code: error code string
* message: description of the error
* url: link to support/knowledge base article

# 4. State Hook: currentError

``` const [currentError, setCurrentError] = useState(null);```
* Manages current system error.
* null indicates no error (system ready).
* setCurrentError updates this state.

# 5. Effect Hook: Managing Error Simulation
```
useEffect(() => {
  // Function to pick and set a random error
  const pickRandomError = () => {
    const randomIndex = Math.floor(Math.random() * systemErrors.length);
    const error = systemErrors[randomIndex];
    setCurrentError(error);
  };
```

 ``` // Set an interval to run every 10 seconds
  const intervalId = setInterval(() => {
    // Decide randomly whether to show an error (70%) or reset to "ready"
    const showError = Math.random() < 0.7; // 70% chance
    if (showError) {
      pickRandomError(); // set a random error
    } else {
      setCurrentError(null); // no error, system ready
    }
  }, 10000); // interval every 10 seconds `

  ` // Cleanup function to clear interval when component unmounts
  return () => clearInterval(intervalId);
}, []);
```

* Runs once on component mount ([] dependency array).
* Every 10 seconds:
* 70% chance to set a random error
* 30% chance to reset to "system ready" (null)
* Cleans up interval on unmount.

# 6. Render Output

```
return ( 
  <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
    <h1>System Status Monitor</h1> 
    {currentError ? ( 
    // When there's an error
      <div style={{ marginTop: "20px", color: "red", textAlign: "center" }}>
        <h2>System Error {currentError.code}</h2>
        <p>{currentError.message}</p>
        <p>Please scan the QR code below for assistance:</p>
        <QRCode value={currentError.url} size={128} /> 
      </div>
    ) : (  
      // When system is ready (no errors)
      <div style={{ marginTop: "20px", textAlign: "center" }}>
        <h2>All systems are ready!</h2>
      </div>
    )}
  </div> 
);

```
* Main container with padding and font styling.
* Displays title.
* If currentError exists:
* Shows error code, message, and a QR code linking to support.
* If null: Shows "All systems are ready!" 

# 7. Export
```
export default App;
```
* Exports the App component for use in other parts of the app.
       




# Getting Started with Create React App
This project was bootstrapped with Create React App.

Available Scripts
In the project directory, you can run:

npm start
Runs the app in the development mode.
Open http://localhost:3000 to view it in your browser.

The page will reload when you make changes.
You may also see any lint errors in the console.

npm test
Launches the test runner in the interactive watch mode.
See the section about running tests for more information.

npm run build
Builds the app for production to the build folder.
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.
Your app is ready to be deployed!

See the section about deployment for more information.

npm run eject
Note: this is a one-way operation. Once you eject, you can't go back!

If you aren't satisfied with the build tool and configuration choices, you can eject at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except eject will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use eject. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

Learn More
You can learn more in the Create React App documentation.

To learn React, check out the React documentation.

Code Splitting
This section has moved here: https://facebook.github.io/create-react-app/docs/code-splitting

Analyzing the Bundle Size
This section has moved here: https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size

Making a Progressive Web App
This section has moved here: https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app

Advanced Configuration
This section has moved here: https://facebook.github.io/create-react-app/docs/advanced-configuration

Deployment
This section has moved here: https://facebook.github.io/create-react-app/docs/deployment

npm run build fails to minify
This section has moved here: https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify
