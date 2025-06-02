'use client';

import { ReactNode } from 'react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

interface AnimatedSectionProps {
  children: ReactNode;
  className?: string;
  animation?: 'fadeIn' | 'slideUp' | 'scaleIn' | 'slideInLeft' | 'slideInRight';
  delay?: number;
}

export default function AnimatedSection({
  children,
  className = '',
  animation = 'fadeIn',
  delay = 0,
}: AnimatedSectionProps) {
  const { ref, isInView } = useScrollAnimation({ threshold: 0.1 });

  const animationClasses = {
    fadeIn: 'opacity-0 transition-opacity duration-1000',
    slideUp: 'opacity-0 translate-y-10 transition-all duration-1000',
    scaleIn: 'opacity-0 scale-95 transition-all duration-1000',
    slideInLeft: 'opacity-0 -translate-x-10 transition-all duration-1000',
    slideInRight: 'opacity-0 translate-x-10 transition-all duration-1000',
  };

  const inViewClasses = {
    fadeIn: 'opacity-100',
    slideUp: 'opacity-100 translate-y-0',
    scaleIn: 'opacity-100 scale-100',
    slideInLeft: 'opacity-100 translate-x-0',
    slideInRight: 'opacity-100 translate-x-0',
  };

  return (
    <div
      ref={ref}
      className={`${animationClasses[animation]} ${isInView ? inViewClasses[animation] : ''
        } ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}
