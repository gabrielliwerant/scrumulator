import React from 'react';
import PropTypes from 'prop-types';

import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';

const CurrentParticipantHeader = props => {
  const { currentParticipant } = props;

  return (
    <>
      <ListItem key='current'>
        <ListItemText primary='Current Participant:' />
      </ListItem>
      {!!currentParticipant && <Divider />}
    </>
  );
};

CurrentParticipantHeader.propTypes = {
  currentParticipant: PropTypes.string.isRequired
};

export default CurrentParticipantHeader;
