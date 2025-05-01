import { motion } from "framer-motion";
import { Box } from "@chakra-ui/react";

// Animation variants for float effect
const floatVariant = {
  animate: {
    y: [0, -20, 0],
    transition: {
      duration: 4,
      repeat: Infinity,
      ease: "easeInOut",
    },
  },
};

const floatingBlobs = [
  {
    top: "10%",
    left: "5%",
    size: 150,
    color: "#7f5af0",
    delay: 0,
  },
  {
    top: "40%",
    left: "80%",
    size: 120,
    color: "#ff8c00",
    delay: 1,
  },
  {
    top: "70%",
    left: "10%",
    size: 180,
    color: "#00ffc3",
    delay: 2,
  },
];

const FloatingCryptoAnimations = () => {
  return (
    <>
      {floatingBlobs.map((blob, index) => (
        <motion.div
          key={index}
          variants={floatVariant}
          animate="animate"
          transition={{ delay: blob.delay }}
          style={{
            position: "absolute",
            top: blob.top,
            left: blob.left,
            width: blob.size,
            height: blob.size,
            background: `radial-gradient(circle at center, ${blob.color} 0%, transparent 70%)`,
            borderRadius: "50%",
            opacity: 1,
            zIndex: 0,

          }}
        />
      ))}
    </>
  );
};

export default FloatingCryptoAnimations;
