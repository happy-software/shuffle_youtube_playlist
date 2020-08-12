import React from 'react';
import { Link } from 'react-router-dom';
import GoogleLoginButton from '../components/GoogleLoginButton';

function ButtonList(props) {
  return (
    <div className="buttonList">
      <div>
        <button
          onClick={props.pickPreviousVideo}
          className='buttonListButton'
        >Previous Video</button>
        <button
          onClick={props.pickNextVideo}
          className='buttonListButton'
        >Next Video</button>
        <Link to="/track-new-playlist">
          <button 
            type="button"
            className="buttonListButton"
          >Track New Playlist</button>
        </Link>
        <GoogleLoginButton
          googleState={props.googleState}
          setGoogleState={props.setGoogleState}
          className="buttonListButton"
        />
      </div>
    </div>
  )
}

export default ButtonList;