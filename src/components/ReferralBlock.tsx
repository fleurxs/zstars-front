import React from 'react';
import { Gift, ChevronRight } from 'lucide-react';
import { TRANSLATIONS } from '../constants';
import { Language } from '../types';

interface ReferralBlockProps {
  language: Language;
}

const ReferralBlock: React.FC<ReferralBlockProps> = ({ language }) => {
  const t = TRANSLATIONS[language].referral;

  return (
    <div className="w-full mt-6 bg-zinc-900 border border-zinc-800 rounded-2xl p-5 flex items-center gap-4 relative overflow-hidden group cursor-pointer hover:border-zinc-700 transition-all shadow-xl">
      {/* Background Effect */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-primary-500/5 rounded-full blur-2xl -mr-16 -mt-16 transition-opacity opacity-50 group-hover:opacity-80 pointer-events-none"></div>
      
      {/* Icon */}
      <div className="w-12 h-12 rounded-full bg-blue-500/10 flex items-center justify-center flex-shrink-0 text-blue-400 group-hover:scale-110 transition-transform duration-300">
        <Gift size={24} />
      </div>
      
      {/* Text Content */}
      <div className="flex-1 z-10">
        <h3 className="font-bold text-white text-base mb-1 group-hover:text-primary-400 transition-colors">
          {t.title}
        </h3>
        <p className="text-xs text-zinc-400 leading-relaxed max-w-[90%]">
          {t.desc}
        </p>
      </div>
      
      {/* Arrow */}
      <div className="z-10 text-zinc-600 group-hover:text-primary-400 transition-colors">
        <ChevronRight size={20} />
      </div>
    </div>
  );
};

export default ReferralBlock;