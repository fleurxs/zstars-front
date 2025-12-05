
import React, { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';
import { FAQ_ITEMS, TRANSLATIONS } from '../constants';
import { Language } from '../types';

interface FAQProps {
  language: Language;
}

const FAQ: React.FC<FAQProps> = ({ language }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const items = FAQ_ITEMS[language];
  const title = TRANSLATIONS[language].faqTitle;

  const toggleItem = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="w-full mt-8 max-w-[500px]">
      <div className="flex items-center gap-2 mb-4 px-2">
        <HelpCircle size={18} className="text-zinc-500" />
        <h2 className="text-lg font-bold text-white">{title}</h2>
      </div>
      
      <div className="space-y-3">
        {items.map((item, index) => (
          <div 
            key={index}
            className="group bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden transition-all duration-300 hover:border-zinc-700"
          >
            <button
              onClick={() => toggleItem(index)}
              className="w-full flex items-center justify-between p-4 text-left focus:outline-none"
            >
              <span className="font-medium text-zinc-200 text-sm md:text-base pr-4">
                {item.question}
              </span>
              <ChevronDown 
                size={18} 
                className={`text-zinc-500 transition-transform duration-300 flex-shrink-0 ${
                  openIndex === index ? 'rotate-180 text-primary-400' : 'group-hover:text-zinc-400'
                }`} 
              />
            </button>
            
            <div 
              className={`grid transition-all duration-300 ease-in-out ${
                openIndex === index ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
              }`}
            >
              <div className="overflow-hidden">
                <div className="p-4 pt-0 text-sm text-zinc-400 leading-relaxed border-t border-zinc-800/50 mt-1">
                  {item.answer}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQ;
