import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
  user: any;
  token: string | null;
  loading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  user: null,
  token: null,
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuth: (state, action: PayloadAction<{ token: string | null; user: any }>) => {
      state.token = action.payload.token;
      state.user = action.payload.user;
    },
    loginRequest: (state, action: PayloadAction<any>) => {
      state.loading = true;
      state.error = null;
    },
    loginSuccess: (state, action: PayloadAction<any>) => {
      state.loading = false;
      state.user = action.payload;
      state.token = action.payload.token;
    },
    loginFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    verifyOtpRequest: (state, action: PayloadAction<{ email: string; otp: string }>) => {
      state.loading = true;
      state.error = null;
    },
    registerRequest: (state, action: PayloadAction<any>) => {
      state.loading = true;
      state.error = null;
    },
    registerSuccess: (state, action: PayloadAction<any>) => {
      state.loading = false;
      state.user = action.payload;
      state.token = action.payload.token;
    },
    registerFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    getProfileRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    getProfileSuccess: (state, action: PayloadAction<any>) => {
      state.loading = false;
      state.user = action.payload;
    },
    getProfileFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.loading = false;
      state.error = null;
      if (typeof window !== "undefined") {
        localStorage.removeItem("ignou_logged_in");
        localStorage.removeItem("ignou_token");
        localStorage.removeItem("ignou_user_email");
        localStorage.removeItem("ignou_user_name");
        localStorage.removeItem("ignou_user_enrolment");
        localStorage.removeItem("ignou_user_program");
        localStorage.removeItem("ignou_user_session");
      }
    },
  },
});

export const {
  setAuth,
  loginRequest,
  loginSuccess,
  loginFailure,
  verifyOtpRequest,
  registerRequest,
  registerSuccess,
  registerFailure,
  getProfileRequest,
  getProfileSuccess,
  getProfileFailure,
  logout,
} = authSlice.actions;

export default authSlice.reducer;
