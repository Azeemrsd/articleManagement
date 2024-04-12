import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Article } from './Article';

describe('Article component', () => {
  const article = {
    id: '1',
    title: 'Test Article',
    content: '<p>This is a test article content.</p>',
    image: 'test-image-url.jpg',
    date: '2024-04-12',
    onEditClicked: vitest.fn(),
    onDeleteClicked: vitest.fn(),
  };

  test('renders article title truncated to 25 characters', () => {
    render(<Article {...article} />);
    const truncatedTitle = screen.getByText(/^Test Article$/);
    expect(truncatedTitle).toBeInTheDocument();
  });

  test('renders article content truncated to 50 characters with "..." at the end', () => {
    render(<Article {...article} content='This is another article that I have written for the sake of displaying my skills' />);
    const truncatedContent = screen.getByText(/^This is another article that I have written for th...$/);
    expect(truncatedContent).toBeInTheDocument();
  });

  test('clicking "see more" button opens modal with full article content', () => {
    render(<Article {...article} />);
    fireEvent.click(screen.getByText('see more'));
  
    const modalTitle = screen.getByText('Test Article', { selector: '.modal-title' });
    const fullContent = screen.getAllByText((content, node) => {
      const articleContent = node!.querySelector("#modal-content")?.textContent;
      return articleContent && articleContent.includes("This is a test article content.");
    });
  
    expect(modalTitle).toBeInTheDocument();
    expect(fullContent.length).toBeGreaterThan(0);
  });


  test('clicking "Edit" button calls onEditClicked callback with article ID', () => {
    render(<Article {...article} />);
    fireEvent.click(screen.getByText('Edit'));
    expect(article.onEditClicked).toHaveBeenCalledWith('1');
  });

  test('clicking "Delete" button calls onDeleteClicked callback with article ID', () => {
    render(<Article {...article} />);
    fireEvent.click(screen.getByText('Delete'));
    expect(article.onDeleteClicked).toHaveBeenCalledWith('1');
  });
});
