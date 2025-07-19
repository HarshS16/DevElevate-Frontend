import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface AnimatedCounterProps {
  from: number;
  to: number;
  duration?: number;
}

export function AnimatedCounter({ from, to, duration = 2 }: AnimatedCounterProps) {
  const [count, setCount] = useState(from);

  useEffect(() => {
    const timer = setInterval(() => {
      setCount(prev => {
        if (prev < to) {
          return Math.min(prev + Math.ceil((to - from) / (duration * 10)), to);
        }
        return to;
      });
    }, 100);

    return () => clearInterval(timer);
  }, [from, to, duration]);

  return (
    <motion.span
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
    >
      {count}
    </motion.span>
  );
}