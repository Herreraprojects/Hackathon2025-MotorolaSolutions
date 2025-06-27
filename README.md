
![Error 120](https://github.com/user-attachments/assets/d5f39442-359a-4934-95ad-8a93bce19a37)


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
```
 const systemErrors = [
    {
      code: "120",
      message: "Error 120: Upgrade Failure",
      url: "https://cmsosnow.service-now.com/kb?id=kb_article_view&sysparm_article=KB0037058",
    },
    {
      code: "051",
      message: "Error 051: Authentication failed",
      url: "https://cmsosnow.service-now.com/kb?id=kb_article_view&sysparm_article=KB0037058",
    },
    {
      code: "43",
      message: "Error 43: Server unavailable",
      url: "https://cmsosnow.service-now.com/kb?id=kb_article_view&sysparm_article=KB0037058",
    },
    {
      code: "200",
      message: "Error 200: Data corruption detected",
      url: "https://cmsosnow.service-now.com/kb?id=kb_article_view&sysparm_article=KB0037058",
    },
    {
      code: "301",
      message: "Error 301: Invalid configuration file",
      url: "https://cmsosnow.service-now.com/kb?id=kb_article_view&sysparm_article=KB0037058",
    },
    {
      code: "503",
      message: "Error 503: Service temporarily overloaded",
      url: "https://cmsosnow.service-now.com/kb?id=kb_article_view&sysparm_article=KB0037058",
    },
    {
      code: "999",
      message: "Error 999: Unknown critical system failure",
      url: "https://cmsosnow.service-now.com/kb?id=kb_article_view&sysparm_article=KB0037058",
    },
];
```
* An array of error objects, each with:
* code - error code string
* message - description of the error
* url - link to support/knowledge base article

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
 // Effect to calculate QR code size based on container dimensions
  useEffect(() => {
    const calculateQrCodeSize = () => {
      if (contentRef.current) {
        const contentWidth = contentRef.current.offsetWidth; // container width
        const contentHeight = contentRef.current.offsetHeight; // container height

        // Use the smaller of width or height to ensure QR code fits squarely
        // Multiply by 0.4 (40%) to get a size relative to container
        const desiredSize = Math.min(contentWidth, contentHeight) * 0.4;

        // Enforce a minimum size of 80px for readability
        setQrCodePixelSize(Math.max(80, Math.floor(desiredSize)));
      }
    };

    // Calculate size initially
    calculateQrCodeSize();

    // Recalculate size on window resize for responsiveness
    window.addEventListener("resize", calculateQrCodeSize);
    return () => window.removeEventListener("resize", calculateQrCodeSize);
  }, [currentError]); // Re-run when currentError changes, as container size may change

  // Aspect ratio for the background image (width / height)
  const m500AspectRatio = 436 / 333;

  // Fine-tuned positioning and sizing percentages for the overlay content
  const screenTop = 17; // % from top (roughly 75px from top)
  const screenLeft = 15; // % from left (roughly 78px from left)
  const screenWidth = 75; // % width of the overlay (roughly 278px)
  const screenHeight = 55; // % height of the overlay (roughly 163px)
  const screenBorderRadius = 4; // Border radius as percentage of overlay size

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh", // Full viewport height
        backgroundColor: "#f0f0f0", // Light background color
        padding: "20px",
        boxSizing: "border-box",
      }}
    >
      {/* Main container with background image and aspect ratio */}
      <div
        style={{
          position: "relative",
          width: "90%", // responsive width
          maxWidth: "800px", // limit maximum width
          aspectRatio: m500AspectRatio, // keep aspect ratio
          backgroundImage: `url(${m500Image})`, // background image
          backgroundSize: "contain", // scale image to contain
          backgroundRepeat: "no-repeat", // no repeat
          backgroundPosition: "center", // center image
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {/* Overlay content container positioned over the background image */}
        <div
          ref={contentRef} // attach ref for size calculations
          style={{
            position: "absolute",
            top: `${screenTop}%`, // position from top
            left: `${screenLeft}%`, // position from left
            width: `${screenWidth}%`, // width of overlay
            height: `${screenHeight}%`, // height of overlay
            borderRadius: `${screenBorderRadius}%`, // rounded corners
            backgroundColor: "black", // dark background
            color: "white", // text color
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            textAlign: "center",
            boxSizing: "border-box",
            overflow: "hidden", // prevent overflow
          }}
        >
          {/* Conditional rendering based on whether there's an active error */}
          {currentError ? (
            // When there is an error, show error info and QR code
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between", // space items vertically
                alignItems: "center",
                width: "100%",
                height: "100%",
                padding: "2%", // small padding inside overlay
                boxSizing: "border-box",
              }}
            >
              {/* Error header and message */}
              <div style={{ flexShrink: 0 }}>
                <h2 style={{ fontSize: "1.8vw", margin: "0.5vw 0" }}>
                  System Error {currentError.code}
                </h2>
                <p style={{ fontSize: "1.2vw", margin: "0.3vw 0" }}>
                  {currentError.message}
                </p>
                <p style={{ fontSize: "0.9vw", margin: "0.2vw 0" }}>
                  Scan for assistance:
                </p>
              </div>
              {/* QR code section, only if size > 0 */}
              {qrCodePixelSize > 0 && (
                <div
                  style={{
                    marginTop: "0.5vw",
                    flexGrow: 1,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center", // center QR code horizontally
                    minHeight: qrCodePixelSize, // ensure enough space
                  }}
                >
                  <QRCode
                    value={currentError.url} // URL to encode in QR
                    size={qrCodePixelSize} // dynamically calculated size
                    qrStyle="dots" // style of QR code dots
                    eyeRadius={5} // rounded eyes
                  />
                </div>
              )}
            </div>
          ) : (
            // When no active error, show the "all systems ready" message
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                width: "100%",
                height: "100%",
                padding: "2%",
                boxSizing: "border-box",
              }}
            >
              <h2 style={{ fontSize: "1.8vw", margin: "0.5vw 0" }}>
                All systems are ready!
              </h2>
              <p style={{ fontSize: "1.2vw", margin: "0.3vw 0" }}>
                No active errors detected.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );

```
* The component uses a useEffect hook to dynamically size the QR code based on container dimensions, ensuring responsiveness.
* The main layout consists of a background image with a carefully positioned overlay.
* Inside the overlay, content varies depending on whether there's an active error.
* When an error exists, it displays error details and a QR code linking to additional info.
* When no errors, it shows a positive status message.

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
