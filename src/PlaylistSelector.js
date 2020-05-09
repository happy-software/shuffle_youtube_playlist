import React from 'react';
import Checkbox from './Checkbox';
import { Link } from 'react-router-dom'

function PlaylistSelector(props) {
  function toggleCheckbox(playlist_id) {
    props.onChange(playlist_id);
  }

  return (
    <div id="playlistSelector" className={props.className}>
      <div><b>Tracked Playlists</b></div>
      <button onClick={props.onShuffle}>Combine Playlists</button>
      {props.playlists.map(p =>
        <Checkbox
        key={p.playlist_id}
        label={p.name}
        value={p.playlist_id}
        checked={p.is_default}
        handleCheckboxChange={(playlist_id) => toggleCheckbox(playlist_id)}
        />
      )}
      <Link to="/track-new-playlist">Track New Playlist</Link>
    </div>
  );
}

export default PlaylistSelector;