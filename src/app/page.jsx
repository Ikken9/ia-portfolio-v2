'use client'

import React, { useState, useEffect, } from 'react';
import { GitBranch } from 'lucide-react';
import { FloatingParticles } from "@/components/FloatingParticles";
import { TypewriterText } from "@/components/TypewriterText";
import { EntryCard } from "@/components/EntryCard";

export default function Home() {
    const projects = [
        {
            title: "Linear Regression Engine",
            description: "Built from scratch using pure NumPy - no sklearn shortcuts. Includes gradient descent optimization, feature scaling, and comprehensive performance analysis.",
            tech: ["Python", "NumPy", "Matplotlib", "Pandas"],
            status: "active",
            liveUrl: true
        },
        {
            title: "Neural Network Framework",
            description: "Custom deep learning framework with automatic differentiation. Supports multiple activation functions, optimizers, and loss functions.",
            tech: ["Python", "CUDA", "PyTorch", "TensorBoard"],
            status: "active",
            liveUrl: true
        },
        {
            title: "Time Series Forecaster",
            description: "LSTM-based cryptocurrency price prediction with real-time data ingestion. Features advanced preprocessing and ensemble methods.",
            tech: ["PyTorch", "Redis", "WebSockets", "Docker"],
            status: "development",
            liveUrl: false
        }
    ];

    return (
        <div className="min-h-screen text-gray-200  relative">
            <FloatingParticles />

            {/* Hero Section */}
            <section id="home" className="relative z-10 min-h-screen flex items-center justify-center px-8">
                <div className="max-w-6xl mx-auto w-full">
                    <div className="flex flex-col items-center justify-center text-center mb-12">
                        <h1 className="text-6xl md:text-8xl lg:text-9xl font-bold mb-8">
                            <span className="text-gray-200 ">Welcome to my </span>
                            <span className="bg-gradient-to-r from-blue-500 to-purple-800 bg-clip-text text-transparent">Portfolio</span>
                        </h1>
                    </div>

                    <div className="max-w-3xl mx-auto">
                        <div className="text-xl md:text-2xl text-gray-200  text-left">
                            <TypewriterText
                                text="Building the future with neural networks and data science"
                                speed={40}
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* Projects Section */}
            <section id="projects" className="relative z-10 py-20 px-8">
                <div className="max-w-6xl mx-auto">
                    <div className="flex items-center justify-between mb-12">
                        <h2 className="text-4xl font-bold flex items-center gap-3">
                            <span className="text-purple-400">#</span>
                            <span className="text-gray-200 ">featured</span>
                            <GitBranch className="w-8 h-8 text-purple-400" />
                        </h2>
                        <div className="text-xl text-gray-200 hover:text-purple-400 cursor-pointer transition-colors">
                            View all →
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {projects.map((project, index) => (
                            <EntryCard key={index} {...project} />
                        ))}
                    </div>
                </div>
            </section>
        </div>);
}