import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface PaginationState {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

interface AssignmentsState {
  list: any[];
  pagination: PaginationState;
  detail: any | null;
  loading: boolean;
  loadingMore: boolean;
  error: string | null;
}

const DEFAULT_IMAGE = "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=600&auto=format&fit=crop";

export const slugify = (text: string): string => {
  return String(text || "")
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");
};

export const isObjectId = (str?: string): boolean => {
  return Boolean(str && /^[0-9a-fA-F]{24}$/i.test(str.trim()));
};

export const extractCourseCode = (rawCode?: string, title?: string): string => {
  if (rawCode && !isObjectId(rawCode)) {
    return rawCode.trim();
  }
  if (title) {
    const match = title.match(/^([A-Za-z]{2,8}[-\s]?[0-9]{2,4}[A-Za-z]?)/);
    if (match && !isObjectId(match[1])) {
      return match[1].replace(/\s+/, "-").toUpperCase();
    }
    const colonMatch = title.split(":")[0]?.trim();
    if (colonMatch && !isObjectId(colonMatch) && colonMatch.length <= 12) {
      return colonMatch.toUpperCase();
    }
  }
  return "";
};

export const normalizeProduct = (item: any) => {
  if (!item) return null;
  const categoryName = 
    typeof item.category === "object" && item.category?.name
      ? item.category.name.toUpperCase()
      : typeof item.category === "string"
      ? item.category.toUpperCase()
      : item.program || "IGNOU";

  const title = item.title || "";
  const code = extractCourseCode(item.code, title);
  const id = String(item._id || item.id || "");

  return {
    id,
    _id: id,
    title,
    slug: item.slug || slugify(code || title || id),
    category: categoryName,
    price: Number(item.price || 0),
    oldPrice: item.oldPrice ? Number(item.oldPrice) : undefined,
    image: item.image || DEFAULT_IMAGE,
    rating: typeof item.rating === "number" ? item.rating : 5,
    reviews: typeof item.reviews === "number" ? item.reviews : 0,
    year: item.year || item.session || "2025-26",
    code,
    description: item.description || "",
    fileUrl: item.fileUrl || "",
    productType: item.productType || "assignment",
    inStock: item.inStock !== false,
    isFeatured: Boolean(item.isFeatured),
    semester: item.semester || "",
    program: item.program || categoryName,
  };
};

const initialState: AssignmentsState = {
  list: [],
  pagination: {
    total: 0,
    page: 1,
    limit: 12,
    totalPages: 1,
  },
  detail: null,
  loading: false,
  loadingMore: false,
  error: null,
};

const assignmentsSlice = createSlice({
  name: "assignments",
  initialState,
  reducers: {
    fetchAssignmentsRequest: (state, action: PayloadAction<any>) => {
      if (action.payload?.page && action.payload.page > 1) {
        state.loadingMore = true;
      } else {
        state.loading = true;
      }
      state.error = null;
    },
    fetchAssignmentsSuccess: (state, action: PayloadAction<any>) => {
      state.loading = false;
      state.loadingMore = false;
      let rawList: any[] = [];
      const requestedPage = action.payload?.requestedPage;
      let isAppend = Boolean(requestedPage && requestedPage > 1);

      if (Array.isArray(action.payload)) {
        rawList = action.payload;
        state.pagination = {
          total: rawList.length,
          page: requestedPage || 1,
          limit: 12,
          totalPages: 1,
        };
      } else if (action.payload && Array.isArray(action.payload.data)) {
        rawList = action.payload.data;
        if (action.payload.pagination) {
          state.pagination = action.payload.pagination;
          isAppend = action.payload.pagination.page > 1;
        } else {
          state.pagination = {
            total: rawList.length,
            page: requestedPage || 1,
            limit: 12,
            totalPages: Math.ceil(rawList.length / 12) || 1,
          };
        }
      } else if (action.payload && Array.isArray(action.payload.assignments)) {
        rawList = action.payload.assignments;
        if (action.payload.pagination) {
          state.pagination = action.payload.pagination;
          isAppend = action.payload.pagination.page > 1;
        } else {
          state.pagination = {
            total: rawList.length,
            page: requestedPage || 1,
            limit: 12,
            totalPages: 1,
          };
        }
      } else if (action.payload && Array.isArray(action.payload.products)) {
        rawList = action.payload.products;
        if (action.payload.pagination) {
          state.pagination = action.payload.pagination;
          isAppend = action.payload.pagination.page > 1;
        }
      } else if (action.payload && Array.isArray(action.payload.list)) {
        rawList = action.payload.list;
        if (action.payload.pagination) {
          state.pagination = action.payload.pagination;
          isAppend = action.payload.pagination.page > 1;
        }
      }

      const normalized = rawList.map(normalizeProduct).filter(Boolean);

      if (isAppend) {
        const existingIds = new Set(state.list.map((item: any) => item.id));
        const newItems = normalized.filter((item: any) => !existingIds.has(item.id));
        state.list = [...state.list, ...newItems];
      } else {
        state.list = normalized;
      }
    },
    fetchAssignmentsFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.loadingMore = false;
      state.error = action.payload;
    },
    fetchAssignmentDetailRequest: (state, action: PayloadAction<string>) => {
      state.loading = true;
      state.error = null;
    },
    fetchAssignmentDetailSuccess: (state, action: PayloadAction<any>) => {
      state.loading = false;
      let rawDetail = action.payload;
      if (action.payload?.data) rawDetail = action.payload.data;
      else if (action.payload?.assignment) rawDetail = action.payload.assignment;
      else if (action.payload?.product) rawDetail = action.payload.product;

      state.detail = normalizeProduct(rawDetail);
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
