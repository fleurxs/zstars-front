import React, { useState } from 'react';
import { Star } from 'lucide-react';
import { APP_NAME, TRANSLATIONS, LEGAL_CONTENT } from '../constants';
import { Language } from '../types';
import Modal from './Modal';

interface FooterProps {
  language: Language;
}

const Footer: React.FC<FooterProps> = ({ language }) => {
  const t = TRANSLATIONS[language].footer;
  const legal = LEGAL_CONTENT[language];

  const [modalType, setModalType] = useState<'privacy' | 'terms' | 'api' | null>(null);

  return (
    <>
      <footer className="w-full py-8 px-8 max-w-7xl mx-auto z-10 mt-12">
        <div className="border-t border-zinc-900/50 pt-8 flex flex-col md:flex-row items-center justify-between gap-6">
          
          {/* Left: Logo & Branding */}
          <div className="flex flex-col md:flex-row items-center gap-3 md:gap-4">
            <div className="flex items-center gap-2 opacity-60 hover:opacity-100 transition-opacity cursor-default">
              <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-zinc-900 text-zinc-500">
                <Star className="w-4 h-4 fill-current" />
              </div>
              <span className="text-sm font-bold tracking-tight text-zinc-400">{APP_NAME}</span>
            </div>
            
            <div className="hidden md:block w-px h-4 bg-zinc-800"></div>
            
            <p className="text-[10px] text-zinc-600 max-w-xs text-center md:text-left">
              {t.disclaimer}
            </p>
          </div>

          {/* Right: Links */}
          <div className="flex items-center gap-6 text-xs font-medium text-zinc-500">
            <button 
              onClick={() => setModalType('privacy')}
              className="hover:text-zinc-300 transition-colors"
            >
              {t.privacy}
            </button>
            <button 
              onClick={() => setModalType('terms')}
              className="hover:text-zinc-300 transition-colors"
            >
              {t.terms}
            </button>
            <button
              onClick={() => setModalType('api')}
              className="hover:text-zinc-300 transition-colors"
            >
              {t.api}
            </button>
          </div>
        </div>
      </footer>

      {/* Modals */}
      <Modal 
        isOpen={modalType === 'privacy'}
        onClose={() => setModalType(null)}
        title={t.privacy}
        content={legal.privacy}
      />
      
      <Modal
        isOpen={modalType === 'terms'}
        onClose={() => setModalType(null)}
        title={t.terms}
        content={legal.terms}
      />

      <Modal
        isOpen={modalType === 'api'}
        onClose={() => setModalType(null)}
        title={t.api}
        content={legal.api}
      />
    </>
  );
};

export default Footer;