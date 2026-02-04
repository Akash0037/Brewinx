
import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import { Navbar } from './components/Navbar';
import { PageTransition } from './components/PageTransition';
import { SmoothScroll } from './components/SmoothScroll';

// Pages
import { Home } from './pages/Home';
import { Menu } from './pages/Menu';
import { About } from './pages/About';
import { Cart } from './pages/Cart';
import { Login } from './pages/Login';

const App: React.FC = () => {
  const location = useLocation();

  return (
    <AppProvider>
      <SmoothScroll>
        <div className="bg-stone-950 min-h-screen selection:bg-amber-500/90 selection:text-stone-950">
          <Navbar />
          <PageTransition />
          
          <main>
            <Routes location={location} key={location.pathname}>
              <Route path="/" element={<Home />} />
              <Route path="/menu" element={<Menu />} />
              <Route path="/about" element={<About />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/login" element={<Login />} />
            </Routes>
          </main>
        </div>
      </SmoothScroll>
    </AppProvider>
  );
};

export default App;
