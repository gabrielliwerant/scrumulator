import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { getCurrentName } from '../redux/selectors';

import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';

const CurrentParticipant = props => {
  const { name } = props;

  return (
    <>
      {!!name && (
        <ListItem key={name}>
          <ListItemText primary={name} />
        </ListItem>
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
