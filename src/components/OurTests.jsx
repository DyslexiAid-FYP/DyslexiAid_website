import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles, { layout } from '../style';
import Button from './Button';

const OurTests = () => {
  const navigate = useNavigate();

  const handleStartTest = () => {
    navigate('/tests'); // Navigate to the Dyslexia Tests page
  };

  return (
    <section id="OurTests" className={layout.section}>
      <div className={layout.sectionInfo}>
        <h2 className={styles.heading2}>
          Ready to take our <br />Dyslexia Test?
        </h2>
        <p className={`${styles.paragraph} max-w-[470px]`}>
          Our dyslexia identification method consists of 4 basic tests that challenge a child's ability to identify, order, and recognize different alphabets and words.
        </p>
        <Button styles="mt-10" onClick={handleStartTest} />
      </div>
      <div className={layout.sectionImg}></div>
    </section>
  );
};

export default OurTests;
