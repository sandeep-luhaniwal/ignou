import { all } from "redux-saga/effects";
import authSaga from "./sagas/authSaga";
import assignmentsSaga from "./sagas/assignmentsSaga";
import ordersSaga from "./sagas/ordersSaga";
import queriesSaga from "./sagas/queriesSaga";

export default function* rootSaga() {
  yield all([
    authSaga(),
    assignmentsSaga(),
    ordersSaga(),
    queriesSaga(),
  ]);
}
