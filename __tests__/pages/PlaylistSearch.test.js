import React from 'react';
import ReactDOM from 'react-dom';
import PlaylistsSearch from '../../src/pages/PlaylistsSearch';

it('renders without crashing', () => {
	const div = document.createElement('div');
	ReactDOM.render(<PlaylistsSearch />, div);
});