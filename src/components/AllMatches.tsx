// src/components/AdvancedMatches.tsx
import React, { useState, useEffect } from 'react';
import { Heart, Eye, MessageCircle, Star, Sparkles, TrendingUp, MapPin, Briefcase, GraduationCap, Users, ChevronRight } from 'lucide-react';

interface Match {
  id: string;
  name: string;
  age: number;
  location: string;
  city: string;
  state: string;
  education: string;
  occupation: string;
  religion: string;
  caste: string;
  image: string;
  compatibility: number;
  height: string;
  maritalStatus: string;
  salary?: string;
}

interface AdvancedMatchesProps {
  onNavigate: (page: string, data?: any) => void;
}

interface PreferenceAnswers {
  religion: string;
  state: string;
  city: string;
}

export const AdvancedMatches: React.FC<AdvancedMatchesProps> = ({ onNavigate }) => {
  const [matches, setMatches] = useState<Match[]>([]);
  const [loading, setLoading] = useState(false);
  const [sortBy, setSortBy] = useState<'compatibility' | 'recent' | 'age'>('compatibility');
  
  // Preference Quiz States
  const [showPreferenceQuiz, setShowPreferenceQuiz] = useState(true);
  const [currentQuestion, setCurrentQuestion] = useState(1);
  const [preferences, setPreferences] = useState<PreferenceAnswers>({
    religion: '',
    state: '',
    city: ''
  });

  // Sample data - Replace with API calls
  const sampleMatches: Match[] = [
    {
      id: '1',
      name: 'Priya Sharma',
      age: 26,
      location: 'Mumbai, Maharashtra',
      city: 'Mumbai',
      state: 'Maharashtra',
      education: 'MBA',
      occupation: 'Marketing Manager',
      religion: 'Hindu',
      caste: 'Brahmin',
      image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400',
      compatibility: 94,
      height: '5\'5"',
      maritalStatus: 'Never Married',
      salary: '₹8-10 LPA'
    },
    {
      id: '2',
      name: 'Anjali Verma',
      age: 24,
      location: 'Delhi, NCR',
      city: 'Delhi',
      state: 'Delhi',
      education: 'B.Tech in CS',
      occupation: 'Software Engineer',
      religion: 'Hindu',
      caste: 'Rajput',
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400',
      compatibility: 92,
      height: '5\'4"',
      maritalStatus: 'Never Married',
      salary: '₹12-15 LPA'
    },
    {
      id: '3',
      name: 'Neha Patel',
      age: 27,
      location: 'Ahmedabad, Gujarat',
      city: 'Ahmedabad',
      state: 'Gujarat',
      education: 'CA',
      occupation: 'Chartered Accountant',
      religion: 'Hindu',
      caste: 'Patel',
      image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400',
      compatibility: 91,
      height: '5\'6"',
      maritalStatus: 'Never Married',
      salary: '₹15-20 LPA'
    },
    {
      id: '4',
      name: 'Kavya Reddy',
      age: 25,
      location: 'Hyderabad, Telangana',
      city: 'Hyderabad',
      state: 'Telangana',
      education: 'M.Sc',
      occupation: 'Research Scientist',
      religion: 'Hindu',
      caste: 'Reddy',
      image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400',
      compatibility: 89,
      height: '5\'5"',
      maritalStatus: 'Never Married',
      salary: '₹10-12 LPA'
    },
    {
      id: '5',
      name: 'Riya Malhotra',
      age: 23,
      location: 'Chandigarh, Punjab',
      city: 'Chandigarh',
      state: 'Punjab',
      education: 'BBA',
      occupation: 'Business Analyst',
      religion: 'Sikh',
      caste: 'Khatri',
      image: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=400',
      compatibility: 88,
      height: '5\'7"',
      maritalStatus: 'Never Married',
      salary: '₹6-8 LPA'
    },
    {
      id: '6',
      name: 'Divya Iyer',
      age: 26,
      location: 'Bangalore, Karnataka',
      city: 'Bangalore',
      state: 'Karnataka',
      education: 'B.Tech',
      occupation: 'Product Manager',
      religion: 'Hindu',
      caste: 'Iyer',
      image: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=400',
      compatibility: 90,
      height: '5\'4"',
      maritalStatus: 'Never Married',
      salary: '₹18-22 LPA'
    }
  ];

  // Using schema from QuickFilters component
  const states = [
    'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh',
    'Goa', 'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jharkhand', 'Karnataka',
    'Kerala', 'Madhya Pradesh', 'Maharashtra', 'Manipur', 'Meghalaya', 'Mizoram',
    'Nagaland', 'Odisha', 'Punjab', 'Rajasthan', 'Sikkim', 'Tamil Nadu',
    'Telangana', 'Tripura', 'Uttar Pradesh', 'Uttarakhand', 'West Bengal',
    'Delhi', 'Jammu and Kashmir', 'Ladakh'
  ];

  const cities: { [key: string]: string[] } = {
    'Maharashtra': ['Mumbai', 'Pune', 'Nagpur', 'Nashik', 'Aurangabad'],
    'Delhi': ['Delhi', 'New Delhi', 'Dwarka', 'Rohini'],
    'Karnataka': ['Bangalore', 'Mysore', 'Mangalore', 'Hubli'],
    'Gujarat': ['Ahmedabad', 'Surat', 'Vadodara', 'Rajkot'],
    'Tamil Nadu': ['Chennai', 'Coimbatore', 'Madurai', 'Trichy'],
    'Telangana': ['Hyderabad', 'Warangal', 'Nizamabad', 'Karimnagar'],
    'Rajasthan': ['Jaipur', 'Udaipur', 'Jodhpur', 'Kota'],
    'Punjab': ['Chandigarh', 'Ludhiana', 'Amritsar', 'Jalandhar'],
    'Uttar Pradesh': ['Lucknow', 'Kanpur', 'Agra', 'Varanasi'],
    'West Bengal': ['Kolkata', 'Howrah', 'Durgapur', 'Siliguri'],
    'Haryana': ['Gurgaon', 'Faridabad', 'Panipat', 'Ambala'],
    'Kerala': ['Thiruvananthapuram', 'Kochi', 'Kozhikode', 'Thrissur'],
    'Madhya Pradesh': ['Bhopal', 'Indore', 'Jabalpur', 'Gwalior'],
    'Andhra Pradesh': ['Visakhapatnam', 'Vijayawada', 'Guntur', 'Nellore'],
    'Bihar': ['Patna', 'Gaya', 'Bhagalpur', 'Muzaffarpur'],
    'Chhattisgarh': ['Raipur', 'Bhilai', 'Bilaspur', 'Korba'],
    'Goa': ['Panaji', 'Margao', 'Vasco da Gama', 'Mapusa'],
    'Himachal Pradesh': ['Shimla', 'Dharamshala', 'Kullu', 'Manali'],
    'Jharkhand': ['Ranchi', 'Jamshedpur', 'Dhanbad', 'Bokaro'],
    'Odisha': ['Bhubaneswar', 'Cuttack', 'Rourkela', 'Puri'],
    'Uttarakhand': ['Dehradun', 'Haridwar', 'Roorkee', 'Nainital'],
    'Jammu and Kashmir': ['Srinagar', 'Jammu', 'Anantnag', 'Baramulla']
  };

  const religions = ['Hindu', 'Muslim', 'Christian', 'Sikh', 'Buddhist', 'Jain', 'Other'];

  useEffect(() => {
    if (!showPreferenceQuiz) {
      fetchMatches();
    }
  }, [showPreferenceQuiz, preferences]);

  const fetchMatches = () => {
    setLoading(true);
    // Simulate API call - Filter based on preferences
    const filtered = sampleMatches.filter(match => {
      const matchesReligion = !preferences.religion || match.religion === preferences.religion;
      const matchesState = !preferences.state || match.state === preferences.state;
      const matchesCity = !preferences.city || match.city === preferences.city;
      return matchesReligion && matchesState && matchesCity;
    });
    
    setTimeout(() => {
      setMatches(filtered);
      setLoading(false);
    }, 500);
  };

  const handleNextQuestion = () => {
    if (currentQuestion < 3) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowPreferenceQuiz(false);
    }
  };

  const handleSkipQuiz = () => {
    setPreferences({ religion: '', state: '', city: '' });
    setShowPreferenceQuiz(false);
  };

  const handleSendInterest = (matchId: string) => {
    console.log('Interest sent to:', matchId);
  };

  const handleMessage = (matchId: string) => {
    onNavigate('messages', { profileId: matchId });
  };

  const handleViewProfile = (matchId: string) => {
    onNavigate('profile-view', { profileId: matchId });
  };

  // Sort matches
  const sortedMatches = [...matches].sort((a, b) => {
    if (sortBy === 'compatibility') return b.compatibility - a.compatibility;
    if (sortBy === 'age') return a.age - b.age;
    return 0;
  });

  const stats = {
    total: sortedMatches.length,
    premium: Math.floor(sortedMatches.length * 0.6),
    highMatch: sortedMatches.filter(m => m.compatibility >= 90).length,
    newToday: Math.floor(sortedMatches.length * 0.3)
  };

  // Preference Quiz Modal
  if (showPreferenceQuiz) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-rose-50 via-pink-50 to-purple-50 flex items-center justify-center p-6">
        <div className="max-w-2xl w-full">
          {/* Progress Bar */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-600">Question {currentQuestion} of 3</span>
              <button
                onClick={handleSkipQuiz}
                className="text-sm text-gray-500 hover:text-rose-600 transition-colors"
              >
                Skip & Show All
              </button>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-gradient-to-r from-rose-600 to-pink-600 h-2 rounded-full transition-all duration-500"
                style={{ width: `${(currentQuestion / 3) * 100}%` }}
              ></div>
            </div>
          </div>

          {/* Question Card */}
          <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12">
            <div className="text-center mb-8">
              <div className="w-20 h-20 bg-gradient-to-r from-rose-600 to-pink-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="h-10 w-10 text-white fill-white" />
              </div>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">Find Your Perfect Match</h2>
              <p className="text-gray-600">Help us personalize your matches by answering a few quick questions</p>
            </div>

            {/* Question 1: Religion */}
            {currentQuestion === 1 && (
              <div className="space-y-6">
                <div className="text-center">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">What's your preferred religion?</h3>
                  <p className="text-gray-600">We'll show you matches based on your preference</p>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mt-8">
                  {religions.map((religion) => (
                    <button
                      key={religion}
                      onClick={() => {
                        setPreferences({ ...preferences, religion });
                        handleNextQuestion();
                      }}
                      className="p-4 border-2 border-gray-200 rounded-xl hover:border-rose-500 hover:bg-rose-50 transition-all text-center font-medium text-gray-700 hover:text-rose-600"
                    >
                      {religion}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Question 2: State */}
            {currentQuestion === 2 && (
              <div className="space-y-6">
                <div className="text-center">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">Which state do you prefer?</h3>
                  <p className="text-gray-600">Select the state where you'd like to find matches</p>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mt-8 max-h-96 overflow-y-auto">
                  {states.map((state) => (
                    <button
                      key={state}
                      onClick={() => {
                        setPreferences({ ...preferences, state });
                        handleNextQuestion();
                      }}
                      className="p-4 border-2 border-gray-200 rounded-xl hover:border-rose-500 hover:bg-rose-50 transition-all text-center font-medium text-gray-700 hover:text-rose-600"
                    >
                      {state}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Question 3: City */}
            {currentQuestion === 3 && (
              <div className="space-y-6">
                <div className="text-center">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">Which city do you prefer?</h3>
                  <p className="text-gray-600">
                    {preferences.state ? `Select a city in ${preferences.state}` : 'Select your preferred city'}
                  </p>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mt-8 max-h-96 overflow-y-auto">
                  {preferences.state && cities[preferences.state] ? (
                    cities[preferences.state].map((city) => (
                      <button
                        key={city}
                        onClick={() => {
                          setPreferences({ ...preferences, city });
                          handleNextQuestion();
                        }}
                        className="p-4 border-2 border-gray-200 rounded-xl hover:border-rose-500 hover:bg-rose-50 transition-all text-center font-medium text-gray-700 hover:text-rose-600"
                      >
                        {city}
                      </button>
                    ))
                  ) : (
                    <div className="col-span-full text-center py-8">
                      <p className="text-gray-500">Please select a state first</p>
                      <button
                        onClick={() => setCurrentQuestion(2)}
                        className="mt-4 px-6 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-all"
                      >
                        Go Back
                      </button>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="flex items-center justify-between mt-8 pt-6 border-t border-gray-200">
              <button
                onClick={() => currentQuestion > 1 && setCurrentQuestion(currentQuestion - 1)}
                className={`px-6 py-3 rounded-xl font-medium transition-all ${
                  currentQuestion > 1
                    ? 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    : 'bg-gray-50 text-gray-400 cursor-not-allowed'
                }`}
                disabled={currentQuestion === 1}
              >
                Back
              </button>
              
              <div className="flex gap-2">
                <button
                  onClick={handleSkipQuiz}
                  className="px-6 py-3 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition-all font-medium"
                >
                  Skip All
                </button>
              </div>
            </div>
          </div>

          {/* Selected Preferences Display */}
          {(preferences.religion || preferences.state || preferences.city) && (
            <div className="mt-6 bg-white rounded-2xl shadow-lg p-6">
              <h4 className="font-semibold text-gray-900 mb-3">Your Preferences:</h4>
              <div className="flex flex-wrap gap-2">
                {preferences.religion && (
                  <span className="px-4 py-2 bg-rose-100 text-rose-700 rounded-full text-sm font-medium">
                    Religion: {preferences.religion}
                  </span>
                )}
                {preferences.state && (
                  <span className="px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
                    State: {preferences.state}
                  </span>
                )}
                {preferences.city && (
                  <span className="px-4 py-2 bg-green-100 text-green-700 rounded-full text-sm font-medium">
                    City: {preferences.city}
                  </span>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  // Main Matches View
  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-pink-50 to-purple-50 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Hero Header with Preferences */}
        <div className="relative overflow-hidden bg-gradient-to-r from-rose-600 to-pink-600 rounded-3xl p-8 text-white shadow-2xl">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2"></div>
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/10 rounded-full translate-y-1/2 -translate-x-1/2"></div>
          
          <div className="relative z-10">
            <div className="flex items-center justify-between flex-wrap gap-4 mb-4">
              <div className="flex items-center gap-3">
                <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center">
                  <Heart className="h-8 w-8 fill-white" />
                </div>
                <div>
                  <h1 className="text-4xl font-bold mb-1">Your Perfect Matches</h1>
                  <p className="text-rose-100 text-lg">Personalized just for you</p>
                </div>
              </div>
              
              <button
                onClick={() => {
                  setShowPreferenceQuiz(true);
                  setCurrentQuestion(1);
                }}
                className="px-6 py-3 bg-white/20 backdrop-blur-sm rounded-xl hover:bg-white/30 transition-all font-semibold flex items-center gap-2"
              >
                Change Preferences
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>
            
            <div className="flex items-center gap-3 flex-wrap">
              {preferences.religion && (
                <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full">
                  <span className="font-semibold">Religion: {preferences.religion}</span>
                </div>
              )}
              {preferences.state && (
                <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full">
                  <span className="font-semibold">State: {preferences.state}</span>
                </div>
              )}
              {preferences.city && (
                <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full">
                  <span className="font-semibold">City: {preferences.city}</span>
                </div>
              )}
              {stats.highMatch > 0 && (
                <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full">
                  <Sparkles className="h-5 w-5" />
                  <span className="font-semibold">{stats.highMatch} High Compatibility</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                <Users className="h-6 w-6 text-purple-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Total Matches</p>
                <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center">
                <Star className="h-6 w-6 text-amber-600 fill-amber-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Premium</p>
                <p className="text-2xl font-bold text-gray-900">{stats.premium}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                <Heart className="h-6 w-6 text-green-600 fill-green-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">90%+ Match</p>
                <p className="text-2xl font-bold text-gray-900">{stats.highMatch}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                <Sparkles className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">New Today</p>
                <p className="text-2xl font-bold text-gray-900">{stats.newToday}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Sort and Results Bar */}
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <p className="text-gray-600 font-medium">
              Showing <span className="text-rose-600 font-bold">{sortedMatches.length}</span> personalized matches
            </p>

            <div className="flex gap-2">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-rose-500 focus:outline-none transition-colors bg-white font-medium text-gray-700"
              >
                <option value="compatibility">Best Match</option>
                <option value="recent">Recently Joined</option>
                <option value="age">Age</option>
              </select>
            </div>
          </div>
        </div>

        {/* Matches Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sortedMatches.length === 0 ? (
            <div className="col-span-full text-center py-12 bg-white rounded-2xl shadow-lg">
              <Users className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No matches found</h3>
              <p className="text-gray-600 mb-4">
                Try changing your preferences to see more matches
              </p>
              <button
                onClick={() => {
                  setShowPreferenceQuiz(true);
                  setCurrentQuestion(1);
                }}
                className="px-6 py-3 bg-gradient-to-r from-rose-600 to-pink-600 text-white rounded-lg hover:shadow-lg transition-all font-medium"
              >
                Change Preferences
              </button>
            </div>
          ) : (
            sortedMatches.map((match, index) => (
              <div
                key={match.id}
                className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all overflow-hidden"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {/* Image Header */}
                <div className="relative h-56 overflow-hidden">
                  <img
                    src={match.image}
                    alt={match.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                  
                  {/* Compatibility Badge */}
                  <div className="absolute top-4 left-4">
                    <div className="bg-white/95 backdrop-blur-sm text-gray-900 text-sm font-bold px-3 py-2 rounded-full shadow-lg flex items-center gap-1">
                      <Heart className="h-4 w-4 text-rose-600 fill-rose-600" />
                      {match.compatibility}% Match
                    </div>
                  </div>

                  {/* Premium Badge */}
                  {match.compatibility >= 90 && (
                    <div className="absolute top-4 right-4">
                      <div className="bg-gradient-to-r from-amber-500 to-orange-500 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg flex items-center gap-1">
                        <Star className="h-3 w-3 fill-white" />
                        Top Match
                      </div>
                    </div>
                  )}
                  
                  {/* Name and Age */}
                  <div className="absolute bottom-4 left-4 right-4">
                    <h3 className="text-xl font-bold text-white mb-1">{match.name}, {match.age}</h3>
                    <p className="text-white/90 text-sm flex items-center gap-1">
                      <MapPin className="h-4 w-4" />
                      {match.city}, {match.state}
                    </p>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  {/* Info Grid */}
                  <div className="space-y-3 mb-4">
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                        <GraduationCap className="h-4 w-4 text-blue-600" />
                      </div>
                      <div className="flex-1">
                        <p className="font-medium text-gray-900">{match.education}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                        <Briefcase className="h-4 w-4 text-purple-600" />
                      </div>
                      <div className="flex-1">
                        <p className="font-medium text-gray-900">{match.occupation}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 text-sm">
                      <div className="flex-1 bg-gray-50 rounded-lg px-3 py-2">
                        <p className="text-xs text-gray-500">Height</p>
                        <p className="font-medium text-gray-900">{match.height}</p>
                      </div>
                      <div className="flex-1 bg-gray-50 rounded-lg px-3 py-2">
                        <p className="text-xs text-gray-500">Religion</p>
                        <p className="font-medium text-gray-900">{match.religion}</p>
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleViewProfile(match.id)}
                      className="flex-1 py-3 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition-all font-medium flex items-center justify-center gap-2"
                    >
                      <Eye className="h-4 w-4" />
                      View
                    </button>
                    <button
                      onClick={() => handleSendInterest(match.id)}
                      className="flex-1 py-3 bg-gradient-to-r from-rose-600 to-pink-600 text-white rounded-xl hover:shadow-lg transition-all font-medium flex items-center justify-center gap-2"
                    >
                      <Heart className="h-4 w-4" />
                      Interest
                    </button>
                    <button
                      onClick={() => handleMessage(match.id)}
                      className="py-3 px-4 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-all"
                    >
                      <MessageCircle className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Load More */}
        {sortedMatches.length > 0 && (
          <div className="text-center">
            <button className="px-8 py-4 bg-white text-gray-700 rounded-xl hover:shadow-lg transition-all font-semibold border-2 border-gray-200 hover:border-rose-600">
              Load More Matches
            </button>
          </div>
        )}
      </div>
    </div>
  );
};