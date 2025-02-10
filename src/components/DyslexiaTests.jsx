import { Link } from "react-router-dom"
import { motion } from "framer-motion"
import { ArrowLeftIcon } from "@heroicons/react/24/solid"
import { useNavigate } from "react-router-dom"

const BackgroundPaths = ({ color }) => {
  const paths = [
    "M0 80 Q50 70, 100 50 T200 55",
    "M0 60 Q50 40, 100 67 T200 65",
    "M0 60 Q50 40, 100 43 T200 65",
    "M0 20 Q50 85, 100 70 T200 75",
  ]

  return (
    <svg
      className="absolute inset-0 w-full h-full z-0"
      viewBox="0 0 200 200"
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="none"
    >
      <g transform="translate(0,95)">
        {paths.map((d, index) => {
          const pathElement = (
            <motion.path
              key={index}
              d={d}
              stroke={color}
              strokeWidth="2"
              fill="none"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 0.8 }}
              transition={{ duration: 2 + index, repeat: Number.POSITIVE_INFINITY, repeatType: "loop", ease: "linear" }}
            />
          )
          return index % 2 === 1 ? (
            <g key={index} transform="translate(200,0) scale(-1,1)">
              {pathElement}
            </g>
          ) : (
            pathElement
          )
        })}
      </g>
    </svg>
  )
}

const TestCard = ({ title, description, icon, testNumber, gradient }) => (
  <Link to={`/test${testNumber}`} className="block w-full h-full">
    <div
      className={`relative overflow-hidden rounded-2xl p-4 h-full flex flex-col transition-transform hover:scale-105 ${gradient} md:min-h-[230px]  `}
    >
      <div className="absolute inset-0 z-0"></div>
      <BackgroundPaths color="rgba(255,255,255,0.5)" />
      <div className="relative z-20 h-full flex flex-col">
        <div className="justify-items-end">{icon}</div>
        <h3 className="text-white text-xl font-bold mb-5 ">{title}</h3>
        <p className="text-white/80 text-md font-semibold leading-relaxed">{description}</p>
        <div className="mt-auto flex justify-end">
          <svg
            className="w-5 h-5 text-white/60"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </div>
      </div>
    </div>
  </Link>
);


const DyslexiaTests = () => {
  const navigate = useNavigate()

  const goBack = () => {
    navigate("/")
  }

  const tests = [
    {
      title: "Reading Speed Test",
      description:
        "Evaluate your reading speed and comprehension with our adaptive assessment tool designed specifically for dyslexic readers.",
      icon: (
        <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
          />
        </svg>
      ),
      testNumber: 1,
      gradient: "bg-gradient-to-br from-purple-500 to-pink-500",
    },
    {
      title: "Word Recognition",
      description:
        "Test your ability to recognize and differentiate between similar-looking words with our specialized word recognition assessment.",
      icon: (
        <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
          />
        </svg>
      ),
      testNumber: 2,
      gradient: "bg-gradient-to-br from-blue-500 to-teal-500",
    },
    {
      title: "Letter Sequencing",
      description:
        "Challenge your sequential processing skills with our letter arrangement and pattern recognition exercises.",
      icon: (
        <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z"
          />
        </svg>
      ),
      testNumber: 3,
      gradient: "bg-gradient-to-br from-yellow-400 to-orange-500",
    },
    {
      title: "Phonological Awareness",
      description: "Assess your phonological processing abilities with our comprehensive sound-based recognition test.",
      icon: (
        <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15.536a5 5 0 001.414 1.414m2.828-9.9a9 9 0 012.728-2.728"
          />
        </svg>
      ),
      testNumber: 4,
      gradient: "bg-gradient-to-br from-green-400 to-cyan-500",
    },
  ]

  return (
    <div className="h-screen w-full bg-gray-900 flex flex-col items-center justify-center overflow-hidden">
      <div className="absolute top-8 left-8">
        <button
          onClick={goBack}
          className="text-white flex items-center space-x-2 hover:text-blue-400 transition duration-200"
        >
          <ArrowLeftIcon className="h-5 w-5" />
          <span className="text-base font-semibold hover:underline">Back to tests</span>
        </button>
      </div>
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ">
        <div className="text-center flex-center mb-10">
          <h1 className="text-2xl md:text-4xl font-bold text-white mb-2 tracking-tight">Dyslexia Assessment Tests</h1>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-5xl mx-auto">
          {tests.map((test, index) => (
            <TestCard key={index} {...test} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default DyslexiaTests
