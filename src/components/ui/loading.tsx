"use client";

import { motion } from "motion/react";

function LoadingRipple() {
  const animation = {
    transform: ["scale(0)", "scale(1)"],
    opacity: [1, 0],
  };

  const transition = {
    duration: 2,
    repeat: Infinity,
    ease: "easeOut",
  };

  return (
    <div className="container">
      <div className="ripple-container">
        <motion.div
          className="ripple"
          animate={animation}
          transition={transition}
        />
        <motion.div
          className="ripple"
          animate={animation}
          transition={{
            ...transition,
            delay: 0.5,
          }}
        />
        <motion.div
          className="ripple"
          animate={animation}
          transition={{
            ...transition,
            delay: 1,
          }}
        />
      </div>
      <StyleSheet />
    </div>
  );
}

/**
 * ==============   Styles   ================
 */
function StyleSheet() {
  return (
    <style>
      {`
            .container {
                display: flex;
                justify-content: center;
                align-items: center;
                width: 100%;
                height: 50vh;
            }

            .ripple-container {
                position: relative;
                width: 100px;
                height: 100px;
            }

            .ripple {
                position: absolute;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                border-radius: 50%;
                border: 5px solid #ffc300;
                will-change: transform, opacity;
                opacity: 0;
            }
            `}
    </style>
  );
}

export default LoadingRipple;
