/**
 * Footer
 *
 * Footer component for app.
 */

import React from 'react';
import { createUseStyles } from 'react-jss';

import Typography from '@mui/material/Typography';

const useStyles = createUseStyles({
  text: {
    margin: 'auto',
    padding: '16px 0'
  },
  footer: {
    width: '100%',
    bottom: 0,
    position: 'absolute',
    padding: '10px 0',
    background: '#e0e0e0',
    textAlign: 'center'
  }
});

const Footer = () => {
  const classes = useStyles();
  const currentYear = new Date().getFullYear();
  const yearRange = currentYear !== 2021 ? `2021 - ${currentYear}` : '2021';

  return (
    <footer className={classes.footer}>
      <Typography variant='body1' className={classes.text}>
        &copy; {yearRange} Gabriel Liwerant
      </Typography>
    </footer>
  );
};

export default Footer;
