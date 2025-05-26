import React from 'react';
import { Github, Linkedin, Mail } from 'lucide-react';

const Footer = () => {
  return (
    <>
      <div className="px-4 md:px-6">
        <div className="border-t border-slate-800 w-full" />
      </div>

      <footer className="w-full z-50 transition-all duration-300 bg-black backdrop-blur-md py-7 shadow-lg">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            
            <div className="mb-6 md:mb-0">
              <h3 className="text-2xl font-bold bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 text-transparent bg-clip-text">
                Aila Manasa
              </h3>
              <p className="text-slate-400 mt-2">Building digital experiences that matter.</p>
            </div>

            
            <div className="flex space-x-6">
              <a
                href="https://github.com/Manasa-Aila02"
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-400 hover:text-purple-400 transition-colors"
              >
                <Github size={20} />
              </a>
              <a
                href="http://www.linkedin.com/in/manasa-aila-b54650308"
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-400 hover:text-purple-400 transition-colors"
              >
                <Linkedin size={20} />
              </a>
              <a
                href="mailto:manasaaila02@gmail.com"
                className="text-slate-400 hover:text-purple-400 transition-colors"
              >
                <Mail size={20} />
              </a>
            </div>
          </div>

          
          <div className="border-t border-slate-800 mt-8 pt-8 text-center md:text-left">
            <p className="text-slate-500">
              © {new Date().getFullYear()} Aila Manasa. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
