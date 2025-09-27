// src/AppRoot.js
import React, { useEffect, useState } from "react"

export default function AppRoot() {
  const redirectUrl = "https://hytw.hebronlab.com"
  const [countdown, setCountdown] = useState(15) // start at 15 seconds

  useEffect(() => {
    const interval = setInterval(() => {
      setCountdown(prev => prev - 1)
    }, 1000)

    const timer = setTimeout(() => {
      window.location.href = redirectUrl + "?ref=syt-shutdown"
    }, 15000)

    return () => {
      clearInterval(interval)
      clearTimeout(timer)
    }
  }, [redirectUrl])

  return (
    <div style={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      height: "100vh",
      textAlign: "center",
      padding: "2rem",
      fontFamily: "sans-serif"
    }}>
      <h1>We’ve Moved 🚀</h1>
      <p>This version of the app is no longer supported.</p>
      <p>
        Redirecting in <strong>{countdown}</strong> second{countdown !== 1 ? "s" : ""}...
      </p>
      <p>
        Or click here now:{" "}
        <a
          href={redirectUrl+"?ref=syt-shutdown"}
          style={{ color: "#007bff", textDecoration: "underline", fontWeight: "bold" }}
        >
          {redirectUrl}
        </a>
      </p>
    </div>
  )
}
