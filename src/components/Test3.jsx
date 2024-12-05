import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion'; // For animations
import { ArrowLeftIcon } from '@heroicons/react/24/solid'; // Back arrow icon
import { useNavigate } from 'react-router-dom'; // For navigation

const Test3 = () => {
  const navigate = useNavigate(); // For navigation

  // Simpler word bank for easier gameplay
  const words = ['cat', 'dog', 'sun', 'ball', 'tree', 'book', 'fish', 'apple', 'house'];
  
  const [scrambledWord, setScrambledWord] = useState('');
  const [originalWord, setOriginalWord] = useState('');
  const [input, setInput] = useState('');
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30);
  const [gameOver, setGameOver] = useState(false);

  // Scramble a word
  const scrambleWord = (word) => word.split('').sort(() => Math.random() - 0.5).join('');

  // Generate a new word when the game starts or after a correct answer
  const generateWord = () => {
    const word = words[Math.floor(Math.random() * words.length)];
    setOriginalWord(word);
    setScrambledWord(scrambleWord(word));
  };

  // Initialize the game
  useEffect(() => {
    generateWord();

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

  // Handle user input
  const handleSubmit = () => {
    if (!gameOver && input.toLowerCase() === originalWord.toLowerCase()) {
      setScore(score + 1);
      setInput('');
      generateWord(); // Generate a new word
    }
  };

  // Go back to tests overview
  const goBack = () => navigate('/tests');

  return (
    <div className="bg-primary min-h-screen flex flex-col items-center text-white">
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

      <h1 className="text-3xl font-bold mt-10">Game 3: Word Scramble</h1>
      <p className="text-lg mt-4">Unscramble the letters to form a valid word!</p>

      {/* Scrambled Word */}
      <div className="text-4xl font-bold bg-gray-800 p-4 rounded-md mt-6">{scrambledWord}</div>

      {/* Input Field */}
      <div className="mt-6">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="text-black px-4 py-2 rounded-md"
          placeholder="Your answer..."
          disabled={gameOver} // Disable input after the game ends
        />
        <button
          onClick={handleSubmit}
          className={`ml-4 px-4 py-2 rounded-md font-bold text-white ${
            gameOver ? 'bg-gray-500 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-600'
          }`}
          disabled={gameOver} // Disable button after the game ends
        >
          Submit
        </button>
      </div>

      {/* Timer and Score */}
      <div className="mt-8">
        <p>
          <strong>Time Left:</strong> {timeLeft}s
        </p>
        <p>
          <strong>Score:</strong> {score}
        </p>
      </div>

      {/* Game Over Message */}
      {gameOver && (
        <motion.div
          className="mt-8 text-center"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-2xl font-bold text-red-500">Game Over!</h2>
          <p className="mt-4">You scored <strong>{score}</strong> points!</p>
        </motion.div>
      )}
    </div>
  );
};

export default Test3;
