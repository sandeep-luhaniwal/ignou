"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import StudentHero from "@/components/dashboard/StudentHero";
import AcademicDetails from "@/components/dashboard/AcademicDetails";
import CourseProgress from "@/components/dashboard/CourseProgress";
import WhatsAppSupport from "@/components/dashboard/WhatsAppSupport";
import DownloadCenter from "@/components/dashboard/DownloadCenter";
import PaymentHistory from "@/components/dashboard/PaymentHistory";
import QuickMetrics from "@/components/dashboard/QuickMetrics";
import { useAppDispatch, useAppSelector } from "@/store";
import { getProfileRequest, logout } from "@/store/slices/authSlice";
import { fetchOrdersRequest } from "@/store/slices/ordersSlice";

export default function DashboardPage() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [activeTab, setActiveTab] = useState<"downloads" | "payments">("downloads");

  const { user: authUser, loading: authLoading, error: authError } = useAppSelector((state) => state.auth);
  const { list: orders, loading: ordersLoading, error: ordersError } = useAppSelector((state) => state.orders);

  useEffect(() => {
    // Check auth status
    const isLoggedIn = localStorage.getItem("ignou_logged_in");
    if (!isLoggedIn) {
      router.push("/auth/sign-in?redirect=/dashboard");
      return;
    }

    dispatch(getProfileRequest());
    dispatch(fetchOrdersRequest());
  }, [router, dispatch]);

  useEffect(() => {
    if (authError || ordersError) {
      dispatch(logout());
      router.push("/auth/sign-in?redirect=/dashboard");
    }
  }, [authError, ordersError, dispatch, router]);

  const handleLogout = () => {
    dispatch(logout());
    router.push("/auth/sign-in");
  };

  const profile = authUser
    ? {
        name: authUser.name,
        email: authUser.email,
        enrolmentNo: authUser.enrolmentNo || "260984321",
        program: authUser.program || "BCA (Bachelor of Computer Applications)",
        session: authUser.session || "July 2025 Session",
      }
    : null;

  const purchasedAssignments = orders.flatMap((order: any) =>
    order.items.map((item: any) => ({
      id: item._id || item.code.toLowerCase(),
      code: item.code,
      title: item.title,
      purchaseDate: new Date(order.createdAt).toLocaleDateString("en-IN", {
        day: "2-digit",
        month: "long",
        year: "numeric",
      }),
    }))
  );

  const loading = authLoading || ordersLoading || !profile;

  if (loading || !profile) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#FAFBFD]">
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 border-4 border-orange border-t-transparent rounded-full animate-spin"></div>
          <span className="text-sm font-bold text-gray">Loading student portal...</span>
        </div>
      </div>
    );
  }

  return (
      <main className="flex-grow pt-24 pb-16 max-w-[1200px] mx-auto px-4 xl:px-0 w-full">
        
        {/* Hero Section Banner */}
        <StudentHero 
          name={profile.name} 
          enrolmentNo={profile.enrolmentNo} 
          onLogout={handleLogout} 
        />

        {/* Dashboard Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Student Profile Details & Progress */}
          <div className="lg:col-span-4 flex flex-col gap-6 w-full">
            <AcademicDetails 
              program={profile.program} 
              email={profile.email} 
              session={profile.session} 
            />
            <CourseProgress />
            <WhatsAppSupport />
          </div>

          {/* Right Column: Download Centre, Payment History & Recent Activities */}
          <div className="lg:col-span-8 flex flex-col gap-6 w-full">
            {/* Tab Selection */}
            <div className="flex gap-4 border-b border-gray-200 pb-1">
              <button
                type="button"
                onClick={() => setActiveTab("downloads")}
                className={`pb-2.5 px-2 text-sm font-bold transition-all relative cursor-pointer ${
                  activeTab === "downloads"
                    ? "text-orange font-black"
                    : "text-gray hover:text-main-black"
                }`}
              >
                Download Center
                {activeTab === "downloads" && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-orange rounded-full animate-pulse" />
                )}
              </button>
              <button
                type="button"
                onClick={() => setActiveTab("payments")}
                className={`pb-2.5 px-2 text-sm font-bold transition-all relative cursor-pointer ${
                  activeTab === "payments"
                    ? "text-orange font-black"
                    : "text-gray hover:text-main-black"
                }`}
              >
                Payment History
                {activeTab === "payments" && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-orange rounded-full animate-pulse" />
                )}
              </button>
            </div>

            {activeTab === "downloads" ? (
              <DownloadCenter purchasedAssignments={purchasedAssignments} />
            ) : (
              <PaymentHistory orders={orders} />
            )}
            
            <QuickMetrics />
          </div>

        </div>

      </main>
  );
}
