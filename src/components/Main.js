/**
 * Main
 *
 * Component to handle the overall layout for the app.
 */

import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createUseStyles } from 'react-jss';

import { getOrdering } from '../redux/selectors';

import { StyledEngineProvider } from '@mui/material/styles';
import List from '@mui/material/List';
import Paper from '@mui/material/Paper';

import CurrentParticipant from './CurrentParticipant';
import CurrentParticipantHeader from './CurrentParticipantHeader';
import Participant from './Participant';
import PrimaryMenu from './PrimaryMenu';
import RemainingParticipantHeader from './RemainingParticipantHeader';
import Title from './Title';

const useStyles = createUseStyles({
  '@global': {
    body: {
      margin: 0,
      fontFamily: '"Roboto", arial, sans-serif'
    }
  },
  participantsContainer: {
    width: '25%',
    margin: 'auto'
  },
  currentParticipantContainer: {
    marginTop: '16px'
  }
});

const Main = props => {
  const { ordering } = props;
  const classes = useStyles();
  const [ticker, setTicker] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (ticker >= ordering.length) setTicker(0);
      else setTicker(ticker + 1);
    }, 50);

    return () => clearInterval(intervalId);
  });

  return (
    <StyledEngineProvider injectFirst>
      <Title />
      <div className={classes.participantsContainer}>
        <PrimaryMenu />
        <Paper elevation={4}>
          <List component='nav'>
            <RemainingParticipantHeader />
            {ordering.map((id, i) => (
              <Participant key={id} id={id} ticker={ticker} index={i} />
            ))}
          </List>
        </Paper>
        <Paper elevation={4} className={classes.currentParticipantContainer}>
          <List>
            <CurrentParticipantHeader />
            <CurrentParticipant />
          </List>
        </Paper>
      </div>
    </StyledEngineProvider>
  );
};

Main.propTypes = {
  ordering: PropTypes.arrayOf(PropTypes.string).isRequired
};

const mapStateToProps = () => ({
  ordering: getOrdering()
});

export default connect(mapStateToProps)(Main);
