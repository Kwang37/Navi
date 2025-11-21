import React from 'react';
import { X, MessageCircle } from 'lucide-react';

const TutorialCard = ({ onClose, language }) => {
  // Multilingual content
  const content = {
    en: {
      title: "Hi, I'm Navi.",
      body: "I'm your AI companion based on Adlerian psychology. I'm here to listen without judgment.",
      action: "Click the orb below to start speaking.",
      tip: "Try saying: \"I feel overwhelmed today...\""
    },
    zh: {
      title: "你好，我是 Navi。",
      body: "我是基于阿德勒心理学的 AI 伴侣。我会在这里安静地倾听，不带任何评判。",
      action: "点击下方的光球即可开始对话。",
      tip: "试着说：\"我今天感觉压力很大……\""
    }
  };

  const t = content[language] || content.en;

  return (
    // Container: absolute positioning + custom floating animation
    <div className="absolute -top-[40px] md:-top-[60px] left-1/2 -translate-x-1/2 z-50 w-80 md:w-96 animate-float">
      
      {/* Card body: glassmorphism effect */}
      <div className="relative bg-white/80 backdrop-blur-xl border border-white shadow-[0_20px_50px_rgba(251,146,60,0.15)] rounded-2xl p-5">
        
        {/* Close button */}
        <button 
          onClick={onClose}
          className="absolute top-3 right-3 text-stone-400 hover:text-stone-600 bg-stone-100 hover:bg-stone-200 rounded-full p-1 transition-colors"
          aria-label="Close tutorial"
        >
          <X size={14} />
        </button>

        {/* Title area */}
        <div className="flex items-center gap-2 mb-3">
          <div className="p-2 bg-orange-100 rounded-lg text-orange-500">
            <MessageCircle size={18} />
          </div>
          <h3 className="font-bold text-stone-700 text-lg">{t.title}</h3>
        </div>

        {/* Body text */}
        <p className="text-stone-600 text-sm leading-relaxed mb-3">
          {t.body}
        </p>

        {/* Action guidance area */}
        <div className="bg-orange-50/80 rounded-lg p-3 border border-orange-100">
          <p className="text-xs font-bold text-orange-600 uppercase tracking-wide mb-1">
            {t.action}
          </p>
          <p className="text-xs text-stone-500 italic">
            {t.tip}
          </p>
        </div>

        {/* Bottom decorative arrow: pointing to the orb below */}
        <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-white border-r border-b border-white rotate-45"></div>
      </div>
    </div>
  );
};

export default TutorialCard;

