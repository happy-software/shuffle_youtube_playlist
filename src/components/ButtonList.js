import React from 'react';
import { Link } from 'react-router-dom';
import GoogleLoginButton from './GoogleLoginButton';
import ToggleableButton from './ToggleableButton';

function ButtonList(props) {
  return (
    <div className="buttonList">
      <div>
        <button
          onClick={props.pickPreviousVideo}
          className='buttonListButton'
        >Previous Video</button>
        <ToggleableButton
          toggled={props.repeatVideo}
          setToggled={props.setRepeatVideo}
          message="Repeat Video"
          className="buttonListButton"
        />
        <button
          onClick={props.pickNextVideo}
          className='buttonListButton'
        >Next Video</button>
        <GoogleLoginButton
          googleState={props.googleState}
          setGoogleState={props.setGoogleState}
          className="buttonListButton"
        />
        <Link
          to="/track-new-playlist"
          className="link">
          <button
            type="button"
            className="buttonListButton"
          >Track New Playlist</button>
        </Link>
        <Link
          to="/search"
          target="_blank"
          rel="noopener noreferrer"
          className="link">
          <button
            type="button"
            className="buttonListButton"
          >Search</button>
        </Link>
      </div>
    </div>
  )
}

export default ButtonList;