import React from 'react';
import { render, screen } from '@testing-library/react';

import { RemainingParticipantHeader } from '../../components/RemainingParticipantHeader';

describe('RemainingParticipantHeader.js', () => {
  it('should render with no participants', () => {
    render(<RemainingParticipantHeader ordering={[]} />);

    expect(screen.getByText('Remaining Participant:')).toBeDefined();
  });

  it('should render with one participant', () => {
    render(<RemainingParticipantHeader ordering={['1']} />);

    expect(screen.getByText('Remaining Participant:')).toBeDefined();
  });

  it('should render with greater than one participants', () => {
    render(<RemainingParticipantHeader ordering={['1', '2']} />);

    expect(screen.getByText('Remaining Participants:')).toBeDefined();
  });
});
