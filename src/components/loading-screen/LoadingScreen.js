import { motion } from "framer-motion";

export default function LoadingScreen() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/80 backdrop-blur-sm dark:bg-gray-900/80">
      <div className="relative">
        {/* Outer spinning circle */}
        <motion.div
          className="absolute inset-0 rounded-full border-4 border-primary-500/20"
          animate={{
            rotate: 360,
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "linear",
          }}
        />

        {/* Middle spinning circle */}
        <motion.div
          className="absolute inset-2 rounded-full border-4 border-primary-500/30"
          animate={{
            rotate: -360,
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "linear",
          }}
        />

        {/* Inner spinning circle */}
        <motion.div
          className="absolute inset-4 rounded-full border-4 border-primary-500/40"
          animate={{
            rotate: 360,
          }}
          transition={{
            duration: 1,
            repeat: Infinity,
            ease: "linear",
          }}
        />

        {/* Center dot */}
        <motion.div
          className="absolute inset-6 rounded-full bg-primary-500"
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
          className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-sm font-medium text-gray-600 dark:text-gray-300"
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
