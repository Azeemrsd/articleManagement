import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Home from './Home';
import { Provider, useDispatch } from 'react-redux';
import { store } from '../store';

// Importing actions from Redux
import { setArticle } from '../slices/articlesSlice';


describe('Home Component', () => {
  beforeEach(() => {
    vitest.clearAllMocks(); // Clear mocks before each test
  });

  it('renders properly', () => {
    const { getByText } = render(
      <Provider store={store}>
        <Home />
      </Provider>
    );
    expect(getByText('Add Article')).toBeInTheDocument();
  });

  it('opens the modal when "Add Article" button is clicked', () => {
    const { getByText, getByTestId } = render(
      <Provider store={store}>
        <Home />
      </Provider>
    );
    fireEvent.click(getByText('Add Article'));
    expect(getByText('Save changes')).toBeInTheDocument();
  });
});
