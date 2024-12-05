import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeftIcon } from '@heroicons/react/24/solid';
import { useNavigate } from 'react-router-dom';

const Game4 = () => {
  const allWords = [
    { word: 'flower', incorrect: 'flowper' },
    { word: 'basket', incorrect: 'basxket' },
    { word: 'purple', incorrect: 'purxple' },
    { word: 'orange', incorrect: 'oragne' },
    { word: 'castle', incorrect: 'castel' },
    { word: 'plant', incorrect: 'planit' },
    { word: 'pencil', incorrect: 'penxcil' },
  ];

  const [availableWords, setAvailableWords] = useState([...allWords]); // Remaining words
  const [currentWord, setCurrentWord] = useState({});
  const [input, setInput] = useState('');
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30);
  const [gameOver, setGameOver] = useState(false);
  const navigate = useNavigate();

  // Initialize the game
  useEffect(() => {
    selectNewWord();

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev > 1) return prev - 1;
        clearInterval(timer);
        setGameOver(true);
        return 0;
      });
    }, 1000);

    return () => clearInterval(timer); // Cleanup on unmount
  }, []);

  // Select a new word
  const selectNewWord = () => {
    if (availableWords.length === 0) {
      setGameOver(true); // End game if no words are left
      return;
    }

    const randomIndex = Math.floor(Math.random() * availableWords.length);
    const selectedWord = availableWords[randomIndex];
    setCurrentWord(selectedWord);

    // Remove the selected word from the pool
    const updatedWords = [...availableWords];
    updatedWords.splice(randomIndex, 1); // Remove selected word
    setAvailableWords(updatedWords);
  };

  // Handle input change
  const handleInputChange = (e) => setInput(e.target.value.toLowerCase());

  // Check the user's answer
  const handleSubmit = () => {
    if (input === currentWord.word) {
      setScore(score + 1);
      setInput('');
      selectNewWord(); // Load a new word
    }
  };

  // Navigate back to the tests overview
  const goBack = () => navigate('/tests');

  return (
    <div className="bg-primary min-h-screen flex flex-col items-center justify-center text-white">
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

      {/* Game Content */}
      <div className="flex flex-col items-center">
        <h1 className="text-3xl font-bold mb-4">Game 4: Letter Elimination</h1>
        <p className="text-lg mb-6">
          Identify and remove the incorrect letter to form a valid word.
        </p>
        <div className="bg-gray-800 p-4 rounded-lg text-xl font-bold mb-6">
          {currentWord.incorrect?.toUpperCase() || 'Loading...'}
        </div>
        {!gameOver && (
          <>
            <input
              type="text"
              value={input}
              onChange={handleInputChange}
              className="p-2 rounded-md text-gray-800"
              placeholder="Type your answer"
            />
            <button
              onClick={handleSubmit}
              className="mt-4 bg-blue-500 px-4 py-2 rounded-md hover:bg-blue-400 transition"
            >
              Submit
            </button>
          </>
        )}
      </div>

      {/* Right Side: Timer and Score */}
      <motion.div
        className="absolute top-6 right-6 p-6 bg-gray-800 rounded-md"
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="mb-4">
          <span className="font-semibold">Time Left:</span> {timeLeft}s
        </div>
        <div>
          <span className="font-semibold">Score:</span> {score}
        </div>
      </motion.div>

      {/* Game Over */}
      {gameOver && (
        <motion.div
          className="mt-8 p-4 bg-gray-900 text-center rounded-lg"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-2xl font-bold text-red-500">Game Over!</h2>
          <p className="mt-2">
            You scored <strong>{score}</strong> points!
          </p>
          {availableWords.length === 0 && (
            <p className="text-green-400 mt-2">You've completed all the words!</p>
          )}
        </motion.div>
      )}
    </div>
  );
};

export default Game4;
