import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createUseStyles } from 'react-jss';

import { participantsSlice, orderingSlice } from '../redux/reducers';
import {
  getParticipantName,
  getParticipantDraft,
  getIsEditActive,
  getIsScrumulating
} from '../redux/selectors';

import IconButton from '@mui/material/IconButton';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import TextField from '@mui/material/TextField';
import ArrowLeft from '@mui/icons-material/ArrowLeft';
import Cancel from '@mui/icons-material/Cancel';
import CheckCircle from '@mui/icons-material/CheckCircle';
import Delete from '@mui/icons-material/Delete';

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
    id,
    index,
    ticker,
    name,
    draft,
    isEditActive,
    isScrumulating,
    edit,
    change,
    cancel,
    save,
    removeParticipant,
    removeOrdering
  } = props;
  const classes = useStyles();

  const onClickParticipant = e => {
    e.stopPropagation();
    edit(id);
  };
  const onClickEditCancel = e => {
    e.stopPropagation();
    cancel(id);
  };
  const onClickEditSave = e => {
    e.stopPropagation();
    save(id, draft);
  };
  const onChangePartipant = e => change(id, e.target.value);
  const onClickRemove = e => {
    e.stopPropagation();
    removeOrdering(id);
    removeParticipant(id);
  };

  return (
    <ListItemButton
      selected={ticker === index && isScrumulating}
      onClick={onClickParticipant}
    >
      {isEditActive && (
        <>
          <TextField
            className={classes.editField}
            size='small'
            id={`${id}`}
            variant='outlined'
            value={draft}
            onChange={onChangePartipant}
          />
          <IconButton aria-label='save' size='small' onClick={onClickEditSave}>
            <CheckCircle fontSize='small' />
          </IconButton>
          <IconButton
            aria-label='cancel'
            size='small'
            onClick={onClickEditCancel}
          >
            <Cancel fontSize='small' />
          </IconButton>
        </>
      )}
      {!isEditActive && (
        <>
          <ListItemText primary={name} />
          <IconButton aria-label='cancel' size='small' onClick={onClickRemove}>
            <Delete fontSize='small' />
          </IconButton>
        </>
      )}
      {ticker === index && isScrumulating && <ArrowLeft />}
    </ListItemButton>
  );
};

Participant.propTypes = {
  id: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
  ticker: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  draft: PropTypes.string.isRequired,
  isEditActive: PropTypes.bool.isRequired,
  isScrumulating: PropTypes.bool.isRequired,
  edit: PropTypes.func.isRequired,
  change: PropTypes.func.isRequired,
  cancel: PropTypes.func.isRequired,
  save: PropTypes.func.isRequired,
  removeParticipant: PropTypes.func.isRequired,
  removeOrdering: PropTypes.func.isRequired
};

const mapStateToProps = (state, ownProps) => ({
  name: getParticipantName(ownProps.id),
  draft: getParticipantDraft(ownProps.id),
  isEditActive: getIsEditActive(ownProps.id),
  isScrumulating: getIsScrumulating()
});

const mapDispatchToProps = dispatch => ({
  edit: id => dispatch(participantsSlice.actions.edit({ id })),
  change: (id, text) => dispatch(participantsSlice.actions.change({ id, text })),
  cancel: id => dispatch(participantsSlice.actions.cancel({ id })),
  save: (id, text) => dispatch(participantsSlice.actions.save({ id, text })),
  removeParticipant: id => dispatch(participantsSlice.actions.remove({ id })),
  removeOrdering: id => dispatch(orderingSlice.actions.remove({ id }))
});

export default connect(mapStateToProps, mapDispatchToProps)(Participant);
