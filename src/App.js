import React, { useState, useEffect } from "react";
import { QRCode } from "react-qrcode-logo";

function App() {
  // List of possible system errors
  const systemErrors = [
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

  // State to hold current error; null means no error (system ready)
  const [currentError, setCurrentError] = useState(null);

  useEffect(() => {
    // Function to pick and set a random error
    const pickRandomError = () => {
      const randomIndex = Math.floor(Math.random() * systemErrors.length);
      const error = systemErrors[randomIndex];
      setCurrentError(error);
    };

    // Initially set no error after 10 seconds
    const intervalId = setInterval(() => {
      // Randomly decide whether to show an error or reset to "ready"
      const showError = Math.random() < 0.7; // 70% chance to show error
      if (showError) {
        pickRandomError();
      } else {
        setCurrentError(null); // All systems are ready
      }
    }, 10000); // every 10 seconds

    // Cleanup on component unmount
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <h1>System Status Monitor</h1>
      {currentError ? (
        <div style={{ marginTop: "20px", color: "red", textAlign: "center" }}>
          <h2>System Error {currentError.code}</h2>
          <p>{currentError.message}</p>
          <p>Please scan the QR code below for assistance:</p>
          <QRCode value={currentError.url} size={128} />
        </div>
      ) : (
        <div style={{ marginTop: "20px", textAlign: "center" }}>
          <h2>All systems are ready!</h2>
        </div>
      )}
    </div>
  );
}

export default App;
