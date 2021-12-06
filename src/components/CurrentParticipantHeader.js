/**
 * CurrentParticipantHeader
 *
 * Component for current participant header section.
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { getCurrent } from '../redux/selectors';

import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';

const CurrentParticipantHeader = props => {
  const { id } = props;

  return (
    <>
      <ListItem key='current'>
        <ListItemText
          primary='Current Participant:'
          primaryTypographyProps={{ fontWeight: 'bold' }}
        />
      </ListItem>
      {!!id && <Divider />}
    </>
  );
};

CurrentParticipantHeader.propTypes = {
  id: PropTypes.string
};

const mapStateToProps = () => ({
  id: getCurrent()
});

export default connect(mapStateToProps)(CurrentParticipantHeader);
export { CurrentParticipantHeader };
