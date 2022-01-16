import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '@supabase/supabase-js';

type payload = null | User;
type EmptyObject = Record<any, never>;
interface initialStateAuth {
  value: payload | Record<string, EmptyObject>;
  isManager: boolean;
}

const initialState: initialStateAuth = {
  value: {},
  isManager: false,
};

export const authSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    saveUser: (state, action: PayloadAction<payload>) => {
      state.value = action.payload;
    },
    updateManager: (state, action: PayloadAction<any>) => {
      state.isManager = action.payload;
    },
  },
});

export const { saveUser, updateManager } = authSlice.actions;
export default authSlice.reducer;
