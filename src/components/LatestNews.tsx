import React from 'react';
import { Newspaper, ArrowUpRight } from 'lucide-react';
import { NEWS_ITEMS, TRANSLATIONS } from '../constants';
import { Language } from '../types';

interface LatestNewsProps {
  language: Language;
}

const LatestNews: React.FC<LatestNewsProps> = ({ language }) => {
  const items = NEWS_ITEMS[language];
  const t = TRANSLATIONS[language];

  return (
    <div className="w-full mt-10 max-w-[500px]">
      <div className="flex items-center gap-2 mb-5 px-2">
        <Newspaper size={18} className="text-zinc-500" />
        <h2 className="text-lg font-bold text-white">{t.newsTitle}</h2>
      </div>

      <div className="space-y-4">
        {items.map((item) => (
          <article 
            key={item.id}
            className="group flex flex-col sm:flex-row bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden hover:border-zinc-700 transition-all duration-300 hover:shadow-lg hover:shadow-black/50"
          >
            {/* Image Container */}
            <div className="sm:w-32 h-40 sm:h-auto overflow-hidden relative flex-shrink-0">
               <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 to-transparent sm:hidden opacity-80 z-10"></div>
               <img 
                 src={item.image} 
                 alt={item.title}
                 className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
               />
            </div>
            
            {/* Content */}
            <div className="flex-1 p-4 flex flex-col justify-between">
              <div>
                <div className="flex justify-between items-start gap-2 mb-1.5">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-primary-500 bg-primary-500/10 px-2 py-0.5 rounded">
                    {item.date}
                  </span>
                </div>
                
                <h3 className="font-bold text-white leading-tight mb-2 group-hover:text-primary-400 transition-colors">
                  {item.title}
                </h3>
                <p className="text-xs text-zinc-400 line-clamp-2 leading-relaxed">
                  {item.desc}
                </p>
              </div>

              <div className="mt-3 flex items-center text-xs font-medium text-zinc-500 group-hover:text-white transition-colors gap-1">
                {t.readMore}
                <ArrowUpRight size={12} />
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
};

export default LatestNews;