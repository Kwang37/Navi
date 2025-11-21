import React from 'react';
import { ExternalLink, Heart, Book, Headphones, Shield } from 'lucide-react';

const UI_TEXT = {
  en: {
    title: 'Resource Bridge',
    resources_adapt: 'Resources adapt based on your needs',
    resources: [
      {
        id: 1,
        title: "Campus Counseling Center",
        description: "Professional mental health support",
        icon: Heart,
        link: "#",
        category: "Support"
      },
      {
        id: 2,
        title: "Library Wellness Resources",
        description: "Books and guides on mental wellness",
        icon: Book,
        link: "#",
        category: "Education"
      },
      {
        id: 3,
        title: "Guided Meditation",
        description: "10-minute breathing exercises",
        icon: Headphones,
        link: "#",
        category: "Practice"
      },
      {
        id: 4,
        title: "Crisis Support Line",
        description: "24/7 confidential support",
        icon: Shield,
        link: "#",
        category: "Emergency"
      }
    ]
  },
  zh: {
    title: '资源桥梁',
    resources_adapt: '资源会根据您的需求自动调整',
    resources: [
      {
        id: 1,
        title: "校园心理咨询中心",
        description: "专业心理健康支持",
        icon: Heart,
        link: "#",
        category: "Support"
      },
      {
        id: 2,
        title: "图书馆健康资源",
        description: "心理健康相关书籍和指南",
        icon: Book,
        link: "#",
        category: "Education"
      },
      {
        id: 3,
        title: "引导式冥想",
        description: "10分钟呼吸练习",
        icon: Headphones,
        link: "#",
        category: "Practice"
      },
      {
        id: 4,
        title: "危机支持热线",
        description: "24/7 保密支持",
        icon: Shield,
        link: "#",
        category: "Emergency"
      }
    ]
  }
};

const ResourceBridge = ({ detectedEmotion, language = 'en' }) => {
  const t = UI_TEXT[language];
  const allResources = t.resources;

  // Filter resources based on emotion if needed
  const displayResources = detectedEmotion === 'anxiety' 
    ? allResources.filter(r => r.category === 'Practice' || r.category === 'Support')
    : allResources;

  return (
    <div className="bg-white/80 backdrop-blur-xl border border-white shadow-[0_8px_30px_rgb(0,0,0,0.04)] rounded-2xl p-6 flex flex-col h-full">
      <div className="flex items-center gap-2 mb-4 border-b border-stone-100 pb-3">
        <h3 className="text-sm font-bold text-stone-600 uppercase tracking-wider flex items-center gap-2">
          <ExternalLink size={14} className="text-teal-400" /> {t.title}
        </h3>
      </div>
      
      <div className="flex-1 overflow-y-auto space-y-3">
        {displayResources.map(resource => {
          const IconComponent = resource.icon;
          return (
            <a
              key={resource.id}
              href={resource.link}
              target="_blank"
              rel="noopener noreferrer"
              className="block p-3 rounded-lg bg-stone-50 border border-stone-200 hover:bg-orange-50 transition-all group"
            >
              <div className="flex items-start gap-3">
                <IconComponent size={16} className="text-teal-500 mt-0.5 flex-shrink-0 group-hover:text-orange-500 transition-colors" />
                <div className="flex-1 min-w-0">
                  <div className="text-xs font-medium text-stone-700 group-hover:text-orange-600 transition-colors">
                    {resource.title}
                  </div>
                  <div className="text-xs text-stone-500 mt-1">
                    {resource.description}
                  </div>
                </div>
                <ExternalLink size={12} className="text-stone-400 group-hover:text-teal-500 transition-colors flex-shrink-0 mt-1" />
              </div>
            </a>
          );
        })}
      </div>
      
      <div className="mt-4 pt-4 border-t border-stone-100">
        <p className="text-xs text-stone-400 text-center">
          {t.resources_adapt}
        </p>
      </div>
    </div>
  );
};

export default ResourceBridge;
