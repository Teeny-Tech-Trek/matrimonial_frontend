import React, { useState } from 'react';
import { X, Heart, MapPin, Briefcase, GraduationCap, DollarSign, Users, Calendar, Flame, Home } from 'lucide-react';

const QuickFilters = ({ onFilterChange, initialFilters = {} }) => {
  const [activeFilter, setActiveFilter] = useState(null);
  
  // Filter states matching BACKEND expectations
  const [filters, setFilters] = useState({
    // Basic
    gender: initialFilters.gender || '',
    maritalStatus: initialFilters.maritalStatus || '',
    motherTongue: initialFilters.motherTongue || '',
    
    // Age
    ageMin: initialFilters.ageMin || '',
    ageMax: initialFilters.ageMax || '',
    
    // Religion
    religion: initialFilters.religion || '',
    caste: initialFilters.caste || '',
    subCaste: initialFilters.subCaste || '',
    manglik: initialFilters.manglik || '',
    
    // Location
    city: initialFilters.city || '',
    state: initialFilters.state || '',
    
    // Family
    familyType: initialFilters.familyType || '',
    
    // Education (matching backend field names)
    highestEducation: initialFilters.highestEducation || '',
    educationField: initialFilters.educationField || '',
    
    // Professional
    occupation: initialFilters.occupation || '',
    annualIncomeMin: initialFilters.annualIncomeMin || '',
    annualIncomeMax: initialFilters.annualIncomeMax || '',
    
    // Height
    heightMin: initialFilters.heightMin || '',
    heightMax: initialFilters.heightMax || '',
    
    // Lifestyle
    diet: initialFilters.diet || '',
    smoking: initialFilters.smoking || '',
    drinking: initialFilters.drinking || '',
  });

  // Dropdown options
  const genderOptions = [
    { value: '', label: 'All' },
    { value: 'male', label: 'Male' },
    { value: 'female', label: 'Female' }
  ];
  
  const maritalStatusOptions = [
    { value: 'never_married', label: 'Never Married' },
    { value: 'divorced', label: 'Divorced' },
    { value: 'widowed', label: 'Widowed' },
    { value: 'awaiting_divorce', label: 'Awaiting Divorce' }
  ];

  const motherTongueOptions = [
    'Hindi', 'English', 'Bengali', 'Telugu', 'Marathi', 'Tamil', 'Gujarati',
    'Urdu', 'Kannada', 'Odia', 'Malayalam', 'Punjabi', 'Assamese', 'Maithili'
  ];
  
  const religionOptions = ['Hindu', 'Muslim', 'Christian', 'Sikh', 'Buddhist', 'Jain', 'Other'];
  
  const casteOptions = {
    Hindu: ['Brahmin', 'Kshatriya', 'Vaishya', 'Shudra', 'Other'],
    Muslim: ['Shia', 'Sunni', 'Other'],
    Christian: ['Catholic', 'Protestant', 'Orthodox', 'Other'],
    Sikh: ['Jat', 'Khatri', 'Ramgarhia', 'Other'],
    Buddhist: ['Theravada', 'Mahayana', 'Vajrayana', 'Other'],
    Jain: ['Digambar', 'Shwetambar', 'Other']
  };

  const manglikOptions = [
    { value: 'true', label: 'Yes' },
    { value: 'false', label: 'No' }
  ];

  const familyTypeOptions = ['Joint Family', 'Nuclear Family', 'Extended Family'];

  const stateOptions = [
    'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh',
    'Goa', 'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jharkhand', 'Karnataka',
    'Kerala', 'Madhya Pradesh', 'Maharashtra', 'Manipur', 'Meghalaya', 'Mizoram',
    'Nagaland', 'Odisha', 'Punjab', 'Rajasthan', 'Sikkim', 'Tamil Nadu',
    'Telangana', 'Tripura', 'Uttar Pradesh', 'Uttarakhand', 'West Bengal',
    'Delhi', 'Jammu and Kashmir', 'Ladakh'
  ];

  const educationOptions = [
    'High School', 'Diploma', 'Bachelors', 'Masters', 'PhD', 'Professional Degree', 'Other'
  ];

  const educationFieldOptions = [
    'Engineering', 'Medicine', 'Commerce', 'Arts', 'Science', 'Law',
    'Management', 'Computer Science', 'Pharmacy', 'Architecture', 'Fashion Design', 'Other'
  ];

  const occupationOptions = [
    'Software Engineer', 'Doctor', 'Teacher', 'Business Owner', 'Lawyer',
    'Chartered Accountant', 'Civil Servant', 'Marketing Professional',
    'Sales Professional', 'Engineer', 'Architect', 'Designer', 'Consultant',
    'Banking Professional', 'Healthcare Professional', 'Self Employed',
    'Fashion Designer', 'Student', 'Unemployed', 'Other'
  ];

  const incomeRanges = [
    { label: 'Below 2 Lakhs', min: '0', max: '200000' },
    { label: '2-5 Lakhs', min: '200000', max: '500000' },
    { label: '5-10 Lakhs', min: '500000', max: '1000000' },
    { label: '10-20 Lakhs', min: '1000000', max: '2000000' },
    { label: '20-50 Lakhs', min: '2000000', max: '5000000' },
    { label: '50 Lakhs - 1 Crore', min: '5000000', max: '10000000' },
    { label: 'Above 1 Crore', min: '10000000', max: '' }
  ];

  const dietOptions = ['Vegetarian', 'Non-Vegetarian', 'Eggetarian', 'Vegan'];

  const filterButtons = [
    { id: 'gender', label: 'Gender', icon: Users },
    { id: 'age', label: 'Age Range', icon: Calendar },
    { id: 'religion', label: 'Religion + Caste', icon: Heart },
    { id: 'location', label: 'State', icon: MapPin },
    { id: 'education', label: 'Education', icon: GraduationCap },
    { id: 'occupation', label: 'Occupation', icon: Briefcase },
    { id: 'income', label: 'Income Range', icon: DollarSign },
    { id: 'marital', label: 'Marital Status', icon: Users },
    { id: 'lifestyle', label: 'Lifestyle', icon: Flame },
    { id: 'family', label: 'Family Type', icon: Home }
  ];

  const buildQueryString = () => {
    const params = new URLSearchParams();
    
    Object.entries(filters).forEach(([key, value]) => {
      if (value && value !== '' && value !== 'Other') {
        params.append(key, value);
      }
    });

    return params.toString();
  };

  // Apply filters ONLY when called explicitly
  const applyFilters = () => {
    const queryString = buildQueryString();
    // console.log('✅ Applying Filters');
    // console.log('📋 Filters:', filters);
    // console.log('🔗 Query String:', queryString);
    
    if (onFilterChange) {
      onFilterChange(filters, queryString);
    }
    
    setActiveFilter(null);
  };

  // Quick apply for single-select filters (no Apply button needed)
  const quickApply = (updatedFilters) => {
    setFilters(updatedFilters);
    const params = new URLSearchParams();
    
    Object.entries(updatedFilters).forEach(([key, value]) => {
      if (value && value !== '' && value !== 'Other') {
        params.append(key, value);
      }
    });

    const queryString = params.toString();
    
    if (onFilterChange) {
      onFilterChange(updatedFilters, queryString);
    }
    
    setActiveFilter(null);
  };

  const clearFilters = () => {
    const clearedFilters = {
      gender: '',
      maritalStatus: '',
      motherTongue: '',
      ageMin: '',
      ageMax: '',
      religion: '',
      caste: '',
      subCaste: '',
      manglik: '',
      city: '',
      state: '',
      familyType: '',
      highestEducation: '',
      educationField: '',
      occupation: '',
      annualIncomeMin: '',
      annualIncomeMax: '',
      heightMin: '',
      heightMax: '',
      diet: '',
      smoking: '',
      drinking: '',
    };
    
    setFilters(clearedFilters);
    setActiveFilter(null);
    
    if (onFilterChange) {
      onFilterChange(clearedFilters, '');
    }
  };

  const hasActiveFilters = Object.values(filters).some(value => value !== '' && value !== 'Other');

  const renderFilterPanel = () => {
    if (!activeFilter) return null;

    return (
      <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">
            {filterButtons.find(f => f.id === activeFilter)?.label}
          </h3>
          <button
            onClick={() => setActiveFilter(null)}
            className="text-gray-400 hover:text-gray-600"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {activeFilter === 'gender' && (
          <div className="grid grid-cols-3 gap-3">
            {genderOptions.map(option => (
              <button
                key={option.value}
                onClick={() => quickApply({...filters, gender: option.value})}
                className={`px-4 py-3 rounded-lg border-2 transition-all ${
                  filters.gender === option.value
                    ? 'border-rose-600 bg-rose-50 text-rose-700 font-semibold'
                    : 'border-gray-200 hover:border-rose-300'
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>
        )}

        {activeFilter === 'age' && (
          <div>
            <div className="flex gap-4">
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700 mb-2">Min Age</label>
                <input
                  type="number"
                  value={filters.ageMin}
                  onChange={(e) => setFilters({...filters, ageMin: e.target.value})}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                  placeholder="18"
                  min="18"
                  max="80"
                />
              </div>
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700 mb-2">Max Age</label>
                <input
                  type="number"
                  value={filters.ageMax}
                  onChange={(e) => setFilters({...filters, ageMax: e.target.value})}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                  placeholder="30"
                  min="18"
                  max="80"
                />
              </div>
            </div>
            <button
              onClick={applyFilters}
              className="w-full mt-4 px-6 py-3 bg-gradient-to-r from-rose-600 to-pink-600 text-white rounded-lg font-semibold hover:shadow-lg transition-all"
            >
              Apply
            </button>
          </div>
        )}

        {activeFilter === 'religion' && (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Religion</label>
              <select
                value={filters.religion}
                onChange={(e) => setFilters({...filters, religion: e.target.value, caste: '', subCaste: ''})}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent"
              >
                <option value="">Select Religion</option>
                {religionOptions.map(religion => (
                  <option key={religion} value={religion}>
                    {religion === 'Other' ? 'All (Other)' : religion}
                  </option>
                ))}
              </select>
            </div>
            
            {filters.religion && filters.religion !== 'Other' && (
              <>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Caste</label>
                  <select
                    value={filters.caste}
                    onChange={(e) => setFilters({...filters, caste: e.target.value})}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                  >
                    <option value="">Select Caste</option>
                    {casteOptions[filters.religion]?.map(caste => (
                      <option key={caste} value={caste}>
                        {caste === 'Other' ? 'All (Other)' : caste}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Sub Caste (Optional)</label>
                  <input
                    type="text"
                    value={filters.subCaste}
                    onChange={(e) => setFilters({...filters, subCaste: e.target.value})}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                    placeholder="Enter sub caste"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Manglik</label>
                  <div className="grid grid-cols-2 gap-3">
                    {manglikOptions.map(option => (
                      <button
                        key={option.value}
                        onClick={() => setFilters({...filters, manglik: option.value})}
                        className={`px-4 py-3 rounded-lg border-2 transition-all ${
                          filters.manglik === option.value
                            ? 'border-rose-600 bg-rose-50 text-rose-700 font-semibold'
                            : 'border-gray-200 hover:border-rose-300'
                        }`}
                      >
                        {option.label}
                      </button>
                    ))}
                  </div>
                </div>
              </>
            )}
            <button
              onClick={applyFilters}
              className="w-full px-6 py-3 bg-gradient-to-r from-rose-600 to-pink-600 text-white rounded-lg font-semibold hover:shadow-lg transition-all"
            >
              Apply
            </button>
          </div>
        )}

        {activeFilter === 'location' && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">State</label>
            <select
              value={filters.state}
              onChange={(e) => quickApply({...filters, state: e.target.value})}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent"
            >
              <option value="">Select State</option>
              {stateOptions.map(state => (
                <option key={state} value={state}>{state}</option>
              ))}
            </select>
          </div>
        )}

        {activeFilter === 'education' && (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Highest Education</label>
              <select
                value={filters.highestEducation}
                onChange={(e) => setFilters({...filters, highestEducation: e.target.value})}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent"
              >
                <option value="">Select Education</option>
                {educationOptions.map(edu => (
                  <option key={edu} value={edu}>
                    {edu === 'Other' ? 'All (Other)' : edu}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Education Field</label>
              <select
                value={filters.educationField}
                onChange={(e) => setFilters({...filters, educationField: e.target.value})}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent"
              >
                <option value="">Select Field</option>
                {educationFieldOptions.map(field => (
                  <option key={field} value={field}>
                    {field === 'Other' ? 'All (Other)' : field}
                  </option>
                ))}
              </select>
            </div>
            <button
              onClick={applyFilters}
              className="w-full px-6 py-3 bg-gradient-to-r from-rose-600 to-pink-600 text-white rounded-lg font-semibold hover:shadow-lg transition-all"
            >
              Apply
            </button>
          </div>
        )}

        {activeFilter === 'occupation' && (
          <div>
            <select
              value={filters.occupation}
              onChange={(e) => quickApply({...filters, occupation: e.target.value})}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent"
            >
              <option value="">Select Occupation</option>
              {occupationOptions.map(occ => (
                <option key={occ} value={occ}>
                  {occ === 'Other' ? 'All (Other)' : occ}
                </option>
              ))}
            </select>
          </div>
        )}

        {activeFilter === 'income' && (
          <div>
            <select
              onChange={(e) => {
                const selectedRange = incomeRanges.find(r => r.label === e.target.value);
                if (selectedRange) {
                  quickApply({...filters, annualIncomeMin: selectedRange.min, annualIncomeMax: selectedRange.max});
                }
              }}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent"
            >
              <option value="">Select Income Range</option>
              {incomeRanges.map(range => (
                <option key={range.label} value={range.label}>{range.label}</option>
              ))}
            </select>
          </div>
        )}

        {activeFilter === 'marital' && (
          <div className="grid grid-cols-2 gap-3">
            {maritalStatusOptions.map(status => (
              <button
                key={status.value}
                onClick={() => quickApply({...filters, maritalStatus: status.value})}
                className={`px-4 py-3 rounded-lg border-2 transition-all ${
                  filters.maritalStatus === status.value
                    ? 'border-rose-600 bg-rose-50 text-rose-700 font-semibold'
                    : 'border-gray-200 hover:border-rose-300'
                }`}
              >
                {status.label}
              </button>
            ))}
          </div>
        )}

        {activeFilter === 'lifestyle' && (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Diet</label>
              <select
                value={filters.diet}
                onChange={(e) => setFilters({...filters, diet: e.target.value})}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent"
              >
                <option value="">Select Diet</option>
                {dietOptions.map(diet => (
                  <option key={diet} value={diet}>{diet}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Smoking</label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => setFilters({...filters, smoking: 'true'})}
                  className={`px-4 py-3 rounded-lg border-2 transition-all ${
                    filters.smoking === 'true'
                      ? 'border-rose-600 bg-rose-50 text-rose-700 font-semibold'
                      : 'border-gray-200 hover:border-rose-300'
                  }`}
                >
                  Yes
                </button>
                <button
                  onClick={() => setFilters({...filters, smoking: 'false'})}
                  className={`px-4 py-3 rounded-lg border-2 transition-all ${
                    filters.smoking === 'false'
                      ? 'border-rose-600 bg-rose-50 text-rose-700 font-semibold'
                      : 'border-gray-200 hover:border-rose-300'
                  }`}
                >
                  No
                </button>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Drinking</label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => setFilters({...filters, drinking: 'true'})}
                  className={`px-4 py-3 rounded-lg border-2 transition-all ${
                    filters.drinking === 'true'
                      ? 'border-rose-600 bg-rose-50 text-rose-700 font-semibold'
                      : 'border-gray-200 hover:border-rose-300'
                  }`}
                >
                  Yes
                </button>
                <button
                  onClick={() => setFilters({...filters, drinking: 'false'})}
                  className={`px-4 py-3 rounded-lg border-2 transition-all ${
                    filters.drinking === 'false'
                      ? 'border-rose-600 bg-rose-50 text-rose-700 font-semibold'
                      : 'border-gray-200 hover:border-rose-300'
                  }`}
                >
                  No
                </button>
              </div>
            </div>
            <button
              onClick={applyFilters}
              className="w-full px-6 py-3 bg-gradient-to-r from-rose-600 to-pink-600 text-white rounded-lg font-semibold hover:shadow-lg transition-all"
            >
              Apply
            </button>
          </div>
        )}

        {activeFilter === 'family' && (
          <div>
            <select
              value={filters.familyType}
              onChange={(e) => quickApply({...filters, familyType: e.target.value})}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent"
            >
              <option value="">Select Family Type</option>
              {familyTypeOptions.map(type => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
          </div>
        )}
      </div>
    );
  };

  return (
    <div>
      <div className="bg-white rounded-xl shadow-sm p-4 mb-6">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-base font-semibold text-gray-900 whitespace-nowrap">Quick Filters</h2>
          {hasActiveFilters && (
            <button
              onClick={clearFilters}
              className="flex items-center gap-1 px-3 py-1.5 text-sm text-rose-600 hover:bg-rose-50 rounded-lg transition-colors whitespace-nowrap ml-2"
            >
              <X className="w-3.5 h-3.5" />
              Clear All
            </button>
          )}
        </div>
        
        <div className="overflow-x-auto">
          <div className="flex gap-2 min-w-max pb-1">
            {filterButtons.map(filter => {
              const Icon = filter.icon;
              const isActive = 
                (filter.id === 'gender' && filters.gender && filters.gender !== 'Other') ||
                (filter.id === 'age' && (filters.ageMin || filters.ageMax)) ||
                (filter.id === 'religion' && filters.religion && filters.religion !== 'Other') ||
                (filter.id === 'location' && filters.state) ||
                (filter.id === 'education' && ((filters.highestEducation && filters.highestEducation !== 'Other') || (filters.educationField && filters.educationField !== 'Other'))) ||
                (filter.id === 'occupation' && filters.occupation && filters.occupation !== 'Other') ||
                (filter.id === 'income' && (filters.annualIncomeMin || filters.annualIncomeMax)) ||
                (filter.id === 'marital' && filters.maritalStatus) ||
                (filter.id === 'lifestyle' && (filters.diet || filters.smoking || filters.drinking)) ||
                (filter.id === 'family' && filters.familyType);

              return (
                <button
                  key={filter.id}
                  onClick={() => setActiveFilter(activeFilter === filter.id ? null : filter.id)}
                  className={`flex items-center gap-1.5 px-3 py-2 rounded-lg border-2 transition-all whitespace-nowrap text-sm ${
                    isActive
                      ? 'border-rose-600 bg-rose-50 text-rose-700 font-semibold'
                      : 'border-gray-200 hover:border-rose-300'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5 flex-shrink-0" />
                  <span>{filter.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {renderFilterPanel()}
    </div>
  );
};

export default QuickFilters;