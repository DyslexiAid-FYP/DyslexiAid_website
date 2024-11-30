import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion'; // Import Framer Motion
import { ArrowLeftIcon } from '@heroicons/react/24/solid'; // Import the back arrow icon
import { useNavigate } from 'react-router-dom'; // Import the useNavigate hook

const Test1 = () => {
  const gridSize = 5; // 5x5 grid
  const targetLetter = 'b'; // Letter to identify
  const letters = ['b', 'd', 'q', 'p']; // Possible letters in the grid
  const timeLimit = 30; // Time limit in seconds
  const navigate = useNavigate(); // Initialize the useNavigate hook

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
    navigate('/tests'); // Navigate to the home page
  };
  // Initialize the grid when the component mounts
  useEffect(() => {
    setGrid(generateGrid());

    // Start the timer
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

    return () => clearInterval(timer); // Cleanup on unmount
  }, []);

  // Handle clicking a cell
  const handleClick = (letter) => {
    if (gameOver) return;

    if (letter === targetLetter) {
      setScore(score + 1);
    } else {
      setMisses(misses + 1);
    }

    // Regenerate the grid after each click
    setGrid(generateGrid());
  };

  return (
    
      <div className="bg-primary min-h-screen flex flex-col md:flex-row items-center justify-center text-white">
      {/* Left Side: Grid */}

      <div className="absolute top-6 left-6">
  <button
    onClick={GoBack}
    className="text-white flex items-center space-x-2 hover:text-blue-400 transition duration-200"
  >
    <ArrowLeftIcon className="h-6 w-6" />
    <span className="text-lg font-semibold hover:underline">Back to tests</span>
  </button>
</div>

      <div className="flex-1 flex flex-col items-center">
        <h1 className="text-3xl font-bold mb-4">Game 1: Letter Identification</h1>
        <p className="text-lg mb-6">
          Identify all occurrences of the letter <strong>{targetLetter}</strong> in the grid.
        </p>

        {/* Grid */}
        <div className="grid grid-cols-5 gap-4">
          {grid.map((row, rowIndex) =>
            row.map((letter, colIndex) => (
              <motion.button
                key={`${rowIndex}-${colIndex}`}
                onClick={() => handleClick(letter)}
                className="bg-blue-500 w-16 h-16 flex items-center justify-center rounded-md text-xl font-bold"
                whileHover={{ scale: 1.2 }} // Scale on hover
                whileTap={{ scale: 0.9 }} // Scale on click
              >
                {letter}
              </motion.button>
            ))
          )}
        </div>
      </div>

      {/* Right Side: Timer, Score, and Game Over */}
      <motion.div
  className="flex flex-col items-start p-6 bg-gray-800 rounded-md h-auto w-full md:w-1/3 mr-10" // Adjusted width
  initial={{ opacity: 0, x: 50 }}
  animate={{ opacity: 1, x: 0 }}
  transition={{ duration: 0.5 }}
>
  {/* Timer and Score */}
  <div className="mb-6">
    <div className="mb-2">
      <span className="font-semibold">Time Left:</span> {timeLeft}s
    </div>
    <div className="mb-2">
      <span className="font-semibold">Score:</span> {score}
    </div>
    <div>
      <span className="font-semibold">Misses:</span> {misses}
    </div>
  </div>

  {/* Game Over Message */}
  {gameOver && (
    <motion.div
      className="mt-8 text-left"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="text-2xl font-bold text-red-500">Game Over!</h2>
      <p className="mt-2">
        You scored <strong>{score}</strong> points with <strong>{misses}</strong> misses.
      </p>
      <p className="text-lg mt-4">
        Accuracy: <strong>{((score / (score + misses)) * 100).toFixed(2)}%</strong>
      </p>
    </motion.div>
  )}
</motion.div>

    </div>
  );
};

export default Test1;
