import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import cotizacion from '../features/cotizacion/slice';

export const store = configureStore({
  reducer: {
    cotizacion,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
