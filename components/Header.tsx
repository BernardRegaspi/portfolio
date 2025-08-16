'use client'
import { useState, useEffect } from "react";

const Header = () => {
  const [showText, setShowText] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowText(true);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);
  return (
      <header className="">
      {showText && (
      <nav className="container mx-auto p-4 flex justify-between items-center">
        <div className="text-lg font-bold text-foreground">My Portfolio</div>
          <ul className="flex space-x-4">
            <li>
              <a href="#home" className="text-foreground hover:text-muted-foreground transition-colors">
                Home
              </a>
            </li>
            <li>
              <a href="#projects" className="text-foreground hover:text-muted-foreground transition-colors">
                Projects
              </a>
            </li>
            <li>
              <a href="#about" className="text-foreground hover:text-muted-foreground transition-colors">
                About
              </a>
            </li>
            <li>
              <a href="#contact" className="text-foreground hover:text-muted-foreground transition-colors">
                Contact
              </a>
            </li>
          </ul>
          </nav>
        )}
          </header>
  );
};

export default Header;
