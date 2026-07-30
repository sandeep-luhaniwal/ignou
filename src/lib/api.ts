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
      year?: string[];
      minPrice?: string;
      maxPrice?: string;
      sortBy?: string;
    } = {}) => {
      const params = new URLSearchParams();
      if (filters.search) params.append("search", filters.search);
      if (filters.category && filters.category.length > 0) params.append("category", filters.category.join(","));
      if (filters.year && filters.year.length > 0) params.append("year", filters.year.join(","));
      if (filters.minPrice) params.append("minPrice", filters.minPrice);
      if (filters.maxPrice) params.append("maxPrice", filters.maxPrice);
      if (filters.sortBy) params.append("sortBy", filters.sortBy);

      const queryStr = params.toString() ? `?${params.toString()}` : "";
      const response = await fetch(`${API_BASE_URL}/assignments${queryStr}`, {
        method: "GET",
        headers: getHeaders(),
      });
      return await handleResponse(response);
    },

    get: async (id: string) => {
      const response = await fetch(`${API_BASE_URL}/assignments/${id}`, {
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

    list: async () => {
      const response = await fetch(`${API_BASE_URL}/orders`, {
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

  queries: {
    submit: async (queryData: {
      name: string;
      email: string;
      phone?: string;
      type: "contact" | "admission" | "project";
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
