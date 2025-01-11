import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface User {
  username: string;
  email: string;
  isConnected: boolean;
}

const initialState: User = {
  username: '',
  email: '',
  isConnected: false,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setCurrentUser: (state, action: PayloadAction<User>) => {
      state.username = action.payload.username;
      state.email = action.payload.email;
      state.isConnected = true;
    },
    logOutCurrentUser: (state) => {
      state.username = '';
      state.email = '';
      state.isConnected = false;
    },
  },
});

export const { setCurrentUser, logOutCurrentUser } = userSlice.actions;
export default userSlice.reducer;
