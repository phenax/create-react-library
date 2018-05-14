
import React from 'react';
import { render } from 'react-dom';

import MyComponent from '../../src';

const App = () => (
  <div>
    <MyComponent />
  </div>
);

render(<App />, document.getElementById('root'));
