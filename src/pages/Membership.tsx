
import React from 'react';
import { Check, Crown, Star, Zap, ArrowLeft } from 'lucide-react';
import { membershipPlans } from '../data/mockData';

interface MembershipProps {
  onNavigate: (page: string) => void;
}

export const Membership: React.FC<MembershipProps> = ({ onNavigate }) => {
  const handleSubscribe = (planId: string, price: number) => {
    if (price === 0) {
      // alert('You are already on the free plan!');
      return;
    }
    // alert(`Payment integration would open here for ₹${price}. UPI payment gateway would be integrated in production.`);
  };

  const getIcon = (tier: string) => {
    switch (tier) {
      case 'free': return null;
      case 'basic': return <Zap className="h-6 w-6" />;
      case 'premium': return <Star className="h-6 w-6 fill-current" />;
      case 'elite': return <Crown className="h-6 w-6 fill-current" />;
      default: return null;
    }
  };

  const getTierColor = (tier: string) => {
    switch (tier) {
      case 'free': return 'from-gray-500 to-gray-600';
      case 'basic': return 'from-blue-500 to-blue-600';
      case 'premium': return 'from-purple-500 to-purple-600';
      case 'elite': return 'from-amber-500 to-amber-600';
      default: return 'from-gray-500 to-gray-600';
    }
  };

  return (
    <div
      className="w-full min-h-screen"
      style={{
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%)',
      }}
    >
      {/* Back Button */}
      <div className="absolute top-8 left-8 z-10">
        <button
          onClick={() => onNavigate('dashboard')}
          className="flex items-center bg-white/20 backdrop-blur-sm text-white hover:bg-white/30 px-4 py-2 rounded-lg transition-all duration-300"
        >
          <ArrowLeft className="h-5 w-5 mr-2" />
          <span className="font-medium">Back to Dashboard</span>
        </button>
      </div>

      {/* Main Content */}
      <div className="flex items-center justify-center min-h-screen px-4">
        <div className="max-w-6xl w-full grid md:grid-cols-2 gap-12 items-center">
          {/* Left Side - Text Content */}
          <div className="text-white space-y-6">
            <div className="space-y-4">
              <h1 className="text-6xl md:text-7xl font-bold tracking-tight">
                COMING
                <br />
                <span className="bg-gradient-to-r from-pink-300 to-yellow-300 bg-clip-text text-transparent">
                  SOON!
                </span>
              </h1>
              <p className="text-xl md:text-2xl text-white/90 max-w-md">
                We are currently working hard on our premium membership plans
              </p>
              <p className="text-lg text-white/80">
                Exciting features and exclusive benefits will be available soon. Stay tuned!
              </p>
            </div>

            <button
              onClick={() => onNavigate('dashboard')}
              className="mt-8 bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white font-bold py-4 px-8 rounded-full text-lg shadow-2xl transform hover:scale-105 transition-all duration-300"
            >
              GO BACK HOME
            </button>
          </div>

          {/* Right Side - Illustration */}
          <div className="relative">
            <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 shadow-2xl border border-white/20">
              <div className="bg-gradient-to-br from-pink-400 to-rose-500 rounded-2xl p-12 flex flex-col items-center justify-center space-y-6">
                {/* Decorative Hearts */}
                <div className="relative">
                  <div className="absolute -top-4 -left-4 text-6xl animate-pulse">💕</div>
                  <div className="absolute -top-6 -right-6 text-4xl animate-pulse delay-75">💝</div>
                  <div className="absolute -bottom-4 left-8 text-5xl animate-pulse delay-150">💖</div>
                  
                  {/* Center Icon */}
                  <div className="bg-white rounded-full p-8 shadow-xl">
                    <Crown className="h-24 w-24 text-rose-500" />
                  </div>
                </div>

                {/* Features List */}
                <div className="w-full space-y-3 mt-6">
                  <div className="bg-white/20 backdrop-blur-sm rounded-lg p-3 flex items-center space-x-3">
                    <Star className="h-5 w-5 text-yellow-300 fill-current" />
                    <span className="text-white font-medium">Premium Matches</span>
                  </div>
                  <div className="bg-white/20 backdrop-blur-sm rounded-lg p-3 flex items-center space-x-3">
                    <Zap className="h-5 w-5 text-yellow-300 fill-current" />
                    <span className="text-white font-medium">Priority Support</span>
                  </div>
                  <div className="bg-white/20 backdrop-blur-sm rounded-lg p-3 flex items-center space-x-3">
                    <Check className="h-5 w-5 text-yellow-300" />
                    <span className="text-white font-medium">Verified Profiles</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Decorative Elements */}
            <div className="absolute -z-10 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-pink-500/30 rounded-full blur-3xl"></div>
          </div>
        </div>
      </div>
    </div>
  );
};
