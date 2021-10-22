import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { createUseStyles } from 'react-jss';
import { reduce as _reduce } from 'lodash';

import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import CircularProgress from '@mui/material/CircularProgress';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';

const useStyles = createUseStyles({
  singleGrid: {
    display: 'flex',
    justifyContent: 'space-between'
  },
  loadingText: {
    textTransform: 'lowercase',
    marginRight: '8px'
  }
});

const RemainingParticipantHeader = props => {
  const {
    participants,
    setParticipants,
    setCurrent,
    isScrumulating,
    setIsScrumulating
  } = props;
  const classes = useStyles();

  const [plural, setPlural] = useState(participants.length ? 's' : '');

  const scrumuluate = () => {
    if (!participants.length) return false;

    setIsScrumulating(true);

    const index = Math.floor(Math.random() * participants.length);
    const remainingParticipants = _reduce(participants, (acc, cur) => {
      if (cur !== participants[index]) return [ ...acc, cur ];
      return [ ...acc ];
    }, []);

    window.setTimeout(() => {
      setCurrent(participants[index]);
      setParticipants(remainingParticipants);
      setIsScrumulating(false);

      // KLUDGE: With two remaining, one will remain after reduce
      if (participants.length === 2) setPlural('');
    }, 1500);
  };

  return (
    <>
      <ListItem key='remaining' className={classes.singleGrid}>
        <ListItemText primary={`Remaining Participant${plural}:`} />
        <Button
          variant='contained'
          onClick={scrumuluate}
          disabled={!participants.length}
        >
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
    </>
  );
};

RemainingParticipantHeader.propTypes = {
  participants: PropTypes.arrayOf(PropTypes.string).isRequired,
  setParticipants: PropTypes.func.isRequired,
  setCurrent: PropTypes.func.isRequired,
  isScrumulating: PropTypes.bool.isRequired,
  setIsScrumulating: PropTypes.func.isRequired
};

export default RemainingParticipantHeader;
