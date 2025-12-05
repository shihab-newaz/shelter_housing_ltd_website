import { lazy, Suspense } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import PageLoader from "@/components/ui/PageLoader";
import SEO from "@/components/SEO";

const FeaturedProjects = lazy(() => import("@/components/FeaturedProjects"));
const About = lazy(() => import("@/components/About"));

const WhyChooseUs = lazy(() => import("@/components/WhyChooseUs"));
const Testimonials = lazy(() => import("@/components/Testimonials"));
const Contact = lazy(() => import("@/components/Contact"));
const Footer = lazy(() => import("@/components/Footer"));
const FloatingContactWidget = lazy(() => import("@/components/FloatingContactWidget"));

const Index = () => {
  return (
    <div className="min-h-screen">
      <SEO />
      <Navbar />
      <Hero />
      <Suspense fallback={<PageLoader />}>
        <FeaturedProjects />
        <About />
        <WhyChooseUs />
        <Testimonials />
        <Contact />
        <Footer />
        <FloatingContactWidget />
      </Suspense>
    </div>
  );
};

export default Index;
