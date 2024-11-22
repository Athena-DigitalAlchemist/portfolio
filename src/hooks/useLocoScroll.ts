import { useEffect } from 'react';
import LocomotiveScroll from 'locomotive-scroll';
import 'locomotive-scroll/dist/locomotive-scroll.css';

export default function useLocoScroll(start: boolean) {
  useEffect(() => {
    if (!start) return;

    const scrollEl = document.querySelector('#main-container');
    
    let locoScroll = new LocomotiveScroll({
      el: scrollEl as HTMLElement,
      smooth: true,
      multiplier: 1,
      class: 'is-revealed',
      reloadOnContextChange: true,
      touchMultiplier: 2,
      smoothMobile: true,
    });

    // Update locomotive scroll after all images are loaded
    const images = document.querySelectorAll('img');
    let loadedCount = 0;

    const handleImageLoad = () => {
      loadedCount++;
      if (loadedCount === images.length) {
        locoScroll.update();
      }
    };

    images.forEach(img => {
      if (img.complete) {
        handleImageLoad();
      } else {
        img.addEventListener('load', handleImageLoad);
      }
    });

    // Handle window resize
    const handleResize = () => {
      locoScroll.update();
    };

    window.addEventListener('resize', handleResize);

    return () => {
      if (locoScroll) {
        window.removeEventListener('resize', handleResize);
        images.forEach(img => img.removeEventListener('load', handleImageLoad));
        locoScroll.destroy();
        locoScroll = null;
      }
    };
  }, [start]);
}