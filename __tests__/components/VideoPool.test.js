import React from 'react';
import ReactDOM from 'react-dom';
import VideoPool from '../../src/components/VideoPool';

it('renders without crashing', () => {
	const div = document.createElement('div');
  const videos = [{}];
	ReactDOM.render(<VideoPool videos={videos} />, div);
});
