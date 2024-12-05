import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Import the useNavigate hook
import { ArrowLeftIcon } from '@heroicons/react/24/solid'; // Import the back arrow icon
import Button from './Button'; // Assuming you have a Button component

const DyslexiaTests = () => {
  const navigate = useNavigate(); // Initialize the useNavigate hook

  useEffect(() => {
    window.scrollTo(0, 0); // Scroll to the top of the page on component mount
  }, []);

  const handleGoBack = () => {
    navigate('/'); // Navigate to the home page
  };

  return (
    <div className="bg-primary py-16 px-6 md:px-16">
      {/* Back Button */}
      <div className="mb-10">
        <button
          onClick={handleGoBack}
          className="text-white flex items-center space-x-2 hover:text-blue-500"
        >
          <ArrowLeftIcon className="h-6 w-6" />
          <span>Back to Home</span>
        </button>
      </div>

      {/* Section for Game 1 */}
      <div className="flex flex-col md:flex-row items-center justify-between mb-16">
        <div className="md:w-1/2 mb-8 md:mb-0">
          <h2 className="text-4xl font-bold text-white mb-5">Game 1: Letter Identification</h2>
          <p className="text-dimWhite text-lg max-w-[470px] mb-8">
            In this game, you will be presented with a grid of letters. Your challenge is to identify letters that are commonly mistaken by individuals with dyslexia (like "b" vs. "d").
          </p>
          <Button onClick={() => navigate('/test1')} className="bg-blue-gradient text-primary font-medium text-[18px] py-4 px-6 rounded-[10px] outline-none">
            Start Game 1
          </Button>
        </div>
        <div className="md:w-1/2 mb-12">
          <div className="bg-blue-500 p-6 rounded-[20px]">
            <h3 className="font-semibold text-white text-[18px] mb-3">Find the letter "b"</h3>
            <p className="text-white text-[16px]">
             In a grid of letters find all occurrences of the letter "b".
            </p>
          </div>
        </div>
      </div>

      {/* Section for Game 2 */}
      <div className="flex flex-col md:flex-row-reverse items-center justify-between mb-16 ">
        <div className="md:w-1/2 mb-8 md:mb-0 ml-5">
          <h2 className="text-4xl font-bold text-white mb-5">Game 2: Similar Letter Focus</h2>
          <p className="text-dimWhite text-lg max-w-[470px] mb-8">
            In this game, you will need to identify the letter "E" among a sea of the letter "F". This tests your ability to distinguish between similar-looking characters.
          </p>
          <Button onClick={() => navigate('/test2')} className="bg-blue-gradient text-primary font-medium text-[18px] py-4 px-6 rounded-[10px] outline-none">
            Start Game 2
          </Button>
        </div>
        <div className="md:w-1/2 mr-10">
          <div className="bg-blue-500 p-6 rounded-[20px]">
            <h3 className="font-semibold text-white text-[18px] mb-3">Find the letter "E"</h3>
            <p className="text-white text-[16px]">
              In the next grid you will only find one letter "E". Find and click on it!
            </p>
          </div>
        </div>
      </div>

      {/* Section for Game 3 */}
      <div className="flex flex-col md:flex-row items-center justify-between mb-16">
        <div className="md:w-1/2 mb-8 md:mb-0">
          <h2 className="text-4xl font-bold text-white mb-5">Game 3: Word Scramble</h2>
          <p className="text-dimWhite text-lg max-w-[470px] mb-8">
            In this game, you will be presented with a scrambled set of letters. Your challenge is to rearrange them to form a valid word.
          </p>
          <Button onClick={() => navigate('/test3')} className="bg-blue-gradient text-primary font-medium text-[18px] py-4 px-6 rounded-[10px] outline-none">
            Start Game 3
          </Button>
        </div>
        <div className="md:w-1/2">
          <div className="bg-blue-500 p-6 rounded-[20px]">
            <h3 className="font-semibold text-white text-[18px] mb-3">Scrambled Word Challenge</h3>
            <p className="text-white text-[16px]">
              Unscramble the letters to form a valid word.
              For Example:
              <br />
              <strong>irdb</strong> → ? <br />
              Your time to unscramble: 30 seconds!
            </p>
          </div>
        </div>
      </div>

      {/* Section for Game 4 */}
      <div className="flex flex-col md:flex-row-reverse items-center justify-between">
        <div className="md:w-1/2 mb-8 md:mb-0 ml-10">
          <h2 className="text-4xl font-bold text-white mb-5">Game 4: Letter Elimination</h2>
          <p className="text-dimWhite text-lg max-w-[470px] mb-8">
            In this game, you'll be shown a word with one incorrect letter. Your task is to identify and eliminate the incorrect letter to form a valid word.
          </p>
          <Button onClick={() => navigate('/test4')} className="bg-blue-gradient text-primary font-medium text-[18px] py-4 px-6 rounded-[10px] outline-none">
            Start Game 4
          </Button>
        </div>
        <div className="md:w-1/2 mr-10">
          <div className="bg-blue-500 p-6 rounded-[20px]">
            <h3 className="font-semibold text-white text-[18px] mb-3">Identify the Incorrect Letter</h3>
            <p className="text-white text-[16px]">
              Identify the incorrect letter in the following word and remove it:
              <br />
              <strong>flowper</strong> → ? <br />
              Your time to identify: 20 seconds!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DyslexiaTests;
