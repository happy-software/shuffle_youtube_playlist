import React from 'react';
import ReactDOM from 'react-dom';
import ToggleableButton from '../../src/components/ToggleableButton';

it('renders without crashing', () => {
	const div = document.createElement('div');
	ReactDOM.render(<ToggleableButton />, div);
});
