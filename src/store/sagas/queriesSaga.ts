import { call, put, takeLatest } from "redux-saga/effects";
import { api } from "@/lib/api";
import {
  submitQueryRequest,
  submitQuerySuccess,
  submitQueryFailure,
} from "../slices/queriesSlice";
import { toast } from "react-hot-toast";

function* handleSubmitQuery(action: any): Generator<any, void, any> {
  try {
    yield call(api.queries.submit, action.payload);
    yield put(submitQuerySuccess());
    toast.success("Inquiry submitted successfully! We will connect soon.");
  } catch (error: any) {
    const errorMsg = error.message || "Failed to submit inquiry. Please try again.";
    yield put(submitQueryFailure(errorMsg));
    toast.error(errorMsg);
  }
}

export default function* queriesSaga() {
  yield takeLatest(submitQueryRequest.type, handleSubmitQuery);
}
