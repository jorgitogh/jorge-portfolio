import { useEffect, useRef } from "react";
import "./styles/TechStackNew.css";
import { config } from "../config";

const TechStackNew = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const video = videoRef.current;

    if (!section || !video) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          video.play().catch(() => {});
          return;
        }

        video.pause();
      },
      { threshold: 0.2 }
    );

    observer.observe(section);

    return () => {
      observer.disconnect();
      video.pause();
    };
  }, []);

  return (
    <div className="techstack-new" ref={sectionRef}>
      {/* Video Background */}
      <div className="techstack-video-container">
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          preload="metadata"
          className="techstack-video"
        >
          <source src="/video/video.webm" type="video/webm" />
        </video>
        {/* Dark Overlay */}
        <div className="techstack-overlay"></div>
      </div>

      {/* Content */}
      <div className="techstack-content">
        <h2>{config.sections.techStackTitle}</h2>
        
        <div className="techstack-pyramid">
          {config.techStack.map((row, rowIndex) => (
            <div key={rowIndex} className="techstack-row">
              {row.map((tech, techIndex) => (
                <a
                  key={techIndex}
                  href={tech.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="techstack-item"
                  title={tech.name}
                  data-cursor="disable"
                >
                  <img src={tech.icon} alt={tech.name} />
                  <span>{tech.name}</span>
                </a>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TechStackNew;
