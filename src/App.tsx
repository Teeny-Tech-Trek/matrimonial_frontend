// src/App.tsx
import React, { useState, useEffect } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import { ToastProvider } from './context/ToastContext'; // ✅ NEW IMPORT
import { Layout } from './components/Layout';
import { Router, type Page, type NavigationData, getRouteByUrl, getRouteByPath } from './routes/routes';
import { initializeMockData } from './data/mockData';

function AppContent() {
  const { isAuthenticated, isAdmin } = useAuth();
  const [currentPage, setCurrentPage] = useState<Page>('landing');
  const [navigationData, setNavigationData] = useState<NavigationData>({});

  // Initialize mock data
  useEffect(() => {
    initializeMockData();
  }, []);

  // Sync URL with current page on load
  useEffect(() => {
    const path = window.location.pathname;
    const route = getRouteByUrl(path);
    
    if (route) {
      setCurrentPage(route.path);
    }
  }, []);

  // Redirect to dashboard/admin panel if authenticated and on landing
  useEffect(() => {
    if (isAuthenticated && currentPage === 'landing') {
      if (isAdmin) {
        setCurrentPage('admin');
        window.history.replaceState({}, '', '/admin');
      } else {
        setCurrentPage('dashboard');
        window.history.replaceState({}, '', '/dashboard');
      }
    }
  }, [isAuthenticated, currentPage, isAdmin]);

  // Prevent authenticated users from accessing login/register pages
  useEffect(() => {
    const publicPages: Page[] = ['login', 'register'];
    
    if (isAuthenticated && publicPages.includes(currentPage)) {
      if (isAdmin) {
        setCurrentPage('admin');
        window.history.replaceState({}, '', '/admin');
      } else {
        setCurrentPage('dashboard');
        window.history.replaceState({}, '', '/dashboard');
      }
    }
  }, [isAuthenticated, currentPage, isAdmin]);

  // Prevent admin users from accessing regular user pages
  useEffect(() => {
    const adminRestrictedPages: Page[] = ['dashboard', 'search', 'messages', 'requests', 'my-profile', 'membership', 'matches', 'profile-view'];
    
    if (isAdmin && adminRestrictedPages.includes(currentPage)) {
      setCurrentPage('admin');
      window.history.replaceState({}, '', '/admin');
    }
  }, [isAdmin, currentPage]);

  // Handle navigation and update URL
  const handleNavigate = (page: string, data?: any) => {
    setCurrentPage(page as Page);
    setNavigationData(data || {});
    
    // Update URL
    const route = getRouteByPath(page as Page);
    if (route) {
      // Use replaceState for admin redirects to prevent history pollution
      const adminRestrictedPages: Page[] = ['dashboard', 'search', 'messages', 'requests', 'my-profile', 'membership', 'matches', 'profile-view'];
      const shouldReplace = isAdmin && adminRestrictedPages.includes(page as Page);
      
      if (shouldReplace) {
        window.history.replaceState({}, '', route.url);
      } else {
        window.history.pushState({}, '', route.url);
      }
    }
    
    window.scrollTo(0, 0);
  };

  // Handle browser back/forward buttons
  useEffect(() => {
    const handlePopState = () => {
      const path = window.location.pathname;
      const route = getRouteByUrl(path);
      
      if (route) {
        // If authenticated user tries to access auth pages via back button, redirect
        const publicPages: Page[] = ['login', 'register'];
        const adminRestrictedPages: Page[] = ['dashboard', 'search', 'messages', 'requests', 'my-profile', 'membership', 'matches', 'profile-view'];
        
        if (isAuthenticated && publicPages.includes(route.path)) {
          if (isAdmin) {
            window.history.replaceState({}, '', '/admin');
            setCurrentPage('admin');
          } else {
            window.history.replaceState({}, '', '/dashboard');
            setCurrentPage('dashboard');
          }
        } else if (isAdmin && adminRestrictedPages.includes(route.path)) {
          window.history.replaceState({}, '', '/admin');
          setCurrentPage('admin');
        } else {
          setCurrentPage(route.path);
        }
      }
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, [isAuthenticated, isAdmin]);

  return (
    <Layout currentPage={currentPage} onNavigate={handleNavigate}>
      <Router
        currentPage={currentPage}
        navigationData={navigationData}
        onNavigate={handleNavigate}
        isAuthenticated={isAuthenticated}
        isAdmin={isAdmin}
      />
      
      {/* ✅ Add CSS for toast animation */}
      <style>{`
        @keyframes slide-in {
          from {
            transform: translateX(100%);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }
        .animate-slide-in {
          animation: slide-in 0.3s ease-out;
        }
      `}</style>
    </Layout>
  );
}

function App() {
  return (
    <ToastProvider> {/* ✅ NEW: Wrap entire app with ToastProvider */}
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </ToastProvider>
  );
}

export default App;