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
    const token = typeof window !== "undefined" ? (localStorage.getItem("ignou_token") || localStorage.getItem("ignou_logged_in")) : null;
    if (!token) {
      router.replace("/auth/sign-in?redirect=/dashboard");
      return;
    }

    dispatch(getProfileRequest());
    dispatch(fetchOrdersRequest());
  }, [router, dispatch]);

  useEffect(() => {
    if (authError || ordersError) {
      dispatch(logout());
      router.replace("/auth/sign-in?redirect=/dashboard");
    }
  }, [authError, ordersError, dispatch, router]);

  const handleLogout = () => {
    dispatch(logout());
    router.replace("/auth/sign-in");
  };

  const profile = authUser
    ? {
      name: authUser.name || "Sandeep Luhaniwal",
      email: authUser.email || "sandeep@gmail.com",
      phone: authUser.phone || authUser.mobile || "+91 98765 43210",
      enrolmentNo: authUser.enrolmentNo || "260984321",
      program: authUser.program || "BCA (Bachelor of Computer Applications)",
      session: authUser.session || "July 2025 Session",
      regionalCentre: authUser.regionalCentre || "RC Delhi-2 (Rajghat - 07)",
      studyCentre: authUser.studyCentre || "07107 - Shaheed Bhagat Singh College",
      medium: authUser.medium || "English",
      validity: authUser.validity || "Valid up to Dec 2028",
      semester: authUser.semester || "Semester 3 (2nd Year)",
      apaarId: authUser.apaarId || "7829-4102-9931",
    }
    : null;

  const purchasedAssignments = (orders || []).flatMap((order: any) =>
    (order.items || []).map((item: any) => {
      const orderDate = order.createdAt ? new Date(order.createdAt) : null;
      return {
        id: item._id || item.id || item.code?.toLowerCase(),
        itemId: item._id || item.id,
        orderId: order._id || order.id,
        code: item.code,
        title: item.title,
        price:
          item.price !== undefined && item.price !== null
            ? item.price
            : order.items?.length === 1
              ? order.grandTotal
              : undefined,
        fileUrl: item.fileUrl,
        paymentStatus: order.paymentStatus,
        deliveryType: item.deliveryType || order.deliveryType || "PDF",
        orderStatus: order.orderStatus || "Processing",
        shippingAddress: order.shippingAddress || order.address,
        trackingNumber: order.trackingNumber || order.trackingId,
        purchaseDate: orderDate
          ? orderDate.toLocaleDateString("en-IN", {
            day: "2-digit",
            month: "long",
            year: "numeric",
          })
          : "Recent",
        purchaseTime: orderDate
          ? orderDate.toLocaleTimeString("en-IN", {
            hour: "2-digit",
            minute: "2-digit",
            hour12: true,
          })
          : "",
      };
    })
  );

  const loading = authLoading || ordersLoading || !profile;

  if (loading || !profile) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-paper">
        <div className="flex flex-col items-center gap-3">
          <div className="size-9 rounded-full border-3 border-rose border-t-transparent animate-spin" />
          <span className="text-xs font-semibold tracking-wide text-ink/60">Loading student portal...</span>
        </div>
      </div>
    );
  }

  return (
    <main className="grow pt-6 sm:pt-8 pb-16 max-w-7xl mx-auto px-4 w-full">

      {/* Hero Section Banner */}
      <StudentHero
        name={profile.name}
        enrolmentNo={profile.enrolmentNo}
        onLogout={handleLogout}
      />

      {/* Dashboard Grid */}
      <div className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">

        {/* Left Column: Student Profile Details & Progress */}
        <div className="lg:col-span-4 flex flex-col gap-5 w-full">
          <AcademicDetails
            name={profile.name}
            program={profile.program}
            email={profile.email}
            phone={profile.phone}
            enrolmentNo={profile.enrolmentNo}
            session={profile.session}
            regionalCentre={profile.regionalCentre}
            studyCentre={profile.studyCentre}
            medium={profile.medium}
            validity={profile.validity}
            semester={profile.semester}
            apaarId={profile.apaarId}
          />
          <CourseProgress />
          <WhatsAppSupport />
        </div>

        {/* Right Column: Download Centre, Payment History & Recent Activities */}
        <div className="lg:col-span-8 flex flex-col gap-6 w-full">
          {/* Segmented Glass Tab Switcher */}
          <div className="flex items-center gap-1.5 p-1.5 rounded-xl bg-surface-strong ring-1 ring-border/80 shadow-xs backdrop-blur-xl w-full sm:w-fit">
            <button
              type="button"
              onClick={() => setActiveTab("downloads")}
              className={`flex-1 sm:flex-initial flex items-center justify-center gap-2 px-4 py-2 text-xs sm:text-sm font-bold transition-all rounded-lg cursor-pointer ${activeTab === "downloads"
                  ? "bg-linear-to-r from-rose to-azure text-white  scale-[1.01]"
                  : "text-ink/65 hover:text-foreground hover:bg-glass"
                }`}
            >
              <span>Download Center</span>
              <span
                className={`text-[10.5px] px-1.5 py-0.2 rounded-full font-bold ${activeTab === "downloads"
                    ? "bg-white/20 text-white"
                    : "bg-paper ring-1 ring-border text-ink/70"
                  }`}
              >
                {purchasedAssignments.length}
              </span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab("payments")}
              className={`flex-1 sm:flex-initial flex items-center justify-center gap-2 px-4 py-2 text-xs sm:text-sm font-bold transition-all rounded-lg cursor-pointer ${activeTab === "payments"
                  ? "bg-linear-to-r from-rose to-azure text-white  scale-[1.01]"
                  : "text-ink/65 hover:text-foreground hover:bg-glass"
                }`}
            >
              <span>Payment History</span>
              <span
                className={`text-[10.5px] px-1.5 py-0.2 rounded-full font-bold ${activeTab === "payments"
                    ? "bg-white/20 text-white"
                    : "bg-paper ring-1 ring-border text-ink/70"
                  }`}
              >
                {orders.length}
              </span>
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

