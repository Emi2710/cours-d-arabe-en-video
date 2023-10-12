import React, { useState, useEffect, useRef } from 'react';

interface ClickOutsideDetectorProps {
  children: React.ReactNode;
}

const ClickOutsideDetector: React.FC<ClickOutsideDetectorProps> = ({ children }) => {
  const [isOpen, setIsOpen] = useState(true);
  const wrapperRef = useRef<HTMLDivElement | null>(null); // Explicitly specify the type

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener('click', handleClickOutside);

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  return <div ref={wrapperRef}>{isOpen ? children : null}</div>;
};

export default ClickOutsideDetector;
