import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowLeftIcon, CheckCircleIcon } from "@heroicons/react/24/solid";
import { useNavigate, useLocation } from "react-router-dom";

// Placeholder for your Popup component import - make sure the path is correct
// import Popup from "./Popup.jsx";

// --- FloatingShapes Component ---
// Creates subtle background animations for decoration
const FloatingShapes = () => {
  const shapes = [
    {
      id: 1,
      style: "w-16 h-16 bg-purple-500/20 rounded-full",
      initial: { y: -60, x: 70, opacity: 0.5 }, // Increased initial displacement, added opacity
      animate: { y: [0, -70, 0], x: [0, 80, 0], rotate: [0, 360, 720], opacity: [0.5, 1, 0.5] }, // Increased movement, rotation, and opacity change
      transition: { duration: 15, repeat: Infinity, ease: "linear" } // Faster duration
    },
    {
      id: 2,
      style: "w-24 h-24 bg-cyan-500/10 rounded-xl",
      initial: { y: 120, x: -100, opacity: 0.4 }, // Increased initial displacement, added opacity
      animate: { y: [0, 80, 0], x: [0, -90, 0], rotate: [0, -270, -540], opacity: [0.4, 0.8, 0.4] }, // Increased movement, rotation, and opacity change
      transition: { duration: 20, repeat: Infinity, ease: "easeInOut", repeatType: "mirror" } // Faster duration
    },
    {
      id: 3,
      style: "w-12 h-12 bg-pink-500/15 rounded-lg",
      initial: { y: -100, x: -80, opacity: 0.6 }, // Increased initial displacement, added opacity
      animate: { y: [0, -80, 0], rotate: [0, 1080], opacity: [0.6, 1, 0.6] }, // Increased movement, tripled rotation, and opacity change
      transition: { duration: 12, repeat: Infinity, ease: "linear" } // Faster duration
    },
    {
      id: 4,
      style: "w-20 h-20 bg-teal-500/20 rounded-full",
      initial: { y: 70, x: 120, opacity: 0.5 }, // Increased initial displacement, added opacity
      animate: { y: [0, -70, 0], x: [0, -80, 0], rotate: [0, 540, 0], opacity: [0.5, 0.9, 0.5] }, // Increased movement, rotation, and opacity change
      transition: { duration: 18, repeat: Infinity, ease: "easeInOut", repeatType: "mirror"} // Faster duration
    },
    {
      id: 5,
      style: "w-10 h-10 bg-orange-500/15 rounded-md",
      initial: { y: 100, x: -40, opacity: 0.6 }, // Increased initial displacement, added opacity
      animate: { y: [0, 60, 0], rotate: [0, -540, -1080], opacity: [0.6, 1, 0.6] }, // Increased movement, tripled rotation, and opacity change
      transition: { duration: 10, repeat: Infinity, ease: "linear"} // Faster duration
    },
    {
      id: 6,
      style: "w-28 h-28 bg-blue-500/10 rounded-3xl",
      initial: { y: -120, x: 100, opacity: 0.4 }, // Increased initial displacement, added opacity
      animate: { y: [0, 90, 0], x: [0, -110, 0], rotate: [0, 270, 540], opacity: [0.4, 0.8, 0.4] }, // Increased movement, rotation, and opacity change
      transition: { duration: 24, repeat: Infinity, ease: "easeInOut", repeatType: "mirror"} // Faster duration
    },
    {
      id: 7,
      style: "w-14 h-14 bg-yellow-500/20 rounded-full",
      initial: { y: 140, x: 60, opacity: 0.5 }, // Increased initial displacement, added opacity
      animate: { y: [0, -75, 0], rotate: [0, -1080], opacity: [0.5, 0.9, 0.5] }, // Increased movement, tripled rotation, and opacity change
      transition: { duration: 16, repeat: Infinity, ease: "linear"} // Faster duration
    },
    {
      id: 8,
      style: "w-18 h-18 bg-green-500/15 rounded-lg", // New shape style
      initial: { y: -50, x: -120, opacity: 0.5 }, // Initial displacement and opacity
      animate: { y: [0, 60, 0], x: [0, -100, 0], rotate: [0, 360, 720], opacity: [0.5, 1, 0.5] }, // Movement, rotation, and opacity change
      transition: { duration: 19, repeat: Infinity, ease: "linear", repeatType: "reverse" } // Duration and ease
    },
    {
      id: 9,
      style: "w-22 h-22 bg-red-500/10 rounded-full", // New shape style
      initial: { y: 90, x: 150, opacity: 0.4 }, // Initial displacement and opacity
      animate: { y: [0, -80, 0], x: [0, 130, 0], rotate: [0, -270, -540], opacity: [0.4, 0.8, 0.4] }, // Movement, rotation, and opacity change
      transition: { duration: 26, repeat: Infinity, ease: "easeInOut" } // Duration and ease
    },
     {
      id: 10,
      style: "w-10 h-32 bg-indigo-500/15 rounded-full", // New shape style (tall rectangle)
      initial: { y: -150, x: -30, opacity: 0.5 }, // Initial displacement and opacity
      animate: { y: [0, 120, 0], rotate: [0, 180, 360], opacity: [0.5, 0.9, 0.5] }, // Movement, rotation, and opacity change
      transition: { duration: 21, repeat: Infinity, ease: "linear" } // Duration and ease
    },
     {
      id: 11,
      style: "w-32 h-10 bg-yellow-300/10 rounded-full", // New shape style (wide rectangle)
      initial: { y: 40, x: -160, opacity: 0.4 }, // Initial displacement and opacity
      animate: { y: [0, -70, 0], x: [0, 140, 0], rotate: [0, -360, 0], opacity: [0.4, 0.8, 0.4] }, // Movement, rotation, and opacity change
      transition: { duration: 23, repeat: Infinity, ease: "easeInOut", repeatType: "mirror" } // Duration and ease
    },
    {
      id: 12,
      style: "w-16 h-16 bg-purple-500/20 rounded-full",
      initial: { y: -60, x: 70, opacity: 0.5 }, // Increased initial displacement, added opacity
      animate: { y: [0, -70, 0], x: [0, 80, 0], rotate: [0, 360, 720], opacity: [0.5, 1, 0.5] }, // Increased movement, rotation, and opacity change
      transition: { duration: 15, repeat: Infinity, ease: "linear" } // Faster duration
    },
    {
      id: 13,
      style: "w-24 h-24 bg-cyan-500/10 rounded-xl",
      initial: { y: 120, x: -100, opacity: 0.4 }, // Increased initial displacement, added opacity
      animate: { y: [0, 80, 0], x: [0, -90, 0], rotate: [0, -270, -540], opacity: [0.4, 0.8, 0.4] }, // Increased movement, rotation, and opacity change
      transition: { duration: 20, repeat: Infinity, ease: "easeInOut", repeatType: "mirror" } // Faster duration
    },
     
  ];

  return (
    // Container for shapes, positioned absolutely behind everything else
    // Hidden on small screens (md:block) to reduce clutter/performance impact
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {shapes.map(shape => (
             <motion.div
                key={shape.id}
                className={`absolute ${shape.style} opacity-60`} // Base styles
                style={{
                    // Randomize initial positions slightly more across viewport width/height
                    top: `${10 + Math.random() * 80}%`, // Spread vertically
                    left: `${5 + Math.random() * 90}%`, // Spread horizontally
                }}
                initial={shape.initial}
                animate={shape.animate}
                transition={shape.transition}
            />
        ))}
    </div>
  );
};

// --- BackgroundPaths Component ---
// Renders subtle animated background lines within cards
const BackgroundPaths = ({ color = "rgba(255, 255, 255, 0.15)" }) => {
  const paths = [
    "M0 80 Q50 70, 100 50 T200 55",
    "M0 60 Q50 40, 100 67 T200 65",
    "M0 60 Q50 40, 100 43 T200 65",
    "M0 20 Q50 85, 100 70 T200 75",
  ];

  return (
    <svg
      className="absolute inset-0 w-full h-full z-0" // Background layer within card
      viewBox="0 0 200 200"
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="none" // Stretches to fill container
      aria-hidden="true" // Hide from screen readers
    >
      <g transform="translate(0,95)">
        {paths.map((d, index) => {
          const pathElement = (
            <motion.path
              key={index}
              d={d}
              stroke={color}
              strokeWidth="1.5" // Thinner lines
              fill="none"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 0.6 }} // Subtle animation opacity
              transition={{
                duration: 3 + index * 1.5, // Varied duration
                repeat: Infinity,
                repeatType: "loop",
                ease: "linear",
              }}
            />
          );
          // Flip every second path horizontally for visual variety
          return index % 2 === 1 ? (
            <g key={`flipped-${index}`} transform="translate(200,0) scale(-1,1)">
              {pathElement}
            </g>
          ) : (
            pathElement
          );
        })}
      </g>
    </svg>
  );
};

// --- TestCard Component ---
// Displays individual test cards with specific styling and completion state
const TestCard = ({ title, description, icon, testNumber, gradient, completed }) => {
  const navigate = useNavigate();

  // Define card styles based on completion status
  const cardBaseStyle = "block w-full h-full rounded-2xl shadow-md overflow-hidden cursor-pointer transition-all duration-300 ease-in-out";
  const cardActiveStyle = `${gradient} hover:shadow-xl hover:scale-[1.03]`;
  const cardCompletedStyle = "bg-slate-700/70 backdrop-blur-sm opacity-80"; // Ensure backdrop-blur works with your Tailwind setup

  const cardStyle = completed ? `${cardBaseStyle} ${cardCompletedStyle}` : `${cardBaseStyle} ${cardActiveStyle}`;

  const handleTestClick = () => {
    // Navigate to the specific test route
    navigate(`/test${testNumber}`);
  };

  // Use motion.div for hover animations (lift effect)
  return (
    <motion.div
      onClick={handleTestClick}
      className={cardStyle}
      whileHover={!completed ? { y: -5 } : {}} // Apply lift effect only if not completed
      aria-label={`Start ${title}`} // Accessibility improvement
    >
      <div className="relative p-6 h-full flex flex-col">
        {/* Render background paths inside the card */}
        <BackgroundPaths />

        {/* Content Area - position relative to stack above background */}
        <div className="relative z-10 h-full flex flex-col">
          {/* Top section: Icon and Completion Check */}
          <div className="flex justify-between items-start mb-4">
            <div className="w-10 h-10 text-white/90 flex-shrink-0">{icon}</div> {/* Added flex-shrink-0 */}
            {completed && (
              <CheckCircleIcon className="w-6 h-6 text-green-400 flex-shrink-0" aria-label="Test completed"/>
            )}
          </div>

          {/* Test Title */}
          <h3 className="text-white text-xl font-semibold mb-3">{title}</h3>

          {/* Test Description */}
          <p className="text-white/70 text-sm font-medium leading-relaxed flex-grow mb-4">
            {description}
          </p>

          {/* Footer Arrow Icon (visual cue) */}
          <div className="mt-auto flex justify-end">
            <svg
              className="w-5 h-5 text-white/50"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1.5}
              aria-hidden="true"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

// --- DyslexiaTests Component (Main Page) ---
// Orchestrates the display of test cards, navigation, state, and background animations
const DyslexiaTests = () => {
  const navigate = useNavigate();
  const location = useLocation();
  // State for managing the visibility of a potential popup
  const [showPopup, setShowPopup] = useState(false);
  // State for tracking which tests are completed
  const [completedTests, setCompletedTests] = useState([]);

  // Effect to load completed tests from localStorage on component mount
  useEffect(() => {
    const storedCompletedTests = localStorage.getItem("completedTests");
    let initialCompletedTests = [];
    if (storedCompletedTests) {
      try {
        const parsed = JSON.parse(storedCompletedTests);
        // Ensure it's always an array, even if localStorage stores null/invalid data
        initialCompletedTests = Array.isArray(parsed) ? parsed : [];
      } catch (error) {
        console.error("Failed to parse completed tests from localStorage:", error);
        initialCompletedTests = []; // Reset to empty array on error
      }
    }
    setCompletedTests(initialCompletedTests);

    // Check for state passed via navigation (e.g., after completing a test)
    if (location.state?.testCompletedNumber) {
        const completedNumber = location.state.testCompletedNumber;
        // Add the completed test number if it's not already present
         setCompletedTests((prev) =>
             prev.includes(completedNumber) ? prev : [...prev, completedNumber]
         );
        // Optional: Show popup based on which test was completed
        if (completedNumber === 4) { // Example: Show popup only after test 4
             setShowPopup(true);
        }
      // Clear the location state to prevent reprocessing on refresh/revisit
      navigate(location.pathname, { replace: true, state: {} });
    }
  // Run only once on mount, dependencies ensure correct behavior if navigate/location change identity
  }, [navigate, location.pathname, location.state]); // Added location.pathname/state dependencies


  // Effect to save completed tests to localStorage whenever the state changes
  useEffect(() => {
    // Avoid writing the initial empty array [] if it hasn't changed from default
     if (completedTests.length > 0 || localStorage.getItem("completedTests") !== null) {
        localStorage.setItem("completedTests", JSON.stringify(completedTests));
    }
  }, [completedTests]);

  // Navigation function for the back button
  const goBack = () => {
    navigate("/");
  };

  // Function to close the popup (if used)
  const closePopup = () => {
    setShowPopup(false);
  };

  // --- Test Data ---
  // Array containing the details for each test card
  const tests = [
    {
      title: "Letter Recognition",
      description:
        "Evaluate your reading speed and comprehension with our adaptive assessment tool designed specifically for dyslexic readers.",
      icon: (
        <svg className="w-full h-full" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
          />
        </svg>
      ),
      testNumber: 1,
      gradient: "bg-gradient-to-br from-purple-600 to-pink-500",
    },
    {
      title: "Letter Focus",
      description:
        "Test your ability to recognize and differentiate between similar-looking words with our specialized word recognition assessment.",
      icon: (
        <svg className="w-full h-full" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
          />
        </svg>
      ),
      testNumber: 2,
      gradient: "bg-gradient-to-br from-blue-500 to-teal-400",
    },
    {
      title: "Letter Sequencing",
      description:
        "Challenge your sequential processing skills with our letter arrangement and pattern recognition exercises.",
      icon: (
        <svg className="w-full h-full" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z"
          />
        </svg>
      ),
      testNumber: 3,
      gradient: "bg-gradient-to-br from-yellow-500 to-orange-500",
    },
    {
      title: "Letter Elimination",
      description: "Assess your word forming abilities with our comprehensive letter elimination test.",
      icon: (
        <svg className="w-full h-full" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15.536a5 5 0 001.414 1.414m2.828-9.9a9 9 0 012.728-2.728"
          />
        </svg>
      ),
      testNumber: 4,
      gradient: "bg-gradient-to-br from-green-500 to-cyan-500",
    },
  ];

  // --- JSX Structure ---
  return (
    // Main container: Added relative positioning to contain absolute children
    <div className="min-h-screen w-full bg-gradient-to-b from-slate-900 to-gray-800 text-white flex flex-col items-center p-4 sm:p-8 relative overflow-hidden">

      {/* Floating shapes in the background */}
      <FloatingShapes />

      {/* Back Button - Positioned top-left, above shapes */}
      <div className="absolute top-6 left-6 z-30">
        <button
          onClick={goBack}
          className="text-white/80 flex items-center space-x-2 hover:text-cyan-300 transition duration-200 group p-2 rounded-md hover:bg-white/10"
          aria-label="Go back to homepage"
        >
          <ArrowLeftIcon className="h-5 w-5 transition-transform duration-200 group-hover:-translate-x-1" aria-hidden="true"/>
          <span className="text-sm font-semibold">Back to home</span>
        </button>
      </div>

      {/* Main Content Area - Centered, above shapes */}
      <main className="w-full max-w-6xl mx-auto flex flex-col items-center justify-center flex-grow mt-16 sm:mt-20 z-10">

        {/* Page Title and Subtitle */}
        <div className="text-center mb-12 lg:mb-16">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500 tracking-tight mb-2">
            Dyslexia Assessment Tests
          </h1>
          <p className="text-base sm:text-lg text-white/60">Choose a test below to begin your assessment.</p>
        </div>

        {/* Test Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 w-full max-w-4xl">
          {tests.map((test) => (
            <TestCard
              key={test.testNumber} // Use unique testNumber as key
              {...test} // Spread test data as props
              completed={completedTests.includes(test.testNumber)} // Pass completion status
            />
          ))}
        </div>
      </main>

      {/* Example Popup rendering (ensure Popup component is defined and imported) */}
      {/* {showPopup && (
        // Wrap Popup in a div with high z-index if necessary
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
           <Popup message="Assessment Complete!" onClose={closePopup} />
        </div>
      )} */}

      {/* Footer - Positioned at the bottom, above shapes */}
      <footer className="w-full text-center p-4 mt-auto z-10">
          <p className="text-xs text-white/40">&copy; {new Date().getFullYear()}  DyslexiAid. All rights reserved.</p>
      </footer>

    </div>
  );
};

export default DyslexiaTests;