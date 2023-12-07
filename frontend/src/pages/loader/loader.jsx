import { useEffect } from "react";
import { motion } from "framer-motion";

const Loader = ({ setShowLoader }) => {
  useEffect(() => {
    setTimeout(() => {
      setShowLoader(false);
    }, 2800);
  }, [setShowLoader]);

  /* const iconVariant1 = {
    hidden: {
      pathLength: 0,
      fill: "rgb(19, 26, 34)",
    },
    visible: {
      pathLength: 5,
      fill: "rgb(243, 243, 243)",
      stroke: "rgb(243, 243, 243)",
      strokeWidth: 3,
      scale: 0,
      transition: {
        default: { duration: 3, ease: "easeIn" },
        fill: { duration: 3, ease: [1, 0, 0.8, 1] },
        stroke: { duration: 3, ease: [1, 0, 0.8, 1] },
        scale: { duration: 3, ease: [1, 1, 0.5, 0] },
      },
    },
  }; */

  const iconVariant2 = {
    hidden: {
      pathLength: 0,
      fill: "rgb(19, 26, 34)",
    },
    visible: {
      pathLength: 5,
      fill: "rgb(72, 163, 198)",
      stroke: "rgb(72, 163, 198)",
      scale: 0,
      strokeWidth: 3,
      transition: {
        default: { duration: 3, ease: "easeIn" },
        fill: { duration: 3, ease: [1, 0, 0.8, 1] },
        stroke: { duration: 3, ease: [1, 0, 0.8, 1] },
        scale: { duration: 3, ease: [1, 1, 0.5, 0] },
      },
    },
  };

  return (
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", height: "100vh" }}>
<motion.svg
  xmlns="http://www.w3.org/2000/svg"
  viewBox="0 0 128 128"
  style={{ width: "100vw", height: "80vw" }}
>
  
  <motion.text
    x="50%"
    y="50%"
    dominantBaseline="middle"
    textAnchor="middle"
    fontSize="30"
    fill="#40C0E7"
    variants={iconVariant2}
    initial="hidden"
    animate="visible"
  >
    Hi School
  </motion.text>
</motion.svg>

  </div>
  
  );
};

export default Loader;
