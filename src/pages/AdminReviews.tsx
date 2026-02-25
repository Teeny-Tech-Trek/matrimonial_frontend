import React, { useEffect, useState } from "react";
import { ArrowLeft, Clock3, MessageSquareText, Search, Star } from "lucide-react";
import adminService from "../services/admin.service";
import { useToast } from "../context/ToastContext";

interface AdminReviewsProps {
  onNavigate: (page: string) => void;
}

type ReviewStatus = "hold" | "approved" | "rejected";

const statusChip: Record<ReviewStatus, string> = {
  hold: "bg-amber-100 text-amber-700",
  approved: "bg-emerald-100 text-emerald-700",
  rejected: "bg-rose-100 text-rose-700",
};

const AdminReviews: React.FC<AdminReviewsProps> = ({ onNavigate }) => {
  const { showToast } = useToast();
  const [loading, setLoading] = useState(false);
  const [updatingId, setUpdatingId] = useState<string | null>(null);
  const [reviews, setReviews] = useState<any[]>([]);
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");

  const fetchReviews = async () => {
    try {
      setLoading(true);
      const response = await adminService.listReviews({ page, limit: 20, search, status });
      if (response.success) {
        setReviews(response.data || []);
        setPages(response.pages || 1);
      }
    } catch (error: any) {
      showToast(error.message, "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, [page, status]);

  const handleUpdateStatus = async (reviewId: string, nextStatus: ReviewStatus) => {
    try {
      setUpdatingId(reviewId);
      await adminService.updateReviewStatus(reviewId, nextStatus);
      showToast("Review status updated", "success");
      fetchReviews();
    } catch (error: any) {
      showToast(error.message, "error");
    } finally {
      setUpdatingId(null);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-white to-pink-50 p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
          <button
            onClick={() => onNavigate("admin")}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-rose-200 bg-white text-rose-700 hover:bg-rose-50 transition-colors"
          >
            <ArrowLeft size={16} />
            Back to Admin
          </button>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Manage Reviews</h1>
        </div>

        <div className="bg-white rounded-2xl border border-rose-100 shadow-sm p-4 md:p-5 mb-5">
          <div className="grid md:grid-cols-3 gap-3">
            <div className="relative">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search name/city/review"
                className="w-full pl-9 pr-3 py-2.5 rounded-lg border border-gray-200 focus:ring-2 focus:ring-rose-400 focus:border-transparent"
              />
            </div>
            <select
              value={status}
              onChange={(e) => {
                setStatus(e.target.value);
                setPage(1);
              }}
              className="w-full px-3 py-2.5 rounded-lg border border-gray-200 focus:ring-2 focus:ring-rose-400 focus:border-transparent"
            >
              <option value="">All Status</option>
              <option value="hold">Hold</option>
              <option value="approved">Approved</option>
              <option value="rejected">Rejected</option>
            </select>
            <button
              onClick={() => {
                setPage(1);
                fetchReviews();
              }}
              className="px-4 py-2.5 rounded-lg bg-gradient-to-r from-rose-600 to-pink-600 text-white font-semibold hover:shadow-md transition-all"
            >
              Apply Filter
            </button>
          </div>
        </div>

        {loading ? (
          <div className="bg-white rounded-2xl border border-rose-100 p-10 text-center text-gray-500">Loading reviews...</div>
        ) : reviews.length === 0 ? (
          <div className="bg-white rounded-2xl border border-rose-100 p-10 text-center text-gray-500">No reviews found.</div>
        ) : (
          <div className="space-y-4">
            {reviews.map((review) => (
              <div key={review._id} className="bg-white rounded-2xl border border-rose-100 shadow-sm p-4 md:p-5">
                <div className="flex flex-wrap items-start justify-between gap-3 mb-2">
                  <div>
                    <p className="text-lg font-bold text-gray-900">{review.name}</p>
                    <p className="text-sm text-gray-600">{review.city}</p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${statusChip[review.status] || statusChip.hold}`}>
                    {String(review.status || "hold").toUpperCase()}
                  </span>
                </div>

                <div className="flex items-center gap-1 mb-2">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} size={16} className={i < Number(review.rating || 0) ? "text-yellow-400 fill-yellow-400" : "text-gray-300"} />
                  ))}
                </div>

                <p className="text-gray-700 mb-3">{review.text}</p>

                <div className="flex flex-wrap items-center gap-2 text-xs text-gray-500 mb-3">
                  <span className="inline-flex items-center gap-1"><Clock3 size={13} /> {new Date(review.createdAt).toLocaleString()}</span>
                  <span className="inline-flex items-center gap-1"><MessageSquareText size={13} /> ID: {review._id}</span>
                </div>

                <div className="flex flex-wrap gap-2">
                  {(["hold", "approved", "rejected"] as ReviewStatus[]).map((next) => (
                    <button
                      key={next}
                      disabled={updatingId === review._id || review.status === next}
                      onClick={() => handleUpdateStatus(review._id, next)}
                      className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                        review.status === next
                          ? "bg-gray-100 text-gray-500 cursor-not-allowed"
                          : "bg-rose-50 text-rose-700 hover:bg-rose-100"
                      }`}
                    >
                      Mark {next}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="flex items-center justify-center gap-3 mt-6">
          <button
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1}
            className="px-4 py-2 rounded-lg border border-gray-200 bg-white disabled:opacity-50"
          >
            Previous
          </button>
          <span className="text-sm text-gray-600">Page {page} of {pages}</span>
          <button
            onClick={() => setPage((p) => Math.min(pages, p + 1))}
            disabled={page >= pages}
            className="px-4 py-2 rounded-lg border border-gray-200 bg-white disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminReviews;
