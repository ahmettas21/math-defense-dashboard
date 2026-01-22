
"use client";

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SystemSelector from '@/components/SystemSelector';
import LiveMatrix from '@/components/LiveMatrix';
import { Sparkles, Play, RotateCcw, ShieldCheck, Activity, Brain, Fingerprint, Lock, Shield, Zap, Info } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Home() {
  const [selectedSystem, setSelectedSystem] = useState('fano_7');
  const [elements, setElements] = useState([]);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const systemSizes = {
    'fano_7': 7,
    'affine_9': 9,
    'projective_13': 13,
    'steiner_15': 15
  };

  const systemNames = {
    'fano_7': 'Fano Guard',
    'affine_9': 'Affine Grid',
    'projective_13': 'Nano Armor',
    'steiner_15': 'Steiner Net'
  };

  // Sync initial elements
  useEffect(() => {
    const n = systemSizes[selectedSystem];
    setElements(Array.from({ length: n }, (_, i) => (i + 1).toString()));
    setResult(null);
  }, [selectedSystem]);

  const handleSystemChange = (systemId) => {
    setSelectedSystem(systemId);
    setError('');
  };

  const handleInputChange = (index, value) => {
    const newElements = [...elements];
    newElements[index] = value;
    setElements(newElements);
  };

  const handleGenerate = async () => {
    setLoading(true);
    setError('');
    setResult(null);

    try {
      const n = systemSizes[selectedSystem];
      const inputElements = elements.map(e => (e.trim() === '' ? '?' : isNaN(e) ? e : Number(e)));

      if (inputElements.includes('?')) {
        throw new Error(`Critical Error: All ${n} nodes must be initialized.`);
      }

      const response = await axios.post(`http://localhost:8000/generate/${selectedSystem}`, {
        elements: inputElements,
        key: "1432756"
      });

      setResult(response.data);

    } catch (err) {
      console.error(err);
      setError(err.response?.data?.detail || err.message || "Activation Failed.");
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    const n = systemSizes[selectedSystem];
    setElements(Array.from({ length: n }, (_, i) => (i + 1).toString()));
    setResult(null);
    setError('');
  };

  return (
    <main className="min-h-screen bg-[#020617] text-slate-200 selection:bg-green-500/30">

      {/* 🏙️ TOP NAV (Vercel Style) */}
      <nav className="border-b border-white/[0.08] bg-slate-950/50 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 bg-white rounded-md flex items-center justify-center">
                <Shield size={14} className="text-black" />
              </div>
              <h1 className="text-sm font-bold text-white tracking-tight">Mathematical Defense Dashboard</h1>
            </div>
            <div className="h-4 w-px bg-white/10 hidden sm:block" />
            <div className="hidden sm:flex items-center gap-4 text-xs font-medium text-slate-500">
              <span className="hover:text-white transition-colors cursor-pointer">Security Systems</span>
              <span className="hover:text-white transition-colors cursor-pointer">Protocol Logs</span>
            </div>
          </div>

          <div className="flex items-center gap-4 text-[10px] font-bold uppercase tracking-widest">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-green-500/10 text-green-500 border border-green-500/20 shadow-[0_0_15px_rgba(34,197,94,0.1)]">
              <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
              Live Shield Access
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-8 py-10 lg:grid lg:grid-cols-12 lg:gap-10">

        {/* 🎛️ LEFT COLLUMN: LOCK SELECTOR */}
        <aside className="lg:col-span-3 space-y-10">
          <div className="space-y-4">
            <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest px-1">Protocol Selection</label>
            <div className="p-1 bg-white/[0.03] border border-white/[0.08] rounded-2xl overflow-hidden backdrop-blur-3xl">
              <SystemSelector selectedSystem={selectedSystem} onSelect={handleSystemChange} />
            </div>
          </div>

          <div className="space-y-4">
            <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest px-1">System Security (Tremor Mode)</label>
            <div className="p-6 bg-white/[0.03] border border-white/[0.08] rounded-[2rem] space-y-8 backdrop-blur-3xl relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-green-500/5 blur-3xl rounded-full -translate-y-1/2 translate-x-1/2" />

              <div className="space-y-4">
                <div className="flex items-center justify-between text-[11px] font-bold">
                  <span className="text-slate-400">Lock Resilience</span>
                  <span className="text-white">{result ? "OPTIMIZED" : "PENDING"}</span>
                </div>
                <div className="h-1.5 w-full bg-black/40 rounded-full border border-white/5 overflow-hidden">
                  <motion.div
                    className="h-full bg-green-500"
                    initial={{ width: 0 }}
                    animate={{ width: result ? "100%" : "0%" }}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-black/40 rounded-2xl border border-white/5 space-y-1">
                  <span className="text-[9px] font-bold text-slate-600 uppercase">Coverage</span>
                  <div className="text-xl font-black font-mono text-white leading-none">
                    {result ? "MAX" : "---"}
                  </div>
                </div>
                <div className="p-4 bg-black/40 rounded-2xl border border-white/5 space-y-1">
                  <span className="text-[9px] font-bold text-slate-600 uppercase">Rank Factor</span>
                  <div className="text-xl font-black font-mono text-green-400 leading-none">
                    {result ? result.rank : "---"}
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-white/5">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-green-500/10 text-green-400">
                    <ShieldCheck size={16} />
                  </div>
                  <div>
                    <div className="text-[10px] font-black uppercase text-white tracking-widest">Logic Armor V2</div>
                    <div className="text-[8px] text-slate-600 font-bold uppercase tracking-tight">Quantum-Resistant Grid</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </aside>

        {/* 🕹️ MAIN COLUMN: INTERACTIVE CONTROL */}
        <div className="lg:col-span-9 space-y-12">

          {/* CONTROL SECTION (Vercel Style) */}
          <section className="space-y-8">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-4xl font-black text-white tracking-tighter uppercase italic">{systemNames[selectedSystem]}</h2>
                <div className="flex items-center gap-3 mt-1.5">
                  <span className="text-[10px] font-black text-slate-600 uppercase tracking-widest px-2 py-0.5 bg-white/5 border border-white/10 rounded-md">Order: {systemSizes[selectedSystem]}</span>
                  <span className="text-[10px] font-black text-green-500/60 uppercase tracking-widest animate-pulse">● Ready for Initialization</span>
                </div>
              </div>
              <button
                onClick={handleReset}
                className="p-3 bg-white/[0.03] border border-white/[0.08] rounded-xl text-slate-600 hover:text-white hover:bg-white/5 transition-all"
              >
                <RotateCcw size={18} />
              </button>
            </div>

            <div className="bg-white/[0.02] border border-white/[0.08] rounded-[2.5rem] p-12 backdrop-blur-3xl shadow-[0_24px_48px_-12px_rgba(0,0,0,0.5)] relative overflow-hidden">
              {/* Aesthetic Background Pattern */}
              <div className="absolute inset-0 opacity-[0.02] pointer-events-none" style={{ backgroundImage: 'linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)', backgroundSize: '40px 40px' }} />

              <div className="grid grid-cols-4 sm:grid-cols-7 lg:grid-cols-9 gap-5 relative z-10">
                {elements.map((el, i) => (
                  <div key={i} className="space-y-2">
                    <span className="text-[8px] font-black text-slate-700 uppercase tracking-widest block text-center">Node {i + 1}</span>
                    <input
                      type="text"
                      value={el}
                      onChange={(e) => handleInputChange(i, e.target.value)}
                      className={`
                         w-full h-16 bg-black/60 border border-white/5 rounded-2xl text-center text-xl font-black font-mono transition-all duration-300
                         focus:outline-none focus:border-green-500/50 focus:ring-4 focus:ring-green-500/5 hover:border-white/10 text-white
                         ${el === '' ? 'border-dashed border-slate-800' : ''}
                       `}
                    />
                  </div>
                ))}
              </div>

              <div className="mt-14 flex justify-center">
                <button
                  onClick={handleGenerate}
                  disabled={loading}
                  className={`
                     group relative px-14 py-5 bg-white text-slate-950 font-black uppercase tracking-widest italic rounded-2xl transition-all duration-500
                     hover:-translate-y-1 hover:shadow-[0_20px_40px_rgba(255,255,255,0.2)] disabled:opacity-30 disabled:cursor-not-allowed
                   `}
                >
                  <span className="flex items-center gap-4 relative z-10">
                    {loading ? 'Initializing Armor...' : <>Initialize Shield <Zap fill="currentColor" size={18} /></>}
                  </span>
                </button>
              </div>
            </div>

            <AnimatePresence>
              {error && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="p-5 bg-rose-500/5 border border-rose-500/20 rounded-2xl text-rose-500 font-bold text-[10px] uppercase tracking-widest flex items-center gap-3 overflow-hidden"
                >
                  <Info size={14} />
                  {error}
                </motion.div>
              )}
            </AnimatePresence>
          </section>

          {/* 📊 OUTPUT SECTION */}
          <AnimatePresence mode="wait">
            {result && (
              <motion.section
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 40 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              >
                <LiveMatrix data={result} rank={result.rank} />
              </motion.section>
            )}
          </AnimatePresence>

        </div>
      </div>

      <footer className="border-t border-white/[0.08] py-16 px-8 bg-slate-950/20">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-10">
          <div className="flex items-center gap-6">
            <div className="p-3 bg-white/5 border border-white/10 rounded-xl">
              <Fingerprint size={20} className="text-slate-600" />
            </div>
            <div>
              <p className="text-[10px] uppercase font-black tracking-[0.3em] text-slate-400">
                Mathematical Defense Protocol
              </p>
              <p className="text-[9px] text-slate-700 font-medium uppercase tracking-widest mt-1 italic">
                Algorithmically Hardened By Steiner S(2,k,v)
              </p>
            </div>
          </div>
          <div className="text-[10px] uppercase font-black tracking-widest text-slate-700 flex items-center gap-4">
            <span className="hover:text-slate-400 transition-colors cursor-pointer">Terms</span>
            <span>/</span>
            <span className="hover:text-slate-400 transition-colors cursor-pointer">Data Policy</span>
            <span>/</span>
            <span className="hover:text-slate-400 transition-colors">&copy; 2026 MDD</span>
          </div>
        </div>
      </footer>
    </main>
  );
}
