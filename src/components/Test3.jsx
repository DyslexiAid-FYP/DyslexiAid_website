import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeftIcon, CheckIcon, XMarkIcon } from '@heroicons/react/24/solid';
import { useNavigate } from 'react-router-dom';

const Test3 = () => {
    const navigate = useNavigate();
    const words = [
        'ball', 'tree', 'book', 'fish', 'apple', 'house', 'happy', 'bump', 'plate',
        'glass', 'bottle', 'fork', 'water', 'chat', 'cup',
        'cat', 'dog', 'sun', 'moon', 'star', 'bird', 'door', 'shoe', 'sock',
        'jump', 'run', 'walk', 'sing', 'play', 'blue', 'red', 'green', 'yellow',
        'small', 'big', 'cold', 'hot', 'milk', 'bread', 'chair', 'table', 'hand',
        'foot', 'head', 'eyes', 'ears', 'nose', 'mouth', 'face', 'time', 'game',
        'park', 'road', 'car', 'bus', 'train', 'plane', 'boat', 'swim', 
        'write', 'draw', 'talk', 'baby', 'child', 'adult', 'man', 'woman', 'boy',
        'girl', 'family', 'friend', 'love', 'kind', 'nice', 'good', 'bad', 'sad',
        'cry', 'laugh', 'smile', 'food', 'drink',  'sleep', 'day', 'night',
        'morning', 'mouse', 'snake', 'tiger', 'lion', 'zebra', 'horse', 'sheep',
        'cow', 'pig', 'farm', 'city', 'town', 'home', 'room', 'bed', 'sofa',
        'desk', 'light', 'dark', 'near', 'far', 'slow', 'fast', 'loud', 'quiet',
        'clean', 'dirty', 'new', 'old', 'young', 'true', 'false', 'yes', 
        'up', 'down', 'in', 'out', 'on', 'off', 'under', 'over', 'with', 'without',
        'and', 'but', 'or', 'if', 'so', 'then', 'when', 'where', 'why', 'how',
        'what', 'who', 'whom', 'whose', 'which', 'this', 'that', 'these', 'those',
        'my', 'your', 'his', 'her', 'its', 'our', 'their', 'me', 'you', 'him',
        'her', 'it', 'us', 'them', 'i', 'he', 'she', 'it', 'we', 'they', 'am',
        'is', 'are',  'were', 'be', 'been', 'have', 'has', 'had', 'do',
        'does', 'did', 'can', 'could', 'will', 'would', 'shall', 'should', 'may',
        'might', 'must'
    ];
    const [hasSubmitted, setHasSubmitted] = useState(false);
    const [scrambledWord, setScrambledWord] = useState('');
    const [originalWord, setOriginalWord] = useState('');
    const [input, setInput] = useState('');
    const [score, setScore] = useState(0);
    const [misses, setMisses] = useState(0);
    const [timeLeft, setTimeLeft] = useState(30);
    const [gameOver, setGameOver] = useState(false);

    const scrambleWord = (word) => {
        let letters = word.split("");
        for (let i = letters.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [letters[i], letters[j]] = [letters[j], letters[i]];
        }
        // Ensure the scrambled word is different from the original
        let scrambled = letters.join("");
        return scrambled === word ? scrambleWord(word) : scrambled;
    };

    const generateWord = () => {
        const word = words[Math.floor(Math.random() * words.length)];
        setOriginalWord(word);
        setScrambledWord(scrambleWord(word));
    };

    useEffect(() => {
        generateWord();

        const timer = setInterval(() => {
            setTimeLeft((prevTime) => {
                if (prevTime > 0) { // Change condition to stop at 0
                    return prevTime - 1;
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
        // This effect ensures submitTestResult is called only once when gameOver becomes true
        if (gameOver && !hasSubmitted) {
            submitTestResult();
            setHasSubmitted(true);
        }
    }, [gameOver, hasSubmitted]); // Depend on gameOver and hasSubmitted

    const handleSubmit = () => {
        if (!gameOver) {
            if (input.toLowerCase() === originalWord.toLowerCase()) {
                setScore(score + 1);
                setInput('');
                generateWord();
            } else {
                setMisses(misses + 1);
            }
        }
    };

    const handleInputChange = (e) => {
        setInput(e.target.value);
    };

    const handleInputKeyDown = (e) => {
        if (e.key === "Enter") {
            handleSubmit();
        }
    }

    const submitTestResult = () => {
        const totalAttempts = score + misses;
        const accuracy = totalAttempts === 0 ? 0 : ((score / totalAttempts) * 100);
        const formattedAccuracy = accuracy.toFixed(2);

        const token = localStorage.getItem('token');
        if (!token) {
            console.error('No token found in localStorage');
            return;
        }

        fetch('http://localhost:5000/api/test-results/submit', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify({
                testName: 'Word Scramble',
                score: score,
                misses: misses,
                accuracy: formattedAccuracy,
            }),
        })
            .then((res) => {
                if (!res.ok) {
                    // Attempt to read error body if response is not ok
                    return res.json().then(err => { throw new Error(err.message || `Failed to submit test result: ${res.status}`); });
                }
                return res.json();
            })
            .then((data) => {
                console.log('Result submitted successfully:', data);
            })
            .catch((err) => {
                console.error('Error submitting test result:', err);
            });
    };

    const goBack = () => navigate('/tests');

    // For circular timer
    const circleRadius = 45;
    const circleCircumference = 2 * Math.PI * circleRadius;
    const progress = timeLeft / 30; // Assuming initial time is 30

    return (
        // Removed p-6 from the main container
        <div className="min-h-screen bg-gradient-to-br from-purple-900 to-indigo-900 flex flex-col md:flex-row items-center md:items-stretch md:justify-between text-white relative">
            {/* Applied padding top and left for the back button */}
            <div className="absolute top-6 left-6 z-10">
                <button
                    onClick={goBack}
                    className="text-white flex items-center space-x-2 hover:text-blue-300 transition duration-200 focus:outline-none focus:ring-2 focus:ring-blue-400 rounded-md px-3 py-1"
                >
                    <ArrowLeftIcon className="h-5 w-5" />
                    <span className="text-base font-semibold hover:underline">Back to tests</span>
                </button>
            </div>

            {/* Added horizontal padding here */}
            <div className="flex flex-col items-center space-y-8 px-6 py-8 flex-1 justify-center"> {/* Added py-8 for vertical padding */}
                <motion.div
                    className="bg-gray-800 bg-opacity-70 p-8 rounded-lg shadow-xl text-center w-full max-w-md border-2 border-[#2AA198]"
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                >
                    <h1 className="text-3xl font-bold mb-4 text-blue-300">Word Scramble</h1>
                    <p className="text-lg mb-6 text-gray-300">Unscramble the letters to form a valid word!</p>

                    <motion.div
                        key={scrambledWord}
                        className="text-5xl font-extrabold tracking-wide bg-gray-700 p-6 rounded-md mb-8 inline-block min-w-[200px]"
                        initial={{ scale: 0.9, opacity: 0.5 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 0.4, ease: "easeOut" }}
                    >
                        {scrambledWord.toUpperCase()}
                    </motion.div>

                    <div className="flex flex-col items-center space-y-4 md:flex-row md:space-y-0 md:space-x-4">
                        <input
                            type="text"
                            value={input}
                            onChange={handleInputChange}
                            onKeyDown={handleInputKeyDown} 
                            className="p-3 rounded-md text-gray-800 w-full md:w-auto flex-grow focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Type your answer"
                            disabled={gameOver}
                        />

                        <button
                            onClick={handleSubmit}
                            className={`px-6 py-3 rounded-md font-bold text-white transition duration-200 focus:outline-none focus:ring-2 focus:ring-blue-400 ${gameOver ? 'bg-gray-500 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'
                                }`}
                            disabled={gameOver}
                        >
                            Submit
                        </button>
                    </div>
                </motion.div>
            </div>

            {/* This sidebar should now take full height on md screens */}
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
                                style={{ origin: 'center' }}
                                transition={{ duration: 1 }}
                            />
                            {/* Timer text display - Ensure this is visible */}
                           
                        </svg>
                        <div className="absolute inset-0 flex items-center justify-center text-3xl font-bold text-white">
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
                                    Accuracy:{' '}
                                    <span className="font-bold text-cyan-400">
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

export default Test3;