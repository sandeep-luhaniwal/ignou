"use client";

import React, { useEffect } from "react";
import { Provider } from "react-redux";
import { store } from "./index";
import { setAuth, getProfileRequest } from "./slices/authSlice";

export function StoreProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("ignou_token");
      if (token) {
        // Pre-populate with local storage data so UI updates instantly
        const name = localStorage.getItem("ignou_user_name") || "";
        const email = localStorage.getItem("ignou_user_email") || "";
        const enrolmentNo = localStorage.getItem("ignou_user_enrolment") || "";
        const program = localStorage.getItem("ignou_user_program") || "";
        const session = localStorage.getItem("ignou_user_session") || "";

        store.dispatch(
          setAuth({
            token,
            user: {
              name,
              email,
              enrolmentNo,
              program,
              session,
            },
          })
        );
        // Fetch fresh profile from API
        store.dispatch(getProfileRequest());
      }
    }
  }, []);

  return <Provider store={store}>{children}</Provider>;
}
