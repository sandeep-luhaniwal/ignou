import { call, put, takeLatest } from "redux-saga/effects";
import { api } from "@/lib/api";
import {
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
} from "../slices/authSlice";
import { toast } from "react-hot-toast";

function* handleLogin(action: any): Generator<any, void, any> {
  try {
    const { email, password } = action.payload;
    const data = yield call(api.auth.login, email, password);
    // Since login now sends OTP, we don't dispatch loginSuccess yet
    // The UI will transition to the OTP verification screen
    toast.success(data.message || "OTP sent to email!");
  } catch (error: any) {
    const errorMsg = error.message || "Failed to login. Please try again.";
    yield put(loginFailure(errorMsg));
    toast.error(errorMsg);
  }
}

function* handleVerifyOtp(action: any): Generator<any, void, any> {
  try {
    const { email, otp } = action.payload;
    const data = yield call(api.auth.verifyOtp, email, otp);
    yield put(loginSuccess(data));
    toast.success("Logged in successfully!");
  } catch (error: any) {
    const errorMsg = error.message || "Invalid or expired OTP.";
    yield put(loginFailure(errorMsg));
    toast.error(errorMsg);
  }
}

function* handleRegister(action: any): Generator<any, void, any> {
  try {
    const data = yield call(api.auth.register, action.payload);
    yield put(registerSuccess(data));
    toast.success("Account registered successfully!");
  } catch (error: any) {
    const errorMsg = error.message || "Failed to register. Please try again.";
    yield put(registerFailure(errorMsg));
    toast.error(errorMsg);
  }
}

function* handleGetProfile(): Generator<any, void, any> {
  try {
    const data = yield call(api.auth.getProfile);
    yield put(getProfileSuccess(data));
  } catch (error: any) {
    const errorMsg = error.message || "Failed to load profile.";
    yield put(getProfileFailure(errorMsg));
    yield put(logout());
    toast.error(errorMsg);
  }
}

function* handleLogout(): Generator<any, void, any> {
  try {
    yield call(api.auth.logout);
    toast.success("Logged out successfully.");
  } catch (error) {
    console.error("Logout error in saga:", error);
  }
}

export default function* authSaga() {
  yield takeLatest(loginRequest.type, handleLogin);
  yield takeLatest(verifyOtpRequest.type, handleVerifyOtp);
  yield takeLatest(registerRequest.type, handleRegister);
  yield takeLatest(getProfileRequest.type, handleGetProfile);
  yield takeLatest(logout.type, handleLogout);
}
