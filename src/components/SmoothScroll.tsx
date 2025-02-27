import React, { useEffect, useRef } from 'react';

interface SmoothScrollProps {
  children: React.ReactNode;
}

const SmoothScroll: React.FC<SmoothScrollProps> = ({ children }) => {
  const scrollingContainerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const scrollingContainer = scrollingContainerRef.current;
    let current = 0;
    let target = 0;
    let ease = 0.075;
    
    // Height for smooth scrolling
    const setHeight = () => {
      if (scrollingContainer) {
        document.body.style.height = `${scrollingContainer.getBoundingClientRect().height}px`;
      }
    };
    
    // Smooth scrolling animation
    const smoothScroll = () => {
      if (!scrollingContainer) return;
      
      target = window.scrollY;
      current = current + (target - current) * ease;
      
      scrollingContainer.style.transform = `translate3d(0, ${-current}px, 0)`;
      requestAnimationFrame(smoothScroll);
    };
    
    // Initialize
    setHeight();
    smoothScroll();
    
    // Handle resize
    window.addEventListener('resize', setHeight);
    
    return () => {
      window.removeEventListener('resize', setHeight);
    };
  }, []);
  
  return (
    <div ref={scrollingContainerRef} style={{ position: 'fixed', top: 0, left: 0, width: '100%', willChange: 'transform' }}>
      {children}
    </div>
  );
};

export default SmoothScroll;