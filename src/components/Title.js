/**
 * Title
 *
 * Title component for app.
 */

import React from 'react';
import { createUseStyles } from 'react-jss';

import { getRandomIndex } from '../utils';

import Typography from '@mui/material/Typography';

const CAPTIONS = [
  'Powered by the scrumulation engine',
  'Solving all your scrum problems since 2013',
  'Why roll dice when you can SCRUMULATE?',
  '90% more scrum than the leading brand',
  'Happiness is a warm scrum',
  'I\'ll let you be in my scrum if I can be in yours',
  '8 out of 10 scrum teams use it',
  'Blame the algorithm'
];
const caption = CAPTIONS[getRandomIndex(CAPTIONS)];

const useStyles = createUseStyles({
  title: {
    textAlign: 'center',
    marginBottom: '48px'
  }
});

const Title = () => {
  const classes = useStyles();

  return (
    <div className={classes.title}>
      <Typography variant="h2" component="h1">SCRUMULATOR</Typography>
      <Typography variant="caption">
        {caption}
      </Typography>
    </div>
  );
};

export default Title;
