import { call, put, takeLatest } from "redux-saga/effects";
import { api } from "@/lib/api";
import {
  fetchAssignmentsRequest,
  fetchAssignmentsSuccess,
  fetchAssignmentsFailure,
  fetchAssignmentDetailRequest,
  fetchAssignmentDetailSuccess,
  fetchAssignmentDetailFailure,
} from "../slices/assignmentsSlice";
import { toast } from "react-hot-toast";

function* handleFetchAssignments(action: any): Generator<any, void, any> {
  try {
    const data = yield call(api.assignments.list, action.payload);
    yield put(
      fetchAssignmentsSuccess({
        ...data,
        requestedPage: action.payload?.page,
      })
    );
  } catch (error: any) {
    const errorMsg = error.message || "Failed to load solved assignments.";
    yield put(fetchAssignmentsFailure(errorMsg));
    toast.error(errorMsg);
  }
}

function* handleFetchAssignmentDetail(action: any): Generator<any, void, any> {
  try {
    const data = yield call(api.assignments.get, action.payload);
    yield put(fetchAssignmentDetailSuccess(data));
  } catch (error: any) {
    const errorMsg = error.message || "Failed to load assignment details.";
    yield put(fetchAssignmentDetailFailure(errorMsg));
    toast.error(errorMsg);
  }
}

export default function* assignmentsSaga() {
  yield takeLatest(fetchAssignmentsRequest.type, handleFetchAssignments);
  yield takeLatest(fetchAssignmentDetailRequest.type, handleFetchAssignmentDetail);
}
