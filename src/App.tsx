import React, { useState, useEffect } from 'react';
import LoadingScreen from './components/LoadingScreen';
import HeartsCanvas from './components/HeartsCanvas';
import HeroSection from './components/HeroSection';
import WelcomeSection from './components/WelcomeSection';
import GallerySection from './components/GallerySection';
import LoveStorySection from './components/LoveStorySection';
import ReasonsSection from './components/ReasonsSection';
import LoveLetterSection from './components/LoveLetterSection';
import QuotesSection from './components/QuotesSection';
import CountdownSection from './components/CountdownSection';
import MusicSection from './components/MusicSection';
import WishesSection from './components/WishesSection';
import SurpriseSection from './components/SurpriseSection';
import FinalSection from './components/FinalSection';

export default function App() {
  const [isLoading, setIsLoading] = useState(true);

  // Set the browser tab title as requested: "To My Beloved NAEMA ❤️"
  useEffect(() => {
    document.title = 'To My Beloved NAEMA ❤️';
  }, []);

  const handleScrollToNext = () => {
    document.getElementById('welcome-section')?.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
  };

  const handleTriggerMusicFromSurprise = () => {
    // If we want to automatically trigger music player on the page
    console.log('Surprise triggered. Autoplaying music.');
  };

  return (
    <div className="relative min-h-screen w-full bg-slate-950 text-slate-100 overflow-x-hidden selection:bg-rose-500/30 selection:text-white">
      {/* Immersive background particles */}
      {!isLoading && <HeartsCanvas />}

      {/* Loading Screen */}
      {isLoading && <LoadingScreen onComplete={() => setIsLoading(false)} />}

      {/* Main Page Content */}
      {!isLoading && (
        <div className="relative w-full z-10 flex flex-col min-h-screen">
          
          {/* Header Bar - Elegant brand title */}
          <header className="absolute top-0 left-0 right-0 z-30 h-16 flex items-center justify-between px-6 md:px-12 pointer-events-none select-none">
            <span className="text-lg md:text-xl font-bold tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-rose-400 to-pink-400 font-sans pointer-events-auto">
              NAEMA ❤️
            </span>
          </header>

          {/* 1. Hero Section */}
          <HeroSection onNextSection={handleScrollToNext} />

          {/* 2. Welcome Section */}
          <WelcomeSection />

          {/* 3. Photo Gallery */}
          <GallerySection />

          {/* 4. Love Story Timeline */}
          <LoveStorySection />

          {/* 5. Reasons Section */}
          <ReasonsSection />

          {/* 6. Love Letter Section */}
          <LoveLetterSection />

          {/* 7. Quotes Section */}
          <QuotesSection />

          {/* 8. Countdown Section */}
          <CountdownSection />

          {/* 9. Music Player Section */}
          <MusicSection />

          {/* 10. Wishes Section */}
          <WishesSection />

          {/* 11. Climax Surprise Section */}
          <SurpriseSection onTriggerMusic={handleTriggerMusicFromSurprise} />

          {/* 12. Final Climax & Footer */}
          <FinalSection />

        </div>
      )}
    </div>
  );
}
