import React from 'react';
import { render, screen } from '@testing-library/react';

import Footer from '../../components/Footer';

describe('Footer.js', () => {
  it('should render', () => {
    render(<Footer />);

    expect(screen.getByText(/Gabriel Liwerant/)).toBeDefined();
  });
});
