import React from 'react';
import { render, screen } from '@testing-library/react';

import { CurrentParticipantHeader } from '../../components/CurrentParticipantHeader';

describe('CurrentParticipantHeader.js', () => {
  it('should render', () => {
    render(<CurrentParticipantHeader />);

    expect(screen.getByText('Current Participant:')).toBeDefined();
  });
});
