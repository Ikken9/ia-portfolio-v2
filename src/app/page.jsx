import { GitBranch } from 'lucide-react';
import { FloatingParticles } from "@/components/FloatingParticles";
import { TypewriterText } from "@/components/TypewriterText";
import { EntryCard } from "@/components/EntryCard";
import Link from 'next/link'

export default function Home() {
    const projects = [
        {
            title: "Titanic EDA",
            description: "Análisis exploratorio completo (EDA) del dataset del Titanic para investigar los factores que influyeron en la supervivencia de los pasajeros.",
            tags: ["EDA", "Seaborn", "NumPy", "Matplotlib", "Pandas"],
            url: "/docs/UT1/P01/"
        },
        {
            title: "Feature Engineering",
            description: "Feature engineering con pipeline completo de machine learning para predecir la supervivencia de pasajeros del Titanic.",
            tags: ["Logistic Regression", "Classifier", "Scikit", "Pandas"],
            url: "/docs/UT1/P02/"
        },
        {
            title: "Linear Regression - Housing Prices",
            description: "Implementación de un modelo de regresión lineal para predecir precios de viviendas utilizando el dataset de Boston Housing.",
            tags: ["Linear Regression", "Scikit", "Pandas", "Matplotlib", "Numpy"],
            url: "/docs/UT1/P04_1/"
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
                                text="My journey through Introduction to Machine Learning - projects, exercises, and notes"
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
                            <a href="/docs">View all → </a>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {projects.map((project, index) => (
                            <Link key={index} href={project.url} passHref>
                                <EntryCard {...project} />
                            </Link>
                        ))}
                    </div>
                </div>
            </section>
        </div>);
}