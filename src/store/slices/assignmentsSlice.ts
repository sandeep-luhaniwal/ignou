import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AssignmentsState {
  list: any[];
  detail: any | null;
  loading: boolean;
  error: string | null;
}

const initialState: AssignmentsState = {
  list: [],
  detail: null,
  loading: false,
  error: null,
};

const assignmentsSlice = createSlice({
  name: "assignments",
  initialState,
  reducers: {
    fetchAssignmentsRequest: (state, action: PayloadAction<any>) => {
      state.loading = true;
      state.error = null;
    },
    fetchAssignmentsSuccess: (state, action: PayloadAction<any[]>) => {
      state.loading = false;
      state.list = action.payload;
    },
    fetchAssignmentsFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    fetchAssignmentDetailRequest: (state, action: PayloadAction<string>) => {
      state.loading = true;
      state.error = null;
    },
    fetchAssignmentDetailSuccess: (state, action: PayloadAction<any>) => {
      state.loading = false;
      state.detail = action.payload;
    },
    fetchAssignmentDetailFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  fetchAssignmentsRequest,
  fetchAssignmentsSuccess,
  fetchAssignmentsFailure,
  fetchAssignmentDetailRequest,
  fetchAssignmentDetailSuccess,
  fetchAssignmentDetailFailure,
} = assignmentsSlice.actions;

export default assignmentsSlice.reducer;
