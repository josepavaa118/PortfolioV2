"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Home, FolderOpen, User, Code, GraduationCap, Mail } from "lucide-react";

const navItems = [
  { label: "Inicio", href: "#home", icon: Home },
  { label: "Proyectos", href: "#projects", icon: FolderOpen },
  { label: "Sobre mí", href: "#about", icon: User },
  { label: "Skills", href: "#skills", icon: Code },
  { label: "Educación", href: "#education", icon: GraduationCap },
  { label: "Contacto", href: "#contact", icon: Mail },
];

export default function LottieTabMenu() {
  const [active, setActive] = useState(0);

  // Listen for scroll to update active tab
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'projects', 'about', 'skills', 'contact'];
      const scrollPosition = window.scrollY + window.innerHeight / 2;
      
      for (let i = 0; i < sections.length; i++) {
        const element = document.getElementById(sections[i]);
        if (element) {
          const rect = element.getBoundingClientRect();
          const elementTop = rect.top + window.scrollY;
          const elementBottom = elementTop + rect.height;
          
          if (scrollPosition >= elementTop && scrollPosition < elementBottom) {
            setActive(i);
            break;
          }
        }
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="fixed bottom-0 left-0 w-full z-50">
      <div className="max-w-lg mx-auto mb-4">
        <div className="bg-slate-800/90 backdrop-blur-md border border-blue-400/30 rounded-2xl px-6 py-3">
          <div className="flex items-center justify-around">
            {navItems.map((item, idx) => {
              const Icon = item.icon;
              const isActive = active === idx;
              
              return (
                <div key={item.label} className="relative group">
                  <motion.button
                    className={`relative flex items-center justify-center p-3 rounded-xl transition-all duration-300 ${
                      isActive ? "bg-blue-500/20" : "hover:bg-slate-700/50"
                    }`}
                    onClick={() => {
                      setActive(idx);
                      const element = document.getElementById(item.href.replace('#', ''));
                      if (element) {
                        element.scrollIntoView({ behavior: 'smooth' });
                      }
                    }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {isActive && (
                      <motion.div
                        className="absolute inset-0 bg-blue-400 rounded-xl"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 0.2, scale: 1 }}
                        transition={{ duration: 0.2 }}
                      />
                    )}
                    
                    <Icon 
                      size={22} 
                      className={`relative z-10 transition-colors duration-300 ${
                        isActive ? "text-blue-400" : "text-white/70"
                      }`} 
                    />
                  </motion.button>
                  
                  {/* Tooltip */}
                  <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-1 bg-black/90 text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap">
                    {item.label}
                    <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-black/90"></div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
