import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import './normalize.css'
import AppRoot from './AppRoot'

const config = {
    enableUncaught: true,
    environment: "production"
}

ReactDOM.render(<AppRoot />, document.getElementById("root"))