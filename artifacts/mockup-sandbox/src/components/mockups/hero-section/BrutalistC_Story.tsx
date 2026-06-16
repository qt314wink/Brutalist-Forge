// artifacts/mockup-sandbox/src/components/mockups/hero-section/BrutalistC_Story.tsx
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, Maximize2 } from 'lucide-react';
import './_group.css';

export function BrutalistC_Story() {
  const [activePanel, setActivePanel] = useState(0);

  const panels = [
    { title: "THE SPARK", bg: "#CCFF00", text: "It begins with a prompt. A loose thread in the collective fabric." },
    { title: "THE ENGINE", bg: "#FF3366", text: "Algorithms shred the intent, finding the chaotic beautiful edges." },
    { title: "THE RESULT", bg: "#33CCFF", text: "A tactile manifestation. Real, gritty, undeniable." }
  ];

  return (
    <div className="min-h-screen bg-black text-white font-sans p-4 lg:p-8 flex flex-col">
      {/* Top Header */}
      <header className="flex justify-between items-end border-b-8 border-white pb-4 mb-8">
        <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tighter">Collective OS <span className="text-[#FF3366]">Vol.1</span></h1>
        <div className="font-mono text-sm font-bold bg-white text-black px-4 py-2 border-4 border-black shadow-[4px_4px_0_#CCFF00]">
          ISSUE #001
        </div>
      </header>

      {/* Comic Panel Layout */}
      <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 max-w-7xl mx-auto w-full">
        {panels.map((panel, idx) => {
          const isActive = activePanel === idx;
          return (
            <motion.div 
              key={idx}
              className={`relative bg-white border-8 border-black flex flex-col overflow-hidden cursor-pointer transition-all duration-300 ${isActive ? 'shadow-[16px_16px_0_#FF3366] -translate-y-4' : 'shadow-[8px_8px_0_rgba(255,255,255,0.2)] hover:-translate-y-2'}`}
              onClick={() => setActivePanel(idx)}
              layout
            >
              {/* Halftone background pattern */}
              <div className="absolute inset-0 opacity-10 pointer-events-none" 
                   style={{ backgroundImage: 'radial-gradient(circle, #000 2px, transparent 2.5px)', backgroundSize: '10px 10px' }} />
              
              <div className="h-48 md:h-1/2 w-full border-b-8 border-black flex items-center justify-center relative overflow-hidden" style={{ backgroundColor: panel.bg }}>
                <motion.div 
                  className="absolute text-9xl font-black text-black opacity-20 transform rotate-12 origin-bottom-left"
                  animate={{ scale: isActive ? 1.2 : 1, rotate: isActive ? 5 : 12 }}
                >
                  {idx + 1}
                </motion.div>
                
                {isActive && (
                  <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="absolute inset-0 flex items-center justify-center">
                     <div className="bg-white px-6 py-2 border-4 border-black font-black text-xl text-black transform -rotate-6 shadow-[6px_6px_0_#000]">
                        ACTION!
                     </div>
                  </motion.div>
                )}
              </div>

              <div className="p-6 md:p-8 flex-1 flex flex-col justify-between bg-white text-black relative z-10">
                <div>
                  <div className="inline-block bg-black text-white px-3 py-1 font-bold font-mono text-sm mb-4 border-2 border-black">
                    PANEL 0{idx + 1}
                  </div>
                  <h2 className="text-3xl lg:text-4xl font-black uppercase leading-none mb-4">{panel.title}</h2>
                  <p className="text-lg font-bold leading-snug border-l-4 border-black pl-4">
                    {panel.text}
                  </p>
                </div>
                
                <div className="mt-8 flex justify-end">
                  <motion.button 
                    whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}
                    className="w-12 h-12 rounded-full border-4 border-black flex items-center justify-center hover:bg-[#CCFF00] transition-colors"
                  >
                    <ChevronRight size={24} strokeWidth={4} />
                  </motion.button>
                </div>
              </div>

            </motion.div>
          );
        })}
      </div>

      {/* Footer / Read Next */}
      <div className="mt-8 flex justify-center pb-8">
        <button className="bg-[#CCFF00] text-black font-black uppercase text-2xl px-12 py-4 border-8 border-white shadow-[12px_12px_0_#FF3366] hover:translate-x-1 hover:translate-y-1 hover:shadow-[4px_4px_0_#FF3366] transition-all flex items-center gap-4">
          Proceed to Canvas <Maximize2 strokeWidth={3} />
        </button>
      </div>

    </div>
  );
}