import React, { useState, useEffect } from 'react';
import { Search as SearchIcon, Filter, X } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { CompleteProfile } from '../types';
import { ProfileCard } from '../components/ProfileCard';

interface SearchProps {
  onNavigate: (page: string, data?: any) => void;
}

export const Search: React.FC<SearchProps> = ({ onNavigate }) => {
  const { currentUser } = useAuth();
  const [profiles, setProfiles] = useState<CompleteProfile[]>([]);
  const [filteredProfiles, setFilteredProfiles] = useState<CompleteProfile[]>([]);
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    ageMin: '',
    ageMax: '',
    heightMin: '',
    heightMax: '',
    maritalStatus: '',
    religion: '',
    state: '',
    education: '',
    occupation: ''
  });

  useEffect(() => {
    const storedProfiles = JSON.parse(localStorage.getItem('profiles') || '[]');
    const filtered = storedProfiles.filter((p: CompleteProfile) =>
      p.id !== currentUser?.id &&
      p.gender !== currentUser?.gender &&
      p.isActive
    );
    setProfiles(filtered);
    setFilteredProfiles(filtered);
  }, [currentUser]);

  const applyFilters = () => {
    let result = [...profiles];

    if (filters.ageMin) {
      result = result.filter(p => {
        const age = new Date().getFullYear() - new Date(p.dateOfBirth).getFullYear();
        return age >= parseInt(filters.ageMin);
      });
    }

    if (filters.ageMax) {
      result = result.filter(p => {
        const age = new Date().getFullYear() - new Date(p.dateOfBirth).getFullYear();
        return age <= parseInt(filters.ageMax);
      });
    }

    if (filters.heightMin && filters.heightMin !== '') {
      result = result.filter(p =>
        p.personalDetails && p.personalDetails.heightCm >= parseInt(filters.heightMin)
      );
    }

    if (filters.heightMax && filters.heightMax !== '') {
      result = result.filter(p =>
        p.personalDetails && p.personalDetails.heightCm <= parseInt(filters.heightMax)
      );
    }

    if (filters.maritalStatus) {
      result = result.filter(p =>
        p.personalDetails && p.personalDetails.maritalStatus === filters.maritalStatus
      );
    }

    if (filters.religion) {
      result = result.filter(p =>
        p.religiousDetails && p.religiousDetails.religion.toLowerCase().includes(filters.religion.toLowerCase())
      );
    }

    if (filters.state) {
      result = result.filter(p =>
        p.familyDetails && p.familyDetails.currentResidenceState.toLowerCase().includes(filters.state.toLowerCase())
      );
    }

    if (filters.education) {
      result = result.filter(p =>
        p.educationDetails && p.educationDetails.highestEducation.toLowerCase().includes(filters.education.toLowerCase())
      );
    }

    if (filters.occupation) {
      result = result.filter(p =>
        p.professionalDetails && p.professionalDetails.occupation.toLowerCase().includes(filters.occupation.toLowerCase())
      );
    }

    setFilteredProfiles(result);
    setShowFilters(false);
  };

  const clearFilters = () => {
    setFilters({
      ageMin: '',
      ageMax: '',
      heightMin: '',
      heightMax: '',
      maritalStatus: '',
      religion: '',
      state: '',
      education: '',
      occupation: ''
    });
    setFilteredProfiles(profiles);
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search by name, location, profession..."
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent"
              onChange={(e) => {
                const searchTerm = e.target.value.toLowerCase();
                if (searchTerm) {
                  setFilteredProfiles(profiles.filter(p =>
                    p.fullName.toLowerCase().includes(searchTerm) ||
                    p.familyDetails?.currentResidenceCity.toLowerCase().includes(searchTerm) ||
                    p.professionalDetails?.occupation.toLowerCase().includes(searchTerm)
                  ));
                } else {
                  setFilteredProfiles(profiles);
                }
              }}
            />
          </div>
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center space-x-2 px-6 py-3 bg-rose-600 text-white rounded-lg hover:bg-rose-700 transition-colors"
          >
            <Filter className="h-5 w-5" />
            <span>Advanced Filters</span>
          </button>
        </div>

        {showFilters && (
          <div className="mt-6 pt-6 border-t border-gray-200">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Age Range</label>
                <div className="flex gap-2">
                  <input
                    type="number"
                    placeholder="Min"
                    value={filters.ageMin}
                    onChange={(e) => setFilters({ ...filters, ageMin: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                  />
                  <input
                    type="number"
                    placeholder="Max"
                    value={filters.ageMax}
                    onChange={(e) => setFilters({ ...filters, ageMax: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Height (cm)</label>
                <div className="flex gap-2">
                  <input
                    type="number"
                    placeholder="Min"
                    value={filters.heightMin}
                    onChange={(e) => setFilters({ ...filters, heightMin: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                  />
                  <input
                    type="number"
                    placeholder="Max"
                    value={filters.heightMax}
                    onChange={(e) => setFilters({ ...filters, heightMax: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Marital Status</label>
                <select
                  value={filters.maritalStatus}
                  onChange={(e) => setFilters({ ...filters, maritalStatus: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                >
                  <option value="">Any</option>
                  <option value="never_married">Never Married</option>
                  <option value="divorced">Divorced</option>
                  <option value="widowed">Widowed</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Religion</label>
                <input
                  type="text"
                  placeholder="Enter religion"
                  value={filters.religion}
                  onChange={(e) => setFilters({ ...filters, religion: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">State</label>
                <input
                  type="text"
                  placeholder="Enter state"
                  value={filters.state}
                  onChange={(e) => setFilters({ ...filters, state: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Education</label>
                <input
                  type="text"
                  placeholder="Enter education"
                  value={filters.education}
                  onChange={(e) => setFilters({ ...filters, education: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                />
              </div>
            </div>

            <div className="flex gap-2">
              <button
                onClick={applyFilters}
                className="px-6 py-2 bg-rose-600 text-white rounded-lg hover:bg-rose-700"
              >
                Apply Filters
              </button>
              <button
                onClick={clearFilters}
                className="px-6 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200"
              >
                Clear All
              </button>
            </div>
          </div>
        )}
      </div>

      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-gray-900">
            {filteredProfiles.length} Profiles Found
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProfiles.map(profile => (
            <ProfileCard
              key={profile.id}
              profile={profile}
              onViewProfile={(id) => onNavigate('profile-view', { profileId: id })}
              onSendInterest={(id) => alert('Interest sent!')}
              onMessage={(id) => onNavigate('messages', { profileId: id })}
            />
          ))}
        </div>

        {filteredProfiles.length === 0 && (
          <div className="text-center py-12 bg-white rounded-xl">
            <SearchIcon className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No profiles found</h3>
            <p className="text-gray-600 mb-4">Try adjusting your search filters</p>
            <button
              onClick={clearFilters}
              className="px-6 py-2 bg-rose-600 text-white rounded-lg hover:bg-rose-700"
            >
              Clear Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
};