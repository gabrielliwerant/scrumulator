import React from 'react';
import { render, screen } from '@testing-library/react';

import Title from '../../components/Title';

describe('Title.js', () => {
  it('should render', () => {
    render(<Title />);

    expect(screen.getByRole('heading', { level: 1 }).innerHTML).toEqual('SCRUMULATOR');
  });
});
