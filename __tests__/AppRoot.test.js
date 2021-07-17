import React from 'react';
import ReactDOM from 'react-dom';
import AppRoot from '../src/AppRoot';

it('renders without crashing', () => {
	const div = document.createElement('div');
	ReactDOM.render(<AppRoot />, div);
});