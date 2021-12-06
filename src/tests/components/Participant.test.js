import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { Participant } from '../../components/Participant';

describe('CurrentParticipant.js', () => {
  it('should render', () => {
    render(
      <Participant
        id="123"
        index={0}
        ticker={0}
        name="test"
        draft="test"
        current="test"
        isEditActive={false}
        isScrumulating={false}
        edit={() => {}}
        change={() => {}}
        cancel={() => {}}
        save={() => {}}
        removeParticipant={() => {}}
        removeOrdering={() => {}}
      />
    );

    expect(screen.getByText('test')).toBeDefined();
  });

  it('should render editing controls when isEditActive is true', () => {
    render(
      <Participant
        id="123"
        index={0}
        ticker={0}
        name="test"
        draft="test"
        current="test"
        isEditActive={true}
        isScrumulating={false}
        edit={() => {}}
        change={() => {}}
        cancel={() => {}}
        save={() => {}}
        removeParticipant={() => {}}
        removeOrdering={() => {}}
      />
    );

    expect(screen.getByLabelText('Edit')).toBeDefined();
  });

  it('should not render editing controls when isEditActive is false', () => {
    render(
      <Participant
        id="123"
        index={0}
        ticker={0}
        name="test"
        draft="test"
        current="test"
        isEditActive={false}
        isScrumulating={false}
        edit={() => {}}
        change={() => {}}
        cancel={() => {}}
        save={() => {}}
        removeParticipant={() => {}}
        removeOrdering={() => {}}
      />
    );

    expect(screen.queryByLabelText('Edit')).toBeNull();
  });

  it('should fire edit function when clicking name', () => {
    const edit = jest.fn();

    render(
      <Participant
        id="123"
        index={0}
        ticker={0}
        name="test"
        draft="test"
        current="test"
        isEditActive={false}
        isScrumulating={false}
        edit={edit}
        change={() => {}}
        cancel={() => {}}
        save={() => {}}
        removeParticipant={() => {}}
        removeOrdering={() => {}}
      />
    );

    userEvent.click(screen.getByText('test'));
    expect(edit).toHaveBeenCalled();
  });

  it('should fire remove functions when clicking delete button', () => {
    const removeParticipant = jest.fn();
    const removeOrdering = jest.fn();

    render(
      <Participant
        id="123"
        index={0}
        ticker={0}
        name="test"
        draft="test"
        current="test"
        isEditActive={false}
        isScrumulating={false}
        edit={() => {}}
        change={() => {}}
        cancel={() => {}}
        save={() => {}}
        removeParticipant={removeParticipant}
        removeOrdering={removeOrdering}
      />
    );

    userEvent.click(screen.getByLabelText('remove'));
    expect(removeParticipant).toHaveBeenCalled();
    expect(removeOrdering).toHaveBeenCalled();
  });
});
