import { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    title: "THE BLMTY",
    category: "Interactive Experience",
    image: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=1600&q=80",
    size: "large",
    year: "2024",
    slug: "blmty",
    align: "right"
  },
  {
    title: "ROOM 237",
    category: "Film Production",
    image: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?auto=format&fit=crop&w=1600&q=80",
    size: "small",
    year: "2023",
    slug: "room-237",
    align: "left"
  },
  {
    title: "FOGGY DREAMS",
    category: "Photography",
    image: "https://images.unsplash.com/photo-1544365558-35aa4afcf11f?auto=format&fit=crop&w=1600&q=80",
    size: "wide",
    year: "2023",
    slug: "foggy-dreams",
    align: "right"
  }
];

const Work = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const projectRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Horizontal scroll for project images
      projectRefs.current.forEach((project, index) => {
        if (!project) return;

        const image = project.querySelector('.project-image');
        const title = project.querySelector('.project-title');
        const details = project.querySelector('.project-details');

        // Image parallax and scale effect
        gsap.fromTo(
          image,
          {
            scale: 1.2,
            clipPath: 'inset(100% 0% 0% 0%)',
          },
          {
            scale: 1,
            clipPath: 'inset(0% 0% 0% 0%)',
            duration: 1.5,
            ease: 'power4.out',
            scrollTrigger: {
              trigger: project,
              start: 'top 80%',
              end: 'top 20%',
              scrub: 1,
            },
          }
        );

        // Title reveal animation
        gsap.fromTo(
          title,
          {
            y: 100,
            opacity: 0,
          },
          {
            y: 0,
            opacity: 1,
            duration: 1,
            ease: 'power4.out',
            scrollTrigger: {
              trigger: project,
              start: 'top 70%',
              end: 'top 20%',
              toggleActions: 'play none none reverse',
            },
          }
        );

        // Details stagger animation
        gsap.fromTo(
          details,
          {
            y: 50,
            opacity: 0,
          },
          {
            y: 0,
            opacity: 1,
            duration: 1,
            ease: 'power4.out',
            stagger: 0.1,
            scrollTrigger: {
              trigger: project,
              start: 'top 60%',
              end: 'top 20%',
              toggleActions: 'play none none reverse',
            },
          }
        );

        // Horizontal movement on scroll
        gsap.to(project, {
          xPercent: index % 2 === 0 ? 10 : -10,
          ease: 'none',
          scrollTrigger: {
            trigger: project,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1,
          },
        });
      });

      // Parallax background effect
      gsap.to('[data-speed]', {
        y: (i, el) => (1 - parseFloat(el.getAttribute('data-speed') || '0')) * ScrollTrigger.maxScroll(window),
        ease: 'none',
        scrollTrigger: {
          start: 0,
          end: 'max',
          invalidateOnRefresh: true,
          scrub: 0,
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="px-4 py-32" data-section>
      <div className="max-w-[1600px] mx-auto">
        <motion.h2 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-xs tracking-wider mb-32"
          data-speed="0.9"
        >
          SELECTED WORK
        </motion.h2>

        <div className="grid grid-cols-1 gap-[25vh]">
          {projects.map((project, index) => (
            <div
              key={index}
              ref={el => projectRefs.current[index] = el}
              className={`relative ${project.align === 'right' ? 'ml-auto' : ''} ${
                project.size === 'small' ? 'w-[45%]' :
                project.size === 'large' ? 'w-[65%]' :
                'w-[75%]'
              }`}
              data-speed={1.1}
            >
              <Link to={`/work/${project.slug}`}>
                <div className={`overflow-hidden ${
                  project.size === 'wide' ? 'aspect-[16/9]' : 'aspect-[4/5]'
                } mb-8`}>
                  <div className="project-image w-full h-full relative">
                    <img 
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>

                <div className="flex items-end justify-between group">
                  <div>
                    <p className="project-details text-xs tracking-wider text-gray-600 mb-1">
                      {project.category}
                    </p>
                    <h3 className="project-title text-lg font-light tracking-tight">
                      {project.title}
                    </h3>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="project-details text-xs tracking-wider">
                      {project.year}
                    </span>
                    <motion.div
                      whileHover={{ x: 2, y: -2 }}
                      transition={{ duration: 0.2 }}
                    >
                      <ArrowUpRight className="w-5 h-5 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </motion.div>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Work;