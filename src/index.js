import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import './normalize.css';
import AppRoot from './AppRoot';
import { Honeybadger, HoneybadgerErrorBoundary } from "@honeybadger-io/react"

const config = {
    apiKey: process.env.honeybadger_api_key,
    environment: "production"
}

const honeybadger = Honeybadger.configure(config)

ReactDOM.render(<HoneybadgerErrorBoundary honeybadger={honeybadger}><AppRoot /></HoneybadgerErrorBoundary >, document.getElementById("root"));