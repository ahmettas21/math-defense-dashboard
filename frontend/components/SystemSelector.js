
import React from 'react';
import { Shield, Layers, Box, Network, Lock, Command } from 'lucide-react';

export default function SystemSelector({ selectedSystem, onSelect }) {
    const systems = [
        {
            id: 'fano_7',
            name: 'Fano Guard',
            v: 7,
            icon: Shield,
            desc: 'S(2,3,7) Standard'
        },
        {
            id: 'affine_9',
            name: 'Affine Grid',
            v: 9,
            icon: Command,
            desc: 'S(2,3,9) Vector'
        },
        {
            id: 'projective_13',
            name: 'Nano Armor',
            v: 13,
            icon: Lock,
            desc: 'S(2,4,13) Armor'
        },
        {
            id: 'steiner_15',
            name: 'Steiner Net',
            v: 15,
            icon: Network,
            desc: 'S(2,3,15) Nexus'
        }
    ];

    return (
        <div className="flex flex-col w-full divide-y divide-white/[0.05]">
            {systems.map((sys) => {
                const Icon = sys.icon;
                const isActive = selectedSystem === sys.id;

                return (
                    <button
                        key={sys.id}
                        onClick={() => onSelect(sys.id)}
                        className={`
                            group relative flex items-center justify-between p-5 transition-all duration-300
                            ${isActive
                                ? 'bg-white/[0.04]'
                                : 'hover:bg-white/[0.02]'}
                        `}
                    >
                        <div className="flex items-center gap-4">
                            <div className={`
                                p-2 rounded-lg border transition-all duration-300
                                ${isActive ? 'bg-white text-black border-white' : 'bg-black border-white/5 text-slate-500 group-hover:text-slate-200'}
                            `}>
                                <Icon size={16} strokeWidth={isActive ? 2.5 : 2} />
                            </div>

                            <div className="flex flex-col text-left">
                                <span className={`text-[11px] font-bold tracking-tight transition-colors ${isActive ? 'text-white' : 'text-slate-500'}`}>
                                    {sys.name}
                                </span>
                                <span className="text-[9px] font-medium text-slate-700 uppercase tracking-tighter">
                                    {sys.desc}
                                </span>
                            </div>
                        </div>

                        {isActive && (
                            <div className="w-1.5 h-1.5 rounded-full bg-green-500 shadow-[0_0_10px_rgba(34,197,94,0.5)]" />
                        )}
                    </button>
                );
            })}
        </div>
    );
}
