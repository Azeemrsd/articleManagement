import { articleSlice, Article, setArticle, deleteArticle, updateArticle } from './articlesSlice';
import { AnyAction } from '@reduxjs/toolkit';

describe('articleSlice reducers', () => {
  const initialState: Article[] = [];

  it('should handle setArticle', () => {
    const article: Article = {
      id: '1',
      title: 'Test Article',
      imageBase: 'base64Image',
      content: 'Test Content',
      date: '2024-04-13',
    };
    const action: AnyAction = setArticle(article);
    const newState = articleSlice.reducer(initialState, action);
    expect(newState).toEqual([article]);
  });

  it('should handle deleteArticle', () => {
    const article1: Article = {
      id: '1',
      title: 'Test Article 1',
      imageBase: 'base64Image1',
      content: 'Test Content 1',
      date: '2024-04-13',
    };
    const article2: Article = {
      id: '2',
      title: 'Test Article 2',
      imageBase: 'base64Image2',
      content: 'Test Content 2',
      date: '2024-04-14',
    };
    const state: Article[] = [article1, article2];
    const action: AnyAction = deleteArticle('1');
    const newState = articleSlice.reducer(state, action);
    expect(newState).toEqual([article2]);
  });

  it('should handle updateArticle', () => {
    const article1: Article = {
      id: '1',
      title: 'Test Article 1',
      imageBase: 'base64Image1',
      content: 'Test Content 1',
      date: '2024-04-13',
    };
    const article2: Article = {
      id: '2',
      title: 'Test Article 2',
      imageBase: 'base64Image2',
      content: 'Test Content 2',
      date: '2024-04-14',
    };
    const state: Article[] = [article1, article2];
    const updatedArticle: Article = {
      id: '1',
      title: 'Updated Test Article 1',
      imageBase: 'updatedBase64Image1',
      content: 'Updated Test Content 1',
      date: '2024-04-15',
    };
    const action: AnyAction = updateArticle(updatedArticle);
    const newState = articleSlice.reducer(state, action);
    expect(newState).toEqual([updatedArticle, article2]);
  });
});
