'use client'

import React, { useEffect, useState } from 'react';
import { TypewriterText } from "@/components/TypewriterText";

export const CommandLine = ({ command, output, delay = 0 }) => {
    const [show, setShow] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => setShow(true), delay);
        return () => clearTimeout(timer);
    }, [delay]);

    if (!show) return null;

    return (
        <div className="mb-4">
            <div className="text-purple-400 font-mono">
                <span className="text-gray-500">piero@portfolio:~$ </span>
                <TypewriterText text={command} speed={30} />
            </div>
            {output && (
                <div className="text-gray-300 mt-2 ml-4 font-mono text-sm">
                    {output}
                </div>
            )}
        </div>
    );
};