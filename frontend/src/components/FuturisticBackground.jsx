import { motion } from "framer-motion";

const floatingBlobs = [
  {
    top: "10%",
    left: "15%",
    size: 200,
    color: "#7f5af0",
    delay: 0,
  },
  {
    top: "60%",
    left: "80%",
    size: 150,
    color: "#00ffc3",
    delay: 1.5,
  },
  {
    top: "40%",
    left: "40%",
    size: 180,
    color: "#ff8c00",
    delay: 2.5,
  },
];

const floatVariant = {
  animate: {
    y: [0, -50, 0],
    transition: {
      duration: 6,
      repeat: Infinity,
      ease: "easeInOut",
    },
  },
};

const FuturisticBackground = () => {
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
            filter: "blur(25px)",
          }}
        />
      ))}
    </>
  );
};

export default FuturisticBackground;
