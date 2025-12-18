import React from 'react';
import Link from 'next/link';
import {Star, Globe} from 'lucide-react';
import {APP_NAME, TRANSLATIONS} from '../constants';
import {Language} from '../types';

interface NavbarProps {
  language: Language;
  setLanguage: (lang: Language) => void;
}

const Navbar: React.FC<NavbarProps> = ({ language, setLanguage }) => {
  const t = TRANSLATIONS[language].nav;

  const toggleLanguage = () => {
    setLanguage(language === 'ru' ? 'en' : 'ru');
  };

  return (
    <nav className="w-full py-6 px-8 flex items-center justify-between max-w-7xl mx-auto z-50">
      {/* Logo */}
      <Link href="/" className="flex items-center gap-2 group">
        <div className="relative flex items-center justify-center w-8 h-8 rounded-lg bg-primary-400 text-zinc-900 group-hover:bg-primary-500 transition-colors">
          <Star className="w-5 h-5 fill-current" />
        </div>
        <span className="text-xl font-bold tracking-tight text-white">{APP_NAME}</span>
      </Link>

      {/* Links & Lang Switcher */}
      <div className="flex items-center gap-6 md:gap-8">
        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-zinc-400">
          <a href="#about" className="hover:text-white transition-colors">{t.about}</a>
          <a href="#contacts" className="hover:text-white transition-colors">{t.contacts}</a>
        </div>
        
        {/* Language Switcher */}
        <button 
          onClick={toggleLanguage}
          className="flex items-center gap-1.5 text-xs font-semibold bg-zinc-800/50 hover:bg-zinc-800 text-zinc-300 hover:text-white px-3 py-1.5 rounded-full transition-all border border-zinc-700/50"
        >
          <Globe size={14} />
          <span className="uppercase">{language}</span>
        </button>
      </div>
    </nav>
  );
};

export default Navbar;