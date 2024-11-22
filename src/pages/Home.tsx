import React from 'react';
import Hero from '../components/Hero';
import Projects from '../components/Projects';
import Services from '../components/Services';
import Contact from '../components/Contact';

const Home = () => {
  return (
    <div>
      <Hero />
      <div className="h-px bg-black w-full" />
      <Projects />
      <div className="h-px bg-black w-full" />
      <Services />
      <div className="h-px bg-black w-full" />
      <Contact />
    </div>
  );
};

export default Home;