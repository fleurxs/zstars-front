
import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Send, Wallet, ExternalLink } from 'lucide-react';
import { SLIDES } from '../constants';
import { Language } from '../types';

interface InfoSliderProps {
  language: Language;
}

const InfoSlider: React.FC<InfoSliderProps> = ({ language }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const slides = SLIDES[language];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [slides.length]);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <div className="w-full mt-6 relative group">
      <div className="overflow-hidden rounded-2xl bg-zinc-900 border border-zinc-800 shadow-xl relative min-h-[140px]">
        <div 
          className="flex transition-transform duration-500 ease-in-out h-full"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {slides.map((slide) => (
            <div key={slide.id} className="w-full flex-shrink-0 p-6 flex items-center justify-between relative">
              {/* Content */}
              <div className="z-10 max-w-[70%] space-y-2">
                <h3 className="text-white font-bold text-lg leading-tight flex items-center gap-2">
                  {slide.title}
                </h3>
                <p className="text-zinc-400 text-sm leading-relaxed text-balance">
                  {slide.text}
                </p>
                <a 
                  href={slide.linkUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-primary-400 hover:text-primary-500 text-sm font-medium transition-colors mt-1"
                >
                  {slide.linkLabel} <ExternalLink size={12} />
                </a>
              </div>

              {/* Decorative Icon */}
              <div className="relative z-10 flex items-center justify-center w-16 h-16 rounded-full bg-zinc-800/50 border border-zinc-700/50">
                {slide.iconType === 'telegram' ? (
                  <Send className="w-8 h-8 text-blue-400 -ml-1 mt-0.5" />
                ) : (
                  <Wallet className="w-8 h-8 text-blue-400" />
                )}
                {/* Decorative circles */}
                <div className="absolute -z-10 inset-0 rounded-full bg-blue-500/20 blur-xl"></div>
              </div>
              
              {/* Background Glow */}
              <div className="absolute top-0 right-0 w-32 h-full bg-gradient-to-l from-zinc-800/20 to-transparent pointer-events-none"></div>
            </div>
          ))}
        </div>

        {/* Controls */}
        <button 
          onClick={prevSlide}
          className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center rounded-full bg-black/20 hover:bg-black/40 text-white/50 hover:text-white transition-all opacity-0 group-hover:opacity-100 z-20 backdrop-blur-sm"
        >
          <ChevronLeft size={16} />
        </button>
        
        <button 
          onClick={nextSlide}
          className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center rounded-full bg-black/20 hover:bg-black/40 text-white/50 hover:text-white transition-all opacity-0 group-hover:opacity-100 z-20 backdrop-blur-sm"
        >
          <ChevronRight size={16} />
        </button>

        {/* Dots */}
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5 z-20">
          {slides.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                idx === currentIndex ? 'bg-primary-400 w-4' : 'bg-zinc-700 hover:bg-zinc-600'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default InfoSlider;
