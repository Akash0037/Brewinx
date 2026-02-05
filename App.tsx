
import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import { Navbar } from './components/Navbar';
import { PageTransition } from './components/PageTransition';
import { SmoothScroll } from './components/SmoothScroll';
import { ProtectedRoute } from './components/ProtectedRoute';

// Pages
import { Home } from './pages/Home';
import { Menu } from './pages/Menu';
import { About } from './pages/About';
import { Cart } from './pages/Cart';
import { Login } from './pages/Login';
import { Account } from './pages/Account';

const App: React.FC = () => {
  const location = useLocation();

  return (
    <AppProvider>
      <SmoothScroll>
        <div className="bg-stone-950 min-h-screen selection:bg-orange-500/90 selection:text-stone-950">
          <Navbar />
          <PageTransition />
          
          <main>
            <Routes location={location}>
              <Route path="/" element={<Home />} />
              <Route path="/menu" element={<ProtectedRoute><Menu /></ProtectedRoute>} />
              <Route path="/about" element={<ProtectedRoute><About /></ProtectedRoute>} />
              <Route path="/cart" element={<ProtectedRoute><Cart /></ProtectedRoute>} />
              <Route path="/login" element={<Login />} />
              <Route path="/account" element={<ProtectedRoute><Account /></ProtectedRoute>} />
            </Routes>
          </main>
        </div>
      </SmoothScroll>
    </AppProvider>
  );
};

export default App;
