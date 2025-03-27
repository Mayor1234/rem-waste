import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

interface AnimatedSectionProps {
  children: React.ReactNode;
  direction: {
    initial_x: number;
    initial_y: number;
    duration?: number;
    rotate?: number;
  };
}

const AnimateComponent: React.FC<AnimatedSectionProps> = ({
  children,
  direction,
}) => {
  const [ref, inView] = useInView({
    triggerOnce: true, // Trigger animation only once
    threshold: 0.1, // Percentage of the section visible to trigger
  });

  return (
    <motion.div
      ref={ref}
      initial={{
        opacity: 0,
        rotate: 0,
        x: direction.initial_x,
        y: direction.initial_y,
      }}
      animate={
        inView
          ? { opacity: 1, rotate: direction.rotate, x: 0, y: 0 }
          : { opacity: 0, x: direction.initial_x, y: direction.initial_y }
      }
      transition={{
        duration: direction.duration ? direction.duration : 0.8,
        ease: 'easeOut',
      }}
    >
      {children}
    </motion.div>
  );
};

export default AnimateComponent;
