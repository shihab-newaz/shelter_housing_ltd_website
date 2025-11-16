import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 80);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    // GSAP ScrollTrigger for navbar transformation
    const navbar = document.querySelector("#navbar");
    
    gsap.to(navbar, {
      backgroundColor: isScrolled ? "hsl(165, 43%, 17%)" : "transparent",
      backdropFilter: isScrolled ? "blur(12px)" : "none",
      duration: 0.15,
      ease: "power2.out",
    });
  }, [isScrolled]);

  const navLinks = [
    { name: "Home", href: "#home" },
    { name: "Projects", href: "#projects" },
    { name: "About", href: "#about" },
    { name: "Services", href: "#services" },
    { name: "Contact", href: "#contact" },
  ];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <nav
      id="navbar"
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-150",
        isScrolled ? "shadow-elegant" : ""
      )}
    >
      <div className="container mx-auto px-6 lg:px-12">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <a href="#home" className="flex items-center space-x-3" onClick={(e) => handleNavClick(e, "#home")}>
            <div className="text-2xl font-bold tracking-tight">
              <span className="text-sage">SHELTER</span>
              <span className="text-white"> HOUSING</span>
            </div>
          </a>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className="nav-link text-white/90 hover:text-white transition-colors text-sm font-medium tracking-wide relative group"
              >
                {link.name}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-sage group-hover:w-full transition-all duration-300 ease-elegant" />
              </a>
            ))}
            <Button variant="default" className="bg-gold hover:bg-gold/90 text-primary font-semibold">
              Enquire
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden text-white p-2"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-primary border-t border-sage/20 animate-fade-in">
          <div className="container mx-auto px-6 py-6 space-y-4">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className="block text-white/90 hover:text-white transition-colors py-2 font-medium"
              >
                {link.name}
              </a>
            ))}
            <Button variant="default" className="w-full bg-gold hover:bg-gold/90 text-primary font-semibold">
              Enquire
            </Button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
