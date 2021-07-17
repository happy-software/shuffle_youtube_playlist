import React from 'react';
import ReactDOM from 'react-dom';
import PlayedHistory from '../../src/components/PlayedHistory';

it('renders without crashing', () => {
	const div = document.createElement('div');
  const videos = [{}];
	ReactDOM.render(<PlayedHistory videos={videos} />, div);
});
