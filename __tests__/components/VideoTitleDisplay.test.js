import React from 'react';
import ReactDOM from 'react-dom';
import VideoTitleDisplay from '../../src/components/VideoTitleDisplay';

const defaultVideo = {
  title: 'test title',
  videoId: 'test video id',
}

it('renders without crashing', () => {
	const div = document.createElement('div');
	ReactDOM.render(<VideoTitleDisplay video={defaultVideo} />, div);
});
