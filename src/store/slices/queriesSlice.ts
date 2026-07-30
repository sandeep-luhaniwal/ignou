import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface QueriesState {
  loading: boolean;
  error: string | null;
  success: boolean;
}

const initialState: QueriesState = {
  loading: false,
  error: null,
  success: false,
};

const queriesSlice = createSlice({
  name: "queries",
  initialState,
  reducers: {
    submitQueryRequest: (state, action: PayloadAction<any>) => {
      state.loading = true;
      state.error = null;
      state.success = false;
    },
    submitQuerySuccess: (state) => {
      state.loading = false;
      state.success = true;
    },
    submitQueryFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
      state.success = false;
    },
    resetQueryState: (state) => {
      state.success = false;
      state.error = null;
      state.loading = false;
    },
  },
});

export const {
  submitQueryRequest,
  submitQuerySuccess,
  submitQueryFailure,
  resetQueryState,
} = queriesSlice.actions;

export default queriesSlice.reducer;
