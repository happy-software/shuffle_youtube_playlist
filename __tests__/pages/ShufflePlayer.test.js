import React from 'react';
import ReactDOM from 'react-dom';
import ShufflePlayer from '../../src/pages/ShufflePlayer';

it('renders without crashing', () => {
	const div = document.createElement('div');
	ReactDOM.render(<ShufflePlayer />, div);
});