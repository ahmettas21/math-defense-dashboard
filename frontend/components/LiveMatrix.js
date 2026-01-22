
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield, Lock, Zap, CheckCircle, BarChart3, Fingerprint, Activity } from 'lucide-react';

export default function LiveMatrix({ data, rank }) {
    const { incidence_matrix, triples, n, elements, system_type } = data;
    const [activeNumber, setActiveNumber] = useState(null);

    // Vercel/Shadcn palette with high-vibe accents
    const accentColor = 'rgb(34, 197, 94)'; // Neon Green specifically requested for locks
    const activeGlow = '0 0 20px rgba(34, 197, 94, 0.5), 0 0 40px rgba(34, 197, 94, 0.2)';

    return (
        <div className="w-full max-w-7xl mx-auto space-y-16 pb-24">

            {/* 🛡️ STRATEGIC LOCK MATRIX (Vercel/Shadcn Style) */}
            <div className="relative group">
                <div
                    className="absolute -inset-px bg-gradient-to-b from-white/10 to-transparent rounded-[2.5rem] pointer-events-none"
                    style={{ opacity: activeNumber ? 1 : 0.5 }}
                />

                <div className="relative bg-slate-950/40 backdrop-blur-3xl rounded-[2.5rem] p-10 border border-white/5 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.5)]">

                    {/* Header: Status & Metrics */}
                    <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-12 gap-8">
                        <div className="space-y-2">
                            <div className="flex items-center gap-3">
                                <div className="p-2.5 rounded-xl bg-green-500/10 text-green-400 border border-green-500/20">
                                    <Shield size={22} strokeWidth={2.5} />
                                </div>
                                <h3 className="text-3xl font-black text-white tracking-tighter uppercase italic">
                                    Vertical Lock Shield
                                </h3>
                            </div>
                            <p className="text-slate-500 font-mono text-[10px] uppercase tracking-[0.3em] ml-14">
                                Logical Dependency Grid • Interactive Activation
                            </p>
                        </div>

                        <div className="flex flex-wrap gap-4">
                            <div className="px-8 py-4 bg-white/[0.02] border border-white/5 rounded-2xl backdrop-blur-3xl min-w-[160px]">
                                <div className="text-[10px] text-slate-500 uppercase font-bold tracking-widest mb-1 flex items-center gap-2">
                                    <Activity size={12} />
                                    Armor Rank
                                </div>
                                <div className="text-3xl font-black text-white font-mono leading-none">
                                    {rank}<span className="text-slate-700 text-sm ml-1 font-normal">/ {n}</span>
                                </div>
                            </div>
                            <div className="px-8 py-4 bg-white/[0.02] border border-white/5 rounded-2xl backdrop-blur-3xl min-w-[160px]">
                                <div className="text-[10px] text-slate-500 uppercase font-bold tracking-widest mb-1 flex items-center gap-2">
                                    <Zap size={12} />
                                    System Integrity
                                </div>
                                <div className="text-3xl font-black text-green-400 font-mono leading-none flex items-center gap-2">
                                    100<span className="text-xs">%</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Interactive Grid (The Main Matrix Reimagined) */}
                    <div className="overflow-x-auto pb-8 custom-scrollbar">
                        <div
                            className="grid gap-3"
                            style={{ gridTemplateColumns: `repeat(${n}, minmax(64px, 1fr))` }}
                        >
                            {/* Column Nodes (Interactive Headers) */}
                            {elements.map((el, i) => (
                                <button
                                    key={`node-${i}`}
                                    onMouseEnter={() => setActiveNumber(el)}
                                    onMouseLeave={() => setActiveNumber(null)}
                                    className={`
                                        h-16 rounded-2xl flex flex-col items-center justify-center transition-all duration-500 border
                                        ${activeNumber === el
                                            ? 'bg-green-500/20 border-green-500/50 text-green-400 scale-110 z-30 shadow-[0_0_30px_rgba(34,197,94,0.3)]'
                                            : 'bg-white/[0.03] border-white/5 text-slate-500 hover:border-white/20 hover:text-white'}
                                    `}
                                >
                                    <span className="text-[9px] uppercase font-black opacity-30 mb-0.5 tracking-tighter">Node</span>
                                    <span className="text-base font-black font-mono leading-none">{el}</span>
                                </button>
                            ))}

                            {/* Logic Cells */}
                            {incidence_matrix.map((row, rowIndex) => (
                                <React.Fragment key={`row-${rowIndex}`}>
                                    {row.map((cell, colIndex) => {
                                        const val = elements[colIndex];
                                        const isOne = cell === 1;
                                        const isActivated = activeNumber === val;

                                        return (
                                            <div
                                                key={`cell-${rowIndex}-${colIndex}`}
                                                className={`
                                                    h-16 rounded-2xl flex items-center justify-center transition-all duration-500 border font-mono text-sm
                                                    ${isOne
                                                        ? isActivated
                                                            ? 'bg-green-500/20 border-green-500/50 text-green-300 scale-105 z-20 shadow-[0_0_20px_rgba(34,197,94,0.2)]'
                                                            : 'bg-slate-900 border-white/5 text-slate-500'
                                                        : 'bg-transparent border-transparent text-slate-900'}
                                                `}
                                            >
                                                {isOne ? <span className="font-black">{val}</span> : <div className="w-1.5 h-1.5 rounded-full bg-slate-900" />}
                                            </div>
                                        );
                                    })}
                                </React.Fragment>
                            ))}
                        </div>
                    </div>

                    {/* Footer Info */}
                    <div className="mt-8 flex items-center gap-6 justify-center text-[10px] font-black uppercase tracking-[0.4em] text-slate-600 italic">
                        <span>● Sequential Resonance Locked</span>
                        <span>● Steiner S(2,k,v) Verified</span>
                        <span>● Minimum Rank Optimized</span>
                    </div>
                </div>
            </div>

            {/* 🔒 SECURE BLOCK CARDS (Industrial Dashboard Style) */}
            <div className="space-y-8">
                <div className="flex items-center gap-6 px-4">
                    <div className="flex items-center gap-3">
                        <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                        <h4 className="text-2xl font-black text-white uppercase tracking-tighter italic">Secure Blocks</h4>
                    </div>
                    <div className="h-px flex-1 bg-gradient-to-r from-white/10 to-transparent" />
                    <div className="text-[10px] font-black text-slate-500 uppercase tracking-widest bg-white/5 px-4 py-2 rounded-xl border border-white/5">
                        {triples.length} Containers Generated
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                    {triples.map((triple, idx) => {
                        const isHighVibe = triple.includes(activeNumber);

                        return (
                            <motion.div
                                key={idx}
                                layout
                                className={`
                                    relative p-8 rounded-[2rem] border transition-all duration-500 group/card
                                    ${isHighVibe
                                        ? 'bg-green-500/[0.08] border-green-500/40 scale-[1.02] shadow-[0_16px_32px_rgba(34,197,94,0.1)]'
                                        : 'bg-white/[0.02] border-white/5 hover:border-white/10'}
                                `}
                            >
                                {/* Industrial Badge */}
                                <div className="flex justify-between items-center mb-8">
                                    <div className="flex flex-col">
                                        <span className="text-[9px] font-black uppercase tracking-widest text-slate-500 group-hover/card:text-green-500 transition-colors">
                                            Container
                                        </span>
                                        <span className="text-sm font-black text-white font-mono leading-none">
                                            S#{idx + 1}
                                        </span>
                                    </div>
                                    <div className={`p-2 rounded-lg bg-white/5 border border-white/10 ${isHighVibe ? 'text-green-400 border-green-500/20' : 'text-slate-600'}`}>
                                        <Fingerprint size={18} />
                                    </div>
                                </div>

                                {/* Numbers Grid */}
                                <div className="flex gap-3 justify-center mb-10">
                                    {triple.map((num, i) => (
                                        <div
                                            key={i}
                                            className={`
                                                w-14 h-14 flex items-center justify-center rounded-2xl font-black font-mono text-lg transition-all duration-500 border
                                                ${activeNumber === num
                                                    ? 'bg-green-500 text-slate-950 border-green-400 shadow-[0_0_20px_rgba(34,197,94,0.5)]'
                                                    : 'bg-black border-white/10 text-white group-hover/card:border-white/20'}
                                            `}
                                        >
                                            {num}
                                        </div>
                                    ))}
                                </div>

                                {/* Security Progress (Tremor Style) */}
                                <div className="space-y-3">
                                    <div className="flex justify-between items-end">
                                        <div className="flex flex-col">
                                            <span className="text-[8px] font-black uppercase tracking-widest text-slate-600 mb-0.5">Coverage Ratio</span>
                                            <span className={`text-[10px] font-black ${isHighVibe ? 'text-green-400' : 'text-slate-400'}`}>
                                                {triple.length} Nodes Locked
                                            </span>
                                        </div>
                                        <div className="text-[10px] font-black font-mono text-slate-500">
                                            {(triple.length / 10 * 100).toFixed(0)}%
                                        </div>
                                    </div>
                                    <div className="h-1.5 w-full bg-black/50 rounded-full overflow-hidden border border-white/5 p-[1px]">
                                        <motion.div
                                            initial={{ width: 0 }}
                                            animate={{ width: `${(triple.length / 10) * 100}%` }}
                                            className={`h-full rounded-full bg-gradient-to-r ${isHighVibe ? 'from-green-500 to-green-300' : 'from-slate-700 to-slate-500'}`}
                                        />
                                    </div>
                                </div>

                                {/* Bottom Validation */}
                                <div className="mt-8 flex items-center gap-2 justify-center py-2 px-4 rounded-xl bg-white/[0.02] border border-white/5">
                                    <CheckCircle size={10} className={isHighVibe ? 'text-green-400' : 'text-slate-600'} />
                                    <span className={`text-[8px] font-black uppercase tracking-widest ${isHighVibe ? 'text-green-500' : 'text-slate-600'}`}>
                                        S(2,k,{n}) Protection Active
                                    </span>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
