import React, { useState, useEffect, useRef } from "react";
import { QRCode } from "react-qrcode-logo"; // Import QRCode component for generating QR codes
import m500Image from "./M500.png"; // Path to your background image; ensure the path and filename are correct

function App() {
  // Static data representing various system errors with their codes, messages, and help URLs
  const systemErrorsData = [
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

  // State to hold the current error being displayed (or null if none)
  const [currentError, setCurrentError] = useState(null);
  // Reference to the content container for size calculations
  const contentRef = useRef(null);
  // State for QR code size in pixels, dynamically calculated based on container size
  const [qrCodePixelSize, setQrCodePixelSize] = useState(0);

  // Effect to randomly select and display errors at intervals
  useEffect(() => {
    // Function to pick a random error from the list
    const pickRandomError = () => {
      const randomIndex = Math.floor(Math.random() * systemErrorsData.length);
      const error = systemErrorsData[randomIndex];
      setCurrentError(error);
    };

    // Set up interval to update error every 10 seconds
    const intervalId = setInterval(() => {
      // 70% chance to show an error, 30% to clear
      const showError = Math.random() < 0.7;
      if (showError) {
        pickRandomError();
      } else {
        setCurrentError(null);
      }
    }, 10000); // 10,000 ms = 10 seconds

    // Clear interval on cleanup
    return () => clearInterval(intervalId);
  }, [systemErrorsData]);

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
}

export default App;
