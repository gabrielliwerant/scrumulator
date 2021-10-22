import React from 'react';
import PropTypes from 'prop-types';

import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';

import ArrowLeft from '@mui/icons-material/ArrowLeft';

const Participant = props => {
  const { participant, index, ticker, isScrumulating } = props;

  return (
    <ListItemButton selected={ticker === index && isScrumulating}>
      <ListItemText primary={participant} />
      {ticker === index && isScrumulating && <ArrowLeft />}
    </ListItemButton>
  );
};

Participant.propTypes = {
  participant: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
  ticker: PropTypes.number.isRequired,
  isScrumulating: PropTypes.bool.isRequired
};

export default Participant;
