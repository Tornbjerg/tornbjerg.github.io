import { useState, useEffect } from 'react';


const useResponsiveDetection = () => {
  const [responsiveInfo, setResponsiveInfo] = useState({
    isAboveThreshold: true,
  });

  useEffect(() => {
    const detectResponsive = () => {
      const screenWidth = window.innerWidth;
      
      const isAboveThreshold = screenWidth > 768;
  
      setResponsiveInfo({
        isAboveThreshold,
      });
    };

    detectResponsive();

    // Listen for window resize events
    window.addEventListener('resize', detectResponsive);

    // Cleanup
    return () => {
      window.removeEventListener('resize', detectResponsive);
    };
  }, []);

  return responsiveInfo;
};

export default useResponsiveDetection;