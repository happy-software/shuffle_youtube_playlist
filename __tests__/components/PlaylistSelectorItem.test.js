import React from 'react';
import ReactDOM from 'react-dom';
import PlaylistSelectorItem from '../../src/components/PlaylistSelectorItem';

it('renders without crashing', () => {
	const div = document.createElement('div');
	ReactDOM.render(<PlaylistSelectorItem />, div);
});
