import { authSlice, setUser, logoutUser, authLocalStorageMiddleware } from './authSlice';
import { AnyAction, configureStore } from '@reduxjs/toolkit';


import { combineReducers } from '@reduxjs/toolkit';

const rootReducer = combineReducers({
  auth: authSlice.reducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;

describe('authSlice reducers', () => {
  const initialState = {
    userId: '',
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  };

  it('should handle setUser', () => {
    const user = {
      userId: '123',
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@example.com',
      password: 'password123',
    };
    const action: AnyAction = setUser(user);
    const newState = authSlice.reducer(initialState, action);
    expect(newState).toEqual(user);
  });

  it('should handle logoutUser', () => {
    const action: AnyAction = logoutUser();
    const newState = authSlice.reducer(initialState, action);
    expect(newState).toEqual(initialState);
  });
});

describe('authLocalStorageMiddleware', () => {
    const store = configureStore({
        reducer: rootReducer,
      middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(authLocalStorageMiddleware),
    });
  
    const action: AnyAction = setUser({
      userId: '123',
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@example.com',
      password: 'password123',
    });
  
    it('should save auth state to localStorage when action is dispatched', () => {
      const localStorageSpy = vitest.spyOn(Storage.prototype, 'setItem');
      store.dispatch(action);
      expect(localStorageSpy).toHaveBeenCalledWith('currentUser', JSON.stringify({
        userId: '123',
        firstName: 'John',
        lastName: 'Doe',
        email: 'john.doe@example.com',
        password: 'password123',
      }));
    });
  });