/**
 * Footer
 *
 * Footer component for app.
 */

import React from 'react';
import { createUseStyles } from 'react-jss';

import AppBar from '@mui/material/AppBar';
import Typography from '@mui/material/Typography';

const useStyles = createUseStyles({
  text: {
    margin: 'auto',
    padding: '16px 0'
  }
});

const Footer = () => {
  const classes = useStyles();
  const currentYear = new Date().getFullYear();
  const yearRange = currentYear !== 2021 ? `2021 - ${currentYear}` : '2021';

  return (
    <AppBar position='fixed' color='default' sx={{ top: 'auto', bottom: 0 }}>
      <Typography variant='body1' className={classes.text}>
        &copy; {yearRange} Gabriel Liwerant
      </Typography>
    </AppBar>
  );
};

export default Footer;
