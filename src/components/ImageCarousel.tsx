import { useState, useEffect, useRef } from "react";
import "./ImageCarousel.css";

declare const gsap: any;
declare const ScrollTrigger: any;

const ImageCarousel = () => {
  const images = [
    { name: "r1", ext: "jpg" },
    { name: "r2", ext: "png" },
    { name: "r3", ext: "png" },
    { name: "r4", ext: "jpg" },
    { name: "r5", ext: "png" },
    { name: "r6", ext: "png" },
  ];
  const [currentIndex, setCurrentIndex] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);
  const scrollTriggerRef = useRef<any>(null);

  // Auto-rotation every 0.5 seconds (no transition)
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 500); // 0.5 seconds

    return () => clearInterval(interval);
  }, []);

  // Scroll animation
  useEffect(() => {
    if (typeof gsap === "undefined" || typeof ScrollTrigger === "undefined") return;

    gsap.registerPlugin(ScrollTrigger);

    const initScrollAnimation = () => {
      if (scrollTriggerRef.current) {
        scrollTriggerRef.current.kill();
      }

      if (document.querySelector(".carousel-img-wrapper-scroll")) {
        scrollTriggerRef.current = ScrollTrigger.create({
          trigger: ".carousel-scroll-section",
          start: "top bottom",
          end: "top top",
          onUpdate: (self: any) => {
            const progress = self.progress;
            gsap.set(".carousel-img-wrapper-scroll", {
              y: `${-110 + 110 * progress}%`,
              scale: 0.25 + 0.75 * progress,
              rotation: -15 + 15 * progress,
            });
          },
        });
      }
    };

    initScrollAnimation();
    window.addEventListener("resize", initScrollAnimation);

    return () => {
      window.removeEventListener("resize", initScrollAnimation);
      if (scrollTriggerRef.current) scrollTriggerRef.current.kill();
    };
  }, []);

  const currentImage = images[currentIndex];

  return (
    <div className="carousel-wrapper" ref={carouselRef}>
      <div className="carousel-img-inner">
        <img
          src={`/${currentImage.name}.${currentImage.ext}`}
          alt={`Image ${currentIndex + 1}`}
          className="carousel-image"
        />
      </div>
    </div>
  );
};

export default ImageCarousel;
