import React from "react";
import { useSpring, animated } from "react-spring";

const ScaleIn = ({ children }) => {
  const bounce = useSpring({
    background: "transparent",
    transform: `scale(1)`,
    from: { transform: `scale(0)` },

    config: {
      tension: 170,
      friction: 9,
    },
  });

  return <animated.div style={bounce}>{children}</animated.div>;
};

export default ScaleIn;
