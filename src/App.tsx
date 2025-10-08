// import React, { useState, useEffect } from 'react';
// import { AuthProvider, useAuth } from './context/AuthContext';
// import { Layout } from './components/Layout';
// import { Landing } from './pages/Landing';
// import { Login } from './pages/Login';
// import { Register } from './pages/Register';
// import { Dashboard } from './pages/Dashboard';
// import { Search } from './pages/Search';
// import { Messages } from './pages/Messages';
// import { Membership } from './pages/Membership';
// import { ProfileView } from './pages/ProfileView';
// import { AdminPanel } from './pages/AdminPanel';
// import { initializeMockData } from './data/mockData';

// type Page = 'landing' | 'login' | 'register' | 'dashboard' | 'search' | 'messages' | 'profile' | 'membership' | 'profile-view' | 'admin' | 'profile-setup';

// interface NavigationData {
//   profileId?: string;
// }

// function AppContent() {
//   const { isAuthenticated, isAdmin } = useAuth();
//   const [currentPage, setCurrentPage] = useState<Page>('landing');
//   const [navigationData, setNavigationData] = useState<NavigationData>({});

//   useEffect(() => {
//     initializeMockData();
//   }, []);

//   useEffect(() => {
//     if (isAuthenticated && currentPage === 'landing') {
//       setCurrentPage('dashboard');
//     }
//   }, [isAuthenticated]);

//   const handleNavigate = (page: string, data?: any) => {
//     setCurrentPage(page as Page);
//     setNavigationData(data || {});
//     window.scrollTo(0, 0);
//   };

//   const renderPage = () => {
//     if (!isAuthenticated) {
//       switch (currentPage) {
//         case 'login':
//           return <Login onNavigate={handleNavigate} />;
//         case 'register':
//           return <Register onNavigate={handleNavigate} />;
//         default:
//           return <Landing onNavigate={handleNavigate} />;
//       }
//     }

//     switch (currentPage) {
//       case 'dashboard':
//         return <Dashboard onNavigate={handleNavigate} />;
//       case 'search':
//         return <Search onNavigate={handleNavigate} />;
//       case 'messages':
//         return <Messages onNavigate={handleNavigate} />;
//       case 'membership':
//         return <Membership onNavigate={handleNavigate} />;
//       case 'profile-view':
//         return <ProfileView profileId={navigationData.profileId || ''} onNavigate={handleNavigate} />;
//       case 'admin':
//         return isAdmin ? <AdminPanel onNavigate={handleNavigate} /> : <Dashboard onNavigate={handleNavigate} />;
//       case 'profile':
//       case 'profile-setup':
//         return (
//           <div className="bg-white rounded-xl shadow-lg p-8">
//             <h2 className="text-2xl font-bold text-gray-900 mb-6">Complete Your Profile</h2>
//             <p className="text-gray-600 mb-4">
//               Profile setup functionality would allow you to add detailed information including personal details,
//               education, career, family background, lifestyle preferences, photos, and more.
//             </p>
//             <button
//               onClick={() => handleNavigate('dashboard')}
//               className="px-6 py-2 bg-rose-600 text-white rounded-lg hover:bg-rose-700"
//             >
//               Back to Dashboard
//             </button>
//           </div>
//         );
//       default:
//         return <Dashboard onNavigate={handleNavigate} />;
//     }
//   };

//   return (
//     <Layout currentPage={currentPage} onNavigate={handleNavigate}>
//       {renderPage()}
//     </Layout>
//   );
// }

// function App() {
//   return (
//     <AuthProvider>
//       <AppContent />
//     </AuthProvider>
//   );
// }

// export default App;

import React, { useState, useEffect } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
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

  // Redirect to dashboard if authenticated and on landing
  useEffect(() => {
    if (isAuthenticated && currentPage === 'landing') {
      handleNavigate('dashboard');
    }
  }, [isAuthenticated, currentPage]);

  // Handle navigation and update URL
  const handleNavigate = (page: string, data?: any) => {
    setCurrentPage(page as Page);
    setNavigationData(data || {});
    
    // Update URL
    const route = getRouteByPath(page as Page);
    if (route) {
      window.history.pushState({}, '', route.url);
    }
    
    window.scrollTo(0, 0);
  };

  // Handle browser back/forward buttons
  useEffect(() => {
    const handlePopState = () => {
      const path = window.location.pathname;
      const route = getRouteByUrl(path);
      
      if (route) {
        setCurrentPage(route.path);
      }
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  return (
    <Layout currentPage={currentPage} onNavigate={handleNavigate}>
      <Router
        currentPage={currentPage}
        navigationData={navigationData}
        onNavigate={handleNavigate}
        isAuthenticated={isAuthenticated}
        isAdmin={isAdmin}
      />
    </Layout>
  );
}

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;