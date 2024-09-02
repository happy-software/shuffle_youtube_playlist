import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import './normalize.css'
import AppRoot from './AppRoot'
import { Honeybadger, HoneybadgerErrorBoundary } from "@honeybadger-io/react"

const config = {
    apiKey: process.env.REACT_APP_HONEYBADGER_API_KEY,
    enableUncaught: true,
    environment: "production"
}

const honeybadger = Honeybadger.configure(config)

ReactDOM.render(<HoneybadgerErrorBoundary honeybadger={honeybadger}><AppRoot /></HoneybadgerErrorBoundary >, document.getElementById("root"))