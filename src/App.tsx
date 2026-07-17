import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import { useLenis, getLenis } from './hooks/useLenis';
import AdminApp from './dashboard/AdminApp';
import ChatWidget from './components/chat/ChatWidget';

// Pages
import Home from './pages/Home';
import About from './pages/About';
import Programs from './pages/Programs';
import Stories from './pages/Stories';
import Events from './pages/Events';
import Join from './pages/Join';
import Give from './pages/Give';
import Resources from './pages/Resources';
import Contact from './pages/Contact';
import FAQ from './pages/FAQ';
import Legal from './pages/Legal';

export default function App() {
  const [currentPath, setCurrentPath] = useState(window.location.pathname + window.location.search || '/');
  const [selectedProgramId, setSelectedProgramId] = useState<string | null>(null);

  // Init Lenis smooth scroll + GSAP ScrollTrigger sync
  useLenis();

  useEffect(() => {
    const handleLocationChange = () => {
      const pathAndSearch = window.location.pathname + window.location.search;
      setCurrentPath(pathAndSearch || '/');
      if (!window.location.pathname.startsWith('/programs')) {
        setSelectedProgramId(null);
      }
    };
    window.addEventListener('popstate', handleLocationChange);
    window.addEventListener('pushstate-change', handleLocationChange);
    return () => {
      window.removeEventListener('popstate', handleLocationChange);
      window.removeEventListener('pushstate-change', handleLocationChange);
    };
  }, []);

  // ── Admin routes — bypass public Header/Footer entirely ──
  if (currentPath.startsWith('/admin')) {
    return <AdminApp />;
  }

  const handleNavigate = (path: string) => {
    // Gracefully clean up any legacy hash-based paths passed in
    let cleanPath = path;
    if (path.startsWith('#/')) {
      cleanPath = path.substring(1);
    } else if (path.startsWith('#')) {
      cleanPath = '/' + path.substring(1);
    }

    window.history.pushState(null, '', cleanPath);
    setCurrentPath(cleanPath);
    
    // Notify window of the location state change
    window.dispatchEvent(new Event('pushstate-change'));

    // Use Lenis smooth scroll to top if available, otherwise native
    const lenis = getLenis();
    if (lenis) {
      lenis.scrollTo(0, { immediate: false, duration: 1.2 });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleSelectProgram = (id: string) => {
    setSelectedProgramId(id);
    handleNavigate(`/programs?id=${id}`);
  };

  // Select appropriate page component based on standard pathname prefix
  const renderPage = () => {
    const path = currentPath.split('?')[0]; // Strip search params
    const query = currentPath.split('?')[1] || '';
    const params = new URLSearchParams(query);

    if (path === '/' || path === '' || path === '/index.html') {
      return <Home onNavigate={handleNavigate} onSelectProgram={handleSelectProgram} />;
    }
    if (path.startsWith('/about')) {
      return <About />;
    }
    if (path.startsWith('/programs')) {
      const programId = params.get('id') || selectedProgramId;
      return (
        <Programs
          onNavigate={handleNavigate}
          selectedProgramId={programId}
          onClearProgram={() => setSelectedProgramId(null)}
        />
      );
    }
    if (path.startsWith('/stories')) {
      return <Stories />;
    }
    if (path.startsWith('/events')) {
      return <Events />;
    }
    if (path.startsWith('/join')) {
      return <Join currentPath={currentPath} />;
    }
    if (path.startsWith('/give')) {
      return <Give />;
    }
    if (path.startsWith('/resources')) {
      return <Resources onNavigate={handleNavigate} />;
    }
    if (path.startsWith('/contact')) {
      return <Contact />;
    }
    if (path.startsWith('/faq')) {
      return <FAQ />;
    }

    // Legal tabs mapping
    if (path.startsWith('/privacy') || path.includes('privacy')) {
      const activeTab = (params.get('tab') as any) || 'privacy';
      return <Legal initialTab={activeTab} />;
    }
    if (path.startsWith('/terms')) {
      return <Legal initialTab="terms" />;
    }
    if (path.startsWith('/refund')) {
      return <Legal initialTab="refund" />;
    }
    if (path.startsWith('/nondiscrimination')) {
      return <Legal initialTab="nondiscrimination" />;
    }

    // Default Fallback
    return <Home onNavigate={handleNavigate} onSelectProgram={handleSelectProgram} />;
  };

  return (
    <div id="whenmen-app-root" className="min-h-screen flex flex-col justify-between bg-brand-neutral-bg antialiased">
      {/* Persisted Header Navigation */}
      <Header currentPath={currentPath} onNavigate={handleNavigate} />

      {/* Dynamic Content Mount with scroll-top container */}
      <main className="flex-grow pt-0">
        {renderPage()}
      </main>

      {/* Persisted Footer */}
      <Footer onNavigate={handleNavigate} />

      {/* Global Chat Widget */}
      <ChatWidget onNavigate={handleNavigate} />
    </div>
  );
}
