import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion"; // Import AnimatePresence
import { ArrowLeftIcon, CheckIcon, XMarkIcon } from "@heroicons/react/24/solid"; // Import icons
import { useNavigate } from "react-router-dom";

const Game4 = () => {
  const allWords = [
    { word: "flower", incorrect: "flowper" },
    { word: "basket", incorrect: "basxket" },
    { word: "purple", incorrect: "purpole" },
    { word: "orange", incorrect: "orlange" },
    { word: "castle", incorrect: "casftle" },
    { word: "plant", incorrect: "planit" },
    { word: "pencil", incorrect: "pehncil" },
    { word: "button", incorrect: "butrton" },
    { word: "monkey", incorrect: "monakey" },
    { word: "school", incorrect: "schoonl" },
    { word: "yellow", incorrect: "yelllow" },
    { word: "rocket", incorrect: "rojcket" },
    { word: "circle", incorrect: "ciracle" },
    { word: "summer", incorrect: "sumdmer" },
    { word: "family", incorrect: "famkily" },
    { word: "pillow", incorrect: "pillqow" },
    { word: "window", incorrect: "winbdow" },
    { word: "jungle", incorrect: "juxngle" },
    { word: "number", incorrect: "numbzer" },
    { word: "market", incorrect: "markqet" },
  ];

  const [availableWords, setAvailableWords] = useState([...allWords]); // Remaining words
  const [currentWord, setCurrentWord] = useState({}); // Currently displayed word object
  const [input, setInput] = useState(""); // User input state
  const [score, setScore] = useState(0); // Player's score
  const [misses, setMisses] = useState(0); // Track incorrect attempts
  const [timeLeft, setTimeLeft] = useState(30); // Game timer state (initial 30 seconds)
  const [gameOver, setGameOver] = useState(false); // Game over state
  const [hasSubmitted, setHasSubmitted] = useState(false); // Flag to track submission
  const navigate = useNavigate(); // Navigation hook

  // Initialize the game and timer on component mount
  useEffect(() => {
    selectNewWord(); // Select the first word

    // Set up the game timer interval
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev > 0) {
          // Decrement time
          return prev - 1;
        } else {
          // Clear timer when time is up
          clearInterval(timer);
          setGameOver(true); // Set game over state
          return 0; // Set time left to 0
        }
      });
    }, 1000); // Timer interval is 1 second

    // Cleanup function to clear the timer on component unmount
    return () => clearInterval(timer);
  }, []); // Empty dependency array means this effect runs only once on mount

  // Submit results once when gameOver is true and not submitted yet
  useEffect(() => {
    if (gameOver && !hasSubmitted) {
      submitTestResult(); // Call the submission function
      setHasSubmitted(true); // Mark as submitted
    }
  }, [gameOver, hasSubmitted]); // Dependencies: runs when gameOver or hasSubmitted changes

  // Select a new word from the available pool
  const selectNewWord = () => {
    if (availableWords.length === 0) {
      // If no words left and time is not yet 0, set game over
      if (timeLeft > 0) {
         setGameOver(true);
      }
      return;
    }

    // Select a random index from the available words
    const randomIndex = Math.floor(Math.random() * availableWords.length);
    const selectedWord = availableWords[randomIndex];
    setCurrentWord(selectedWord); // Set the selected word

    // Remove the selected word from the pool to avoid repetition
    const updatedWords = [...availableWords];
    updatedWords.splice(randomIndex, 1); // Remove selected word by index
    setAvailableWords(updatedWords); // Update available words state
  };

  // Handle input change (no submission here)
  const handleInputChange = (e) => {
    setInput(e.target.value); // Update input state
  };

  // Handle Enter key press
  const handleInputKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSubmit(); // Submit the answer
    }
  };


  // Check the user's answer and update score/misses
  const handleSubmit = () => {
    if (gameOver) return; // Prevent submission after game over

    // Update score or misses based on the input comparison (case-insensitive)
    if (input.toLowerCase() === currentWord.word.toLowerCase()) {
      setScore((prevScore) => prevScore + 1); // Use previous state to update score
      // If correct, immediately select a new word
      selectNewWord();
    } else {
      setMisses((prevMisses) => prevMisses + 1); // Use previous state to update misses
      // If incorrect, keep the same word but clear input
    }

    setInput(""); // Clear input field after submission
     // Note: selectNewWord() is now called only on correct answers.
     // If you want a new word on every submit, move selectNewWord() here.
  };

  // Calculate accuracy percentage
  const calculateAccuracy = () => {
    const totalAttempts = score + misses; // Total number of words attempted
    return totalAttempts === 0 ? 0 : ((score / totalAttempts) * 100).toFixed(1); // Calculate and format accuracy
  };

  // Submit the test result to the backend API
  const submitTestResult = () => {
    const accuracy = calculateAccuracy(); // Get the calculated accuracy

    const token = localStorage.getItem("token"); // Get the auth token
    if (!token) {
      console.error("No token found in localStorage");
      // Optionally, handle missing token (e.g., redirect to login)
      return;
    }

    // Send the test result data via POST request
    fetch("http://localhost:5000/api/test-results/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`, // Include the token
      },
      body: JSON.stringify({
        testName: "Letter Elimination", // Static test name
        score: score, // Final score
        misses: misses, // Final misses
        accuracy: accuracy, // Calculated accuracy
      }),
    })
      .then((res) => {
        if (!res.ok) {
          // Attempt to read error body if response is not ok
          return res.json().then(err => { throw new Error(err.message || `Failed to submit test result: ${res.status}`); });
        }
        return res.json(); // Parse JSON response
      })
      .then((data) => {
        console.log("Result submitted successfully:", data);
        // Optionally, show a success message to the user
      })
      .catch((err) => {
        console.error("Error submitting test result:", err);
        // Optionally, show an error message to the user
      });
  };

  // Navigate back to the tests overview page
  const goBack = () => {
    navigate("/tests");
  };

  // For circular timer (copied from Test3)
  const circleRadius = 45;
  const circleCircumference = 2 * Math.PI * circleRadius;
  const progress = timeLeft / 30; // Assuming initial time is 30

  return (
    // Overall Container - copied from Test3
    <div className="min-h-screen bg-gradient-to-br from-purple-900 to-indigo-900 flex flex-col md:flex-row items-center md:items-stretch md:justify-between text-white relative">
      {/* Back Button - copied from Test3 */}
      <div className="absolute top-6 left-6 z-10">
        <button
          onClick={goBack}
          className="text-white flex items-center space-x-2 hover:text-blue-300 transition duration-200 focus:outline-none focus:ring-2 focus:ring-blue-400 rounded-md px-3 py-1"
        >
          <ArrowLeftIcon className="h-5 w-5" />
          <span className="text-base font-semibold hover:underline">Back to tests</span>
        </button>
      </div>

      {/* Main Game Content Area - copied structure from Test3's main area */}
      <div className="flex flex-col items-center space-y-8 px-6 py-8 flex-1 justify-center">
        <motion.div
          className="bg-gray-800 bg-opacity-70 p-8 rounded-lg shadow-xl text-center w-full max-w-md border-2 border-[#2AA198]"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <h1 className="text-3xl font-bold mb-4 text-blue-300">Game 4: Letter Elimination</h1>
          <p className="text-lg mb-6 text-gray-300">Identify and remove the incorrect letter to form a valid word.</p>

          {/* Incorrect Word Display - copied structure from Test3's scrambled word */}
          <motion.div
            key={currentWord.incorrect} // Key to re-trigger animation on word change
            className="text-5xl font-extrabold tracking-wide bg-gray-700 p-6 rounded-md mb-8 inline-block min-w-[200px]"
            initial={{ scale: 0.9, opacity: 0.5 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
          >
            {currentWord.incorrect?.toUpperCase() || "Loading..."}
          </motion.div>

          {/* Input Field and Submit Button - copied structure from Test3 */}
          <div className="flex flex-col items-center space-y-4 md:flex-row md:space-y-0 md:space-x-4">
            <input
              type="text"
              value={input}
              onChange={handleInputChange}
              onKeyDown={handleInputKeyDown} // Use the dedicated keydown handler
              className="p-3 rounded-md text-gray-800 w-full md:w-auto flex-grow focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Type the correct word"
              disabled={gameOver}
            />

            <button
              onClick={handleSubmit}
              className={`px-6 py-3 rounded-md font-bold text-white transition duration-200 focus:outline-none focus:ring-2 focus:ring-blue-400 ${
                gameOver ? 'bg-gray-500 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'
              }`}
              disabled={gameOver}
            >
              Submit
            </button>
          </div>
        </motion.div>
      </div>

      {/* Sidebar/Stats Area - copied from Test3 */}
      <motion.div
        className="w-full md:w-96 bg-white/10 backdrop-blur-lg rounded-none md:rounded-l-2xl p-6 md:min-h-screen flex flex-col justify-center"
        initial={{ x: 100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.6 }} // Adjusted transition duration slightly for the sidebar
      >
        {/* Timer - copied from Test3 */}
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
                style={{ origin: 'center' }}
                transition={{ duration: 1 }}
              />
            </svg>
             {/* Timer text display - copied from Test3 */}
            <div className="absolute inset-0 flex items-center justify-center text-3xl font-bold text-white">
                {timeLeft}s
            </div>
          </div>
        </div>

        {/* Score Board - copied from Test3 */}
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

        {/* Game Over Screen - copied from Test3, wrapped in AnimatePresence */}
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
                  Accuracy:{' '}
                  <span className="font-bold text-cyan-400">
                    {calculateAccuracy()}% {/* Use calculateAccuracy function */}
                  </span>
                </p>
                <p className="text-purple-200">
                  {score} hits • {misses} misses
                </p>
                 {/* Message if all words were completed before time ran out */}
                 {availableWords.length === 0 && allWords.length > 0 && (
                    <p className="text-green-400 mt-2 font-semibold">You've completed all the words!</p>
                 )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

export default Game4;