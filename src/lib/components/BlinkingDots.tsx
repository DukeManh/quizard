import { motion } from 'framer-motion';

const BlinkingDots = () => {
  const transition = {
    repeat: Infinity,
    duration: 1.5,
  };

  const animate = {
    opacity: [0, 0, 1, 1],
  };

  return (
    <>
      <motion.span
        transition={{
          ...transition,
          times: [0, 0.15, 0.25, 1],
        }}
        animate={animate}
      >
        .&nbsp;
      </motion.span>
      <motion.span
        transition={{
          ...transition,
          times: [0, 0.25, 0.5, 1],
        }}
        animate={animate}
      >
        .&nbsp;
      </motion.span>
      <motion.span
        transition={{
          ...transition,
          times: [0, 0.5, 0.75, 1],
        }}
        animate={animate}
      >
        .&nbsp;
      </motion.span>
    </>
  );
};

export default BlinkingDots;
