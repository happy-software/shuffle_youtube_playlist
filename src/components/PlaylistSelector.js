import React, { useState } from 'react';
import PlaylistSelectorItem from './PlaylistSelectorItem';

function onSelectNone(props) {
  const selectedNoPlaylists = props.playlists.map(p => { 
    return { ...p, is_default: false }
  });
  props.setPlaylistIds([]);
  props.setLoadedPlaylists(selectedNoPlaylists);
}

function togglePlaylistSelection(props, togglePlaylistId) {
  const toggledOnePlaylist = props.playlists.map(p => { 
    return p.playlist_id === togglePlaylistId ? { ...p, is_default: !p.is_default } : p
  });
  const playlistIds = toggledOnePlaylist
    .filter(p => p.is_default)
    .map(p => p.playlist_id);
  props.setPlaylistIds(playlistIds);
  props.setLoadedPlaylists(toggledOnePlaylist);
}

function PlaylistSelector(props) {
  const [collapsed, setCollapsed] = useState(props.isCollapsedDefault);
  return (
    <div id="playlistSelector" className="playlistSelector">
      <div 
        className="playlistSelectorTitle"
        onClick={() => setCollapsed(!collapsed)}
      >Playlists (Expand/Collapse)</div>
      <div className={`${collapsed ? 'hide' : ''}`}>
        <div className={`playlistSelectorInner ${collapsed ? 'hide' : ''}`}>
          {props.playlists.map(p =>
            <PlaylistSelectorItem
            key={p.playlist_id}
            label={p.name}
            value={p.playlist_id}
            checked={p.is_default}
            onCheckboxChange={(playlist_id) => togglePlaylistSelection(props, playlist_id)}
            />
          )}
        </div>
        <button 
          onClick={() => props.onShuffle()}
          className="sytButton"
        >Combine Playlists</button>
        <button 
          onClick={() => onSelectNone(props)}
          className="sytButton"
        >Select None</button>
      </div>
    </div>
  );
}

export default PlaylistSelector;