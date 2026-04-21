import {
  FaGithub,
  FaInstagram,
  FaLinkedinIn,
  FaXTwitter,
} from "react-icons/fa6";
import "./styles/SocialIcons.css";
import { TbNotes } from "react-icons/tb";
import { useEffect } from "react";
import HoverLinks from "./HoverLinks";
import { config } from "../config";

const SocialIcons = () => {
  const socialLinks = [
    { label: "GitHub", href: config.contact.github, icon: <FaGithub /> },
    { label: "LinkedIn", href: config.contact.linkedin, icon: <FaLinkedinIn /> },
    { label: "Twitter", href: config.contact.twitter, icon: <FaXTwitter /> },
    { label: "Instagram", href: config.contact.instagram, icon: <FaInstagram /> },
  ].filter((item) => item.href);

  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches) {
      return;
    }

    const social = document.getElementById("social") as HTMLElement;

    if (!social) return;

    const cleanups: Array<() => void> = [];
    const clamp = (value: number, min: number, max: number) =>
      Math.min(Math.max(value, min), max);

    social.querySelectorAll("span").forEach((item) => {
      const elem = item as HTMLElement;
      const link = elem.querySelector("a") as HTMLElement | null;
      if (!link) return;

      let frameId = 0;
      let targetX = 0;
      let targetY = 0;
      let currentX = 0;
      let currentY = 0;

      const updatePosition = () => {
        currentX += (targetX - currentX) * 0.16;
        currentY += (targetY - currentY) * 0.16;

        link.style.setProperty("--siX", `${currentX.toFixed(2)}px`);
        link.style.setProperty("--siY", `${currentY.toFixed(2)}px`);

        if (
          Math.abs(targetX - currentX) < 0.1 &&
          Math.abs(targetY - currentY) < 0.1 &&
          targetX === 0 &&
          targetY === 0
        ) {
          frameId = 0;
          link.style.setProperty("--siX", "0px");
          link.style.setProperty("--siY", "0px");
          return;
        }

        frameId = requestAnimationFrame(updatePosition);
      };

      const startAnimation = () => {
        if (!frameId) {
          frameId = requestAnimationFrame(updatePosition);
        }
      };

      const onPointerMove = (e: PointerEvent) => {
        const rect = elem.getBoundingClientRect();
        const offsetX = e.clientX - rect.left - rect.width / 2;
        const offsetY = e.clientY - rect.top - rect.height / 2;
        targetX = clamp(offsetX * 0.35, -10, 10);
        targetY = clamp(offsetY * 0.35, -10, 10);
        startAnimation();
      };

      const onPointerLeave = () => {
        targetX = 0;
        targetY = 0;
        startAnimation();
      };

      elem.addEventListener("pointermove", onPointerMove);
      elem.addEventListener("pointerleave", onPointerLeave);

      cleanups.push(() => {
        elem.removeEventListener("pointermove", onPointerMove);
        elem.removeEventListener("pointerleave", onPointerLeave);
        if (frameId) {
          cancelAnimationFrame(frameId);
        }
        link.style.removeProperty("--siX");
        link.style.removeProperty("--siY");
      });
    });

    return () => {
      cleanups.forEach((cleanup) => cleanup());
    };
  }, []);

  return (
    <div className="icons-section">
      <div className="social-icons" data-cursor="icons" id="social">
        {socialLinks.map((link) => (
          <span key={link.label}>
            <a href={link.href!} target="_blank" rel="noopener noreferrer">
              {link.icon}
            </a>
          </span>
        ))}
      </div>
      {config.contact.resume && (
        <a
          className="resume-button"
          href={config.contact.resume}
          target="_blank"
          rel="noopener noreferrer"
          data-cursor="disable"
        >
          <HoverLinks text="RESUME" />
          <span>
            <TbNotes />
          </span>
        </a>
      )}
    </div>
  );
};

export default SocialIcons;
