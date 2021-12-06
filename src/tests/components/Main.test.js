import React from 'react';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';

import { store } from '../../redux/config';
import Main from '../../components/Main';

describe('Main.js', () => {
  it('should render', () => {
    render(<Provider store={store}><Main /></Provider>);

    expect(screen.getByTestId('main')).toBeDefined();
  });
});
