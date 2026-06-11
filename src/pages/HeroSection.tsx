import "./HeroSection.css";
import ImageCarousel from "../components/ImageCarousel";
import "../components/ImageCarousel.css";
import { useEffect, useRef } from "react";

const HeroSection = () => {
  const frameRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = frameRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (!entry) return;
        if (entry.isIntersecting) {
          el.setAttribute("data-inview", "true");
          observer.disconnect();
        }
      },
      { threshold: 0.25 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (

    <>
      {/* ── Big Name Hero with Overlay Carousel ── */}
      <section className="hs-hero">
        <div className="hs-hero-header-wrapper">
          <div className="hs-hero-header hs-hero-header-1">
            <h1>Aayush</h1>
          </div>
          <div className="hs-hero-header hs-hero-header-2">
            <h1>Parab</h1>
          </div>
        </div>

        {/* Image Carousel Overlay */}
        <div className="hero-carousel-overlay">
          {/* Frame that scales small → big once (on scroll into view) */}
          <div className="hero-carousel-frame" data-hero-carousel-frame>
            <ImageCarousel />
          </div>
        </div>


        <div className="hs-hero-footer">
          {/* Left: decorative symbols */}
          <div className="hs-hero-footer-symbols">
            <img src="/images/global/symbols.png" alt="" />
          </div>

          {/* Center: Resume link */}
          <div className="hs-hero-footer-scroll-down">
            <p className="hs-mn">
              <a
                href="https://drive.google.com/file/d/YOUR_RESUME_FILE_ID/view"
                target="_blank"
                rel="noopener noreferrer"
                className="hs-resume-link"
              >
                Fetch // Resume
              </a>
            </p>
          </div>

          {/* Right: Availability badge */}
          <div className="hs-hero-footer-tags">
            <span className="hs-availability-badge" id="availability-badge">
              <span className="hs-badge-dot" />
              Open to Work
            </span>
          </div>
        </div>
      </section>

      {/* ── Scroll-animated Carousel Section ── */}
      <section className="carousel-scroll-section">
        <div className="carousel-img-wrapper carousel-img-wrapper-scroll" id="carousel-img-scroll">
          {/* Placeholder - actual image handled by scroll animation */}
        </div>
      </section>
    </>
  );
};

export default HeroSection;
