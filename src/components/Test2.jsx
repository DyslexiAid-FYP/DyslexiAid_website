import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion'; // For animations
import { ArrowLeftIcon } from '@heroicons/react/24/solid'; // Back arrow icon
import { useNavigate } from 'react-router-dom'; // For navigation

const Test2 = () => {
  const gridSize = 5; // 5x5 grid
  const targetLetter = 'E'; // Letter to find
  const fillerLetter = 'F'; // Distractor letter
  const timeLimit = 30; // Time limit in seconds
  const navigate = useNavigate(); // For back navigation

  const [grid, setGrid] = useState([]);
  const [score, setScore] = useState(0);
  const [misses, setMisses] = useState(0); // Track misses
  const [timeLeft, setTimeLeft] = useState(timeLimit);
  const [gameOver, setGameOver] = useState(false);

  // Generate a grid with one target letter
  const generateGrid = () => {
    const newGrid = [];
    for (let i = 0; i < gridSize; i++) {
      const row = Array(gridSize).fill(fillerLetter);
      newGrid.push(row);
    }
    // Place the target letter at a random position
    const targetRow = Math.floor(Math.random() * gridSize);
    const targetCol = Math.floor(Math.random() * gridSize);
    newGrid[targetRow][targetCol] = targetLetter;
    return newGrid;
  };

  // Initialize grid and start timer
  useEffect(() => {
    setGrid(generateGrid());

    const timer = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime > 1) return prevTime - 1;
        clearInterval(timer);
        setGameOver(true);
        return 0;
      });
    }, 1000);

    return () => clearInterval(timer); // Cleanup on unmount
  }, []);
  useEffect(() => {
    if (gameOver) {
      console.log('Game Over, submitting test results...');
      
      const accuracy = ((score / (score + misses)) * 100).toFixed(2); // Calculate accuracy
      const token = localStorage.getItem('token');
      if (!token) {
        console.error('No token found in localStorage');
        return;
      }
  
      // Submit the test result with the token
      fetch('http://localhost:5000/api/test-results/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          testName: 'Letter Focus',
          score,
          misses, // Assuming misses are the number of incorrect clicks
          accuracy,
        }),
      })
      .then((res) => {
        if (!res.ok) {
          throw new Error('Failed to submit test result');
        }
        return res.json();
      })
      .then((data) => {
        console.log('Test result submitted:', data);
      })
      .catch((err) => {
        console.error('Error submitting test result:', err);
      });
    }
  }, [gameOver, score, misses]);
  
  // Handle letter click
  const handleClick = (letter) => {
    if (gameOver) return;
    if (letter === targetLetter) {
      setScore(score + 1); // Correct click, increment score
    } else {
      setMisses(misses + 1); // Incorrect click, increment misses
    }
    setGrid(generateGrid()); // Regenerate the grid on every click
  };

  // Handle navigation back to tests overview
  const goBack = () => navigate('/tests');

  return (
    <div className="bg-primary min-h-screen flex flex-col md:flex-row items-center justify-center text-white">
      {/* Back Button */}
      <div className="absolute top-6 left-6">
        <button
          onClick={goBack}
          className="text-white flex items-center space-x-2 hover:text-blue-400 transition duration-200"
        >
          <ArrowLeftIcon className="h-6 w-6" />
          <span className="text-lg font-semibold hover:underline">Back to tests</span>
        </button>
      </div>

      {/* Left Side: Game Grid */}
      <div className="flex-1 flex flex-col items-center">
        <h1 className="text-3xl font-bold mb-4">Game 2: Letter Focus</h1>
        <p className="text-lg mb-6">
          Find and click the letter <strong>{targetLetter}</strong> in the grid of <strong>{fillerLetter}</strong>'s.
        </p>

        {/* Grid */}
        <div className="grid grid-cols-5 gap-4">
          {grid.map((row, rowIndex) =>
            row.map((letter, colIndex) => (
              <motion.button
                key={`${rowIndex}-${colIndex}`}
                onClick={() => handleClick(letter)}
                className="bg-blue-500 w-16 h-16 flex items-center justify-center rounded-md text-xl font-bold"
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
              >
                {letter}
              </motion.button>
            ))
          )}
        </div>
      </div>

      {/* Right Side: Timer and Score */}
      <motion.div
        className="flex flex-col items-start p-6 bg-gray-800 rounded-md h-auto w-full md:w-1/3 mr-10"
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="mb-6">
          <div className="mb-2">
            <span className="font-semibold">Time Left:</span> {timeLeft}s
          </div>
          <div className="mb-2">
            <span className="font-semibold">Score:</span> {score}
          </div>
          <div className="mb-2">
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
            <p>
              Your accuracy is <strong>{((score / (score + misses)) * 100).toFixed(2)}%</strong>.
            </p>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
};

export default Test2;
