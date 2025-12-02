import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { logo } from "@/assets/Logo";
import { navLinks } from "@/constants/navbar";
import { PHONE_NUMBER_MAIN, PHONE_NUMBER_HOTLINE } from "@/constants/contacts";

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

  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string
  ) => {
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
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out",
        "bg-primary/80 backdrop-blur-md shadow-elegant py-2"
      )}
    >
      <div className="container mx-auto px-6 lg:px-12">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <a
            href="#home"
            className="flex items-center space-x-3"
            onClick={(e) => handleNavClick(e, "#home")}
          >
            <img
              src={logo}
              alt="Shelter Housing Logo"
              width={200}
              height={300}
            />
          </a>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className="nav-link text-white/90 hover:text-white hover-spring transition-colors text-sm font-medium tracking-wide relative group"
              >
                {link.name}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-sage group-hover:w-full hover-spring" />
              </a>
            ))}
            <a href={`tel:${PHONE_NUMBER_MAIN}`}>
              <Button
                variant="default"
                className="bg-gold hover:bg-gold/90 text-primary font-semibold hover-spring hover:scale-105 lg:hover:scale-110 hover:shadow-lg active:scale-95 touch-feedback"
              >
                Call Us
              </Button>
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden text-white p-3 -mr-2 touch-feedback active:scale-95"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-primary border-t border-sage/20 animate-fade-in">
          <div className="container mx-auto px-4 sm:px-6 py-4 sm:py-6 space-y-1">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className="block text-white/90 hover:text-white transition-colors py-3 px-2 font-medium rounded-md hover:bg-white/10 active:bg-white/20 touch-feedback"
              >
                {link.name}
              </a>
            ))}
            <a href={`tel:${PHONE_NUMBER_HOTLINE}`} className="block pt-2">
              <Button
                variant="default"
                className="bg-gold hover:bg-gold/90 text-primary font-semibold hover-spring hover:scale-105 hover:shadow-lg w-full sm:w-auto active:scale-95 touch-feedback"
              >
                Call Us
              </Button>
            </a>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
