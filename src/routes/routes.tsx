

import React from 'react';
import { Landing } from '../pages/Landing';
import { Login } from '../pages/Login';
import { Register } from '../pages/Register';
import { Dashboard } from '../pages/Dashboard';
import { Search } from '../pages/Search';
import { Messages } from '../pages/Messages';
import { Membership } from '../pages/Membership';
import { ProfileView } from '../pages/ProfileView';
import { AdminPanel } from '../pages/AdminPanel';
import AboutUs from '../pages/Footer/AboutUs';
import CompleteProfile from '../pages/CompleteProfile';

export type Page = 
  | 'landing' 
  | 'login' 
  | 'register' 
  | 'dashboard' 
  | 'search' 
  | 'messages' 
  | 'profile' 
  | 'membership' 
  | 'profile-view' 
  | 'admin' 
  | 'profile-setup'
  | 'about'
  | 'complete-profile'

export interface NavigationData {
  profileId?: string;
}

interface RouteConfig {
  path: Page;
  url: string;
  component: React.ComponentType<any>;
  requiresAuth?: boolean;
  requiresAdmin?: boolean;
}

// ========================================
// PROFILE SETUP COMPONENT (Define BEFORE routes)
// ========================================
export const ProfileSetup: React.FC<{ onNavigate: (page: string) => void }> = ({ onNavigate }) => {
  return (
    <div className="bg-white rounded-xl shadow-lg p-8">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">
        Complete Your Profile
      </h2>
      <p className="text-gray-600 mb-4">
        Profile setup functionality would allow you to add detailed information including 
        personal details, education, career, family background, lifestyle preferences, 
        photos, and more.
      </p>
      <button
        onClick={() => onNavigate('dashboard')}
        className="px-6 py-2 bg-rose-600 text-white rounded-lg hover:bg-rose-700"
      >
        Back to Dashboard
      </button>
    </div>
  );
};

// ========================================
// DEFINE ALL YOUR ROUTES HERE
// ========================================
export const routes: RouteConfig[] = [
  // Public Routes
  {
    path: 'landing',
    url: '/',
    component: Landing,
  },
  {
    path: 'login',
    url: '/login',
    component: Login,
  },
  {
    path: 'register',
    url: '/register',
    component: Register,
  },
  {
    path: 'about',
    url: '/about',
    component: AboutUs,
  },
  {
    path: 'complete-profile',
    url: '/complete-profile',
    component: CompleteProfile,
  },

  // Protected Routes
  {
    path: 'dashboard',
    url: '/dashboard',
    component: Dashboard,
    requiresAuth: true,
  },
  {
    path: 'search',
    url: '/search',
    component: Search,
    requiresAuth: true,
  },
  {
    path: 'messages',
    url: '/messages',
    component: Messages,
    requiresAuth: true,
  },
  {
    path: 'membership',
    url: '/membership',
    component: Membership,
    requiresAuth: true,
  },
  {
    path: 'profile-view',
    url: '/profile-view',
    component: ProfileView,
    requiresAuth: true,
  },
  {
    path: 'profile',
    url: '/profile',
    component: ProfileSetup,
    requiresAuth: true,
  },
  {
    path: 'profile-setup',
    url: '/profile-setup',
    component: ProfileSetup,
    requiresAuth: true,
  },

  // Admin Routes
  {
    path: 'admin',
    url: '/admin',
    component: AdminPanel,
    requiresAuth: true,
    requiresAdmin: true,
  },
];

// Helper function to get route by URL
export const getRouteByUrl = (url: string): RouteConfig | undefined => {
  return routes.find(r => r.url === url);
};

// Helper function to get route by path
export const getRouteByPath = (path: Page): RouteConfig | undefined => {
  return routes.find(r => r.path === path);
};

// ========================================
// ROUTER COMPONENT
// ========================================
interface RouterProps {
  currentPage: Page;
  navigationData: NavigationData;
  onNavigate: (page: string, data?: any) => void;
  isAuthenticated: boolean;
  isAdmin: boolean;
}

export const Router: React.FC<RouterProps> = ({
  currentPage,
  navigationData,
  onNavigate,
  isAuthenticated,
  isAdmin,
}) => {
  const route = routes.find(r => r.path === currentPage);

  if (!route) {
    const Component = isAuthenticated ? Dashboard : Landing;
    return <Component onNavigate={onNavigate} />;
  }

  if (route.requiresAuth && !isAuthenticated) {
    return <Landing onNavigate={onNavigate} />;
  }

  if (route.requiresAdmin && !isAdmin) {
    return <Dashboard onNavigate={onNavigate} />;
  }

  const Component = route.component;

  if (currentPage === 'profile-view') {
    return (
      <Component 
        profileId={navigationData.profileId || ''} 
        onNavigate={onNavigate} 
      />
    );
  }

  return <Component onNavigate={onNavigate} />;
};