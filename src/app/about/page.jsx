import React from "react";
import {TypewriterText} from "@/components/TypewriterText";

export default function AboutPage() {
    return (
        <section
            id="home"
            className="relative z-10 min-h-screen flex flex-col items-center justify-start px-8 py-16"
        >
            <h1 className="text-6xl md:text-9xl font-bold text-center mb-12">
        <span className="bg-gradient-to-r from-blue-500 to-purple-800 bg-clip-text text-transparent">
          About me
        </span>
            </h1>

            <div className="max-w-5xl mx-auto space-y-6 text-gray-300 text-lg leading-relaxed text-justify">
                <p className="text-gray-400 text-xl mt-4 mb-32">
                    I'm a full-stack developer and a Software Engineering student who would rather wrestle with a linker
                    error than another JavaScript framework. My true passion lies in low-level and systems programming,
                    where I focus on building robust, high-performance, and efficient solutions.
                    <br/><br/>
                    I am proficient in the Java Spring ecosystem but have found my technical home in Rust, which
                    fuels my interest in memory management, compilers, and optimization. This systems-thinking
                    extends to embedded firmware development for ARM-based boards, electronics, and cybersecurity
                    projects.
                    <br/><br/>
                    I'm driven by a need to understand and optimize systems from the metal up, a mindset reflected in
                    my daily use of Linux (I use Arch btw) and my pursuit of complex problems where performance and
                    correctness are critical.
                    <br/><br/>
                    I am seeking roles that challenge me to solve deep technical problems, far away from the frontend.
                </p>
            </div>
        </section>
    )
}
