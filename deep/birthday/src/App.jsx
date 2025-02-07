import React, { useState, useEffect } from 'react';
import Confetti from 'react-confetti';
import './App.css';

const App = () => {
  const [step, setStep] = useState(1);
  const [musicPlaying, setMusicPlaying] = useState(false);
  const [balloons, setBalloons] = useState([]);
  const [showConfetti, setShowConfetti] = useState(false);

  // Play music
  useEffect(() => {
    const audio = new Audio('/assets/happy-birthday-266285.mp3');
    if (musicPlaying) {
      audio.play();
    }
    return () => audio.pause();
  }, [musicPlaying]);

  // Step logic
  useEffect(() => {
    if (step === 1) {
      setTimeout(() => setStep(2), 3000);
    } else if (step === 2) {
      setTimeout(() => {
        setStep(3);
        document.body.style.backgroundColor = 'black';
      }, 3000);
    }
  }, [step]);

  const startDecoration = () => {
    setStep(6);
    setShowConfetti(true); // Show confetti when decorating

    const balloonInterval = setInterval(() => {
      setBalloons((prev) => [
        ...prev,
        {
          id: Date.now(),
          left: Math.random() * 100,
          duration: Math.random() * 5 + 5,
          color: `hsl(${Math.random() * 360}, 100%, 70%)`,
        },
      ]);
    }, 500);

    setTimeout(() => {
      clearInterval(balloonInterval);
      setBalloons([]);
      setShowConfetti(false); // Stop confetti after decorations
      setStep(7);
    }, 10000);
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return <div className="center-div fancy-div"><h1>It's your birthday!</h1></div>;
      case 2:
        return <div className="center-div fancy-div"><h1>I made something for you!</h1></div>;
      case 3:
        return (
          <button className="top-center-button fancy-button"
            onClick={() => {
              setStep(4);
              document.body.style.backgroundColor = '#ffb6c1';
            }}>
            Lights On
          </button>
        );
      case 4:
        return (
          <button className="top-center-button fancy-button"
            onClick={() => {
              setStep(5);
              setMusicPlaying(true);
            }}>
            Play Music
          </button>
        );
      case 5:
        return (
          <button className="top-center-button fancy-button" onClick={startDecoration}>
            Let's Decorate
          </button>
        );
      case 6:
        return (
          <div className="center-div fancy-div">
            <h1>Let's Decorate!</h1>
            <div className="image-frame">
              <div className="portrait-frame"><img src="/assets/person1.jpg" alt="Person 1" /></div>
              <div className="portrait-frame"><img src="/assets/person2.jpg" alt="Person 2" /></div>
              <div className="portrait-frame"><img src="/assets/person3.jpg" alt="Person 3" /></div>
              <div className="portrait-frame"><img src="/assets/person4.jpg" alt="Person 4" /></div>
            </div>
          </div>
        );
      case 7:
        return (
          <button className="top-center-button fancy-button"
            onClick={() => setStep(8)}>
            Final Surprise
          </button>
        );
      case 8:
        return (
          <div className="center-div fancy-div">
            <h1>Final Surprise!</h1>
            <p  className="final-message">Happiest Birthday. May Allah bring more Joy and Happiness in your life. May Allah turn all your In shāʾ Allāh into al-Ḥamdu lillāh</p>
            {showConfetti && <Confetti />}
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div>
      {renderStep()}
      {step === 6 && showConfetti && <Confetti />} {/* Show confetti during decorations */}
      {step === 6 && balloons.map((balloon) => (
        <div key={balloon.id} className="balloon"
          style={{
            left: `${balloon.left}vw`,
            animationDuration: `${balloon.duration}s`,
            backgroundColor: balloon.color,
          }}
        />
      ))}
      {step === 8 && <Confetti />} {/* Show confetti during final surprise */}
    </div>
  );
};

export default App;
