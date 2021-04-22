import React from "react";
import { useSpring, animated } from "react-spring";

const LiftUp = ({ children }) => {
  const moveUp = useSpring({
    background: "transparent",
    transform: `translate(0px, 40px)`,
    opacity: `0`,

    from: { transform: `translate(0px, 0px)`, opacity: `1` },
    delay: 350,
  });

  return <animated.div style={moveUp}>{children}</animated.div>;
};

export default LiftUp;
