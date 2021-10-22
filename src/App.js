import React, { useState, useEffect } from 'react';
import { createUseStyles } from 'react-jss';

import { StyledEngineProvider } from '@mui/material/styles';
import List from '@mui/material/List';
import Paper from '@mui/material/Paper';

import CurrentParticipant from './CurrentParticipant';
import CurrentParticipantHeader from './CurrentParticipantHeader';
import Participant from './Participant';
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

const PARTICIPANTS = [
  'Gabriel',
  'Ada',
  'Antonio',
  'Amanda',
  'Bill',
  'Carl',
  'Ciacci'
];

const App = () => {
  const classes = useStyles();
  const [participants, setParticipants] = useState(PARTICIPANTS);
  const [current, setCurrent] = useState('');
  const [isScrumulating, setIsScrumulating] = useState(false);
  const [ticker, setTicker] = useState(0);

  const setParticipant = (newParticipant, index) => {
    const newParticipants = participants.map((oldParticipant, i) => {
      if (i === index) return newParticipant;
      return oldParticipant;
    });

    setParticipants(newParticipants);
  };

  useEffect(() => {
    // const intervalId = setInterval(() => {
    //   if (ticker >= participants.length) setTicker(0);
    //   else setTicker(ticker + 1);
    // }, 50);
    //
    // return () => clearInterval(intervalId);
  });

  return (
    <StyledEngineProvider injectFirst>
      <Title />
      <div className={classes.participantsContainer}>
        <Paper elevation={4}>
          <List component='nav'>
            <RemainingParticipantHeader
              participants={participants}
              setParticipants={setParticipants}
              setCurrent={setCurrent}
              isScrumulating={isScrumulating}
              setIsScrumulating={setIsScrumulating}
            />
            {participants.map((participant, i) => (
              <Participant
                key={participant}
                participant={participant}
                setParticipant={setParticipant}
                ticker={ticker}
                index={i}
                isScrumulating={isScrumulating}
              />
            ))}
          </List>
        </Paper>
        <Paper elevation={4} className={classes.currentParticipantContainer}>
          <List>
            <CurrentParticipantHeader currentParticipant={current} />
            <CurrentParticipant currentParticipant={current} />
          </List>
        </Paper>
      </div>
    </StyledEngineProvider>
  );
};

export default App;
