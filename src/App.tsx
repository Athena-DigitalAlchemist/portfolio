import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import GridBackground from './components/GridBackground';
import CurtainReveal from './components/CurtainReveal';
import HomePage from './pages/HomePage';
import WorkPage from './pages/WorkPage';
import ProjectPage from './pages/ProjectPage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import LoadingScreen from './components/LoadingScreen';

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingComplete, setIsLoadingComplete] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

  const handleLoadingAnimationComplete = () => {
    setIsLoadingComplete(true);
  };

  return (
    <Router>
      <div className="relative bg-black min-h-screen overflow-hidden">
        <LoadingScreen 
          isLoading={isLoading} 
          onAnimationComplete={handleLoadingAnimationComplete} 
        />
        <CurtainReveal isReady={isLoadingComplete}>
          <div className="relative bg-white text-black">
            <GridBackground />
            <Header />
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/work" element={<WorkPage />} />
              <Route path="/work/:slug" element={<ProjectPage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/contact" element={<ContactPage />} />
            </Routes>
            <Footer />
          </div>
        </CurtainReveal>
      </div>
    </Router>
  );
}

export default App;