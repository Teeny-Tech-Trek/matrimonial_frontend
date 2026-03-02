import React, { useEffect, useMemo, useState } from "react";
import { ArrowLeft, MapPin, Star, User } from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import profileService from "../../services/profile.service";
import reviewService from "../../services/review.service";

interface LeaveReviewProps {
  onNavigate: (page: string) => void;
}

const LeaveReview: React.FC<LeaveReviewProps> = ({ onNavigate }) => {
  const { currentUser, isAuthenticated } = useAuth();
  const [submitting, setSubmitting] = useState(false);
  const [status, setStatus] = useState("");
  const [form, setForm] = useState({
    name: currentUser?.fullName || "",
    city: "",
    rating: 5,
    text: "",
  });

  const cardTitle = useMemo(() => {
    return isAuthenticated ? "Share Your Experience with AristoMatch" : "Leave Your Review";
  }, [isAuthenticated]);

  useEffect(() => {
    const prefillFromProfile = async () => {
      try {
        const response = await profileService.getMyProfile();
        if (response?.success && response?.data) {
          const fullName = response.data.fullName || "";
          const city = response.data.familyDetails?.currentResidenceCity || "";
          setForm((prev) => ({
            ...prev,
            name: prev.name || fullName,
            city: prev.city || city,
          }));
        }
      } catch {
        // Keep fallback values from auth/local state.
      }
    };

    if (isAuthenticated) {
      prefillFromProfile();
    }
  }, [isAuthenticated]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.city.trim() || !form.text.trim()) {
      setStatus("Please fill name, city and review.");
      return;
    }

    try {
      setSubmitting(true);
      setStatus("");
      await reviewService.submitReview({
        name: form.name.trim(),
        city: form.city.trim(),
        rating: form.rating,
        text: form.text.trim(),
      });
      setStatus("Thanks. Your review was submitted successfully.");
      setForm((prev) => ({ ...prev, text: "", rating: 5 }));
    } catch (error: any) {
      setStatus(error?.response?.data?.error || "Failed to submit review. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-[70vh] px-4 py-10 md:py-14">
      <div className="max-w-4xl mx-auto">
        <button
          onClick={() => onNavigate("landing")}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-rose-200 text-rose-700 font-medium hover:bg-rose-50 transition-colors"
        >
          <ArrowLeft size={16} />
          Back
        </button>

        <div className="relative mt-6 rounded-3xl bg-gradient-to-br from-white via-rose-50/80 to-pink-100/70 border border-rose-100 shadow-2xl overflow-hidden">
          <div className="absolute -top-20 -right-20 w-56 h-56 bg-rose-200/40 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-20 -left-20 w-56 h-56 bg-pink-200/40 rounded-full blur-3xl"></div>

          <div className="relative p-6 md:p-10">
            <p className="inline-flex items-center gap-2 text-xs md:text-sm font-semibold text-rose-700 bg-white/80 border border-rose-200 rounded-full px-3 py-1 animate-pulse">
              <Star size={14} className="fill-yellow-400 text-yellow-400" />
              Community Feedback
            </p>
            <h1 className="mt-3 text-3xl md:text-4xl font-bold text-[#5c1a2d]">{cardTitle}</h1>
            <p className="mt-2 text-gray-600 max-w-2xl">
              Your feedback helps other users and improves the experience for everyone.
            </p>

            <form onSubmit={handleSubmit} className="mt-8 space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                    <User size={14} />
                    Name
                  </label>
                  <input
                    type="text"
                    value={form.name}
                    onChange={(e) => setForm((prev) => ({ ...prev, name: e.target.value }))}
                    className="w-full px-4 py-3 rounded-xl border border-rose-200 bg-white/90 focus:ring-2 focus:ring-rose-400 focus:border-transparent"
                    placeholder="Enter your name"
                    maxLength={80}
                  />
                </div>
                <div>
                  <label className="text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                    <MapPin size={14} />
                    City
                  </label>
                  <input
                    type="text"
                    value={form.city}
                    onChange={(e) => setForm((prev) => ({ ...prev, city: e.target.value }))}
                    className="w-full px-4 py-3 rounded-xl border border-rose-200 bg-white/90 focus:ring-2 focus:ring-rose-400 focus:border-transparent"
                    placeholder="Enter your city"
                    maxLength={80}
                  />
                </div>
              </div>

              <div>
                <label className="text-sm font-semibold text-gray-700 mb-2 block">Rating</label>
                <div className="flex items-center gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setForm((prev) => ({ ...prev, rating: star }))}
                      className={`text-4xl transition-all hover:scale-105 ${
                        star <= form.rating ? "text-yellow-400" : "text-gray-300"
                      }`}
                      aria-label={`Rate ${star}`}
                    >
                      ★
                    </button>
                  ))}
                </div>
                <p className="mt-2 text-sm font-medium text-gray-700">
                  Selected: {form.rating} {form.rating === 1 ? "star" : "stars"}
                </p>
              </div>

              <div>
                <label className="text-sm font-semibold text-gray-700 mb-2 block">Your Review</label>
                <textarea
                  value={form.text}
                  onChange={(e) => setForm((prev) => ({ ...prev, text: e.target.value }))}
                  className="w-full h-36 px-4 py-3 rounded-xl border border-rose-200 bg-white/90 resize-none focus:ring-2 focus:ring-rose-400 focus:border-transparent"
                  placeholder="Tell us about your experience..."
                  maxLength={600}
                />
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <button
                  type="submit"
                  disabled={submitting}
                  className="px-8 py-3 rounded-xl bg-gradient-to-r from-rose-600 to-pink-600 text-white font-semibold transition-all hover:scale-[1.02] hover:shadow-lg disabled:opacity-70"
                >
                  {submitting ? "Submitting..." : "Submit Review"}
                </button>
                {status && <p className="text-sm text-rose-700">{status}</p>}
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeaveReview;
