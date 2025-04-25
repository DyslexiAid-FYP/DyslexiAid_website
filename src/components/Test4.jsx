import React, { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { ArrowLeftIcon } from "@heroicons/react/24/solid"
import { useNavigate } from "react-router-dom"

const Game4 = () => {
  const allWords = [
    { word: "flower", incorrect: "flowper" },
    { word: "basket", incorrect: "basxket" },
    { word: "purple", incorrect: "purpole" },
    { word: "orange", incorrect: "orlange" },
    { word: "castle", incorrect: "casftle" },
    { word: "plant", incorrect: "planit" },
    { word: "pencil", incorrect: "pehncil" },
    { word: "button", incorrect: "butrton" },   // remove 'r'
{ word: "monkey", incorrect: "monakey" },   // remove 'a'
{ word: "school", incorrect: "schoonl" },   // remove 'n'
{ word: "yellow", incorrect: "yelllow" },   // remove extra 'l'
{ word: "rocket", incorrect: "rojcket" },   // remove 'j'
{ word: "circle", incorrect: "ciracle" },   // remove 'a'
{ word: "summer", incorrect: "sumdmer" },   // remove 'd'
{ word: "family", incorrect: "famkily" },   // remove 'k'
{ word: "pillow", incorrect: "pillqow" },   // remove 'q'
{ word: "window", incorrect: "winbdow" },   // remove 'b'
{ word: "jungle", incorrect: "juxngle" },   // remove 'x'
{ word: "number", incorrect: "numbzer" },   // remove 'z'
{ word: "market", incorrect: "markqet" },   
  ]

  const [availableWords, setAvailableWords] = useState([...allWords]) // Remaining words
  const [currentWord, setCurrentWord] = useState({}) // Currently displayed word object
  const [input, setInput] = useState("") // User input state
  const [score, setScore] = useState(0) // Player's score
  const [misses, setMisses] = useState(0) // Track incorrect attempts
  const [timeLeft, setTimeLeft] = useState(30) // Game timer state
  const [gameOver, setGameOver] = useState(false) // Game over state
  const [hasSubmitted, setHasSubmitted] = useState(false) // Flag to track submission
  const navigate = useNavigate() // Navigation hook

  // Initialize the game and timer on component mount
  useEffect(() => {
    selectNewWord() // Select the first word

    // Set up the game timer interval
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev > 1) return prev - 1 // Decrement time

        clearInterval(timer) // Clear timer when time is up
        setGameOver(true) // Set game over state
        return 0 // Set time left to 0
      })
    }, 1000) // Timer interval is 1 second

    // Cleanup function to clear the timer on component unmount
    return () => clearInterval(timer)
  }, []) // Empty dependency array means this effect runs only once on mount

  // Submit results once when gameOver is true and not submitted yet
  useEffect(() => {
    if (gameOver && !hasSubmitted) {
      submitTestResult() // Call the submission function
      setHasSubmitted(true) // Mark as submitted
    }
  }, [gameOver, hasSubmitted]) // Dependencies: runs when gameOver or hasSubmitted changes

  // Select a new word from the available pool
  const selectNewWord = () => {
    if (availableWords.length === 0) {
      setGameOver(true) // End game if no words are left
      return
    }

    // Select a random index from the available words
    const randomIndex = Math.floor(Math.random() * availableWords.length)
    const selectedWord = availableWords[randomIndex]
    setCurrentWord(selectedWord) // Set the selected word

    // Remove the selected word from the pool to avoid repetition
    const updatedWords = [...availableWords]
    updatedWords.splice(randomIndex, 1) // Remove selected word by index
    setAvailableWords(updatedWords) // Update available words state
  }

  // Handle input change and detect Enter key press
  const handleInputChange = (e) => {
    setInput(e.target.value) // Update input state (no toLowerCase here, handle in submit)
    // Check for Enter key press
    if (e.key === "Enter") {
      handleSubmit() // Submit the answer
    }
  }

  // Check the user's answer and update score/misses
  const handleSubmit = () => {
    if (gameOver) return // Prevent submission after game over

    // Update score or misses based on the input comparison (case-insensitive)
    if (input.toLowerCase() === currentWord.word.toLowerCase()) {
      setScore((prevScore) => prevScore + 1) // Use previous state to update score
    } else {
      setMisses((prevMisses) => prevMisses + 1) // Use previous state to update misses
    }

    setInput("") // Clear input field after submission
    selectNewWord() // Load a new word for the next round
  }

  // Calculate accuracy percentage
  const calculateAccuracy = () => {
    const totalAttempts = score + misses // Total number of words attempted
    return totalAttempts === 0 ? 0 : ((score / totalAttempts) * 100).toFixed(2) // Calculate and format accuracy
  }

  // Submit the test result to the backend API
  const submitTestResult = () => {
    const accuracy = calculateAccuracy() // Get the calculated accuracy

    const token = localStorage.getItem("token") // Get the auth token
    if (!token) {
      console.error("No token found in localStorage")
      // Optionally, handle missing token (e.g., redirect to login)
      return
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
          throw new Error(`Failed to submit test result: ${res.status}`) // Throw error for non-OK responses
        }
        return res.json() // Parse JSON response
      })
      .then((data) => {
        console.log("Result submitted successfully:", data)
        // Optionally, show a success message to the user
      })
      .catch((err) => {
        console.error("Error submitting test result:", err)
        // Optionally, show an error message to the user
      })
  }

  // Navigate back to the tests overview page
  const goBack = () => {
    // Navigate and pass state if needed (e.g., to mark test as completed)
    navigate("/tests", { state: { test4Completed: true } })
  }

  return (
    // Main container with flex properties for centering and bg-primary
    <div className="bg-primary min-h-screen flex flex-col items-center justify-center text-white p-6">
      {/* Back Button - positioned absolutely */}
      <div className="absolute top-6 left-6 z-10"> {/* Added z-10 for layering */}
        <button
          onClick={goBack}
          className="text-white flex items-center space-x-2 hover:text-blue-300 transition duration-200 focus:outline-none focus:ring-2 focus:ring-blue-400 rounded-md px-3 py-1" // Added padding and focus styles
        >
          <ArrowLeftIcon className="h-5 w-5" /> {/* Icon */}
          <span className="text-base font-semibold hover:underline">Back to tests</span> {/* Text */}
        </button>
      </div>

      {/* Game Content Container - Centered and styled */}
      <motion.div
        className="bg-gray-800 bg-opacity-70 p-8 rounded-lg shadow-xl text-center w-full max-w-md" // Semi-transparent background, padding, rounded corners, shadow, max-width
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <h1 className="text-3xl font-bold mb-4 text-blue-300">Game 4: Letter Elimination</h1> {/* Title */}
        <p className="text-lg mb-6 text-gray-300">Identify and remove the incorrect letter to form a valid word.</p> {/* Description */}

        {/* Incorrect Word Display */}
        {/* Use key to re-trigger animation when currentWord changes */}
        <motion.div
          key={currentWord.incorrect}
          className="text-5xl font-extrabold tracking-wide bg-gray-700 p-6 rounded-md mb-8 inline-block min-w-[200px]" // Styling for the word display
          initial={{ scale: 0.9, opacity: 0.5 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
        >
          {/* Display the incorrect word in uppercase, show loading if not available yet */}
          {currentWord.incorrect?.toUpperCase() || "Loading..."}
        </motion.div>

        {/* Input Field and Submit Button */}
        {/* Only show input and button if the game is not over */}
        {!gameOver && (
          <div className="flex flex-col items-center space-y-4 md:flex-row md:space-y-0 md:space-x-4"> {/* Responsive flex layout */}
            <input
              type="text"
              value={input}
              onChange={handleInputChange}
              onKeyDown={handleInputChange} // Listen for Enter key
              className="p-3 rounded-md text-gray-800 w-full md:w-auto flex-grow focus:outline-none focus:ring-2 focus:ring-blue-500" // Input styling and responsiveness
              placeholder="Type the correct word" // Updated placeholder text
              disabled={gameOver} // Disable input after game ends
            />

            <button
              onClick={handleSubmit}
              className={`px-6 py-3 rounded-md font-bold text-white transition duration-200 focus:outline-none focus:ring-2 focus:ring-blue-400 ${
                gameOver ? 'bg-gray-500 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700' // Button styling, disabled state, hover effect
              }`}
              disabled={gameOver} // Disable button after game ends
            >
              Submit
            </button>
          </div>
        )}

        {/* Timer, Score, and Misses Display */}
        {/* Positioned within the main content container now */}
        <div className="mt-8 text-lg text-gray-300 space-y-2"> {/* Styling and spacing */}
          <p>
            <strong>Time Left:</strong> <span className="font-semibold text-blue-300">{timeLeft}s</span> {/* Highlighted value */}
          </p>
          <p>
            <strong>Score:</strong> <span className="font-semibold text-green-400">{score}</span> {/* Highlighted value */}
          </p>
          <p>
            <strong>Misses:</strong> <span className="font-semibold text-red-400">{misses}</span> {/* Highlighted value */}
          </p>
        </div>

        {/* Game Over Message */}
        {gameOver && (
          <motion.div
            className="mt-8 text-center p-6 bg-gray-700 bg-opacity-80 rounded-md" // Styling for game over message container
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-2xl font-bold mb-3 text-red-400">Game Over!</h2> {/* Game over title */}
            <p className="text-lg text-gray-200">You scored <strong className="text-green-400">{score}</strong> points!</p> {/* Final score */}
            <p className="text-lg text-gray-200 mt-1">You missed <strong className="text-red-400">{misses}</strong> answers.</p> {/* Final misses */}
            <p className="text-lg text-gray-200 mt-1">Accuracy: <strong className="text-yellow-400">{calculateAccuracy()}%</strong></p> {/* Final accuracy */}
            {/* Message if all words were completed */}
            {availableWords.length === 0 && allWords.length > 0 && ( // Check if all words were initially available and now none are left
              <p className="text-green-400 mt-2 font-semibold">You've completed all the words!</p>
            )}
          </motion.div>
        )}
      </motion.div>
    </div>
  )
}

export default Game4
