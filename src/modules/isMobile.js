import { useEffect, useState } from 'react';

const isMob = () => window.innerWidth < 576;

const useMobileDimensions = () => {
  const [isMobile, setIsMob] = useState(isMob());

  useEffect(() => {
    let timeoutId = 0;
    const resizeListener = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        setIsMob(isMob());
      }, 500);
    };

    window.addEventListener('resize', resizeListener);

    return () => {
      window.removeEventListener('resize', resizeListener);
    };
  }, []);

  return isMobile;
};

export default useMobileDimensions;
