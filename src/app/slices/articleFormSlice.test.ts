import { articleFormSlice, ArticleForm, updateField, clearForm, setFormDetails, setErrors, clearErrors, updateAllErrors } from './articleFormSlice';
import { AnyAction } from '@reduxjs/toolkit';

describe('articleFormSlice reducers', () => {
  const initialState: ArticleForm = {
    id: '',
    title: '',
    imageUrl: '',
    imageBase: '',
    content: '',
    date: '',
    errors: {
      title: '',
      image: '',
      content: '',
    },
  };

  it('should handle updateField', () => {
    const field = 'title';
    const value = 'New Title';
    const action: AnyAction = updateField({ field, value });
    const newState = articleFormSlice.reducer(initialState, action);
    expect(newState[field]).toEqual(value);
  });

  it('should handle clearForm', () => {
    const action: AnyAction = clearForm();
    const newState = articleFormSlice.reducer(initialState, action);
    expect(newState).toEqual(initialState);
  });

  it('should handle setFormDetails', () => {
    const formDetails = {
      id: '123',
      title: 'Test Title',
      content: 'Test Content',
      imageBase: 'base64Image',
      date: '2024-04-13',
    };
    const action: AnyAction = setFormDetails(formDetails);
    const newState = articleFormSlice.reducer(initialState, action);
    expect(newState).toEqual({
      ...initialState,
      ...formDetails,
      imageUrl: `data:image/jpeg;base64,${formDetails.imageBase}`,
    });
  });

  it('should handle setErrors', () => {
    const field = 'title';
    const value = 'Title cannot be empty';
    const action: AnyAction = setErrors({ field, value });
    const newState = articleFormSlice.reducer(initialState, action);
    expect(newState.errors[field]).toEqual(value);
  });

  it('should handle clearErrors', () => {
    const action: AnyAction = clearErrors();
    const newState = articleFormSlice.reducer(initialState, action);
    expect(newState.errors).toEqual({
      title: '',
      image: '',
      content: '',
    });
  });

  it('should handle updateAllErrors', () => {
    const errors = [
      { field: 'title', value: 'Title cannot be empty' },
      { field: 'content', value: 'Content cannot be empty' },
    ];
    const action: AnyAction = updateAllErrors(errors);
    const newState = articleFormSlice.reducer(initialState, action);
    expect(newState.errors).toEqual({
      title: errors[0].value,
      content: errors[1].value,
      image: '',
    });
  });
});

