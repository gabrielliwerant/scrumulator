import React, { useState } from 'react';
import { createUseStyles } from 'react-jss';
import { reduce as _reduce } from 'lodash';

import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';

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
  const [plural, setPlural] = useState(PARTICIPANTS.length ? 's' : '');

  const scrumuluate = () => {
    if (!participants.length) return false;

    const index = Math.floor(Math.random() * participants.length);

    // KLUDGE: With two remaining, one will remain after reduce
    if (participants.length === 2) setPlural('');

    setCurrent(participants[index]);
    setParticipants(_reduce(participants, (acc, cur) => {
      if (cur !== participants[index]) return [ ...acc, cur ];
      return [ ...acc ];
    }, []));
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
            <ListItem key='remaining' classNames={classes.singleGrid}>
              <ListItemText primary={`Remaining Participant${plural}:`} />
              <Button variant='contained' onClick={scrumuluate}>
                Scrumulate!
              </Button>
            </ListItem>
            {!!participants.length && <Divider />}
            {participants.map(p => (
              <ListItemButton key={p}>
                <ListItemText primary={p} />
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
                <ListItem key={current}>
                  <ListItemText primary={current} />
                </ListItem>
              </>
            )}
          </List>
        </Paper>
      </div>
    </div>
  );
};

export default App;
