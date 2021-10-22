import React, { useState, useEffect } from 'react';
import { createUseStyles } from 'react-jss';

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

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (ticker >= participants.length) setTicker(0);
      else setTicker(ticker + 1);
    }, 50);

    return () => clearInterval(intervalId);
  });

  return (
    <div>
      <Title />
      <div className={classes.participantsContainer}>
        <Paper elevation={4}>
          <List>
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
    </div>
  );
};

export default App;
