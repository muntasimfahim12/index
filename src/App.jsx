/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import { motion } from "framer-motion";

function App() {
  const [showMessage, setShowMessage] = useState(false);
  const [balloons, setBalloons] = useState([]);

  // Generate balloons dynamically
  useEffect(() => {
    if (showMessage) {
      const interval = setInterval(() => {
        setBalloons((prev) => [
          ...prev,
          {
            id: Date.now() + Math.random(),
            left: Math.random() * 100, // random position
            color: randomColor(),
            size: Math.random() * 20 + 30,
            shape: Math.random() > 0.7 ? "heart" : "balloon", // some hearts
          },
        ]);
      }, 500);

      return () => clearInterval(interval);
    }
  }, [showMessage]);

  // Keep balloon list short
  useEffect(() => {
    if (balloons.length > 100) {
      setBalloons((prev) => prev.slice(-100));
    }
  }, [balloons]);

  function randomColor() {
    const colors = [
      "#ff5c7c",
      "#ff0000",
      "#ff9a9e",
      "#f6d365",
      "#a1c4fd",
      "#c2e9fb",
      "#c77dff",
    ];
    return colors[Math.floor(Math.random() * colors.length)];
  }

  return (
    <div className="w-screen h-screen flex items-center justify-center bg-gradient-to-br from-pink-200 via-purple-200 to-red-200 overflow-hidden relative">
      {!showMessage ? (
        <motion.button
          onClick={() => setShowMessage(true)}
          className="px-10 py-5 text-2xl md:text-3xl font-extrabold rounded-3xl bg-gradient-to-r from-pink-500 to-red-500 text-white shadow-xl hover:scale-110 transition"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
        >
          🎁 Surprise for Lisa 🎉
        </motion.button>
      ) : (
        <motion.div
          className="text-center p-6 md:p-10 rounded-3xl bg-white/90 backdrop-blur-md shadow-2xl max-w-lg z-10"
          initial={{ opacity: 0, scale: 0.7 }}
          animate={{ opacity: 1, scale: 1 }}
        >
          <h1 className="text-3xl md:text-5xl font-bold text-pink-600 mb-4 animate-pulse">
            ✨ Happy Birthday Lisa ✨
          </h1>
          <p className="text-base md:text-lg text-gray-700 leading-relaxed">
            Wishing you endless joy, magical moments, and colorful memories.
            💖🎂🎉
            <br />
            May your special day sparkle with love and happiness — because you
            truly deserve the brightest smile every day ✨🌸
          </p>
          <p className="mt-6 text-lg font-semibold text-red-500">
            — With love, Fahim 💕
          </p>
        </motion.div>
      )}

      {/* Balloons & Hearts */}
      {balloons.map((b) => (
        <motion.div
          key={b.id}
          className="absolute bottom-[-120px]"
          style={{
            left: `${b.left}%`,
            width: `${b.size}px`,
            height: `${b.size * 1.3}px`,
          }}
          initial={{ y: 0, opacity: 1, scale: 1, rotate: 0 }}
          animate={{ y: -900, opacity: 0, scale: [1, 1.15, 1], rotate: 360 }}
          transition={{ duration: 8, ease: "easeInOut" }}
        >
          {b.shape === "heart" ? (
            <div
              className="w-full h-full relative"
              style={{
                transform: "rotate(-45deg)",
                background: b.color,
                borderRadius: "50% 50% 0 0",
              }}
            >
              <div
                className="absolute"
                style={{
                  width: "100%",
                  height: "100%",
                  top: "0",
                  left: "50%",
                  background: b.color,
                  borderRadius: "50% 50% 0 0",
                  transform: "translateX(-50%) rotate(90deg)",
                }}
              ></div>
            </div>
          ) : (
            <div
              className="w-full h-full rounded-full"
              style={{ background: b.color }}
            ></div>
          )}
        </motion.div>
      ))}

      {/* Sparkles background */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(25)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-white rounded-full opacity-80"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: [0, 1.5, 0], opacity: [0, 1, 0] }}
            transition={{ duration: 3, repeat: Infinity, delay: i * 0.2 }}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
