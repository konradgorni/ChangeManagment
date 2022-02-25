import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '@supabase/supabase-js';

type payload = null | User;
export type EmptyObject = Record<any, never>;
interface initialStateAuth {
  value: payload | Record<string, EmptyObject>;
  isManager: boolean;
  isAdmin: boolean;
}

const initialState: initialStateAuth = {
  value: {},
  isManager: false,
  isAdmin: false,
};

export const authSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    saveUser: (state, action: PayloadAction<payload>) => {
      state.value = action.payload;
    },
    updateManager: (state, action: PayloadAction<boolean>) => {
      state.isManager = action.payload;
    },
    updateAdmin: (state, action: PayloadAction<boolean>) => {
      state.isAdmin = action.payload;
    },
  },
});

export const { saveUser, updateManager, updateAdmin } = authSlice.actions;
export default authSlice.reducer;
