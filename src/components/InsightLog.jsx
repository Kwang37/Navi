import React from 'react';
import { BookOpen, Sparkles } from 'lucide-react';

const UI_TEXT = {
  en: {
    title: 'Insight Reframing',
    empty: 'Your reframing moments will appear here...',
    example: 'Example:',
    example_original: '"I failed"',
    example_reframed: '→ "I found a way that doesn\'t work yet"'
  },
  zh: {
    title: '认知重构',
    empty: '你的重构时刻将出现在这里...',
    example: '示例：',
    example_original: '"我失败了"',
    example_reframed: '→ "我发现了一条暂时走不通的路"'
  }
};

const InsightLog = ({ insights, language = 'en' }) => {
  const t = UI_TEXT[language];

  return (
    <div className="bg-white/80 backdrop-blur-xl border border-white shadow-[0_8px_30px_rgb(0,0,0,0.04)] rounded-2xl p-6 flex flex-col h-full">
      <div className="flex items-center gap-2 mb-4 border-b border-stone-100 pb-3">
        <h3 className="text-sm font-bold text-stone-600 uppercase tracking-wider flex items-center gap-2">
          <Sparkles size={14} className="text-purple-400" /> {t.title}
        </h3>
      </div>
      
      <div className="flex-1 overflow-y-auto space-y-4">
        {insights.length === 0 ? (
          <div className="text-xs text-stone-400 italic text-center mt-4 space-y-2">
            <p>{t.empty}</p>
            <div className="mt-6 space-y-3 text-left">
              <div className="bg-stone-50 p-3 rounded-lg border border-stone-200">
                <p className="text-stone-500 text-xs mb-1">{t.example}</p>
                <p className="text-stone-600 text-xs italic">"{t.example_original}"</p>
                <p className="text-purple-500 text-xs mt-2 font-medium">{t.example_reframed}</p>
              </div>
            </div>
          </div>
        ) : (
          insights.map((insight, index) => (
            <div 
              key={index}
              className="bg-stone-50 p-3 rounded-lg border border-stone-200 space-y-2"
            >
              <div className="text-xs text-stone-500 italic">
                "{insight.original}"
              </div>
              <div className="text-xs text-purple-500 font-medium">
                → "{insight.reframed}"
              </div>
              {insight.timestamp && (
                <div className="text-xs text-stone-400 mt-1">
                  {new Date(insight.timestamp).toLocaleDateString()}
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default InsightLog;
