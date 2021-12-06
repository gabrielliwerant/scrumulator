import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { PrimaryMenu } from '../../components/PrimaryMenu';

describe('PrimaryMenu.js', () => {
  it('should render', () => {
    render(
      <PrimaryMenu
        participants={{}}
        ordering={[]}
        isScrumulating={false}
        addOrdering={() => {}}
        refreshOrdering={() => {}}
        remove={() => {}}
        refreshCurrent={() => {}}
        setCurrent={() => {}}
        addParticipant={() => {}}
        setOff={() => {}}
        setOn={() => {}}
      />
    );

    expect(screen.getByText('Scrumulate!')).toBeDefined();
  });

  it('should fire appropriate functions when scrumulate button is clicked', () => {
    const setOn = jest.fn();
    const setOff = jest.fn();
    const remove = jest.fn();
    const setCurrent = jest.fn();

    render(
      <PrimaryMenu
        participants={{
          '1': {
            name: 'test',
            isEditActive: false,
            edit: {
              draft: 'test',
              final: 'test'
            }
          }
        }}
        ordering={['1']}
        isScrumulating={false}
        addOrdering={() => {}}
        refreshOrdering={() => {}}
        remove={remove}
        refreshCurrent={() => {}}
        setCurrent={setCurrent}
        addParticipant={() => {}}
        setOff={setOff}
        setOn={setOn}
      />
    );

    userEvent.click(screen.getByText('Scrumulate!'));
    //expect(remove).toHaveBeenCalled();
    //expect(setCurrent).toHaveBeenCalled();
    //expect(setOff).toHaveBeenCalled();
    expect(setOn).toHaveBeenCalled();
  });

  it('should indicate scrumulation in progress when isScrumulating is true', () => {
    render(
      <PrimaryMenu
        participants={{
          '1': {
            name: 'test',
            isEditActive: false,
            edit: {
              draft: 'test',
              final: 'test'
            }
          }
        }}
        ordering={['1']}
        isScrumulating={true}
        addOrdering={() => {}}
        refreshOrdering={() => {}}
        remove={() => {}}
        refreshCurrent={() => {}}
        setCurrent={() => {}}
        addParticipant={() => {}}
        setOff={() => {}}
        setOn={() => {}}
      />
    );

    expect(screen.getByText('Scrumulating...')).toBeDefined();
  });

  it('should fire appropriate functions when clicking add button', () => {
    const addParticipant = jest.fn();
    const addOrdering = jest.fn();

    render(
      <PrimaryMenu
        participants={{}}
        ordering={[]}
        isScrumulating={true}
        addOrdering={addOrdering}
        refreshOrdering={() => {}}
        remove={() => {}}
        refreshCurrent={() => {}}
        setCurrent={() => {}}
        addParticipant={addParticipant}
        setOff={() => {}}
        setOn={() => {}}
      />
    );

    userEvent.click(screen.getByLabelText('add'));
    expect(addParticipant).toHaveBeenCalled();
    expect(addOrdering).toHaveBeenCalled();
  });

  it('should fire appropriate functions when clicking refresh button', () => {
    const refreshOrdering = jest.fn();
    const refreshCurrent = jest.fn();

    render(
      <PrimaryMenu
        participants={{}}
        ordering={[]}
        isScrumulating={true}
        addOrdering={() => {}}
        refreshOrdering={refreshOrdering}
        remove={() => {}}
        refreshCurrent={refreshCurrent}
        setCurrent={() => {}}
        addParticipant={() => {}}
        setOff={() => {}}
        setOn={() => {}}
      />
    );

    userEvent.click(screen.getByLabelText('refresh'));
    expect(refreshOrdering).toHaveBeenCalled();
    expect(refreshCurrent).toHaveBeenCalled();
  });
});
