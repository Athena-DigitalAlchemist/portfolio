import { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const About = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRefs = useRef<(HTMLParagraphElement | null)[]>([]);

  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      textRefs.current.forEach((text, index) => {
        if (!text) return;

        gsap.fromTo(
          text,
          {
            y: 100,
            opacity: 0,
          },
          {
            y: 0,
            opacity: 1,
            duration: 1,
            delay: index * 0.2,
            ease: 'power4.out',
            scrollTrigger: {
              trigger: text,
              start: 'top 80%',
              end: 'bottom 20%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="px-4 py-40">
      <div className="max-w-[1600px] mx-auto">
        <motion.div className="grid grid-cols-1 md:grid-cols-2 gap-32">
          <div>
            <h2 
              ref={el => textRefs.current[0] = el}
              className="text-5xl md:text-6xl font-light leading-[0.9] mb-8"
            >
              Transforming ideas into exceptional digital experiences
            </h2>
          </div>
          <div className="space-y-32">
            <div>
              <h3 
                ref={el => textRefs.current[1] = el}
                className="text-xs tracking-wider mb-8"
              >
                APPROACH
              </h3>
              <p 
                ref={el => textRefs.current[2] = el}
                className="text-xl font-light"
              >
                Every project is an opportunity to create something unique and meaningful. 
                I combine strategic thinking with creative design to deliver solutions that 
                resonate with users and achieve business goals.
              </p>
            </div>
            <div>
              <h3 
                ref={el => textRefs.current[3] = el}
                className="text-xs tracking-wider mb-8"
              >
                EXPERTISE
              </h3>
              <ul className="grid grid-cols-2 gap-4 text-lg font-light">
                {[
                  "UI/UX Design",
                  "Web Development",
                  "Brand Strategy",
                  "Motion Design",
                  "Digital Products",
                  "Creative Direction"
                ].map((skill, index) => (
                  <li
                    key={skill}
                    ref={el => textRefs.current[4 + index] = el}
                  >
                    {skill}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;