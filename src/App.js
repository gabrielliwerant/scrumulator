import React, { useState, useEffect } from 'react';
import { createUseStyles } from 'react-jss';
import { reduce as _reduce } from 'lodash';

import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';

import ArrowLeft from '@mui/icons-material/ArrowLeft';

const useStyles = createUseStyles({
  '@global': {
    body: {
      margin: 0,
      fontFamily: '"Roboto", arial, sans-serif'
    }
  },
  title: {
    textAlign: 'center',
    marginBottom: '16px'
  },
  listContainer: {
    width: '25%',
    margin: 'auto'
  },
  singleGrid: {
    display: 'flex',
    justifyContent: 'space-between'
  },
  current: {
    marginTop: '16px'
  },
  loadingText: {
    textTransform: 'lowercase',
    marginRight: '8px'
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
  const [plural, setPlural] = useState(PARTICIPANTS.length ? 's' : '');

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (ticker >= participants.length) setTicker(0);
      else setTicker(ticker + 1);
    }, 50);

    return () => clearInterval(intervalId);
  });

  const scrumuluate = () => {
    if (!participants.length) return false;

    setIsScrumulating(true);

    const index = Math.floor(Math.random() * participants.length);
    const remainingParticipants = _reduce(participants, (acc, cur) => {
      if (cur !== participants[index]) return [ ...acc, cur ];
      return [ ...acc ];
    }, []);

    // KLUDGE: With two remaining, one will remain after reduce
    if (participants.length === 2) setPlural('');

    window.setTimeout(() => {
      setCurrent(participants[index]);
      setParticipants(remainingParticipants);
      setIsScrumulating(false);
    }, 2500);
  };

  return (
    <div>
      <div className={classes.title}>
        <Typography variant="h3" component="h1">SCRUMULATOR</Typography>
        <Typography variant="caption">
          Powered by the scrumulation engine
        </Typography>
      </div>
      <div className={classes.listContainer}>
        <Paper elevation={4}>
          <List>
            <ListItem key='remaining' className={classes.singleGrid}>
              <ListItemText primary={`Remaining Participant${plural}:`} />
              <Button variant='contained' onClick={scrumuluate}>
                {isScrumulating && (
                  <>
                    <span className={classes.loadingText}>
                      scrumulating...
                    </span>
                    <CircularProgress size={20} sx={{ color: 'white' }} />
                  </>
                )}
                {!isScrumulating && <>Scrumulate!</>}
              </Button>
            </ListItem>
            {!!participants.length && <Divider />}
            {participants.map((p, i) => (
              <ListItemButton
                key={p}
                selected={ticker === i && isScrumulating}
              >
                <ListItemText primary={p} />
                {ticker === i && isScrumulating && <ArrowLeft />}
              </ListItemButton>
            ))}
          </List>
        </Paper>
        <Paper elevation={4} className={classes.current}>
          <List>
            <ListItem key='current'>
              <ListItemText primary='Current Participant:' />
            </ListItem>
            {!!current && (
              <>
                <Divider />
                <ListItemButton key={current}>
                  <ListItemText primary={current} />
                </ListItemButton>
              </>
            )}
          </List>
        </Paper>
      </div>
    </div>
  );
};

export default App;
