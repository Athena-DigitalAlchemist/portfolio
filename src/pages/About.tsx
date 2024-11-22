import React from 'react';

const About = () => {
  return (
    <div className="min-h-screen pt-32 px-12" data-scroll-section>
      <div className="max-w-4xl mx-auto">
        <h1 className="text-8xl mb-16 font-medium tracking-tighter">ABOUT ME</h1>
        
        <div className="grid grid-cols-2 gap-24">
          <div className="space-y-8">
            <p className="text-xl leading-relaxed">
              I'm a creative designer and developer based in Greece, passionate about crafting unique digital experiences that leave a lasting impression.
            </p>
            <p className="text-xl leading-relaxed">
              With over 5 years of experience in both design and development, I bring a unique perspective to every project, combining aesthetic excellence with technical expertise.
            </p>
          </div>
          
          <div className="space-y-12">
            <div>
              <h3 className="text-2xl font-medium mb-4">EXPERIENCE</h3>
              <ul className="space-y-4">
                <li>
                  <p className="text-sm text-gray-500">2020 - PRESENT</p>
                  <p className="text-lg">Senior Designer at Studio X</p>
                </li>
                <li>
                  <p className="text-sm text-gray-500">2018 - 2020</p>
                  <p className="text-lg">UI Developer at Tech Co</p>
                </li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-2xl font-medium mb-4">EDUCATION</h3>
              <ul className="space-y-4">
                <li>
                  <p className="text-sm text-gray-500">2014 - 2018</p>
                  <p className="text-lg">BA in Digital Design</p>
                  <p className="text-sm text-gray-500">University of Arts</p>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;