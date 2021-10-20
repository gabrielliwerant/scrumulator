import React from 'react';
import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles({
  '@global': {
    body: {
      margin: 0,
      fontFamily: '"Roboto", arial, sans-serif'
    }
  }
});

const App = () => {
  useStyles();

  return (
    <div>
      Hello World
    </div>
  );
};

export default App;
