import React from 'react';
import { Heart, Shield, Users, Star, CheckCircle, TrendingUp } from 'lucide-react';

interface LandingProps {
  onNavigate: (page: string) => void;
}

export const Landing: React.FC<LandingProps> = ({ onNavigate }) => {
  return (
    <div className="space-y-20">
      <section className="text-center py-20">
        <h1 className="text-5xl md:text-6xl font-bold mb-6">
          <span className="bg-gradient-to-r from-rose-600 to-pink-600 bg-clip-text text-transparent">
            Find Your Perfect
          </span>
          <br />
          <span className="text-gray-900">Life Partner</span>
        </h1>
        <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
          Join India's most trusted matrimonial platform. Thousands of verified profiles waiting to connect with you.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={() => onNavigate('register')}
            className="px-8 py-4 bg-gradient-to-r from-rose-600 to-pink-600 text-white rounded-lg text-lg font-semibold hover:shadow-xl transition-all transform hover:scale-105"
          >
            Register Free
          </button>
          <button
            onClick={() => onNavigate('login')}
            className="px-8 py-4 bg-white text-rose-600 border-2 border-rose-600 rounded-lg text-lg font-semibold hover:bg-rose-50 transition-all"
          >
            Login
          </button>
        </div>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow text-center">
          <div className="w-16 h-16 bg-rose-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Shield className="h-8 w-8 text-rose-600" />
          </div>
          <h3 className="text-xl font-bold mb-3">Verified Profiles</h3>
          <p className="text-gray-600">
            All profiles undergo strict verification to ensure authenticity and safety.
          </p>
        </div>

        <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow text-center">
          <div className="w-16 h-16 bg-rose-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Users className="h-8 w-8 text-rose-600" />
          </div>
          <h3 className="text-xl font-bold mb-3">Lakhs of Members</h3>
          <p className="text-gray-600">
            Join millions of users who found their life partner through our platform.
          </p>
        </div>

        <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow text-center">
          <div className="w-16 h-16 bg-rose-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Heart className="h-8 w-8 text-rose-600 fill-rose-600" />
          </div>
          <h3 className="text-xl font-bold mb-3">Success Stories</h3>
          <p className="text-gray-600">
            Thousands of happy couples have found their soulmate here.
          </p>
        </div>
      </section>

      <section className="bg-white rounded-2xl shadow-xl p-12">
        <h2 className="text-3xl font-bold text-center mb-12">Why Choose AristoMatch?</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {[
            'Advanced search filters for precise matches',
            'Secure messaging and privacy controls',
            'Photo and video profiles',
            'Horoscope matching support',
            'Phone verification for all users',
            'Dedicated customer support',
            'Mobile-friendly platform',
            'Regular profile updates'
          ].map((feature, index) => (
            <div key={index} className="flex items-start space-x-3">
              <CheckCircle className="h-6 w-6 text-green-600 flex-shrink-0 mt-1" />
              <span className="text-gray-700">{feature}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="text-center">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-gradient-to-br from-rose-600 to-pink-600 text-white p-8 rounded-xl">
            <TrendingUp className="h-12 w-12 mx-auto mb-4" />
            <div className="text-4xl font-bold mb-2">5L+</div>
            <div className="text-rose-100">Active Users</div>
          </div>
          <div className="bg-gradient-to-br from-rose-600 to-pink-600 text-white p-8 rounded-xl">
            <Heart className="h-12 w-12 mx-auto mb-4 fill-white" />
            <div className="text-4xl font-bold mb-2">50K+</div>
            <div className="text-rose-100">Success Stories</div>
          </div>
          <div className="bg-gradient-to-br from-rose-600 to-pink-600 text-white p-8 rounded-xl">
            <Star className="h-12 w-12 mx-auto mb-4 fill-white" />
            <div className="text-4xl font-bold mb-2">4.8/5</div>
            <div className="text-rose-100">User Rating</div>
          </div>
        </div>
      </section>

      <section className="bg-gradient-to-r from-rose-600 to-pink-600 text-white rounded-2xl p-12 text-center">
        <h2 className="text-3xl font-bold mb-4">Ready to Start Your Journey?</h2>
        <p className="text-xl text-rose-100 mb-8">
          Register now and find your perfect match today!
        </p>
        <button
          onClick={() => onNavigate('register')}
          className="px-8 py-4 bg-white text-rose-600 rounded-lg text-lg font-semibold hover:shadow-xl transition-all transform hover:scale-105"
        >
          Get Started Free
        </button>
      </section>
    </div>
  );
};