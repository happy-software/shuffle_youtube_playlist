import React from 'react';
import Checkbox from './Checkbox';
import { Link } from 'react-router-dom';

function PlaylistSelector(props) {
  return (
    <div id="playlistSelector" className={props.className}>
      <div><b>Tracked Playlists</b></div>
      <button onClick={() => props.onShuffle()}>Combine Playlists</button>
      <button onClick={() => props.onSelectNone()}>Select None</button>
      {props.playlists.map(p =>
        <Checkbox
        key={p.playlist_id}
        label={p.name}
        value={p.playlist_id}
        checked={p.is_default}
        onCheckboxChange={(playlist_id) => props.onCheckboxChange(playlist_id)}
        />
      )}
      <Link to="/track-new-playlist">Track New Playlist</Link>
    </div>
  );
}

export default PlaylistSelector;