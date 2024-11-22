const Footer = () => {
  return (
    <footer className="px-4 py-8 border-t border-gray-100">
      <div className="max-w-[1400px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <span className="font-mono text-sm tracking-tight">athbix®</span>
          </div>
          <div className="space-y-4">
            <h3 className="text-xs tracking-wider">CONTACT</h3>
            <a 
              href="mailto:hello@athbix.com"
              className="block text-sm hover:opacity-60 transition-opacity"
            >
              hello@athbix.com
            </a>
          </div>
          <div className="space-y-4">
            <h3 className="text-xs tracking-wider">SOCIALS</h3>
            <div className="space-y-2">
              <a 
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="block text-sm hover:opacity-60 transition-opacity"
              >
                Instagram
              </a>
              <a 
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="block text-sm hover:opacity-60 transition-opacity"
              >
                Twitter
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;