'use client'

import { ExternalLink, Play, Code } from 'lucide-react';

export const EntryCard = ({ title, description, tech, liveUrl }) => (
    <div className="bg-gray-900/10 backdrop-blur-sm border-2 border-b-gray-100 p-6 hover:border-purple-400 transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/20 group">
        <div className="flex items-start justify-between mb-4">
            <div className="flex items-center gap-3">
                <div className="w-3 h-3 bg-purple-500 animate-pulse"></div>
                <h3 className="text-2xl font-bold text-gray-200 group-hover:text-purple-300 transition-colors">
                    {title}
                </h3>
            </div>
            <div className="flex items-center gap-2">

                {liveUrl && <ExternalLink className="w-4 h-4 text-gray-200 group-hover:text-purple-400 cursor-pointer transition-colors" />}
            </div>
        </div>

        <p className="text-gray-200 mb-4 leading-relaxed">{description}</p>

        <div className="flex flex-wrap gap-2 mb-4">
            {tech.map((t, i) => (
                <span key={i} className="px-2 py-1 bg-purple-500/10 text-purple-400 text-sm border border-purple-500">
          {t}
        </span>
            ))}
        </div>

        <div className="flex items-center gap-3 text-sm">
            <div className="flex items-center gap-2 text-gray-200 hover:text-purple-400 cursor-pointer transition-colors">
                <Code className="w-4 h-4" />
                <span>view_source()</span>
            </div>
            <div className="flex items-center gap-2 text-gray-200 hover:text-green-400 cursor-pointer transition-colors">
                <Play className="w-4 h-4" />
                <span>run_demo()</span>
            </div>
        </div>
    </div>
);