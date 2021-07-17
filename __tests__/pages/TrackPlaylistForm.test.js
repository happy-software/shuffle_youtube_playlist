import React from 'react';
import ReactDOM from 'react-dom';
import TrackPlaylistForm from '../../src/pages/TrackPlaylistForm';

it('renders without crashing', () => {
	const div = document.createElement('div');
	ReactDOM.render(<TrackPlaylistForm />, div);
});
