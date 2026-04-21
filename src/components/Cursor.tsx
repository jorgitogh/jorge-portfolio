import { useEffect, useRef } from "react";
import "./styles/Cursor.css";

const Cursor = () => {
  const cursorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches) {
      return;
    }

    let hover = false;
    const cursor = cursorRef.current;
    if (!cursor) {
      return;
    }

    let frameId = 0;
    const mousePos = { x: 0, y: 0 };
    const cursorPos = { x: 0, y: 0 };

    const setCursorPosition = (x: number, y: number) => {
      cursor.style.transform = `translate3d(${x}px, ${y}px, 0)`;
    };

    const handleMouseMove = (e: MouseEvent) => {
      mousePos.x = e.clientX;
      mousePos.y = e.clientY;
    };

    const loop = () => {
      if (!hover) {
        const delay = 6;
        cursorPos.x += (mousePos.x - cursorPos.x) / delay;
        cursorPos.y += (mousePos.y - cursorPos.y) / delay;
        setCursorPosition(cursorPos.x, cursorPos.y);
      }
      frameId = requestAnimationFrame(loop);
    };

    document.addEventListener("mousemove", handleMouseMove, { passive: true });
    frameId = requestAnimationFrame(loop);

    const cleanups: Array<() => void> = [];

    document.querySelectorAll("[data-cursor]").forEach((item) => {
      const element = item as HTMLElement;
      const handleMouseEnter = (e: MouseEvent) => {
        const target = e.currentTarget as HTMLElement;
        const rect = target.getBoundingClientRect();

        if (element.dataset.cursor === "icons") {
          cursor.classList.add("cursor-icons");
          setCursorPosition(rect.left, rect.top);
          cursor.style.setProperty("--cursorH", `${rect.height}px`);
          hover = true;
        }
        if (element.dataset.cursor === "disable") {
          cursor.classList.add("cursor-disable");
        }
      };

      const handleMouseLeave = () => {
        cursor.classList.remove("cursor-disable", "cursor-icons");
        hover = false;
      };

      element.addEventListener("mouseenter", handleMouseEnter);
      element.addEventListener("mouseleave", handleMouseLeave);
      cleanups.push(() => {
        element.removeEventListener("mouseenter", handleMouseEnter);
        element.removeEventListener("mouseleave", handleMouseLeave);
      });
    });

    return () => {
      cancelAnimationFrame(frameId);
      document.removeEventListener("mousemove", handleMouseMove);
      cleanups.forEach((cleanup) => cleanup());
    };
  }, []);

  return <div className="cursor-main" ref={cursorRef}></div>;
};

export default Cursor;
