import React from 'react';
import ReactDOM from 'react-dom';
import ButtonList from '../../src/components/ButtonList';
import { HashRouter } from 'react-router-dom';

it('renders without crashing', () => {
	const div = document.createElement('div');
	ReactDOM.render(
    <HashRouter>
      <ButtonList />
    </HashRouter>, 
    div);
});
