import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

// testing rendering
it('renders without crashe', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Mapapp />, div);
  ReactDOM.unmountComponentAtNode(div);
});
