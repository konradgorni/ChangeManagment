import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '@supabase/supabase-js';

type payload = null | User;
type EmptyObject = Record<any, never>;
interface initialStateAuth {
  value: payload | Record<string, EmptyObject>;
}

const initialState: initialStateAuth = {
  value: {},
};

export const authSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    saveUser: (state, action: PayloadAction<payload>) => {
      state.value = action.payload;
    },
  },
});

export const { saveUser } = authSlice.actions;
export default authSlice.reducer;
