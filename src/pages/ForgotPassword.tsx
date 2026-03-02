import React, { useState } from "react";
import { Mail, Loader2, ArrowLeft, Heart } from "lucide-react";
import authService from "../services/auth.service";

interface ForgotPasswordProps {
  onNavigate: (page: string) => void;
}

export const ForgotPassword: React.FC<ForgotPasswordProps> = ({ onNavigate }) => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setMessage("");

    const normalized = email.trim().toLowerCase();
    if (!normalized || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalized)) {
      setError("Please enter a valid email address.");
      return;
    }

    setLoading(true);
    try {
      const res = await authService.forgotPassword(normalized);
      setMessage(res.message);
    } catch (err: any) {
      setError(err.message || "Unable to process request right now.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-rose-50 to-pink-50">
      <div className="min-h-[80vh] flex items-center justify-center px-4 py-10">
        <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-7">
        <button
          type="button"
          onClick={() => onNavigate("login")}
          className="inline-flex items-center gap-2 text-sm text-rose-600 hover:text-rose-700 mb-4"
        >
          <ArrowLeft size={16} />
          Back to login
        </button>

        <div className="text-center mb-6">
          <Heart className="h-12 w-12 text-rose-600 fill-rose-600 mx-auto mb-3" />
          <h1 className="text-2xl font-bold text-gray-900">Forgot Password</h1>
        </div>

        <p className="text-sm text-gray-600 mt-2">
          Enter the email you provided during profile completion
        </p>

        <form onSubmit={onSubmit} className="mt-6 space-y-4">
          <div>
            <label className="block text-sm text-gray-700 mb-2">Registered Email</label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@example.com"
                className="w-full border border-gray-300 rounded-lg pl-10 pr-3 py-3 outline-none focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                disabled={loading}
                required
              />
            </div>
          </div>

          {message && (
            <p className="text-sm rounded-lg bg-green-50 border border-green-200 text-green-700 px-3 py-2">
              {message}
            </p>
          )}
          {error && (
            <p className="text-sm rounded-lg bg-rose-50 border border-rose-200 text-rose-700 px-3 py-2">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full inline-flex justify-center items-center gap-2 py-3 rounded-lg font-semibold bg-gradient-to-r from-rose-600 to-pink-600 text-white hover:shadow-lg transition-all disabled:opacity-60"
          >
            {loading ? <Loader2 size={18} className="animate-spin" /> : null}
            {loading ? "Sending..." : "Send Reset Link"}
          </button>
        </form>
      </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
