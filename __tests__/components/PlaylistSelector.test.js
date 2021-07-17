import React from 'react';
import ReactDOM from 'react-dom';
import PlaylistSelector from '../../src/components/PlaylistSelector';

it('renders without crashing', () => {
  const div = document.createElement('div');
  const playlists = [{
    playlist_id: "playlist id 1",
    name: "A playlist name",
    is_default: true
  }]
  ReactDOM.render(<PlaylistSelector playlists={playlists} />, div);
});
