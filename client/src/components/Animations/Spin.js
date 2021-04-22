import React from "react";
import { useSpring, animated } from "react-spring";

const Spin = ({ children }) => {
  const rotate = useSpring({
    background: "transparent",
    transform: `rotate(360deg)`,
    from: { transform: `rotate(0deg)` },

    config: {
      tension: 150,
      friction: 10,
    },
  });

  return <animated.div style={rotate}>{children}</animated.div>;
};

export default Spin;
