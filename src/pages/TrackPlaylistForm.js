import React, { useState } from "react"
import { Navigate } from 'react-router-dom'
import axios from 'axios'
import AppConstants from '../AppConstants'

export default function TrackPlaylistForm() {
  const [playlistId, setPlaylistId] = useState('')
  const [isDefault, setIsDefault] = useState(false)
  const [serverErrors, setServerErrors] = useState([])
  const [redirectHome, setRedirectHome] = useState(false)

  function handleInputChange(event) {
    const target = event.target
    const value = target.name === 'is_default' ? target.checked : target.value
    const name = target.name

    if (name === 'playlist_id') {
      setPlaylistId(value)
    } else if (name === 'is_default') {
      setIsDefault(value)
    }
  }

  function handleSubmit(event) {
    event.preventDefault()
    setServerErrors([])
    axios.post(AppConstants.APIEndpoints.TRACKED_PLAYLISTS, { playlist_id: playlistId, is_default: isDefault })
      .then((response) => {
        if (response.status >= 200 && response.status < 300) {
          setRedirectHome(true)
        }
      })
      .catch((e) => setServerErrors([e]))
  }

  if (redirectHome) {
    return <Navigate to="/" />
  }

  return <form onSubmit={handleSubmit} style={{ padding: "10px" }}>
    <h1>Track New Playlist</h1>

    <div style={{ marginBottom: "10px" }}>
      <label>Playlist ID: </label>
      <input
        type="text"
        name="playlist_id"
        value={playlistId}
        onChange={handleInputChange}
        placeholder="(e.g. 'PL8g7AzKjYPsNWX5N1pYudn2OetM85N0GS')"
        style={{ width: "40%" }}
      />
    </div>

    <div style={{ marginBottom: "10px" }}>
      <label> Default Playlist? </label>
      <input
        type="checkbox"
        name="is_default"
        checked={isDefault}
        onChange={handleInputChange}
      />
    </div>

    <p><input type="submit" value="Submit" /></p>

    <div style={{ marginTop: "25px" }} className={`${serverErrors.length > 0 ? '' : 'hide'}`}>
      Submission Errors: {serverErrors.map((e, index) => <li key={index}>{e.response.data.errors}</li>)}
    </div>
  </form>
}