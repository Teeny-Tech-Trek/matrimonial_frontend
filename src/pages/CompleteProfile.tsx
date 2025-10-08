import React, { useState } from 'react';
import { User, Heart, Briefcase, GraduationCap, Home, Activity } from 'lucide-react';

export default function CompleteProfile({onNavigate}) {
  const [formData, setFormData] = useState({
    // Basic Information
    name: '',
    age: '',
    height: '',
    maritalStatus: '',
    language: '',
    createdFor: '',
    
    // Religious Background
    religion: '',
    caste: '',
    subCaste: '',
    manglik: '',
    
    // Education
    degree: '',
    field: '',
    institution: '',
    
    // Professional Details
    occupation: '',
    company: '',
    annualIncome: '',
    
    // Family Details
    location: '',
    familyType: '',
    fatherName: '',
    fatherOccupation: '',
    motherName: '',
    motherOccupation: '',
    brothers: '',
    sisters: '',
    
    // Lifestyle
    diet: '',
    smoking: '',
    drinking: '',
    hobbies: [],
    
    // Partner Expectations
    partnerExpectations: '',
    
    // About
    about: ''
  });

  const [currentSection, setCurrentSection] = useState(0);
  const [availableHobbies] = useState(['Drawing', 'Shopping', 'Dancing', 'Cooking', 'Reading', 'Traveling', 'Music', 'Sports']);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const toggleHobby = (hobby) => {
    setFormData(prev => ({
      ...prev,
      hobbies: prev.hobbies.includes(hobby)
        ? prev.hobbies.filter(h => h !== hobby)
        : [...prev.hobbies, hobby]
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Profile Data:', formData);
    alert('Profile completed successfully!');
  };

  const sections = [
    { id: 0, title: 'Basic Information', icon: User },
    { id: 1, title: 'Religious Background', icon: Heart },
    { id: 2, title: 'Education', icon: GraduationCap },
    { id: 3, title: 'Professional Details', icon: Briefcase },
    { id: 4, title: 'Family Details', icon: Home },
    { id: 5, title: 'Lifestyle & Interests', icon: Activity },
    { id: 6, title: 'About & Expectations', icon: User }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="bg-gradient-to-r from-rose-600 to-pink-600 rounded-t-2xl p-8 text-white">
          <h1 className="text-3xl font-bold mb-2">Complete Your Profile</h1>
          <p className="text-rose-100">Fill in all the details to help us find your perfect match</p>
        </div>

        {/* Section Navigation */}
        <div className="bg-white shadow-sm p-4 overflow-x-auto">
          <div className="flex gap-2 min-w-max">
            {sections.map((section) => {
              const Icon = section.icon;
              return (
                <button
                  key={section.id}
                  onClick={() => setCurrentSection(section.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
                    currentSection === section.id
                      ? 'bg-gradient-to-r from-rose-600 to-pink-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  <Icon size={18} />
                  <span className="text-sm font-medium whitespace-nowrap">{section.title}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="bg-white shadow-lg rounded-b-2xl p-8">
          {/* Section 0: Basic Information */}
          {currentSection === 0 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Basic Information</h2>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Full Name <span className="text-rose-600">*</span>
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                    placeholder="Enter your name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Age <span className="text-rose-600">*</span>
                  </label>
                  <input
                    type="number"
                    name="age"
                    value={formData.age}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                    placeholder="28"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Height <span className="text-rose-600">*</span>
                  </label>
                  <input
                    type="text"
                    name="height"
                    value={formData.height}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                    placeholder="5'2''"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Marital Status <span className="text-rose-600">*</span>
                  </label>
                  <select
                    name="maritalStatus"
                    value={formData.maritalStatus}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                  >
                    <option value="">Select</option>
                    <option value="Never Married">Never Married</option>
                    <option value="Divorced">Divorced</option>
                    <option value="Widowed">Widowed</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Mother Tongue <span className="text-rose-600">*</span>
                  </label>
                  <input
                    type="text"
                    name="language"
                    value={formData.language}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                    placeholder="Gujarati"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Created For <span className="text-rose-600">*</span>
                  </label>
                  <select
                    name="createdFor"
                    value={formData.createdFor}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                  >
                    <option value="">Select</option>
                    <option value="Self">Self</option>
                    <option value="Son">Son</option>
                    <option value="Daughter">Daughter</option>
                    <option value="Brother">Brother</option>
                    <option value="Sister">Sister</option>
                    <option value="Friend">Friend</option>
                    <option value="Relative">Relative</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {/* Section 1: Religious Background */}
          {currentSection === 1 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Religious Background</h2>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Religion <span className="text-rose-600">*</span>
                  </label>
                  <select
                    name="religion"
                    value={formData.religion}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                  >
                    <option value="">Select</option>
                    <option value="Hindu">Hindu</option>
                    <option value="Muslim">Muslim</option>
                    <option value="Christian">Christian</option>
                    <option value="Sikh">Sikh</option>
                    <option value="Jain">Jain</option>
                    <option value="Buddhist">Buddhist</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Caste <span className="text-rose-600">*</span>
                  </label>
                  <input
                    type="text"
                    name="caste"
                    value={formData.caste}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                    placeholder="Patel"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Sub Caste
                  </label>
                  <input
                    type="text"
                    name="subCaste"
                    value={formData.subCaste}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                    placeholder="Leva Patel"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Manglik <span className="text-rose-600">*</span>
                  </label>
                  <select
                    name="manglik"
                    value={formData.manglik}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                  >
                    <option value="">Select</option>
                    <option value="Yes">Yes</option>
                    <option value="No">No</option>
                    <option value="Don't Know">Don't Know</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {/* Section 2: Education */}
          {currentSection === 2 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Education</h2>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Highest Degree <span className="text-rose-600">*</span>
                  </label>
                  <select
                    name="degree"
                    value={formData.degree}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                  >
                    <option value="">Select</option>
                    <option value="Bachelors">Bachelors</option>
                    <option value="Masters">Masters</option>
                    <option value="PhD">PhD</option>
                    <option value="Diploma">Diploma</option>
                    <option value="High School">High School</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Field of Study <span className="text-rose-600">*</span>
                  </label>
                  <input
                    type="text"
                    name="field"
                    value={formData.field}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                    placeholder="Fashion Design"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Institution <span className="text-rose-600">*</span>
                  </label>
                  <input
                    type="text"
                    name="institution"
                    value={formData.institution}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                    placeholder="NIFT Delhi"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Section 3: Professional Details */}
          {currentSection === 3 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Professional Details</h2>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Occupation <span className="text-rose-600">*</span>
                  </label>
                  <input
                    type="text"
                    name="occupation"
                    value={formData.occupation}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                    placeholder="Fashion Designer"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Company/Organization <span className="text-rose-600">*</span>
                  </label>
                  <input
                    type="text"
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                    placeholder="Fashion Studio"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Annual Income <span className="text-rose-600">*</span>
                  </label>
                  <input
                    type="text"
                    name="annualIncome"
                    value={formData.annualIncome}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                    placeholder="₹6.0L - ₹8L per year"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Section 4: Family Details */}
          {currentSection === 4 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Family Details</h2>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div className="md:col-span-2">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Location <span className="text-rose-600">*</span>
                  </label>
                  <input
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                    placeholder="Ahmedabad, Gujarat"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Family Type <span className="text-rose-600">*</span>
                  </label>
                  <select
                    name="familyType"
                    value={formData.familyType}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                  >
                    <option value="">Select</option>
                    <option value="Joint">Joint Family</option>
                    <option value="Nuclear">Nuclear Family</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Father's Name <span className="text-rose-600">*</span>
                  </label>
                  <input
                    type="text"
                    name="fatherName"
                    value={formData.fatherName}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                    placeholder="Ashok Patel"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Father's Occupation <span className="text-rose-600">*</span>
                  </label>
                  <input
                    type="text"
                    name="fatherOccupation"
                    value={formData.fatherOccupation}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                    placeholder="Business"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Mother's Name <span className="text-rose-600">*</span>
                  </label>
                  <input
                    type="text"
                    name="motherName"
                    value={formData.motherName}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                    placeholder="Hansa Patel"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Mother's Occupation <span className="text-rose-600">*</span>
                  </label>
                  <input
                    type="text"
                    name="motherOccupation"
                    value={formData.motherOccupation}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                    placeholder="Homemaker"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Number of Brothers <span className="text-rose-600">*</span>
                  </label>
                  <input
                    type="number"
                    name="brothers"
                    value={formData.brothers}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                    placeholder="1"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Number of Sisters <span className="text-rose-600">*</span>
                  </label>
                  <input
                    type="number"
                    name="sisters"
                    value={formData.sisters}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                    placeholder="0"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Section 5: Lifestyle & Interests */}
          {currentSection === 5 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Lifestyle & Interests</h2>
              
              <div className="grid md:grid-cols-3 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Diet <span className="text-rose-600">*</span>
                  </label>
                  <select
                    name="diet"
                    value={formData.diet}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                  >
                    <option value="">Select</option>
                    <option value="Vegetarian">Vegetarian</option>
                    <option value="Non-Vegetarian">Non-Vegetarian</option>
                    <option value="Vegan">Vegan</option>
                    <option value="Eggetarian">Eggetarian</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Smoking <span className="text-rose-600">*</span>
                  </label>
                  <select
                    name="smoking"
                    value={formData.smoking}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                  >
                    <option value="">Select</option>
                    <option value="No">No</option>
                    <option value="Yes">Yes</option>
                    <option value="Occasionally">Occasionally</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Drinking <span className="text-rose-600">*</span>
                  </label>
                  <select
                    name="drinking"
                    value={formData.drinking}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                  >
                    <option value="">Select</option>
                    <option value="No">No</option>
                    <option value="Yes">Yes</option>
                    <option value="Socially">Socially</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  Hobbies & Interests <span className="text-rose-600">*</span>
                </label>
                <div className="flex flex-wrap gap-3">
                  {availableHobbies.map(hobby => (
                    <button
                      key={hobby}
                      type="button"
                      onClick={() => toggleHobby(hobby)}
                      className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                        formData.hobbies.includes(hobby)
                          ? 'bg-gradient-to-r from-rose-600 to-pink-600 text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {hobby}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Section 6: About & Expectations */}
          {currentSection === 6 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">About & Expectations</h2>
              
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  About Yourself <span className="text-rose-600">*</span>
                </label>
                <textarea
                  name="about"
                  value={formData.about}
                  onChange={handleChange}
                  required
                  rows="4"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                  placeholder="Creative fashion designer with traditional values. Love art and culture. Looking for a supportive life partner."
                ></textarea>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Partner Expectations <span className="text-rose-600">*</span>
                </label>
                <textarea
                  name="partnerExpectations"
                  value={formData.partnerExpectations}
                  onChange={handleChange}
                  required
                  rows="4"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                  placeholder="Looking for someone from similar community who values family and traditions. Should be well-settled and respectful."
                ></textarea>
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex justify-between mt-8 pt-6 border-t">
            <button
              type="button"
              onClick={() => setCurrentSection(Math.max(0, currentSection - 1))}
              disabled={currentSection === 0}
              className={`px-6 py-3 rounded-lg font-semibold transition-all ${
                currentSection === 0
                  ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              Previous
            </button>

            {currentSection < sections.length - 1 ? (
              <button
                type="button"
                onClick={() => setCurrentSection(currentSection + 1)}
                className="px-6 py-3 bg-gradient-to-r from-rose-600 to-pink-600 text-white rounded-lg font-semibold hover:shadow-lg transition-all"
              >
                Next Section
              </button>
            ) : (
              <button
                type="submit"
                className="px-8 py-3 bg-gradient-to-r from-rose-600 to-pink-600 text-white rounded-lg font-semibold hover:shadow-lg transition-all"
              >
                Complete Profile
              </button>
            )}
          </div>
        </form>

        {/* Progress Indicator */}
        <div className="mt-6 bg-white rounded-lg p-4 shadow">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-semibold text-gray-700">Profile Completion</span>
            <span className="text-sm font-semibold text-rose-600">
              {Math.round(((currentSection + 1) / sections.length) * 100)}%
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-gradient-to-r from-rose-600 to-pink-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${((currentSection + 1) / sections.length) * 100}%` }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
}