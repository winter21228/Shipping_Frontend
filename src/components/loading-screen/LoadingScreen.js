import { motion } from "framer-motion";

export default function LoadingScreen() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/80 backdrop-blur-sm dark:bg-gray-900/80">
      <div className="relative w-24 h-24 flex items-center justify-center">
        {/* Outer spinning circle */}
        <motion.div
          className="absolute w-full h-full rounded-full border-4 border-t-primary-500 border-primary-500/20"
          style={{
            borderRightColor: "transparent",
            borderBottomColor: "transparent",
            borderLeftColor: "transparent",
          }}
          animate={{ rotate: 360 }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "linear",
          }}
        />

        {/* Middle spinning circle */}
        <motion.div
          className="absolute w-16 h-16 rounded-full border-4 border-t-primary-500 border-primary-500/30"
          style={{
            borderRightColor: "transparent",
            borderBottomColor: "transparent",
            borderLeftColor: "transparent",
          }}
          animate={{ rotate: -360 }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "linear",
          }}
        />

        {/* Inner spinning circle */}
        <motion.div
          className="absolute w-8 h-8 rounded-full border-4 border-t-primary-500 border-primary-500/40"
          style={{
            borderRightColor: "transparent",
            borderBottomColor: "transparent",
            borderLeftColor: "transparent",
          }}
          animate={{ rotate: 360 }}
          transition={{
            duration: 1,
            repeat: Infinity,
            ease: "linear",
          }}
        />

        {/* Center dot */}
        <motion.div
          className="absolute w-4 h-4 rounded-full bg-primary-500"
          animate={{
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        {/* Loading text */}
        <motion.div
          className="absolute -bottom-20 left-1/2 -translate-x-1/2 text-xxxxl font-extrabold text-gray-600 dark:text-gray-300"
          animate={{
            opacity: [0.5, 1, 0.5],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          Loading...
        </motion.div>
      </div>
    </div>
  );
}
