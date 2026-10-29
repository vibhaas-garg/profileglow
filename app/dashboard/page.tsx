"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/lib/auth-context";
import { PhotoUploader } from "@/components/dashboard/PhotoUploader";
import { ProfileDetailsForm } from "@/components/dashboard/ProfileDetailsForm";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { DatingApp, GenderPreference, RelationshipGoal, ProfileReport } from "@/lib/types";
import { db } from "@/lib/firebase/client";
import { collection, query, getDocs, orderBy } from "firebase/firestore";
import { AlertCircle, Loader2, Folder, Check, ArrowRight } from "lucide-react";
import { trackEvent } from "@/lib/analytics";

function DashboardContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const isExplicitNew = searchParams.get("new") === "true" || searchParams.get("new") === "1";
  const { user, userName, signOut, loading: authLoading, getIdToken } = useAuth();

  // Redirect / checking state
  const [checkingExisting, setCheckingExisting] = useState(!isExplicitNew);

  // Form State
  const [app, setApp] = useState<DatingApp>("hinge");
  const [bio, setBio] = useState("");
  const [age, setAge] = useState<number>(24);
  const [location, setLocation] = useState("");
  const [genderPreference, setGenderPreference] = useState<GenderPreference>("women");
  const [relationshipGoal, setRelationshipGoal] = useState<RelationshipGoal>("long-term");
  const [photos, setPhotos] = useState<string[]>([]);

  // Execution State
  const [analyzing, setAnalyzing] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Past Reports
  const [pastReports, setPastReports] = useState<ProfileReport[]>([]);
  const [loadingReports, setLoadingReports] = useState(false);

  useEffect(() => {
    if (!authLoading && !user) {
      router.push("/login");
    }
  }, [user, authLoading, router]);

  // 1. Auto-check if user already has an existing report
  useEffect(() => {
    if (isExplicitNew) {
      setCheckingExisting(false);
      return;
    }

    // Check localStorage first for instant redirect
    if (typeof window !== "undefined") {
      const savedReport =
        (user ? localStorage.getItem(`profileglow_report_${user.uid}`) : null) ||
        localStorage.getItem("profileglow_latest_report");

      if (savedReport) {
        router.replace(`/report/${savedReport}`);
        return;
      }
    }

    // If logged in, also check backend for user's reports
    if (user) {
      const checkServer = async () => {
        try {
          const token = await getIdToken();
          const res = await fetch("/api/user/latest-report", {
            headers: token ? { Authorization: `Bearer ${token}` } : {},
          });
          if (res.ok) {
            const data = await res.json();
            if (data.reportId) {
              if (typeof window !== "undefined") {
                localStorage.setItem(`profileglow_report_${user.uid}`, data.reportId);
                localStorage.setItem("profileglow_latest_report", data.reportId);
              }
              router.replace(`/report/${data.reportId}`);
              return;
            }
          }
        } catch (err) {
          console.warn("Check latest report error:", err);
        } finally {
          setCheckingExisting(false);
        }
      };

      checkServer();
    } else if (!authLoading) {
      setCheckingExisting(false);
    }
  }, [user, authLoading, isExplicitNew, router, getIdToken]);

  // 2. Restore user draft if they navigated away while filling details
  useEffect(() => {
    if (typeof window !== "undefined") {
      try {
        const draft = localStorage.getItem("profileglow_form_draft");
        if (draft) {
          const parsed = JSON.parse(draft);
          if (parsed.app) setApp(parsed.app);
          if (parsed.bio) setBio(parsed.bio);
          if (parsed.age) setAge(parsed.age);
          if (parsed.location) setLocation(parsed.location);
          if (parsed.genderPreference) setGenderPreference(parsed.genderPreference);
          if (parsed.relationshipGoal) setRelationshipGoal(parsed.relationshipGoal);
        }
      } catch (e) {
        console.warn("Failed to restore draft:", e);
      }
    }
  }, []);

  // 3. Auto-save form draft so progress is never lost
  useEffect(() => {
    if (typeof window !== "undefined" && (bio || location)) {
      try {
        localStorage.setItem(
          "profileglow_form_draft",
          JSON.stringify({
            app,
            bio,
            age,
            location,
            genderPreference,
            relationshipGoal,
          })
        );
      } catch (e) {
        // ignore
      }
    }
  }, [app, bio, age, location, genderPreference, relationshipGoal]);

  // Fetch past reports list for display
  useEffect(() => {
    const fetchPastReports = async () => {
      if (!user || !db) return;
      setLoadingReports(true);
      try {
        const reportsRef = collection(db, `users/${user.uid}/reports`);
        const q = query(reportsRef, orderBy("createdAt", "desc"));
        const snapshot = await getDocs(q);
        const list: ProfileReport[] = [];
        snapshot.forEach((doc) => {
          list.push({ id: doc.id, ...doc.data() } as ProfileReport);
        });
        setPastReports(list);

        // If user already has reports and didn't explicitly request ?new=true, route to latest
        if (list.length > 0 && !isExplicitNew) {
          const latestId = list[0].id;
          if (typeof window !== "undefined") {
            localStorage.setItem("profileglow_latest_report", latestId);
            localStorage.setItem(`profileglow_report_${user.uid}`, latestId);
          }
          router.replace(`/report/${latestId}`);
        }
      } catch (err) {
        console.warn("Could not fetch past reports:", err);
      } finally {
        setLoadingReports(false);
      }
    };

    if (user) {
      fetchPastReports();
    }
  }, [user, isExplicitNew, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (photos.length === 0) {
      setErrorMessage("Please upload at least 1 photo before generating your report.");
      return;
    }

    if (!bio.trim() || bio.trim().length < 10) {
      setErrorMessage("Please enter your current bio or prompt text (min 10 characters).");
      return;
    }

    if (!location.trim()) {
      setErrorMessage("Please enter your city/location.");
      return;
    }

    setAnalyzing(true);
    trackEvent("profile_analysis_submitted", {
      app,
      photo_count: photos.length,
      age,
    });

    try {
      const token = await getIdToken();
      const payload = {
        app,
        bio,
        age,
        location,
        genderPreference,
        relationshipGoal,
        photoUrls: photos,
      };

      const res = await fetch("/api/analyze", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(errorData.error || `Analysis failed (${res.status})`);
      }

      const data = await res.json();

      // Save report id locally so future logins go straight to it
      if (typeof window !== "undefined") {
        localStorage.setItem("profileglow_latest_report", data.reportId);
        if (user) {
          localStorage.setItem(`profileglow_report_${user.uid}`, data.reportId);
        }
        localStorage.removeItem("profileglow_form_draft");
      }

      router.push(`/report/${data.reportId}`);
    } catch (err: any) {
      console.error(err);
      setErrorMessage(err.message || "An unexpected error occurred. Please try again.");
      setAnalyzing(false);
    }
  };

  if (authLoading || (checkingExisting && !isExplicitNew)) {
    return (
      <div className="min-h-screen bg-bg flex flex-col items-center justify-center p-4">
        <div className="card-brutal p-8 bg-card text-center space-y-4 max-w-sm">
          <div className="w-12 h-12 rounded-2xl bg-purple border-2 border-ink flex items-center justify-center mx-auto shadow-brutal-sm">
            <Loader2 className="w-6 h-6 text-white animate-spin" />
          </div>
          <h2 className="text-xl font-black text-ink">Retrieving Your Profile Report...</h2>
          <p className="text-xs font-medium text-muted">
            Loading your saved makeover audit so you don&apos;t have to re-enter details.
          </p>
          <button
            type="button"
            onClick={() => setCheckingExisting(false)}
            className="text-xs font-black text-purple hover:underline pt-2 cursor-pointer"
          >
            Or start a new profile analysis →
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-bg flex flex-col">
      {/* Top Bar */}
      <header className="border-b border-line bg-card">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="font-black text-xl tracking-tighter text-ink">
            Profile<span className="text-purple">Glow</span>
          </Link>
          <div className="flex items-center gap-3 sm:gap-4 text-xs font-bold">
            <span className="text-muted hidden sm:inline">
              Logged in as <span className="text-ink font-black">{userName}</span>
            </span>
            <Link href="/" className="pill-brutal bg-card text-ink hover:bg-bg text-xs py-1.5 px-3">
              Home
            </Link>
            <button
              onClick={() => signOut()}
              className="text-xs font-bold text-muted hover:text-ink cursor-pointer"
            >
              Log out
            </button>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-6xl mx-auto px-4 py-10 flex-1 w-full space-y-12">
        {/* Welcome Banner */}
        <div className="card-brutal p-8 bg-lime relative overflow-hidden">
          <div className="relative z-10 space-y-2">
            <Badge variant="white">PROFILE OPTIMIZATION DASHBOARD</Badge>
            <h1 className="text-3xl md:text-4xl font-black text-ink tracking-tight">
              Welcome{userName && userName !== "Member" ? `, ${userName.split(" ")[0]}` : ""}.
            </h1>
            <p className="text-sm md:text-base font-semibold text-ink/80 max-w-xl">
              Upload your photos, paste your bio, and get an evidence-based audit across 6 profile dimensions.
            </p>
          </div>
        </div>

        {/* Notice if creating a new audit */}
        {isExplicitNew && (
          <div className="p-4 bg-purple/10 border-2 border-purple rounded-xl flex items-center justify-between gap-4">
            <span className="text-xs font-bold text-ink">
              Creating a fresh profile makeover. Your past reports are saved below.
            </span>
            {pastReports.length > 0 && (
              <Link
                href={`/report/${pastReports[0].id}`}
                className="pill-brutal bg-purple text-white text-xs py-1 px-3 shrink-0 flex items-center gap-1"
              >
                <span>Latest Report</span>
                <ArrowRight className="w-3 h-3" />
              </Link>
            )}
          </div>
        )}

        {/* Profile Input Form Card */}
        <form onSubmit={handleSubmit} className="card-brutal p-6 md:p-10 bg-card space-y-8">
          {errorMessage && (
            <div className="p-4 bg-pink border-2 border-ink rounded-xl text-sm font-black text-ink shadow-brutal-sm flex items-center gap-2">
              <AlertCircle className="w-5 h-5 text-ink shrink-0" />
              <span>{errorMessage}</span>
            </div>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Left Column: Photo Uploads */}
            <div className="lg:col-span-5 border-b lg:border-b-0 lg:border-r border-line pb-8 lg:pb-0 lg:pr-8">
              <PhotoUploader photos={photos} onChange={setPhotos} />
            </div>

            {/* Right Column: Bio & Demographics */}
            <div className="lg:col-span-7">
              <ProfileDetailsForm
                app={app}
                setApp={setApp}
                bio={bio}
                setBio={setBio}
                age={age}
                setAge={setAge}
                location={location}
                setLocation={setLocation}
                genderPreference={genderPreference}
                setGenderPreference={setGenderPreference}
                relationshipGoal={relationshipGoal}
                setRelationshipGoal={setRelationshipGoal}
              />
            </div>
          </div>

          {/* Submit Action */}
          <div className="border-t border-line pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-xs font-bold text-muted flex items-center gap-1.5">
              <Check className="w-4 h-4 text-ink stroke-[3]" />
              <span>Free score and complete report delivered in ~10 seconds.</span>
            </div>

            <Button
              type="submit"
              variant="purple"
              size="lg"
              disabled={analyzing}
              className="w-full sm:w-auto px-8"
            >
              {analyzing ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin mr-2" />
                  Analyzing photos and bio...
                </>
              ) : (
                "Generate Makeover Report"
              )}
            </Button>
          </div>
        </form>

        {/* Past Reports List */}
        {pastReports.length > 0 && (
          <div className="space-y-4">
            <h2 className="text-2xl font-black text-ink tracking-tight flex items-center gap-2">
              <Folder className="w-6 h-6 text-ink stroke-[2.5]" />
              <span>Your Saved Reports ({pastReports.length})</span>
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {pastReports.map((report) => (
                <Link
                  key={report.id}
                  href={`/report/${report.id}`}
                  className="card-brutal-sm p-5 bg-card hover:-translate-y-1 hover:shadow-brutal transition-all block"
                >
                  <div className="flex justify-between items-start mb-2">
                    <Badge variant="purple">
                      {report.inputData.app.toUpperCase()}
                    </Badge>
                    <span className="font-black text-lg text-ink">
                      {report.overallScore}/10
                    </span>
                  </div>
                  <h3 className="font-black text-sm text-ink truncate mb-1">
                    {report.headlineVerdict || "Profile Makeover Report"}
                  </h3>
                  <div className="text-xs text-muted font-medium">
                    {new Date(report.createdAt).toLocaleDateString()} • {report.inputData.location}
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default function DashboardPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-bg flex items-center justify-center font-bold text-ink">
          Loading ProfileGlow...
        </div>
      }
    >
      <DashboardContent />
    </Suspense>
  );
}
