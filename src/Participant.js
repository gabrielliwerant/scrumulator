import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { createUseStyles } from 'react-jss';

import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import TextField from '@mui/material/TextField';

import ArrowLeft from '@mui/icons-material/ArrowLeft';

const useStyles = createUseStyles({
  '@global': {
    '.MuiListItemText-root': {
      marginBottom: '6px',
      marginTop: '6px'
    }
  },
  editField: {
    '& input': {
      paddingBottom: '6.5px',
      paddingTop: '6.5px'
    }
  }
});

const Participant = props => {
  const {
    participant,
    setParticipant,
    index,
    ticker,
    isScrumulating
  } = props;
  const classes = useStyles();
  const [isInEditMode, setIsInEditMode] = useState(false);

  const onClickParticipant = () => setIsInEditMode(true);
  const onChangePartipant = e => setParticipant(e.target.value, index);

  return (
    <ListItemButton
      selected={ticker === index && isScrumulating}
      onClick={onClickParticipant}
    >
      {isInEditMode && (
        <TextField
          className={classes.editField}
          size='small'
          id={participant}
          variant='outlined'
          value={participant}
          onChange={onChangePartipant}
        />
      )}
      {!isInEditMode && <ListItemText primary={participant} />}
      {ticker === index && isScrumulating && <ArrowLeft />}
    </ListItemButton>
  );
};

Participant.propTypes = {
  participant: PropTypes.string.isRequired,
  setParticipant: PropTypes.func.isRequired,
  index: PropTypes.number.isRequired,
  ticker: PropTypes.number.isRequired,
  isScrumulating: PropTypes.bool.isRequired
};

export default Participant;
