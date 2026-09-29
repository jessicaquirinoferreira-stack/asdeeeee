import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { WhatIsStimulation } from './components/WhatIsStimulation';
import { Specialties } from './components/Specialties';
import { TargetAudience } from './components/TargetAudience';
import { AboutSpecialist } from './components/AboutSpecialist';
import { TestimonialsSection } from './components/TestimonialsSection';
import { EducationalArticles } from './components/EducationalArticles';
import { FAQSection } from './components/FAQSection';
import { ContactAndPreBooking } from './components/ContactAndPreBooking';
import { Footer } from './components/Footer';
import { AdminPanel } from './components/AdminPanel';
import { IntroScreen } from './components/IntroScreen';
import { AIAssistantWidget } from './components/AIAssistantWidget';
import { 
  SiteContent, 
  Testimonial, 
  Article,
  DEFAULT_SITE_CONTENT, 
  DEFAULT_TESTIMONIALS, 
  DEFAULT_ARTICLES,
  ensureInitialContent, 
  getTestimonials,
  testConnection
} from './services/firebase';

const LOGO_URL = "https://i.postimg.cc/pdywVngt/Gemini-Generated-Image-vxl628vxl628vxl6.png";

export default function App() {
  const [siteContent, setSiteContent] = useState<SiteContent>(DEFAULT_SITE_CONTENT);
  const [testimonials, setTestimonials] = useState<Testimonial[]>(DEFAULT_TESTIMONIALS);
  const [articles, setArticles] = useState<Article[]>(DEFAULT_ARTICLES);
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [showIntro, setShowIntro] = useState(true);

  useEffect(() => {
    let isMounted = true;
    async function initApp() {
      // Non-blocking connection test
      testConnection().catch(() => {});

      try {
        const content = await ensureInitialContent();
        if (isMounted) setSiteContent(content);

        const loadedTestimonials = await getTestimonials();
        if (isMounted) setTestimonials(loadedTestimonials);
      } catch (err) {
        console.warn("Using fallback initial data:", err);
      } finally {
        if (isMounted) setIsLoading(false);
      }
    }

    initApp();

    // Check if URL has #admin or /admin
    if (window.location.hash === '#admin' || window.location.pathname === '/admin') {
      setIsAdminOpen(true);
      setShowIntro(false); // If accessing admin directly, bypass intro
    }

    const handleHashChange = () => {
      if (window.location.hash === '#admin') {
        setIsAdminOpen(true);
      }
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => {
      isMounted = false;
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, []);

  const refreshTestimonials = async () => {
    try {
      const loaded = await getTestimonials();
      setTestimonials(loaded);
    } catch (e) {
      console.warn("Failed to refresh testimonials:", e);
    }
  };

  return (
    <div className="min-h-screen bg-white text-slate-900 flex flex-col selection:bg-[#8052ff]/20 selection:text-[#8052ff]">
      
      {/* 6-Second Cinematic Entrance Screen */}
      {showIntro && (
        <IntroScreen
          logoUrl={LOGO_URL}
          onComplete={() => setShowIntro(false)}
        />
      )}

      {/* Top sticky navigation */}
      <Header 
        content={siteContent} 
        onOpenAdmin={() => setIsAdminOpen(true)} 
      />

      {/* Main content sections */}
      <main className="flex-1">
        <Hero content={siteContent} />
        <WhatIsStimulation content={siteContent} />
        <Specialties content={siteContent} />
        <TargetAudience content={siteContent} />
        <AboutSpecialist content={siteContent} />
        <TestimonialsSection testimonials={testimonials} />
        <EducationalArticles articles={articles} />
        <FAQSection content={siteContent} />
        <ContactAndPreBooking content={siteContent} />
      </main>

      {/* Site Footer with discrete Admin in center & Replay Intro */}
      <Footer 
        content={siteContent} 
        onOpenAdmin={() => setIsAdminOpen(true)}
        onReplayIntro={() => setShowIntro(true)}
      />

      {/* Official AI Virtual Assistant on the left side */}
      <AIAssistantWidget content={siteContent} />

      {/* Admin Management Modal */}
      <AdminPanel
        isOpen={isAdminOpen}
        onClose={() => {
          setIsAdminOpen(false);
          if (window.location.hash === '#admin') {
            history.replaceState(null, '', ' ');
          }
        }}
        siteContent={siteContent}
        onContentUpdated={(newC) => setSiteContent(newC)}
        testimonials={testimonials}
        onTestimonialsUpdated={refreshTestimonials}
      />

    </div>
  );
}
