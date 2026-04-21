import { PropsWithChildren, useEffect, useState } from "react";
import About from "./About";
import Career from "./Career";
import Contact from "./Contact";
import Cursor from "./Cursor";
import Landing from "./Landing";
import Navbar from "./Navbar";
import SocialIcons from "./SocialIcons";
import WhatIDo from "./WhatIDo";
import Work from "./Work";
import TechStackNew from "./TechStackNew";
import CallToAction from "./CallToAction";
import setSplitText from "./utils/splitText";

const MainContainer = ({ children }: PropsWithChildren) => {
  const [showCharacter, setShowCharacter] = useState<boolean>(() => {
    return window.innerWidth > 1024;
  });

  useEffect(() => {
    let resizeTimeout: number | undefined;

    const syncLayout = () => {
      setSplitText();
      setShowCharacter((prev) => {
        const next = window.innerWidth > 1024;
        return prev === next ? prev : next;
      });
    };

    const resizeHandler = () => {
      if (resizeTimeout) {
        window.clearTimeout(resizeTimeout);
      }
      resizeTimeout = window.setTimeout(syncLayout, 120);
    };

    syncLayout();
    window.addEventListener("resize", resizeHandler, { passive: true });
    return () => {
      if (resizeTimeout) {
        window.clearTimeout(resizeTimeout);
      }
      window.removeEventListener("resize", resizeHandler);
    };
  }, []);

  return (
    <div className="container-main">
      <Cursor />
      <Navbar />
      <SocialIcons />
      {showCharacter && children}
      <div className="container-main">
        <Landing />
        <About />
        <WhatIDo />
        <Career />
        <Work />
        <TechStackNew />
        <CallToAction />
        <Contact />
      </div>
    </div>
  );
};

export default MainContainer;
