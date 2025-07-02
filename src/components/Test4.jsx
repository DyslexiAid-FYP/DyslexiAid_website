import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeftIcon, CheckIcon, XMarkIcon } from "@heroicons/react/24/solid";
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

  const [availableWords, setAvailableWords] = useState([...allWords]);
  const [currentWord, setCurrentWord] = useState({});
  const [input, setInput] = useState("");
  const [score, setScore] = useState(0);
  const [misses, setMisses] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30);
  const [gameOver, setGameOver] = useState(false);
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    selectNewWord();

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev > 0) {
          return prev - 1;
        } else {
          clearInterval(timer);
          setGameOver(true);
          return 0;
        }
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (gameOver && !hasSubmitted) {
      submitTestResult();
      setHasSubmitted(true);
    }
  }, [gameOver, hasSubmitted]);

  const selectNewWord = () => {
    if (availableWords.length === 0) {
      if (timeLeft > 0) {
        setGameOver(true);
      }
      return;
    }

    const randomIndex = Math.floor(Math.random() * availableWords.length);
    const selectedWord = availableWords[randomIndex];
    setCurrentWord(selectedWord);

    const updatedWords = [...availableWords];
    updatedWords.splice(randomIndex, 1);
    setAvailableWords(updatedWords);
  };

  const handleInputChange = (e) => {
    setInput(e.target.value);
  };

  const handleInputKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSubmit();
    }
  };

  const handleSubmit = () => {
    if (gameOver) return;

    if (input.toLowerCase() === currentWord.word.toLowerCase()) {
      setScore((prevScore) => prevScore + 1);
      selectNewWord();
    } else {
      setMisses((prevMisses) => prevMisses + 1);
    }

    setInput("");
  };

  const calculateAccuracy = () => {
    const totalAttempts = score + misses;
    return totalAttempts === 0 ? 0 : ((score / totalAttempts) * 100).toFixed(1);
  };

  const submitTestResult = () => {
    const accuracy = calculateAccuracy();

    const token = localStorage.getItem("token");
    if (!token) {
      console.error("No token found in localStorage");
      return;
    }

    fetch("http://localhost:5000/api/test-results/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        testName: "Letter Elimination",
        score,
        misses,
        accuracy,
      }),
    })
      .then((res) => {
        if (!res.ok) {
          return res.json().then((err) => {
            throw new Error(err.message || `Failed to submit test result: ${res.status}`);
          });
        }
        return res.json();
      })
      .then((data) => {
        console.log("Result submitted successfully:", data);
      })
      .catch((err) => {
        console.error("Error submitting test result:", err);
      });
  };

  const goBack = () => {
    navigate("/tests");
  };

  const circleRadius = 45;
  const circleCircumference = 2 * Math.PI * circleRadius;
  const progress = timeLeft / 30;

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 to-indigo-900 flex flex-col md:flex-row items-center md:items-stretch md:justify-between text-white relative px-4 sm:px-6">
      {/* Back Button */}
      <div className="absolute top-4 left-4 sm:top-6 sm:left-6 z-20">
        <button
          onClick={goBack}
          className="text-white flex items-center space-x-2 hover:text-blue-300 transition duration-200 focus:outline-none focus:ring-2 focus:ring-blue-400 rounded-md px-3 py-1"
        >
          <ArrowLeftIcon className="h-5 w-5 sm:h-6 sm:w-6" />
          <span className="text-sm sm:text-base font-semibold hover:underline">Back to tests</span>
        </button>
      </div>

      {/* Main Content */}
      <div className="flex flex-col items-center space-y-8 p-4 sm:p-8 flex-1 justify-center w-full max-w-md md:max-w-none mt-16 sm:mt-20">
        <motion.div
          className="bg-gray-800 bg-opacity-70 p-6 sm:p-8 rounded-lg shadow-xl text-center w-full max-w-md border-2 border-[#2AA198]"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <h1 className="text-3xl font-bold mb-4 text-blue-300">Game 4: Letter Elimination</h1>
          <p className="text-lg mb-6 text-gray-300">Identify and remove the incorrect letter to form a valid word.</p>

          <motion.div
            key={currentWord.incorrect}
            className="text-5xl font-extrabold tracking-wide bg-gray-700 p-6 rounded-md mb-8 inline-block min-w-[200px]"
            initial={{ scale: 0.9, opacity: 0.5 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
          >
            {currentWord.incorrect?.toUpperCase() || "Loading..."}
          </motion.div>

          <div className="flex flex-col items-center space-y-4 md:flex-row md:space-y-0 md:space-x-4 w-full">
            <input
              type="text"
              value={input}
              onChange={handleInputChange}
              onKeyDown={handleInputKeyDown}
              className="p-3 rounded-md text-gray-800 w-full md:w-auto flex-grow focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Type the correct word"
              disabled={gameOver}
              aria-label="Type the correct word"
            />

            <button
              onClick={handleSubmit}
              className={`px-6 py-3 rounded-md font-bold text-white transition duration-200 focus:outline-none focus:ring-2 focus:ring-blue-400 w-full md:w-auto ${
                gameOver ? "bg-gray-500 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"
              }`}
              disabled={gameOver}
            >
              Submit
            </button>
          </div>
        </motion.div>
      </div>

      {/* Stats Panel */}
      <motion.div
        className="w-full md:w-96 bg-white/10 backdrop-blur-lg rounded-none md:rounded-l-2xl p-4 sm:p-6 md:min-h-screen flex flex-col justify-center mt-8 md:mt-0"
        initial={{ x: 100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        {/* Timer */}
        <div className="mb-6 sm:mb-8 flex flex-col items-center">
          <div className="relative w-20 h-20 sm:w-32 sm:h-32 mb-4">
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
                style={{ origin: "center" }}
                transition={{ duration: 1 }}
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center text-xl sm:text-3xl font-bold text-white">
              {timeLeft}s
            </div>
          </div>
        </div>

        {/* Score Board */}
        <div className="space-y-5 sm:space-y-6 mb-6 sm:mb-8">
          <div className="flex items-center justify-between bg-purple-400/20 p-3 sm:p-4 rounded-lg">
            <div className="flex items-center gap-2">
              <CheckIcon className="w-5 h-5 sm:w-6 sm:h-6 text-green-400" />
              <span className="font-semibold text-sm sm:text-base">Correct</span>
            </div>
            <span className="text-xl sm:text-2xl font-bold text-cyan-400">{score}</span>
          </div>

          <div className="flex items-center justify-between bg-purple-400/20 p-3 sm:p-4 rounded-lg">
            <div className="flex items-center gap-2">
              <XMarkIcon className="w-5 h-5 sm:w-6 sm:h-6 text-red-400" />
              <span className="font-semibold text-sm sm:text-base">Misses</span>
            </div>
            <span className="text-xl sm:text-2xl font-bold text-red-400">{misses}</span>
          </div>
        </div>

        {/* Game Over Screen */}
        <AnimatePresence>
          {gameOver && (
            <motion.div
              className="bg-purple-400/20 p-5 sm:p-6 rounded-xl text-center"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.5 }}
            >
              <h2 className="text-2xl sm:text-3xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-400">
                Time's Up!
              </h2>
              <div className="space-y-2">
                <p className="text-lg sm:text-xl">
                  Accuracy:{" "}
                  <span className="font-bold text-cyan-400">{calculateAccuracy()}%</span>
                </p>
                <p className="text-purple-200 text-sm sm:text-base">
                  {score} hits • {misses} misses
                </p>
                {availableWords.length === 0 && allWords.length > 0 && (
                  <p className="text-green-400 mt-2 font-semibold">
                    You've completed all the words!
                  </p>
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
