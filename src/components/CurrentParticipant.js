import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { getCurrentName } from '../redux/selectors';

import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';

const CurrentParticipant = props => {
  const { name } = props;

  return (
    <>
      {!!name && (
        <ListItemButton key={name}>
          <ListItemText primary={name} />
        </ListItemButton>
      )}
    </>
  );
};

CurrentParticipant.propTypes = {
  name: PropTypes.string.isRequired
};

const mapStateToProps = () => ({
  name: getCurrentName()
});

export default connect(mapStateToProps)(CurrentParticipant);
