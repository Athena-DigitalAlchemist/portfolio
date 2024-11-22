import React from 'react';
import { ArrowUpRight } from 'lucide-react';

const works = [
  {
    title: "BRAND IDENTITY",
    client: "Luxury Fashion Brand",
    year: "2023",
    image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&auto=format"
  },
  {
    title: "E-COMMERCE WEBSITE",
    client: "Artisan Marketplace",
    year: "2023",
    image: "https://images.unsplash.com/photo-1558478551-1a378f63328e?w=800&auto=format"
  },
  {
    title: "MOBILE APP DESIGN",
    client: "Health & Wellness",
    year: "2022",
    image: "https://images.unsplash.com/photo-1616469829941-c7200edec809?w=800&auto=format"
  }
];

const Works = () => {
  return (
    <div className="min-h-screen pt-32 px-12">
      <h1 className="text-8xl mb-16 font-medium tracking-tighter">
        SELECTED WORKS
      </h1>

      <div className="grid gap-24">
        {works.map((work, index) => (
          <div key={index} className="group cursor-pointer">
            <div className="relative overflow-hidden">
              <img 
                src={work.image} 
                alt={work.title}
                className="w-full h-[70vh] object-cover"
              />
              <div className="absolute inset-0 bg-black bg-opacity-20">
                <div className="absolute bottom-8 left-8 text-white">
                  <h2 className="text-4xl font-medium flex items-center gap-4">
                    {work.title} <ArrowUpRight />
                  </h2>
                  <p className="mt-2">{work.client} • {work.year}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Works;