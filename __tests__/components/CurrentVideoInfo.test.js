import React from 'react';
import ReactDOM from 'react-dom';
import CurrentVideoInfo from '../../src/components/CurrentVideoInfo';

it('renders without crashing', () => {
	const div = document.createElement('div');
	ReactDOM.render(<CurrentVideoInfo currentVideo={{"title": "A Song Title"}}/>, div);
});
