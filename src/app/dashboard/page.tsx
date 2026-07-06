"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import StudentHero from "@/components/dashboard/StudentHero";
import AcademicDetails from "@/components/dashboard/AcademicDetails";
import CourseProgress from "@/components/dashboard/CourseProgress";
import WhatsAppSupport from "@/components/dashboard/WhatsAppSupport";
import DownloadCenter from "@/components/dashboard/DownloadCenter";
import QuickMetrics from "@/components/dashboard/QuickMetrics";

interface UserProfile {
  name: string;
  email: string;
  enrolmentNo: string;
  program: string;
  session: string;
}

const mockProfile: UserProfile = {
  name: "Rahul Kumar",
  email: "rahul.kumar26@ignou.ac.in",
  enrolmentNo: "260984321",
  program: "BCA (Bachelor of Computer Applications)",
  session: "July 2025 Session",
};

const purchasedAssignments = [
  {
    id: "mcs-011-2025-26",
    code: "MCS-011",
    title: "Problem Solving and Programming (Solved Assignment)",
    purchaseDate: "05 July 2026",
  },
  {
    id: "bcs-012-2025-26",
    code: "BCS-012",
    title: "Basic Mathematics Solved Reference Guide",
    purchaseDate: "05 July 2026",
  },
];

export default function DashboardPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState<UserProfile>(mockProfile);

  useEffect(() => {
    // Check auth status
    const isLoggedIn = localStorage.getItem("ignou_logged_in");
    if (!isLoggedIn) {
      router.push("/auth/sign-in?redirect=/dashboard");
    } else {
      const email = localStorage.getItem("ignou_user_email");
      const name = localStorage.getItem("ignou_user_name");
      if (email || name) {
        setProfile({
          ...mockProfile,
          email: email || mockProfile.email,
          name: name || mockProfile.name,
        });
      }
      setLoading(false);
    }
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem("ignou_logged_in");
    localStorage.removeItem("ignou_user_email");
    localStorage.removeItem("ignou_user_name");
    router.push("/auth/sign-in");
  };

  if (loading) {
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

          {/* Right Column: Download Centre & Recent Activities */}
          <div className="lg:col-span-8 flex flex-col gap-6 w-full">
            <DownloadCenter purchasedAssignments={purchasedAssignments} />
            <QuickMetrics />
          </div>

        </div>

      </main>
  );
}
