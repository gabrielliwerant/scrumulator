import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import {
  orderingSlice,
  participantsSlice,
  currentSlice
} from '../redux/reducers';
import { getParticipants } from '../redux/selectors';
import { makeId } from '../utils';

import IconButton from '@mui/material/IconButton';
import AddCircle from '@mui/icons-material/AddCircle';
import Refresh from '@mui/icons-material/Refresh';

const PrimaryMenu = props => {
  const {
    participants,
    addOrdering,
    refreshOrdering,
    refreshCurrent,
    addParticipant
  } = props;
  const onClickAdd = () => {
    const id = makeId();
    addParticipant(id);
    addOrdering(id);
  };
  const onClickRefresh = () => {
    refreshOrdering(participants);
    refreshCurrent();
  };

  return (
    <nav>
      <IconButton
        aria-label="add"
        size="small"
        color="primary"
        onClick={onClickAdd}
      >
        <AddCircle fontSize="large" />
      </IconButton>
      <IconButton
        aria-label="add"
        size="small"
        color="primary"
        onClick={onClickRefresh}
      >
        <Refresh fontSize="large" />
      </IconButton>
    </nav>
  );
};

PrimaryMenu.propTypes = {
  participants: PropTypes.object.isRequired,
  addOrdering: PropTypes.func.isRequired,
  refreshOrdering: PropTypes.func.isRequired,
  refreshCurrent: PropTypes.func.isRequired,
  addParticipant: PropTypes.func.isRequired,
};

const mapStateToProps = () => ({
  participants: getParticipants()
});

const mapDispatchToProps = dispatch => ({
  addOrdering: id => dispatch(orderingSlice.actions.add({ id })),
  refreshOrdering: participants => dispatch(orderingSlice.actions.refresh({ participants })),
  refreshCurrent: () => dispatch(currentSlice.actions.refresh()),
  addParticipant: id => dispatch(participantsSlice.actions.add({ id }))
});

export default connect(mapStateToProps, mapDispatchToProps)(PrimaryMenu);
