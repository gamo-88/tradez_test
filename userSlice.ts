import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface User {
  id: string,
  username: string;
  email: string;
  password: string,
  phone: string,
  address: string,
  bio: string,
  isConnected: boolean;
}

const initialState: User = {
  id: '',
  username: '',
  email: '',
  password: '',
  phone: '',
  address: '',
  bio: '',
  isConnected: false,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setCurrentUser: (state, action: PayloadAction<User>) => {
      state.id = action.payload.id;
      state.username = action.payload.username;
      state.email = action.payload.email;
      state.password = action.payload.password;
      state.phone = action.payload.phone;
      state.bio = action.payload.bio;
      state.address = action.payload.address;
      state.isConnected = true;
    },
    logOutCurrentUser: (state) => {
      state.id = '';
      state.username = '';
      state.email = '';
      state.password = '';
      state.phone = '';
      state.address = '';
      state.bio = '';

      state.isConnected = false;
    },
  },
});

export const { setCurrentUser, logOutCurrentUser } = userSlice.actions;
export default userSlice.reducer;
