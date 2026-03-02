import React, { useMemo, useState } from "react";
import { Eye, EyeOff, Lock, Loader2, ArrowLeft, Heart } from "lucide-react";
import authService from "../services/auth.service";

interface ResetPasswordProps {
  onNavigate: (page: string) => void;
}

export const ResetPassword: React.FC<ResetPasswordProps> = ({ onNavigate }) => {
  const token = useMemo(() => {
    const segments = window.location.pathname.split("/").filter(Boolean);
    return segments.length >= 2 ? segments[segments.length - 1] : "";
  }, []);

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const validate = () => {
    if (!token) return "Reset token is missing or invalid.";
    if (password.length < 8) return "Password must be at least 8 characters.";
    if (!/[A-Z]/.test(password) || !/[a-z]/.test(password) || !/\d/.test(password)) {
      return "Password must include uppercase, lowercase, and a number.";
    }
    if (password !== confirmPassword) return "Passwords do not match.";
    return "";
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("");
    setError("");

    const validationError = validate();
    if (validationError) {
      setError(validationError);
      return;
    }

    setLoading(true);
    try {
      const res = await authService.resetPassword(token, password, confirmPassword);
      setMessage(res.message || "Password reset successful. Redirecting to login...");
      setTimeout(() => onNavigate("login"), 1500);
    } catch (err: any) {
      setError(err.message || "Could not reset password.");
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
          <h1 className="text-2xl font-bold text-gray-900">Reset Password</h1>
        </div>
        <p className="text-sm text-gray-600 mt-2">Create a new secure password for your account</p>

        <form onSubmit={onSubmit} className="mt-6 space-y-4">
          <div>
            <label className="block text-sm text-gray-700 mb-2">New Password</label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full border border-gray-300 rounded-lg pl-10 pr-11 py-3 outline-none focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                placeholder="At least 8 characters"
                disabled={loading}
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          <div>
            <label className="block text-sm text-gray-700 mb-2">Confirm Password</label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <input
                type={showConfirmPassword ? "text" : "password"}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full border border-gray-300 rounded-lg pl-10 pr-11 py-3 outline-none focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                placeholder="Re-enter password"
                disabled={loading}
                required
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword((prev) => !prev)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
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
            {loading ? "Updating..." : "Reset Password"}
          </button>
        </form>
      </div>
      </div>
    </div>
  );
};

export default ResetPassword;
