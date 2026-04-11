'use client';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Preloader({ children }) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => { setIsLoading(false); }, 2500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence mode='wait'>
      {isLoading ? (
        <motion.div
          key="preloader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, y: -100, transition: { duration: 0.8, ease: "easeInOut" } }}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#5e565a]"
        >
            <div className="relative">
                {/* DRAWING DIAMOND SIGN */}
                <svg width="120" height="120" viewBox="0 0 100 100" className="stroke-[#f7ff58] stroke-[3px] fill-transparent">
                    <motion.path
                        d="M50 5 L95 50 L50 95 L5 50 Z" // Diamond Shape
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{ duration: 1.5, ease: "easeInOut" }}
                    />
                </svg>
                
                {/* RH TEXT FLASHING */}
                <motion.div 
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 1.2, type: "spring" }}
                    className="absolute inset-0 flex items-center justify-center"
                >
                    <span className="font-black text-4xl text-[#ff934f]">RH</span>
                </motion.div>
            </div>

            {/* LOADING BAR */}
            <div className="mt-8 w-48 h-1 bg-[#4a4448] overflow-hidden">
                <motion.div 
                    className="h-full bg-[#ff934f]"
                    initial={{ width: 0 }}
                    animate={{ width: "100%" }}
                    transition={{ duration: 2.5 }}
                />
            </div>
        </motion.div>
      ) : (
        <motion.div 
            key="content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
        >
            {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
}