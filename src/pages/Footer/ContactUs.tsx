import React, { useEffect, useState } from 'react';
import { MapPin, Star, User } from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import profileService from "../../services/profile.service";
import reviewService from "../../services/review.service";

interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
}

interface ContactUsProps {
  onNavigate?: () => void;
}

const ContactUs: React.FC<ContactUsProps> = ({ onNavigate }) => {
  const { currentUser, isAuthenticated } = useAuth();
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null); // Add state for errors
  const [reviewSubmitting, setReviewSubmitting] = useState(false);
  const [reviewStatus, setReviewStatus] = useState("");
  const [reviewForm, setReviewForm] = useState({
    name: currentUser?.fullName || "",
    city: "",
    rating: 5,
    text: "",
  });

  useEffect(() => {
    const prefillFromProfile = async () => {
      try {
        const response = await profileService.getMyProfile();
        if (response?.success && response?.data) {
          const fullName = response.data.fullName || "";
          const city = response.data.familyDetails?.currentResidenceCity || "";
          setReviewForm((prev) => ({
            ...prev,
            name: prev.name || fullName,
            city: prev.city || city,
          }));
        }
      } catch {
      }
    };

    if (isAuthenticated) {
      prefillFromProfile();
    }
  }, [isAuthenticated]);

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }

    if (!formData.subject.trim()) {
      newErrors.subject = 'Subject is required';
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({
        ...prev,
        [name]: undefined
      }));
    }
    setSubmitError(null); // Clear error on change
  };

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  if (!validateForm()) {
    return;
  }

  setIsSubmitting(true);
  setSubmitError(null);

  try {
    const response = await fetch('https://api.rsaristomatch.com/backend/contact', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });

    const data = await response.json();

    if (response.ok && data.success) {
      setSubmitSuccess(true);
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: '',
      });

      setTimeout(() => {
        setSubmitSuccess(false);
      }, 5000);
    } else {
      // Handle backend errors gracefully
      setSubmitError(data.error || 'Failed to send message. Please try again.');
    }
  } catch (error) {
    // console.error('Error submitting contact form:', error);
     console.error(error);
    setSubmitError('Failed to send message. Please try again.');
  } finally {
    setIsSubmitting(false);
  }
};

  const handleReviewSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!reviewForm.name.trim() || !reviewForm.city.trim() || !reviewForm.text.trim()) {
      setReviewStatus("Please fill name, city and review.");
      return;
    }

    try {
      setReviewSubmitting(true);
      setReviewStatus("");
      await reviewService.submitReview({
        name: reviewForm.name.trim(),
        city: reviewForm.city.trim(),
        rating: reviewForm.rating,
        text: reviewForm.text.trim(),
      });
      setReviewStatus("Thanks. Your review was submitted successfully.");
      setReviewForm((prev) => ({ ...prev, text: "", rating: 5 }));
    } catch (error: any) {
      setReviewStatus(error?.response?.data?.error || "Failed to submit review. Please try again.");
    } finally {
      setReviewSubmitting(false);
    }
  };


  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Contact Us
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Have questions or concerns about RSAristoMatch? We're here to help. 
            Reach out to our team or contact our Grievance Officer for any complaints.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Contact Information */}
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-white rounded-lg shadow-md p-6 border-2 border-rose-200">
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-gradient-to-r from-rose-600 to-pink-600 rounded-lg flex items-center justify-center">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-1">Grievance Officer</h3>
                  <p className="text-rose-600 font-medium mb-2">Prof. R.S. Singla</p>
                  <p className="text-sm text-gray-600">
                    For complaints, disputes, or user concerns
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-gradient-to-r from-rose-600 to-pink-600 rounded-lg flex items-center justify-center">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-1">Email</h3>
                  <a href="mailto:rsaristomatch@gmail.com" className="text-rose-600 hover:text-pink-600 transition-colors">
                    rsaristomatch@gmail.com
                  </a>
                  <p className="text-sm text-gray-600 mt-2">
                    General inquiries and support
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-gradient-to-r from-rose-600 to-pink-600 rounded-lg flex items-center justify-center">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-1">Location</h3>
                  <p className="text-gray-600">Bathinda, Punjab</p>
                  <p className="text-gray-600">India</p>
                </div>
              </div>
            </div>

            <div className="bg-rose-50 rounded-lg p-6 border border-rose-200">
              <div className="flex items-start space-x-3">
                <svg className="w-5 h-5 text-rose-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-1">Response Time</h4>
                  <p className="text-sm text-gray-700">
                    We aim to respond to all inquiries within 24-48 hours during business days. 
                    Grievances will be addressed promptly as per applicable regulations.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-lg shadow-md p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Send us a Message</h2>
              
              {submitSuccess && (
                <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
                  <div className="flex items-start space-x-3">
                    <svg className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <p className="text-green-800 font-medium">
                      Thank you for contacting RSAristoMatch! We have received your message and will respond shortly.
                    </p>
                  </div>
                </div>
              )}

              {submitError && (
                <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                  <div className="flex items-start space-x-3">
                    <svg className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                    <p className="text-red-800 font-medium">
                      {submitError}
                    </p>
                  </div>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                      Your Name <span className="text-rose-600">*</span>
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 transition-colors ${
                        errors.name
                          ? 'border-red-500 focus:ring-red-500'
                          : 'border-gray-300 focus:ring-rose-600 focus:border-transparent'
                      }`}
                      placeholder="Enter your full name"
                    />
                    {errors.name && (
                      <p className="mt-1 text-sm text-red-600">{errors.name}</p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address <span className="text-rose-600">*</span>
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 transition-colors ${
                        errors.email
                          ? 'border-red-500 focus:ring-red-500'
                          : 'border-gray-300 focus:ring-rose-600 focus:border-transparent'
                      }`}
                      placeholder="your.email@example.com"
                    />
                    {errors.email && (
                      <p className="mt-1 text-sm text-red-600">{errors.email}</p>
                    )}
                  </div>
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                    Subject <span className="text-rose-600">*</span>
                  </label>
                  <select
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 transition-colors ${
                      errors.subject
                        ? 'border-red-500 focus:ring-red-500'
                        : 'border-gray-300 focus:ring-rose-600 focus:border-transparent'
                    }`}
                  >
                    <option value="">Select a subject</option>
                    <option value="General Inquiry">General Inquiry</option>
                    <option value="Account Support">Account Support</option>
                    <option value="Profile Verification">Profile Verification</option>
                    <option value="Payment Issue">Payment Issue</option>
                    <option value="Report Suspicious Activity">Report Suspicious Activity</option>
                    <option value="Grievance/Complaint">Grievance/Complaint</option>
                    <option value="Privacy Concern">Privacy Concern</option>
                    <option value="Technical Issue">Technical Issue</option>
                    <option value="Other">Other</option>
                  </select>
                  {errors.subject && (
                    <p className="mt-1 text-sm text-red-600">{errors.subject}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                    Message <span className="text-rose-600">*</span>
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={6}
                    className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 transition-colors resize-none ${
                      errors.message
                        ? 'border-red-500 focus:ring-red-500'
                        : 'border-gray-300 focus:ring-rose-600 focus:border-transparent'
                    }`}
                    placeholder="Please provide details about your inquiry or concern..."
                  />
                  {errors.message && (
                    <p className="mt-1 text-sm text-red-600">{errors.message}</p>
                  )}
                  <p className="mt-2 text-xs text-gray-500">
                    For grievances or complaints, please provide as much detail as possible including dates, profile IDs, and relevant information.
                  </p>
                </div>

                <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                  <p className="text-sm text-gray-700">
                    <strong>Note:</strong> By submitting this form, you acknowledge that you have read our{' '}
                    <span className="text-rose-600 cursor-pointer hover:underline">Privacy Policy</span> and{' '}
                    <span className="text-rose-600 cursor-pointer hover:underline">Terms of Use</span>.
                  </p>
                </div>

                <div>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-gradient-to-r from-rose-600 to-pink-600 text-white font-semibold py-3 px-6 rounded-lg hover:from-rose-700 hover:to-pink-700 focus:outline-none focus:ring-2 focus:ring-rose-600 focus:ring-offset-2 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <span className="flex items-center justify-center">
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Sending...
                      </span>
                    ) : (
                      'Send Message'
                    )}
                  </button>
                </div>
              </form>
            </div>

            {isAuthenticated && (
              <div className="relative rounded-3xl bg-gradient-to-br from-white via-rose-50/80 to-pink-100/70 border border-rose-100 shadow-xl overflow-hidden">
                <div className="absolute -top-20 -right-20 w-56 h-56 bg-rose-200/40 rounded-full blur-3xl"></div>
                <div className="absolute -bottom-20 -left-20 w-56 h-56 bg-pink-200/40 rounded-full blur-3xl"></div>

                <div className="relative p-6 md:p-8">
                  <p className="inline-flex items-center gap-2 text-xs md:text-sm font-semibold text-rose-700 bg-white/80 border border-rose-200 rounded-full px-3 py-1">
                    <Star size={14} className="fill-yellow-400 text-yellow-400" />
                    Community Feedback
                  </p>
                  <h2 className="mt-3 text-2xl md:text-3xl font-bold text-[#5c1a2d]">Leave a Review</h2>
                  <p className="mt-2 text-gray-600">
                    Share your experience with AristoMatch.
                  </p>

                  <form onSubmit={handleReviewSubmit} className="mt-6 space-y-5">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                          <User size={14} />
                          Name
                        </label>
                        <input
                          type="text"
                          value={reviewForm.name}
                          onChange={(e) => setReviewForm((prev) => ({ ...prev, name: e.target.value }))}
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
                          value={reviewForm.city}
                          onChange={(e) => setReviewForm((prev) => ({ ...prev, city: e.target.value }))}
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
                            onClick={() => setReviewForm((prev) => ({ ...prev, rating: star }))}
                            className={`text-4xl transition-all hover:scale-105 ${
                              star <= reviewForm.rating ? "text-yellow-400" : "text-gray-300"
                            }`}
                            aria-label={`Rate ${star}`}
                          >
                            ★
                          </button>
                        ))}
                      </div>
                      <p className="mt-2 text-sm font-medium text-gray-700">
                        Selected: {reviewForm.rating} {reviewForm.rating === 1 ? "star" : "stars"}
                      </p>
                    </div>

                    <div>
                      <label className="text-sm font-semibold text-gray-700 mb-2 block">Your Review</label>
                      <textarea
                        value={reviewForm.text}
                        onChange={(e) => setReviewForm((prev) => ({ ...prev, text: e.target.value }))}
                        className="w-full h-36 px-4 py-3 rounded-xl border border-rose-200 bg-white/90 resize-none focus:ring-2 focus:ring-rose-400 focus:border-transparent"
                        placeholder="Tell us about your experience..."
                        maxLength={600}
                      />
                    </div>

                    <div className="flex flex-wrap items-center gap-3">
                      <button
                        type="submit"
                        disabled={reviewSubmitting}
                        className="px-8 py-3 rounded-xl bg-gradient-to-r from-rose-600 to-pink-600 text-white font-semibold transition-all hover:scale-[1.02] hover:shadow-lg disabled:opacity-70"
                      >
                        {reviewSubmitting ? "Submitting..." : "Submit Review"}
                      </button>
                      {reviewStatus && <p className="text-sm text-rose-700">{reviewStatus}</p>}
                    </div>
                  </form>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
