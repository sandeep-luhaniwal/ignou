import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface OrdersState {
  list: any[];
  loading: boolean;
  error: string | null;
  success: boolean;
}

const initialState: OrdersState = {
  list: [],
  loading: false,
  error: null,
  success: false,
};

const ordersSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {
    fetchOrdersRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchOrdersSuccess: (state, action: PayloadAction<any>) => {
      state.loading = false;
      if (Array.isArray(action.payload)) {
        state.list = action.payload;
      } else if (action.payload && Array.isArray(action.payload.orders)) {
        state.list = action.payload.orders;
      } else if (action.payload && Array.isArray(action.payload.data)) {
        state.list = action.payload.data;
      } else {
        state.list = [];
      }
    },
    fetchOrdersFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    createOrderRequest: (state, action: PayloadAction<any>) => {
      state.loading = true;
      state.error = null;
      state.success = false;
    },
    createOrderSuccess: (state) => {
      state.loading = false;
      state.success = true;
    },
    createOrderFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
      state.success = false;
    },
    resetOrderState: (state) => {
      state.success = false;
      state.error = null;
      state.loading = false;
    },
  },
});

export const {
  fetchOrdersRequest,
  fetchOrdersSuccess,
  fetchOrdersFailure,
  createOrderRequest,
  createOrderSuccess,
  createOrderFailure,
  resetOrderState,
} = ordersSlice.actions;

export default ordersSlice.reducer;
