import { call, put, takeLatest } from "redux-saga/effects";
import { api } from "@/lib/api";
import {
  fetchOrdersRequest,
  fetchOrdersSuccess,
  fetchOrdersFailure,
  createOrderRequest,
  createOrderSuccess,
  createOrderFailure,
} from "../slices/ordersSlice";
import { toast } from "react-hot-toast";

function* handleFetchOrders(): Generator<any, void, any> {
  try {
    const data = yield call(api.orders.list);
    yield put(fetchOrdersSuccess(data));
  } catch (error: any) {
    const errorMsg = error.message || "Failed to load order history.";
    yield put(fetchOrdersFailure(errorMsg));
    toast.error(errorMsg);
  }
}

function* handleCreateOrder(action: any): Generator<any, void, any> {
  try {
    yield call(api.orders.create, action.payload);
    yield put(createOrderSuccess());
    toast.success("Order placed successfully! Thank you.");
  } catch (error: any) {
    const errorMsg = error.message || "Failed to place order. Please try again.";
    yield put(createOrderFailure(errorMsg));
    toast.error(errorMsg);
  }
}

export default function* ordersSaga() {
  yield takeLatest(fetchOrdersRequest.type, handleFetchOrders);
  yield takeLatest(createOrderRequest.type, handleCreateOrder);
}
