// src/routes/routes.tsx
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
import CompleteProfile from '../pages/CompleteProfile';
import { MyProfile } from '../pages/MyProfile';
import { ViewRequests } from '../components/ViewRequest'; // ✅ Add this import
import { AdvancedMatches } from '../components/AllMatches'; 

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
  | 'my-profile'
  | 'requests'
   | 'matches'; 

export interface NavigationData {
  profileId?: string;
}

interface Route {
  path: Page;
  url: string;
  component: React.ComponentType<any>;
  requiresAuth: boolean;
  requiresAdmin?: boolean;
}

export const routes: Route[] = [
  // Public routes
  { path: 'landing', url: '/', component: Landing, requiresAuth: false },
  { path: 'login', url: '/login', component: Login, requiresAuth: false },
  { path: 'register', url: '/register', component: Register, requiresAuth: false },
  
  // Protected routes
  { path: 'dashboard', url: '/dashboard', component: Dashboard, requiresAuth: true },
  { path: 'search', url: '/search', component: Search, requiresAuth: true },
  { path: 'messages', url: '/messages', component: Messages, requiresAuth: true },
  { path: 'membership', url: '/membership', component: Membership, requiresAuth: true },
  { path: 'profile-view', url: '/profile/:id', component: ProfileView, requiresAuth: true },
  { path: 'profile-setup', url: '/profile-setup', component: CompleteProfile, requiresAuth: true },
  { path: 'my-profile', url: '/my-profile', component: MyProfile, requiresAuth: true },
  { path: 'requests', url: '/requests', component: ViewRequests, requiresAuth: true }, 
   { path: 'matches', url: '/matches', component: AdvancedMatches, requiresAuth: true },
  // Admin routes
  { path: 'admin', url: '/admin', component: AdminPanel, requiresAuth: true, requiresAdmin: true },
];

export const getRouteByPath = (path: Page) => {
  return routes.find(route => route.path === path);
};

export const getRouteByUrl = (url: string) => {
  return routes.find(route => route.url === url || route.path === url.replace('/', ''));
};

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
  isAdmin
}) => {
  // Not authenticated - show public pages
  if (!isAuthenticated) {
    switch (currentPage) {
      case 'login':
        return <Login onNavigate={onNavigate} />;
      case 'register':
        return <Register onNavigate={onNavigate} />;
      default:
        return <Landing onNavigate={onNavigate} />;
    }
  }

  // Authenticated - show protected pages
  switch (currentPage) {
    case 'dashboard':
      return <Dashboard onNavigate={onNavigate} />;
      
    case 'search':
      return <Search onNavigate={onNavigate} />;
      
    case 'messages':
      return <Messages onNavigate={onNavigate} />;
      
    case 'membership':
      return <Membership onNavigate={onNavigate} />;

    case 'matches': 
      return <AdvancedMatches onNavigate={onNavigate} />;
      
    case 'profile-view':
      return <ProfileView profileId={navigationData.profileId || ''} onNavigate={onNavigate} />;
      
    case 'profile-setup':
      return <CompleteProfile onNavigate={onNavigate} />;
      
    case 'my-profile':
      return <MyProfile onNavigate={onNavigate} />;
      
    case 'requests': // ✅ Add this case
      return <ViewRequests onNavigate={onNavigate} />;
      
    case 'admin':
      return isAdmin ? <AdminPanel onNavigate={onNavigate} /> : <Dashboard onNavigate={onNavigate} />;
      
    default:
      return <Dashboard onNavigate={onNavigate} />;
  }
};