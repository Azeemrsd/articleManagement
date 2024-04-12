import React from 'react';
import { render, screen } from '@testing-library/react';
import {ArticleList} from './ArticleList';
import { Provider } from 'react-redux';

// Mock Redux store
const mockState = {
  articles: [
    {
      id: '1',
      title: 'Test Article 1',
      content: 'This is test article 1 content.',
      date: '2024-04-12',
      imageBase: 'base64_image_string_1',
    },
    {
      id: '2',
      title: 'Test Article 2',
      content: 'This is test article 2 content.',
      date: '2024-04-13',
      imageBase: 'base64_image_string_2',
    },
  ],
};

const mockStore = {
  getState: () => mockState,
  subscribe: () => {},
  dispatch: () => {},
};

describe('ArticleList', () => {
  test('renders ArticleList with articles', () => {
    render(
      <Provider store={mockStore}>
        <ArticleList onDeleteClicked={() => {}} onEditClicked={() => {}} />
      </Provider>
    );

    // Test if the articles are rendered
    expect(screen.getByText('Test Article 1')).toBeInTheDocument();
    expect(screen.getByText('Test Article 2')).toBeInTheDocument();

    // Test if the delete and edit buttons are rendered for each article (you can use getByRole() for buttons)
    expect(screen.getAllByRole('button', { name: /edit/i })).toHaveLength(2);
    expect(screen.getAllByRole('button', { name: /delete/i })).toHaveLength(2);
  });

  test('renders ArticleList with no articles', () => {
    const emptyMockState = {
      articles: [],
    };

    const emptyMockStore = {
      getState: () => emptyMockState,
      subscribe: () => {},
      dispatch: () => {},
    };

    render(
      <Provider store={emptyMockStore}>
        <ArticleList onDeleteClicked={() => {}} onEditClicked={() => {}} />
      </Provider>
    );

    expect(screen.getByText('No Articles yet')).toBeInTheDocument();
  });

});
