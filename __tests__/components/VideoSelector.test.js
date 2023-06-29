import React from 'react';
import ReactDOM from 'react-dom';
import VideoSelector from '../../src/components/VideoSelector';

it('renders without crashing', () => {
	const div = document.createElement('div');
  const videos = [{}];
	ReactDOM.render(<VideoSelector videos={videos} />, div);
});
