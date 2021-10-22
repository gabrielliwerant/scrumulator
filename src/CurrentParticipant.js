import React from 'react';
import PropTypes from 'prop-types';

import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';

const CurrentParticipant = props => {
  const { currentParticipant } = props;

  return (
    <>
      {!!currentParticipant && (
        <ListItemButton key={currentParticipant}>
          <ListItemText primary={currentParticipant} />
        </ListItemButton>
      )}
    </>
  );
};

CurrentParticipant.propTypes = {
  currentParticipant: PropTypes.string.isRequired
};

export default CurrentParticipant;
