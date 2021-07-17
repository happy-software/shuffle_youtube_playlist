import React from 'react';
import ReactDOM from 'react-dom';
import VideoTitleDisplay from '../../src/components/VideoTitleDisplay';

it('renders without crashing', () => {
	const div = document.createElement('div');
	ReactDOM.render(<VideoTitleDisplay />, div);
});
