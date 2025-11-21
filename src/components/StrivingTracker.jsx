import React from 'react';
import { CheckCircle, Circle, Trophy } from 'lucide-react';

const UI_TEXT = {
  en: {
    title: 'Micro-Striving',
    empty: 'Talk to Navi to find your next step...',
    done: 'Done'
  },
  zh: {
    title: '微行动追踪',
    empty: '与 Navi 对话，找到你的下一步...',
    done: '已完成'
  }
};

const StrivingTracker = ({ tasks, onToggle, language = 'en' }) => {
  const completedCount = tasks.filter(t => t.completed).length;
  const t = UI_TEXT[language];

  return (
    <div className="bg-white/80 backdrop-blur-xl border border-white shadow-[0_8px_30px_rgb(0,0,0,0.04)] rounded-2xl p-6 w-full h-full flex flex-col">
      <div className="flex items-center justify-between mb-4 border-b border-stone-100 pb-3">
        <h3 className="text-sm font-bold text-stone-600 uppercase tracking-wider flex items-center gap-2">
          <Trophy size={14} className="text-orange-400" /> {t.title}
        </h3>
        <span className="text-xs text-stone-400 font-medium">{completedCount}/{tasks.length} {t.done}</span>
      </div>
      
      <div className="flex-1 overflow-y-auto space-y-2">
        {tasks.length === 0 ? (
          <p className="text-xs text-stone-400 italic text-center mt-4">
            {t.empty}
          </p>
        ) : (
          tasks.map(task => (
            <div 
              key={task.id}
              onClick={() => onToggle(task.id)}
              className={`p-3 rounded-lg flex items-center gap-3 cursor-pointer transition-all duration-300 border
                ${task.completed 
                  ? 'bg-green-50 border-green-200 hover:bg-green-100' 
                  : 'bg-stone-50 hover:bg-orange-50 border-stone-200'}
              `}
            >
              {task.completed ? 
                <CheckCircle size={18} className="text-green-500 flex-shrink-0" /> : 
                <Circle size={18} className="text-stone-300 flex-shrink-0" />
              }
              <span className={`text-sm flex-1 ${task.completed ? 'text-stone-400 line-through' : 'text-stone-600'}`}>
                {task.text}
              </span>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default StrivingTracker;
