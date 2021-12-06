import React from 'react';
import { render, screen } from '@testing-library/react';

import { CurrentParticipant } from '../../components/CurrentParticipant';

describe('CurrentParticipant.js', () => {
  it('should render', () => {
    render(<CurrentParticipant name="test" />);

    expect(screen.getByText('test')).toBeDefined();
  });
});
