import {createSlice} from '@reduxjs/toolkit';
import {userDamiInitState} from '../../initState';

export const userDamiSlice = createSlice({
  name: 'userDami',
  initialState: userDamiInitState,
  reducers: {
    login: state => {
      state.isLogged = true;
    },
    logout: state => {
      state.isLogged = false;
    },
    register: state => {
      state.isRegistered = true;
    },
    unRegister: state => {
      state.isRegistered = false;
    },
    startFetching: state => {
      state.isFetching = true;
    },
    stopFetching: state => {
      state.isFetching = false;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const {
  login,
  logout,
  register,
  unRegister,
  startFetching,
  stopFetching,
  setError,
} = userDamiSlice.actions;

export default userDamiSlice.reducer;
