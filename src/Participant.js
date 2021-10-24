import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createUseStyles } from 'react-jss';

import { participantsSlice } from './reducers';
import {
  getParticipantName,
  getParticipantDraft,
  getIsEditActive,
  getIsScrumulating
} from './selectors';

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
    id,
    index,
    ticker,
    name,
    draft,
    isEditActive,
    isScrumulating,
    edit,
    change
  } = props;
  const classes = useStyles();

  const onClickParticipant = () => edit(id);
  const onChangePartipant = e => change(id, e.target.value);

  return (
    <ListItemButton
      selected={ticker === index && isScrumulating}
      onClick={onClickParticipant}
    >
      {isEditActive && (
        <TextField
          className={classes.editField}
          size='small'
          id={`${id}`}
          variant='outlined'
          value={draft}
          onChange={onChangePartipant}
        />
      )}
      {!isEditActive && <ListItemText primary={name} />}
      {ticker === index && isScrumulating && <ArrowLeft />}
    </ListItemButton>
  );
};

Participant.propTypes = {
  id: PropTypes.number.isRequired,
  index: PropTypes.number.isRequired,
  ticker: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  draft: PropTypes.string.isRequired,
  isEditActive: PropTypes.bool.isRequired,
  isScrumulating: PropTypes.bool.isRequired,
  edit: PropTypes.func.isRequired,
  change: PropTypes.func.isRequired
};

const mapStateToProps = (state, ownProps) => ({
  name: getParticipantName(ownProps.id),
  draft: getParticipantDraft(ownProps.id),
  isEditActive: getIsEditActive(ownProps.id),
  isScrumulating: getIsScrumulating()
});

const mapDispatchToProps = dispatch => ({
  edit: id => dispatch(participantsSlice.actions.edit({ id })),
  change: (id, text) => dispatch(participantsSlice.actions.change({ id, text }))
});

export default connect(mapStateToProps, mapDispatchToProps)(Participant);
