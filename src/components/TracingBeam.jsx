import React, { useEffect, useRef, useState } from "react";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";

export const TracingBeam = ({
  children,
  className = "",
  beamPosition = "left", // "left", "center", "right", or custom (e.g. '80px')
}) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const contentRef = useRef(null);
  const [svgHeight, setSvgHeight] = useState(0);

  useEffect(() => {
    if (contentRef.current) {
      // Use the section height instead of full content height
      setSvgHeight(contentRef.current.offsetHeight);
    }
  }, []);

  const y1 = useSpring(
    useTransform(scrollYProgress, [0, 0.8], [50, Math.min(svgHeight * 0.9, window.innerHeight)]),
    {
      stiffness: 500,
      damping: 90,
    },
  );
  const y2 = useSpring(
    useTransform(scrollYProgress, [0, 1], [50, Math.min(svgHeight * 0.8, window.innerHeight - 100)]),
    {
      stiffness: 500,
      damping: 90,
    },
  );

  // Determine horizontal style based on beamPosition prop
  let beamStyle = {};
  if (beamPosition === "left") {
    beamStyle = { left: '10px', right: 'auto' };
  } else if (beamPosition === "center") {
    beamStyle = { left: '50%', transform: 'translateX(-50%)' };
  } else if (beamPosition === "right") {
    beamStyle = { right: '10px', left: 'auto' };
  } else if (typeof beamPosition === 'string' && beamPosition.endsWith('px')) {
    beamStyle = { left: beamPosition, right: 'auto' };
  }

  return (
    <motion.div
      ref={ref}
      className={`relative w-full h-full ${className}`}
    >
      <div
        className="fixed top-3 z-[5] pointer-events-none hidden md:block"
        style={beamStyle}
      >
        <motion.div
          transition={{
            duration: 0.2,
            delay: 0.5,
          }}
          animate={{
            boxShadow:
              scrollYProgress.get() > 0
                ? "none"
                : "rgba(0, 0, 0, 0.24) 0px 3px 8px",
          }}
          className="ml-[15px] md:ml-[27px] h-4 w-4 rounded-full border border-gray-200 shadow-sm flex items-center justify-center"
        >
          <motion.div
            transition={{
              duration: 0.2,
              delay: 0.5,
            }}
            animate={{
              backgroundColor:
                scrollYProgress.get() > 0 ? "white" : "#10b981",
              borderColor:
                scrollYProgress.get() > 0 ? "white" : "#059669",
            }}
            className="h-2 w-2 rounded-full border border-gray-300 bg-white"
          />
        </motion.div>
        <svg
          viewBox={`0 0 20 ${Math.min(svgHeight, window.innerHeight)}`}
          width="20"
          height={Math.min(svgHeight, window.innerHeight)}
          className="ml-2 md:ml-4 block"
          aria-hidden="true"
        >
          <motion.path
            d={`M 1 0V -36 l 18 24 V ${Math.min(svgHeight * 0.7, window.innerHeight * 0.8)} l -18 24V ${Math.min(svgHeight * 0.9, window.innerHeight)}`}
            fill="none"
            stroke="#9091A0"
            strokeOpacity="0.16"
            transition={{
              duration: 10,
            }}
          />
          <motion.path
            d={`M 1 0V -36 l 18 24 V ${Math.min(svgHeight * 0.7, window.innerHeight * 0.8)} l -18 24V ${Math.min(svgHeight * 0.9, window.innerHeight)}`}
            fill="none"
            stroke="url(#gradient)"
            strokeWidth="1.25"
            className="motion-reduce:hidden"
            transition={{
              duration: 10,
            }}
          />
          <defs>
            <motion.linearGradient
              id="gradient"
              gradientUnits="userSpaceOnUse"
              x1="0"
              x2="0"
              y1={y1}
              y2={y2}
            >
              <stop stopColor="#18CCFC" stopOpacity="0" />
              <stop stopColor="#18CCFC" />
              <stop offset="0.325" stopColor="#6344F5" />
              <stop offset="1" stopColor="#AE48FF" stopOpacity="0" />
            </motion.linearGradient>
          </defs>
        </svg>
      </div>
      <div ref={contentRef}>{children}</div>
    </motion.div>
  );
};
