import { useEffect } from 'react';

export const useCursorHover = (ref: React.RefObject<HTMLElement>) => {
  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    element.setAttribute('data-hover', 'true');
    
    return () => {
      element.removeAttribute('data-hover');
    };
  }, [ref]);
};
