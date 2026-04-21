import { useEffect } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import HoverLinks from "./HoverLinks";
import { gsap } from "gsap";
import Lenis from "lenis";
import "./styles/Navbar.css";
import { config } from "../config";

gsap.registerPlugin(ScrollTrigger);
export let lenis: Lenis | null = null;

const Navbar = () => {
  useEffect(() => {
    if (window.innerWidth <= 1024 || !window.matchMedia("(pointer: fine)").matches) {
      return;
    }

    lenis = new Lenis({
      lerp: 0.12,
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 1.1,
      touchMultiplier: 1.2,
      infinite: false,
    });

    lenis.stop();
    const onLenisScroll = () => ScrollTrigger.update();
    lenis.on("scroll", onLenisScroll);

    let animationFrameId = 0;

    function raf(time: number) {
      lenis?.raf(time);
      animationFrameId = requestAnimationFrame(raf);
    }
    animationFrameId = requestAnimationFrame(raf);

    const handleLinkClick = (e: Event) => {
      if (window.innerWidth <= 1024) {
        return;
      }

      e.preventDefault();
      const element = e.currentTarget as HTMLAnchorElement;
      const section = element.getAttribute("data-href");
      if (section && lenis) {
        const target = document.querySelector(section) as HTMLElement | null;
        if (target) {
          lenis.scrollTo(target, {
            offset: 0,
            duration: 1.1,
          });
        }
      }
    };

    const links = Array.from(document.querySelectorAll(".header ul a"));
    links.forEach((element) => {
      element.addEventListener("click", handleLinkClick);
    });

    const handleResize = () => {
      lenis?.resize();
    };
    window.addEventListener("resize", handleResize, { passive: true });

    return () => {
      cancelAnimationFrame(animationFrameId);
      links.forEach((element) => {
        element.removeEventListener("click", handleLinkClick);
      });
      window.removeEventListener("resize", handleResize);
      lenis?.off("scroll", onLenisScroll);
      lenis?.destroy();
      lenis = null;
    };
  }, []);
  return (
    <>
      <div className="header">
        <a href="/#" className="navbar-title" data-cursor="disable">
          {config.site.logo}
        </a>
        {config.contact.email && (
          <a
            href={`mailto:${config.contact.email}`}
            className="navbar-connect"
            data-cursor="disable"
          >
            {config.contact.email}
          </a>
        )}
        <ul>
          <li>
            <a data-href="#about" href="#about">
              <HoverLinks text={config.navigation.about} />
            </a>
          </li>
          <li>
            <a data-href="#work" href="#work">
              <HoverLinks text={config.navigation.work} />
            </a>
          </li>
          <li>
            <a data-href="#contact" href="#contact">
              <HoverLinks text={config.navigation.contact} />
            </a>
          </li>
        </ul>
      </div>

      <div className="landing-circle1"></div>
      <div className="landing-circle2"></div>
      <div className="nav-fade"></div>
    </>
  );
};

export default Navbar;
