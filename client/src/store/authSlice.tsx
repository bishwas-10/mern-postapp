import { createSlice } from "@reduxjs/toolkit";

export interface SignResultProps {
  name: string;
  email: string;
  profilePicture: string;
  _id?: string;
}

export interface SignProps {
  currentUser: SignResultProps | null;
  loading: boolean;
  error: boolean;
}

const initialState: SignProps = {
  currentUser: null,
  loading: false,
  error: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    signInStart: (state) => {
      state.loading = true;
    },
    signInSuccess: (state, action) => {
      state.currentUser = action.payload;
      state.loading = false;
      state.error = false;
    },
    signInFailure: (state) => {
      state.currentUser= null;
      state.loading = false;
      state.error = true;
    },
    userUpdateStart: (state) => {
      state.loading = true;
    },
    userUpdateSuccess: (state, action) => {
      state.currentUser = action.payload;
      state.loading = false;
      state.error = false;
    },
    userUpdateFailure: (state) => {
      state.loading = false;
      state.error = true;
    },
    userDeleteStart: (state) => {
      state.loading = true;
    },
    userDeleteSuccess: (state ) => {
      state.currentUser = null;
      state.loading = false;
      state.error = false;
    },
    userDeleteFailure: (state) => {
      state.loading = false;
      state.error = true;
    },
    signOut: (state) => {
      state.currentUser = null;
      state.loading = false;
      state.error = false;
    },
  },
});

export const {
  signInStart,
  signInSuccess,
  signInFailure,
  userUpdateStart,
  userUpdateSuccess,
  userUpdateFailure,
  userDeleteStart,
  userDeleteSuccess,
  userDeleteFailure,
  
  signOut,
} = authSlice.actions;
export default authSlice.reducer;
