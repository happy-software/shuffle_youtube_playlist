import React from 'react'
import { Link } from 'react-router-dom'
import ToggleableButton from './ToggleableButton'

export default function ButtonList(props) {
  return <div className="buttonList">
    <div>
      <button onClick={() => props.playerRef.current?.getInternalPlayer()?.nextVideo()} className='sytButton nextVideoButton'>Next</button>
      <ToggleableButton toggled={props.repeatVideo} setToggled={props.setRepeatVideo} message="Repeat" className="sytButton" />
      <ToggleableButton toggled={props.hideVideo} setToggled={props.setHideVideo} message={props.hideVideo ? "Show Video" : "Hide Video"} className="sytButton" />
      <Link to="/track-new-playlist" className="link">
        <button type="button" className="sytButton" >Add to Playlists</button>
      </Link>
      <Link to="/search" target="_blank" rel="noopener noreferrer" className="link">
        <button type="button" className="sytButton" >Search</button>
      </Link>
    </div>
  </div>
}