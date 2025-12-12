import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import gsap from "gsap";

gsap.registerPlugin(ScrollTrigger);

// Cloudinary video URLs from environment
const VIDEO_DESKTOP = import.meta.env.VITE_CLOUDINARY_VIDEO_DESKTOP;
const VIDEO_MOBILE = import.meta.env.VITE_CLOUDINARY_VIDEO_MOBILE;

// Fallback poster image (first frame or a static image)
const POSTER_IMAGE = "https://res.cloudinary.com/dp0phtmmx/video/upload/so_0/v1764452382/Landscape_yshfbt.jpg";

const Hero = () => {
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLDivElement>(null);
  const videoElementRef = useRef<HTMLVideoElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  // Lazy load video after initial paint
  useEffect(() => {
    const loadVideo = () => {
      setIsVideoLoaded(true);
    };

    // Use requestIdleCallback for better performance, fallback to setTimeout
    if ('requestIdleCallback' in window) {
      window.requestIdleCallback(loadVideo, { timeout: 2000 });
    } else {
      const timer = setTimeout(loadVideo, 100);
      return () => clearTimeout(timer);
    }
  }, []);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (!prefersReducedMotion && heroRef.current) {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      // Hero entrance animation
      tl.fromTo(
        overlayRef.current,
        { opacity: 0.8 },
        { opacity: 0.45, duration: 1.2 }
      )
        .fromTo(
          contentRef.current?.querySelector("h1"),
          { clipPath: "inset(100% 0% 0% 0%)", y: 50 },
          { clipPath: "inset(0% 0% 0% 0%)", y: 0, duration: 0.9 },
          "-=0.6"
        )
        .fromTo(
          contentRef.current?.querySelector("p"),
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.6 },
          "-=0.4"
        )
        .fromTo(
          contentRef.current?.querySelector(".cta-buttons"),
          { opacity: 0, scale: 0.95 },
          { opacity: 1, scale: 1, duration: 0.5 },
          "-=0.3"
        );

      // Scroll-linked parallax effect
      gsap.to(videoRef.current, {
        scale: 1,
        y: 0,
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1,
        },
      });

      gsap.fromTo(
        videoRef.current,
        { scale: 1.05 },
        {
          scale: 1,
          y: -6,
          scrollTrigger: {
            trigger: heroRef.current,
            start: "top top",
            end: "bottom top",
            scrub: 1,
          },
        }
      );
    }
  }, []);

  return (
    <section id="home" ref={heroRef} className="relative w-full min-h-[100dvh] overflow-hidden bg-noise">
      {/* Video Background with Lazy Loading */}
      <div ref={videoRef} className="absolute inset-0 w-full h-full">
        {/* Poster/placeholder shown before video loads */}
        {!isVideoLoaded && (
          <div
            className="absolute inset-0 w-full h-full bg-primary"
            style={{
              backgroundImage: `url(${POSTER_IMAGE})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          />
        )}
        {/* Native HTML5 Video - loads after initial paint */}
        {isVideoLoaded && (
          <video
            ref={videoElementRef}
            autoPlay
            muted
            loop
            playsInline
            className="absolute inset-0 w-full h-full object-cover"
            poster={POSTER_IMAGE}
          >
            <source src={VIDEO_MOBILE} type="video/mp4" media="(max-width: 767px)" />
            <source src={VIDEO_DESKTOP} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        )}
      </div>

      {/* Enhanced Gradient Overlay with Atmospheric Depth */}
      <div
        ref={overlayRef}
        className="absolute inset-0 bg-noise"
        style={{
          background: "linear-gradient(180deg, rgba(23, 61, 52, 0.65) 0%, rgba(23, 61, 52, 0.35) 100%)",
        }}
      />

      {/* Hero Content */}
      <div ref={contentRef} className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-12 h-full min-h-[100dvh] flex items-end pb-20 sm:items-center sm:pb-0">
        <div className="max-w-full sm:max-w-4xl lg:max-w-5xl w-full">
          <h1 className="text-white mb-4 sm:mb-6 font-black">
            Creating Homes,<br /> Defining Skylines.
          </h1>
          <p className="hidden sm:block text-white/90 text-base sm:text-lg md:text-xl lg:text-2xl mb-6 sm:mb-8 lg:mb-10 max-w-2xl leading-relaxed">
            Discover luxury living spaces crafted with precision, elegance, and sustainable design principles.
          </p>
          <div className="cta-buttons flex flex-row flex-wrap gap-2 sm:gap-4 mt-6 sm:mt-0">
            <Button
              size="lg"
              className="bg-gold hover:bg-gold/90 text-primary font-semibold text-sm sm:text-lg px-4 py-3 sm:px-8 sm:py-6 shadow-hover hover-spring hover:scale-105 sm:hover:scale-110 hover:shadow-2xl active:scale-95 touch-feedback"
            >
              <a href="#projects">
                Explore Projects
              </a>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-2 border-sage text-white hover:bg-sage/20 font-semibold text-sm sm:text-lg px-4 py-3 sm:px-8 sm:py-6 backdrop-blur-sm hover-spring hover:scale-105 hover:border-gold active:scale-95 touch-feedback"
            >
              <a href="#about">
                Learn More
              </a>
            </Button>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <a
        href="#projects"
        className="absolute bottom-6 sm:bottom-8 left-1/2 transform -translate-x-1/2 z-20 flex flex-col items-center gap-2 text-white/70 hover:text-white transition-colors group"
        aria-label="Scroll to projects"
      >
        <span className="text-xs sm:text-sm font-medium tracking-wider uppercase hidden sm:block"></span>
        <ChevronDown className="w-6 h-6 sm:w-8 sm:h-8 animate-scroll-bounce group-hover:text-gold transition-colors" />
      </a>
    </section>
  );
};

export default Hero;
