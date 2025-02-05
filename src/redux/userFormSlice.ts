
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UserState {
  id: string;
  name: string;
  email: string;
  phone: string;
  city: string;
}

const initialState: UserState = {
  id: '',
  name: '',
  email: '',
  phone: '',
  city: '',
};

const userSlice = createSlice({
  name: 'userForm', 
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<UserState>) => {
      return { ...state, ...action.payload };
    },
    clearUser: () => initialState, 
  },
});

export const { setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;  
