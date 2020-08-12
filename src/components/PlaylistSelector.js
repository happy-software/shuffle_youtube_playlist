import React from 'react';
import PlaylistSelectorItem from './PlaylistSelectorItem';

function PlaylistSelector(props) {
  return (
    <div id="playlistSelector" className="playlistSelector">
      <div className="playlistSelectorTitle">Available Playlists</div>
      <div className="playlistSelectorInner">
        {props.playlists.map(p =>
          <PlaylistSelectorItem
          key={p.playlist_id}
          label={p.name}
          value={p.playlist_id}
          checked={p.is_default}
          onCheckboxChange={(playlist_id) => props.onCheckboxChange(playlist_id)}
          />
        )}
      </div>
      <button 
        onClick={() => props.onShuffle()}
        className="playlistSelectorButton"
      >Combine Playlists</button>
      <button 
        onClick={() => props.onSelectNone()}
        className="playlistSelectorButton"
      >Select None</button>
    </div>
  );
}

export default PlaylistSelector;