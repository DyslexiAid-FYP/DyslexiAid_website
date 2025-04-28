import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeftIcon, CheckIcon, XMarkIcon } from '@heroicons/react/24/solid';
import { useNavigate } from 'react-router-dom';

const gridSize = 5; // 5x5 grid
const targetLetter = 'b'; // Letter to identify
const letters = ['b', 'd', 'q', 'p']; // Possible letters in the grid
const timeLimit = 30; // Time limit in seconds

const Test1 = () => {
  const navigate = useNavigate();

  const [grid, setGrid] = useState([]);
  const [score, setScore] = useState(0);
  const [misses, setMisses] = useState(0);
  const [timeLeft, setTimeLeft] = useState(timeLimit);
  const [gameOver, setGameOver] = useState(false);

  // Generate a random grid
  const generateGrid = () => {
    const newGrid = [];
    for (let i = 0; i < gridSize; i++) {
      const row = [];
      for (let j = 0; j < gridSize; j++) {
        row.push(letters[Math.floor(Math.random() * letters.length)]);
      }
      newGrid.push(row);
    }
    return newGrid;
  };

  const GoBack = () => {
    navigate('/tests');
  };

  // Initialize the grid and timer
  useEffect(() => {
    setGrid(generateGrid());

    const timer = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime > 1) {
          return prevTime - 1;
        } else {
          clearInterval(timer);
          setGameOver(true);
          return 0;
        }
      });
    }, 1000);

    return () => clearInterval(timer);
    // eslint-disable-next-line
  }, []);

  // Submit results on game over
  useEffect(() => {
    if (gameOver) {
      const accuracy = ((score / (score + misses)) * 100).toFixed(2);
      const token = localStorage.getItem('token');
      if (!token) return;
      fetch('http://localhost:5000/api/test-results/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          testName: 'Letter Identification',
          score,
          misses,
          accuracy,
        }),
      }).catch(() => {});
    }
  }, [gameOver, score, misses]);

  // Handle clicking a cell
  const handleClick = (letter) => {
    if (gameOver) return;
    if (letter === targetLetter) {
      setScore((s) => s + 1);
    } else {
      setMisses((m) => m + 1);
    }
    setGrid(generateGrid());
  };

  // For circular timer
  const circleRadius = 45;
  const circleCircumference = 2 * Math.PI * circleRadius;
  const progress = timeLeft / timeLimit;

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 to-indigo-900 flex flex-col md:flex-row items-center justify-center text-white relative">
      {/* Back Button */}
      <motion.button
        onClick={GoBack}
        className="absolute top-6 left-6 flex items-center gap-2 group"
        whileHover={{ scale: 1.05 }}
      >
        <ArrowLeftIcon className="h-8 w-8 text-purple-200 group-hover:text-white transition-colors" />
        <span className="text-xl font-semibold text-purple-200 group-hover:text-white transition-colors">
          All Tests
        </span>
      </motion.button>

      {/* Main Content */}
      <div className="flex flex-col items-center space-y-8 p-8 flex-1">
        <motion.div
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="text-center"
        >
          <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-400 mb-2">
            Letter Identification
          </h1>
          <p className="text-xl text-purple-100">
            Find all <span className="font-bold text-2xl text-cyan-400">{targetLetter}</span> letters
          </p>
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-5 gap-3 md:gap-4 p-4 bg-white/10 backdrop-blur-sm rounded-2xl shadow-xl">
  {grid.map((row, rowIndex) =>
    row.map((letter, colIndex) => (
      <motion.button
        key={`${rowIndex}-${colIndex}`}
        onClick={() => handleClick(letter)}
        className="w-12 h-12 md:w-16 md:h-16 flex items-center justify-center rounded-lg text-2xl font-bold transition-colors bg-purple-400/20 hover:bg-purple-400/30"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        transition={{ type: 'spring', stiffness: 300 }}
      >
        <motion.span
          key={`${rowIndex}-${colIndex}-${letter}`}
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          className="block"
        >
          {letter}
        </motion.span>
      </motion.button>
    ))
  )}
</div>

      </div>

      {/* Stats Panel */}
      <motion.div 
        className="w-full md:w-96 bg-white/10 backdrop-blur-lg rounded-none md:rounded-l-2xl p-6 md:min-h-screen flex flex-col justify-center"
        initial={{ x: 100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
      >
        {/* Timer */}
        <div className="mb-8 flex flex-col items-center">
          <div className="relative w-32 h-32 mb-4">
            <svg className="w-full h-full" viewBox="0 0 100 100">
              <circle
                cx="50"
                cy="50"
                r={circleRadius}
                className="stroke-purple-200/20 fill-none"
                strokeWidth="6"
              />
              <motion.circle
                cx="50"
                cy="50"
                r={circleRadius}
                className="stroke-cyan-400 fill-none"
                strokeWidth="6"
                strokeLinecap="round"
                strokeDasharray={circleCircumference}
                strokeDashoffset={circleCircumference * (1 - progress)}
                transition={{ duration: 1 }}
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center text-2xl font-bold">
              {timeLeft}s
            </div>
          </div>
        </div>

        {/* Score Board */}
        <div className="space-y-6 mb-8">
          <div className="flex items-center justify-between bg-purple-400/20 p-4 rounded-lg">
            <div className="flex items-center gap-2">
              <CheckIcon className="w-6 h-6 text-green-400" />
              <span className="font-semibold">Correct</span>
            </div>
            <span className="text-2xl font-bold text-cyan-400">{score}</span>
          </div>
          
          <div className="flex items-center justify-between bg-purple-400/20 p-4 rounded-lg">
            <div className="flex items-center gap-2">
              <XMarkIcon className="w-6 h-6 text-red-400" />
              <span className="font-semibold">Misses</span>
            </div>
            <span className="text-2xl font-bold text-red-400">{misses}</span>
          </div>
        </div>

        {/* Game Over Screen */}
        <AnimatePresence>
          {gameOver && (
            <motion.div
              className="bg-purple-400/20 p-6 rounded-xl text-center"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.5 }}
            >
              <h2 className="text-3xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-400">
                Time's Up!
              </h2>
              <div className="space-y-2">
                <p className="text-xl">
                  Accuracy: <span className="font-bold text-cyan-400">
                    {((score / (score + misses)) * 100 || 0).toFixed(1)}%
                  </span>
                </p>
                <p className="text-purple-200">
                  {score} hits • {misses} misses
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

export default Test1;
