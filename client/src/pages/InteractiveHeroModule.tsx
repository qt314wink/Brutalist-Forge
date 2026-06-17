import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Zap, Play, Image as ImageIcon, Layers } from 'lucide-react';
import { Nav } from '@/components/Layout';

export default function InteractiveHeroModule({ setPage }: { setPage: (p: string) => void }) {
  const containerRef = useRef(null);
  const [activeNode, setActiveNode] = useState<string | null>(null);

  const nodes = [
    { id: '1', title: 'SYNTH', color: '#CCFF00', icon: Zap, x: 50, y: 50 },
    { id: '2', title: 'RENDER', color: '#33CCFF', icon: ImageIcon, x: 250, y: 150 },
    { id: '3', title: 'COLLAGE', color: '#FF3366', icon: Layers, x: 100, y: 300 },
  ];

  return (
    <div className="min-h-screen bg-[#111] text-white font-sans overflow-hidden relative selection:bg-[#CCFF00] selection:text-black">
      <Nav currentPage="module-interactive-hero" setPage={setPage} />
      {/* Background dot grid */}
      <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: 'radial-gradient(#444 2px, transparent 2px)', backgroundSize: '32px 32px' }} />

      <div ref={containerRef} className="relative z-10 pt-20">
      {/* Marquee */}
      <div className="absolute top-24 left-0 w-[120%] -rotate-2 bg-[#FF3366] border-y-8 border-black py-4 z-0 flex whitespace-nowrap shadow-[0_8px_0_#000]">
        <motion.div animate={{ x: ["0%", "-50%"] }} transition={{ repeat: Infinity, ease: "linear", duration: 10 }} className="flex items-center gap-12 font-black uppercase tracking-widest text-2xl text-black">
          {Array(10).fill("INTERACTIVE PHYSICS PROTOCOL // ").map((t, i) => <span key={i}>{t}</span>)}
        </motion.div>
      </div>

      <div className="max-w-[1440px] mx-auto p-8 pt-40 relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 h-screen items-start">
        
        {/* Left: Interactive Sandbox Area */}
        <div className="relative h-[600px] bg-white border-8 border-black shadow-[16px_16px_0_#000] p-4 flex items-center justify-center overflow-hidden" 
             style={{ backgroundImage: 'repeating-linear-gradient(45deg, #f0f0f0 25%, transparent 25%, transparent 75%, #f0f0f0 75%, #f0f0f0), repeating-linear-gradient(45deg, #f0f0f0 25%, #fff 25%, #fff 75%, #f0f0f0 75%, #f0f0f0)', backgroundPosition: '0 0, 10px 10px', backgroundSize: '20px 20px' }}>
          
          <div className="absolute top-4 left-4 bg-black text-white px-4 py-1 font-mono font-bold text-sm z-20">
            [ PHYSICS SANDBOX : DRAG NODES ]
          </div>

          {nodes.map((node) => {
            const Icon = node.icon;
            return (
              <motion.div
                key={node.id}
                drag
                dragConstraints={containerRef}
                dragElastic={0.2}
                whileDrag={{ scale: 1.1, zIndex: 50, shadow: "12px 12px 0px 0px rgba(0,0,0,1)" }}
                onDragStart={() => setActiveNode(node.id)}
                onDragEnd={() => setActiveNode(null)}
                className={`absolute w-32 h-32 border-4 border-black flex flex-col items-center justify-center gap-2 cursor-grab active:cursor-grabbing shadow-[8px_8px_0_#000] transition-colors`}
                style={{ backgroundColor: node.color, left: node.x, top: node.y }}
                initial={{ rotate: Math.random() * 20 - 10 }}
              >
                <Icon size={32} className="text-black" strokeWidth={3} />
                <span className="font-black text-black text-sm">{node.title}</span>
              </motion.div>
            );
          })}

          {/* Central Receiver Node */}
          <motion.div 
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 rounded-full border-8 border-black bg-white flex items-center justify-center shadow-[12px_12px_0_#000] z-0"
            animate={{ 
              scale: activeNode ? 1.05 : 1,
              borderColor: activeNode ? '#FF3366' : '#000',
              borderStyle: activeNode ? 'dashed' : 'solid'
            }}
          >
            <div className="font-black text-black text-center leading-tight text-xl">
              DROP<br/>HERE
            </div>
          </motion.div>

        </div>

        {/* Right: Typography & Story */}
        <div className="flex flex-col gap-8 justify-center h-[600px]">
          <motion.h1 
            initial={{ x: 50, opacity: 0 }} animate={{ x: 0, opacity: 1 }}
            className="text-7xl lg:text-8xl font-black uppercase tracking-tighter leading-[0.85] text-white"
            style={{ textShadow: '6px 6px 0 #FF3366' }}
          >
            Tactile<br/>
            <span className="text-[#CCFF00] inline-block -rotate-2 mt-4" style={{ textShadow: '6px 6px 0 #000' }}>Feedback.</span>
          </motion.h1>

          <p className="text-xl font-bold text-gray-300 max-w-lg border-l-8 border-[#33CCFF] pl-6 py-2">
            Engage with the system. Every element is a physical object. Combine nodes to synthesize new narrative branches.
          </p>

          <button className="self-start group relative bg-white text-black font-black uppercase text-2xl px-8 py-4 border-8 border-black shadow-[8px_8px_0_#CCFF00] hover:shadow-[12px_12px_0_#FF3366] hover:-translate-y-1 transition-all active:translate-y-2 active:shadow-[0_0_0_#000]">
            <span className="flex items-center gap-3">
              Initialize Run <Play size={24} fill="currentColor" />
            </span>
          </button>
        </div>

      </div>
      </div>
    </div>
  );
}