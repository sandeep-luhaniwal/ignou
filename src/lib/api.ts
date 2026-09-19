const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

// Helper to get authorization headers
const getHeaders = (isJson = true) => {
  const headers: HeadersInit = {};
  if (isJson) {
    headers["Content-Type"] = "application/json";
  }

  if (typeof window !== "undefined") {
    const token = localStorage.getItem("ignou_token");
    if (token) {
      headers["Authorization"] = `Bearer ${token}`;
    }
  }

  return headers;
};

// Generic fetch response handler
const handleResponse = async (response: Response) => {
  const contentType = response.headers.get("content-type");
  let data;
  if (contentType && contentType.includes("application/json")) {
    data = await response.json();
  } else {
    data = await response.text();
  }

  if (!response.ok) {
    const errorMsg = data?.message || response.statusText || "Something went wrong";
    throw new Error(errorMsg);
  }

  return data;
};

export const api = {
  auth: {
    login: async (email: string, password: string) => {
      const response = await fetch(`${API_BASE_URL}/auth/login`, {
        method: "POST",
        headers: getHeaders(),
        body: JSON.stringify({ email, password }),
      });
      const data = await handleResponse(response);
      // Save info to local storage upon successful login
      if (typeof window !== "undefined") {
        localStorage.setItem("ignou_logged_in", "true");
        localStorage.setItem("ignou_token", data.token);
        localStorage.setItem("ignou_user_email", data.email);
        localStorage.setItem("ignou_user_name", data.name);
        if (data.enrolmentNo) localStorage.setItem("ignou_user_enrolment", data.enrolmentNo);
        if (data.program) localStorage.setItem("ignou_user_program", data.program);
        if (data.session) localStorage.setItem("ignou_user_session", data.session);
      }
      return data;
    },

    verifyOtp: async (email: string, otp: string) => {
      const response = await fetch(`${API_BASE_URL}/auth/verify-otp`, {
        method: "POST",
        headers: getHeaders(),
        body: JSON.stringify({ email, otp }),
      });
      const data = await handleResponse(response);
      // Save info to local storage upon successful OTP verification
      if (typeof window !== "undefined") {
        localStorage.setItem("ignou_logged_in", "true");
        localStorage.setItem("ignou_token", data.token);
        localStorage.setItem("ignou_user_email", data.email);
        localStorage.setItem("ignou_user_name", data.name);
        if (data.enrolmentNo) localStorage.setItem("ignou_user_enrolment", data.enrolmentNo);
        if (data.program) localStorage.setItem("ignou_user_program", data.program);
        if (data.session) localStorage.setItem("ignou_user_session", data.session);
      }
      return data;
    },

    verifySignupOtp: async (email: string, otp: string) => {
      const response = await fetch(`${API_BASE_URL}/auth/verify-signup-otp`, {
        method: "POST",
        headers: getHeaders(),
        body: JSON.stringify({ email, otp }),
      });
      const data = await handleResponse(response);
      // Save info to local storage upon successful OTP verification
      if (typeof window !== "undefined") {
        localStorage.setItem("ignou_logged_in", "true");
        localStorage.setItem("ignou_token", data.token);
        localStorage.setItem("ignou_user_email", data.email);
        localStorage.setItem("ignou_user_name", data.name);
        if (data.enrolmentNo) localStorage.setItem("ignou_user_enrolment", data.enrolmentNo);
        if (data.program) localStorage.setItem("ignou_user_program", data.program);
        if (data.session) localStorage.setItem("ignou_user_session", data.session);
      }
      return data;
    },

    forgotPassword: async (email: string) => {
      const response = await fetch(`${API_BASE_URL}/auth/forgot-password`, {
        method: "POST",
        headers: getHeaders(),
        body: JSON.stringify({ email }),
      });
      return await handleResponse(response);
    },

    resetPassword: async (resetData: any) => {
      const response = await fetch(`${API_BASE_URL}/auth/reset-password`, {
        method: "POST",
        headers: getHeaders(),
        body: JSON.stringify(resetData),
      });
      return await handleResponse(response);
    },

    register: async (userData: {
      name: string;
      email: string;
      password?: string;
      enrolmentNo?: string;
      program?: string;
      session?: string;
    }) => {
      const response = await fetch(`${API_BASE_URL}/auth/register`, {
        method: "POST",
        headers: getHeaders(),
        body: JSON.stringify(userData),
      });
      return await handleResponse(response);
    },

    getProfile: async () => {
      const response = await fetch(`${API_BASE_URL}/auth/profile`, {
        method: "GET",
        headers: getHeaders(),
      });
      return await handleResponse(response);
    },

    updateProfile: async (profileData: {
      name?: string;
      enrolmentNo?: string;
      program?: string;
      session?: string;
      password?: string;
    }) => {
      const response = await fetch(`${API_BASE_URL}/auth/profile`, {
        method: "PUT",
        headers: getHeaders(),
        body: JSON.stringify(profileData),
      });
      const data = await handleResponse(response);
      if (typeof window !== "undefined" && data) {
        localStorage.setItem("ignou_user_name", data.name);
        if (data.enrolmentNo) localStorage.setItem("ignou_user_enrolment", data.enrolmentNo);
        if (data.program) localStorage.setItem("ignou_user_program", data.program);
        if (data.session) localStorage.setItem("ignou_user_session", data.session);
        if (data.token) localStorage.setItem("ignou_token", data.token);
      }
      return data;
    },

    logout: () => {
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

  assignments: {
    list: async (filters: {
      search?: string;
      category?: string[];
      program?: string[];
      year?: string[];
      minPrice?: string;
      maxPrice?: string;
      sortBy?: string;
      page?: number;
      limit?: number;
    } = {}) => {
      const params = new URLSearchParams();
      if (filters.search) params.append("search", filters.search);
      
      if (filters.program && filters.program.length > 0) {
        params.append("program", filters.program.join(","));
      } else if (filters.category && filters.category.length > 0) {
        // Distinguish between program codes (e.g. BCA, BAG, BCOMG, MCA) and full category names
        const programs = filters.category.filter((c) => /^[A-Z0-9_-]{2,10}$/i.test(c.trim()) && !c.includes(" "));
        const categories = filters.category.filter((c) => !programs.includes(c));

        if (programs.length > 0) {
          params.append("program", programs.join(","));
        }
        if (categories.length > 0) {
          params.append("category", categories.join(","));
        }
      }

      if (filters.year && filters.year.length > 0) params.append("year", filters.year.join(","));
      if (filters.minPrice) params.append("minPrice", filters.minPrice);
      if (filters.maxPrice) params.append("maxPrice", filters.maxPrice);
      if (filters.sortBy) params.append("sortBy", filters.sortBy);
      if (filters.page) params.append("page", String(filters.page));
      if (filters.limit) params.append("limit", String(filters.limit));

      const queryStr = params.toString() ? `?${params.toString()}` : "";
      const response = await fetch(`${API_BASE_URL}/assignments${queryStr}`, {
        method: "GET",
        headers: getHeaders(),
      });
      return await handleResponse(response);
    },

    get: async (idOrSlug: string) => {
      // 1. Direct fetch if it's a valid 24-character ObjectId
      if (/^[0-9a-fA-F]{24}$/.test(idOrSlug)) {
        const response = await fetch(`${API_BASE_URL}/assignments/${idOrSlug}`, {
          method: "GET",
          headers: getHeaders(),
        });
        return await handleResponse(response);
      }

      // 2. If it's a slug, try searching by extracted course code or full search
      const parts = idOrSlug.split("-");
      const searchCode = parts.length > 1 ? `${parts[0]}-${parts[1]}` : parts[0];

      const toSlug = (text: string) =>
        String(text || "")
          .toLowerCase()
          .trim()
          .replace(/[^\w\s-]/g, "")
          .replace(/[\s_-]+/g, "-")
          .replace(/^-+|-+$/g, "");

      try {
        const searchRes = await fetch(`${API_BASE_URL}/assignments?search=${encodeURIComponent(searchCode)}`, {
          method: "GET",
          headers: getHeaders(),
        });
        if (searchRes.ok) {
          const listData = await handleResponse(searchRes);
          const items = Array.isArray(listData?.data) ? listData.data : Array.isArray(listData) ? listData : [];
          const matched =
            items.find(
              (item: any) =>
                toSlug(item.title) === idOrSlug ||
                toSlug(item.code) === idOrSlug ||
                item.code?.toLowerCase() === searchCode.toLowerCase()
            ) || items[0];

          if (matched) {
            return { data: matched };
          }
        }
      } catch (e) {
        // Continue to fallback
      }

      // 3. Fallback to list catalog
      const fallbackRes = await fetch(`${API_BASE_URL}/assignments?limit=100`, {
        method: "GET",
        headers: getHeaders(),
      });
      const fallbackData = await handleResponse(fallbackRes);
      const allItems = Array.isArray(fallbackData?.data) ? fallbackData.data : [];
      const anyMatched = allItems.find(
        (item: any) => toSlug(item.title) === idOrSlug || toSlug(item.code) === idOrSlug || item._id === idOrSlug
      );

      if (anyMatched) {
        return { data: anyMatched };
      }

      throw new Error("Assignment not found");
    },

    featured: async () => {
      const response = await fetch(`${API_BASE_URL}/assignments/featured`, {
        method: "GET",
        headers: getHeaders(),
      });
      return await handleResponse(response);
    },
  },

  categories: {
    choose: async () => {
      const response = await fetch(`${API_BASE_URL}/category/choosecategory`, {
        method: "GET",
        headers: getHeaders(),
      });
      return await handleResponse(response);
    },

    all: async () => {
      const response = await fetch(`${API_BASE_URL}/category/all`, {
        method: "GET",
        headers: getHeaders(),
      });
      return await handleResponse(response);
    },

    filters: async () => {
      const response = await fetch(`${API_BASE_URL}/category/filters`, {
        method: "GET",
        headers: getHeaders(),
      });
      return await handleResponse(response);
    },

    list: async (params: { page?: number; limit?: number; search?: string } = {}) => {
      const q = new URLSearchParams();
      if (params.page) q.append("page", String(params.page));
      if (params.limit) q.append("limit", String(params.limit));
      if (params.search) q.append("search", params.search);

      const queryStr = q.toString() ? `?${q.toString()}` : "";
      const response = await fetch(`${API_BASE_URL}/category${queryStr}`, {
        method: "GET",
        headers: getHeaders(),
      });
      return await handleResponse(response);
    },
  },

  orders: {
    create: async (orderData: {
      items: Array<{ id: string; code: string; price: number; quantity: number }>;
      deliveryType: "PDF" | "Handwritten";
      shippingAddress?: {
        name: string;
        phone: string;
        address: string;
        pincode: string;
      };
      subtotal: number;
      shippingFee: number;
      discount: number;
      grandTotal: number;
    }) => {
      const response = await fetch(`${API_BASE_URL}/orders`, {
        method: "POST",
        headers: getHeaders(),
        body: JSON.stringify(orderData),
      });
      return await handleResponse(response);
    },

    verify: async (paymentData: {
      razorpay_order_id: string;
      razorpay_payment_id: string;
      razorpay_signature: string;
    }) => {
      const response = await fetch(`${API_BASE_URL}/orders/verify`, {
        method: "POST",
        headers: getHeaders(),
        body: JSON.stringify(paymentData),
      });
      return await handleResponse(response);
    },

    list: async (params: { page?: number; limit?: number } = {}) => {
      const q = new URLSearchParams();
      if (params.page) q.append("page", String(params.page));
      if (params.limit) q.append("limit", String(params.limit));

      const queryStr = q.toString() ? `?${q.toString()}` : "";
      const response = await fetch(`${API_BASE_URL}/orders${queryStr}`, {
        method: "GET",
        headers: getHeaders(),
      });
      return await handleResponse(response);
    },

    get: async (id: string) => {
      const response = await fetch(`${API_BASE_URL}/orders/${id}`, {
        method: "GET",
        headers: getHeaders(),
      });
      return await handleResponse(response);
    },
  },

  comments: {
    list: async (productId: string, params: { page?: number; limit?: number } = {}) => {
      const q = new URLSearchParams();
      if (params.page) q.append("page", String(params.page));
      if (params.limit) q.append("limit", String(params.limit));

      const queryStr = q.toString() ? `?${q.toString()}` : "";
      const response = await fetch(`${API_BASE_URL}/comments/${productId}${queryStr}`, {
        method: "GET",
        headers: getHeaders(),
      });
      return await handleResponse(response);
    },

    create: async (productId: string, message: string) => {
      const response = await fetch(`${API_BASE_URL}/comments`, {
        method: "POST",
        headers: getHeaders(),
        body: JSON.stringify({ productId, message }),
      });
      return await handleResponse(response);
    },

    delete: async (id: string) => {
      const response = await fetch(`${API_BASE_URL}/comments/${id}`, {
        method: "DELETE",
        headers: getHeaders(),
      });
      return await handleResponse(response);
    },
  },

  queries: {
    submit: async (queryData: {
      name: string;
      email: string;
      phone?: string;
      type: "contact" | "admission" | "project" | "assignment" | "general";
      message: string;
    }) => {
      const response = await fetch(`${API_BASE_URL}/queries`, {
        method: "POST",
        headers: getHeaders(),
        body: JSON.stringify(queryData),
      });
      return await handleResponse(response);
    },
  },
};
