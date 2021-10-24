import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { getCurrent } from './selectors';

import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';

const CurrentParticipantHeader = props => {
  const { id } = props;

  return (
    <>
      <ListItem key='current'>
        <ListItemText primary='Current Participant:' />
      </ListItem>
      {!!id && <Divider />}
    </>
  );
};

CurrentParticipantHeader.propTypes = {
  id: PropTypes.number
};

const mapStateToProps = () => ({
  id: getCurrent()
});

export default connect(mapStateToProps)(CurrentParticipantHeader);
