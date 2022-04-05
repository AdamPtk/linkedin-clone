import { useEffect, useState } from 'react';

const isTab = () => window.innerWidth <= 768;

const useTabletDimensions = () => {
  const [isTablet, setIsTablet] = useState(isTab());

  useEffect(() => {
    let timeoutId = 0;
    const resizeListener = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        setIsTablet(isTab());
      }, 150);
    };

    window.addEventListener('resize', resizeListener);

    return () => {
      window.removeEventListener('resize', resizeListener);
    };
  }, []);

  return isTablet;
};

export default useTabletDimensions;
