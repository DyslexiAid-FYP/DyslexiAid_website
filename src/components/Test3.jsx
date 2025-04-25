import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion'; // For animations
import { ArrowLeftIcon } from '@heroicons/react/24/solid'; // Back arrow icon
import { useNavigate } from 'react-router-dom'; // For navigation

const Test3 = () => {
  const navigate = useNavigate(); // For navigation

  // Array of words for the game
  const words = [
    'ball', 'tree', 'book', 'fish', 'apple', 'house', 'happy', 'bump', 'plate',
    'glass', 'bottle', 'fork', 'water', 'chat', 'cup',
    'cat', 'dog', 'sun', 'moon', 'star', 'bird', 'door', 'shoe', 'sock',
    'jump', 'run', 'walk', 'sing', 'play', 'blue', 'red', 'green', 'yellow',
    'small', 'big', 'cold', 'hot', 'milk', 'bread', 'chair', 'table', 'hand',
    'foot', 'head', 'eyes', 'ears', 'nose', 'mouth', 'face', 'time', 'game',
    'park', 'road', 'car', 'bus', 'train', 'plane', 'boat', 'swim', 'read',
    'write', 'draw', 'talk', 'baby', 'child', 'adult', 'man', 'woman', 'boy',
    'girl', 'family', 'friend', 'love', 'kind', 'nice', 'good', 'bad', 'sad',
    'cry', 'laugh', 'smile', 'food', 'drink', 'eat', 'sleep', 'day', 'night',
    'morning', 'mouse', 'snake', 'tiger', 'lion', 'zebra', 'horse', 'sheep',
    'cow', 'pig', 'farm', 'city', 'town', 'home', 'room', 'bed', 'sofa',
    'desk', 'light', 'dark', 'near', 'far', 'slow', 'fast', 'loud', 'quiet',
    'clean', 'dirty', 'new', 'old', 'young', 'true', 'false', 'yes', 'no',
    'up', 'down', 'in', 'out', 'on', 'off', 'under', 'over', 'with', 'without',
    'and', 'but', 'or', 'if', 'so', 'then', 'when', 'where', 'why', 'how',
    'what', 'who', 'whom', 'whose', 'which', 'this', 'that', 'these', 'those',
    'my', 'your', 'his', 'her', 'its', 'our', 'their', 'me', 'you', 'him',
    'her', 'it', 'us', 'them', 'i', 'he', 'she', 'it', 'we', 'they', 'am',
    'is', 'are', 'was', 'were', 'be', 'been', 'have', 'has', 'had', 'do',
    'does', 'did', 'can', 'could', 'will', 'would', 'shall', 'should', 'may',
    'might', 'must'
  ];  const [hasSubmitted, setHasSubmitted] = useState(false); // State to prevent multiple submissions

  const [scrambledWord, setScrambledWord] = useState(''); // State for the currently scrambled word
  const [originalWord, setOriginalWord] = useState(''); // State for the original word
  const [input, setInput] = useState(''); // State for user input
  const [score, setScore] = useState(0); // State for the player's score
  const [misses, setMisses] = useState(0); // State to track incorrect attempts
  const [timeLeft, setTimeLeft] = useState(30); // State for the game timer
  const [gameOver, setGameOver] = useState(false); // State to indicate if the game is over

  // Function to scramble a given word
  const scrambleWord = (word) => {
    let letters = word.split("");

    // Fisher-Yates (Knuth) Shuffle algorithm
    for (let i = letters.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [letters[i], letters[j]] = [letters[j], letters[i]]; // Swap letters
    }

    let scrambled = letters.join("");

    // Ensure the scrambled word is different from the original
    // If it's the same, recursively call scrambleWord until it's different
    return scrambled === word ? scrambleWord(word) : scrambled;
  };

  // Function to generate a new word for the game
  const generateWord = () => {
    // Shuffle the words array and pick a random word
    const shuffledWords = [...words].sort(() => Math.random() - 0.5);
    const word = shuffledWords[Math.floor(Math.random() * shuffledWords.length)];
    setOriginalWord(word); // Set the original word
    setScrambledWord(scrambleWord(word)); // Set the scrambled version
  };

  // useEffect hook to initialize the game and timer when the component mounts
  useEffect(() => {
    generateWord(); // Generate the first word

    // Set up the game timer
    const timer = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime > 1) {
          return prevTime - 1; // Decrement time
        } else {
          // Time is up
          clearInterval(timer); // Clear the timer
          setGameOver(true); // Set game over state
          return 0; // Set time left to 0
        }
      });
    }, 1000); // Timer interval is 1 second

    // Cleanup function to clear the timer when the component unmounts
    return () => clearInterval(timer);
  }, []); // Empty dependency array means this effect runs only once on mount

  // useEffect hook to submit results once when the game is over
  useEffect(() => {
    // Check if the game is over and results haven't been submitted yet
    if (gameOver && !hasSubmitted) {
      submitTestResult(); // Call the submission function
      setHasSubmitted(true); // Mark as submitted
    }
  }, [gameOver, hasSubmitted]); // Dependencies: runs when gameOver or hasSubmitted changes

  // Handle user input submission (when button is clicked or Enter is pressed)
  const handleSubmit = () => {
    // Only process submission if the game is not over
    if (!gameOver) {
      if (input.toLowerCase() === originalWord.toLowerCase()) {
        // Correct answer
        setScore(score + 1); // Increment score
        setInput(''); // Clear the input field
        generateWord(); // Generate a new word
      } else {
        // Incorrect answer
        setMisses(misses + 1); // Increment misses
      }
    }
  };

  // Handle input change and detect Enter key press
  const handleInputChange = (e) => {
    setInput(e.target.value); // Update input state (no toLowerCase here, handle in submit)

    // Check for Enter key press
    if (e.key === "Enter") {
      handleSubmit(); // Submit the answer
    }
  };

  // Function to submit test result to the backend
  const submitTestResult = () => {
    // Calculate accuracy safely, avoiding division by zero
    const totalAttempts = score + misses;
    const accuracy = totalAttempts === 0 ? 0 : ((score / totalAttempts) * 100);
    const formattedAccuracy = accuracy.toFixed(2); // Format accuracy to 2 decimal places

    const token = localStorage.getItem('token'); // Get the auth token from localStorage
    if (!token) {
      console.error('No token found in localStorage');
      // Optionally, redirect to login or show an error message to the user
      return; // Exit early if token is missing
    }

    // Send the test result data to the backend API
    fetch('http://localhost:5000/api/test-results/submit', {
      method: 'POST', // Use POST method
      headers: {
        'Content-Type': 'application/json', // Specify content type as JSON
        'Authorization': `Bearer ${token}`, // Include the auth token in the Authorization header
      },
      body: JSON.stringify({
        testName: 'Word Scramble', // Static test name for this component
        score: score, // Current score
        misses: misses, // Current misses
        accuracy: formattedAccuracy, // Calculated accuracy
      }),
    })
      .then((res) => {
        // Check if the response is OK (status code 200-299)
        if (!res.ok) {
          // If not OK, throw an error with the status
          throw new Error(`Failed to submit test result: ${res.status}`);
        }
        return res.json(); // Parse the JSON response
      })
      .then((data) => {
        console.log('Result submitted successfully:', data);
        // Optionally, show a success message to the user
      })
      .catch((err) => {
        console.error('Error submitting test result:', err);
        // Optionally, show an error message to the user
      });
  };

  // Function to navigate back to the tests overview page
  const goBack = () => navigate('/tests');

  return (
    // Main container with flex properties for centering
    // Reverted background to bg-primary
    <div className="bg-primary min-h-screen flex flex-col items-center justify-center text-white p-6">
      {/* Back Button - positioned absolutely */}
      <div className="absolute top-6 left-6 z-10"> {/* Added z-10 to ensure it's above other content */}
        <button
          onClick={goBack}
          className="text-white flex items-center space-x-2 hover:text-blue-300 transition duration-200 focus:outline-none focus:ring-2 focus:ring-blue-400 rounded-md px-3 py-1" // Added padding and focus styles
        >
          <ArrowLeftIcon className="h-5 w-5" /> {/* Slightly smaller icon */}
          <span className="text-base font-semibold hover:underline">Back to tests</span> {/* Adjusted font size */}
        </button>
      </div>

      {/* Game Content Container - Centered and styled */}
      <motion.div
        className="bg-gray-800 bg-opacity-70 p-8 rounded-lg shadow-xl text-center w-full max-w-md" // Added opacity, shadow, and max-width
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <h1 className="text-3xl font-bold mb-4 text-blue-300">Word Scramble</h1> {/* Adjusted margin and color */}
        <p className="text-lg mb-6 text-gray-300">Unscramble the letters to form a valid word!</p> {/* Adjusted margin and color */}

        {/* Scrambled Word Display */}
        <motion.div
          key={scrambledWord} // Use key to re-trigger animation on word change
          className="text-5xl font-extrabold tracking-wide bg-gray-700 p-6 rounded-md mb-8 inline-block min-w-[200px]" // Increased font size, tracking, padding, margin, added inline-block and min-width
          initial={{ scale: 0.9, opacity: 0.5 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
        >
          {scrambledWord.toUpperCase()} {/* Display in uppercase */}
        </motion.div>

        {/* Input Field and Submit Button */}
        <div className="flex flex-col items-center space-y-4 md:flex-row md:space-y-0 md:space-x-4"> {/* Use flex for layout, responsive */}
          <input
            type="text"
            value={input}
            onChange={handleInputChange}
            onKeyDown={handleInputChange} // Listen for Enter key
            className="p-3 rounded-md text-gray-800 w-full md:w-auto flex-grow focus:outline-none focus:ring-2 focus:ring-blue-500" // Added padding, full width on small screens, flex-grow, focus styles
            placeholder="Type your answer"
            disabled={gameOver} // Disable input after game ends
          />

          <button
            onClick={handleSubmit}
            className={`px-6 py-3 rounded-md font-bold text-white transition duration-200 focus:outline-none focus:ring-2 focus:ring-blue-400 ${
              gameOver ? 'bg-gray-500 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700' // Darker blue, better hover
            }`}
            disabled={gameOver} // Disable button after the game ends
          >
            Submit
          </button>
        </div>

        {/* Timer and Score Display */}
        <div className="mt-8 text-lg text-gray-300 space-y-2"> {/* Adjusted margin, font size, color, added space-y */}
          <p>
            <strong>Time Left:</strong> <span className="font-semibold text-blue-300">{timeLeft}s</span> {/* Highlight values */}
          </p>
          <p>
            <strong>Score:</strong> <span className="font-semibold text-green-400">{score}</span> {/* Highlight values */}
          </p>
          <p>
            <strong>Misses:</strong> <span className="font-semibold text-red-400">{misses}</span> {/* Display and highlight Misses */}
          </p>
        </div>

        {/* Game Over Message */}
        {gameOver && (
          <motion.div
            className="mt-8 text-center p-6 bg-gray-700 bg-opacity-80 rounded-md" // Added padding, background, opacity, rounded corners
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-2xl font-bold mb-3 text-red-400">Game Over!</h2> {/* Adjusted margin and color */}
            <p className="text-lg text-gray-200">You scored <strong className="text-green-400">{score}</strong> points!</p> {/* Highlight values */}
            <p className="text-lg text-gray-200 mt-1">You missed <strong className="text-red-400">{misses}</strong> answers.</p> {/* Display and highlight Misses */}
          </motion.div>
        )}
      </motion.div>
    </div>
  );
};

export default Test3;
