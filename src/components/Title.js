import React from 'react';
import { createUseStyles } from 'react-jss';

import Typography from '@mui/material/Typography';

const useStyles = createUseStyles({
  title: {
    textAlign: 'center',
    marginBottom: '32px'
  }
});

const Title = () => {
  const classes = useStyles();

  return (
    <div className={classes.title}>
      <Typography variant="h3" component="h1">SCRUMULATOR</Typography>
      <Typography variant="caption">
        Powered by the scrumulation engine
      </Typography>
    </div>
  );
};

export default Title;
