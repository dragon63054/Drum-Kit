import { useState,useEffect } from 'react';
import bassImage from './photos/bass.png';
import floorImage from './photos/floor drum.jpg';
import hihatImage from './photos/hiphat.jpg';
import snareImage from './photos/snare.webp';
import lowDrumImage from './photos/low.jpg';
import crashImage from './photos/crash.jpg';
import rideImage from './photos/ride.jpg';
import highDrumImage from './photos/high tom.png';
import electricBassImage from './electronic/electronic bass.jpg';
import electricFloorImage from './electronic/electric floor.jpg';
import electricHiHatImage from './electronic/hihat electronic.jpg';
import electricSnareImage from './electronic/electric snare.jpg';
import electricCrashImage from './electronic/electronic crash.png';
import electricRideImage from './electronic/ride electronic.jpg';
import electricHighTomImage from './electronic/electronic high tom.jpg';
import electricLowTomImage from './electronic/electronic low tom.jpg';
import longride from './songs/long-ride-cymbal-2-36337.mp3';
import snareSound from './songs/snare-112754.mp3';
import tomSound from './songs/tom-2-85124.mp3';
import bassSound from './songs/mega-bass-sub-drop-effect-240472.mp3';
import lowFloorSound from './songs/low-floor-tom-level-2-106160.mp3';
import crashSound from './songs/tr707-crash-cymbal-241376.mp3';
import hihatSound from './songs/hi-hat-6-231041.mp3';
import lowDrumSound from './songs/low-drum-105611.mp3';

const images = {
  rock: {
    bass: bassImage,
    snare: snareImage,
    floor: floorImage,
    hiHat: hihatImage,
    lowDrum: lowDrumImage,
    highDrum: highDrumImage,
    crash: crashImage,
    ride: rideImage,
  },
  jazz: {
    bass: bassImage,
    snare: snareImage,
    floor: floorImage,
    hiHat: hihatImage,
    lowDrum: lowDrumImage,
    highDrum: highDrumImage,
    crash: crashImage,
    ride: rideImage,
  },
  electronic: {
    bass: electricBassImage,
    snare: electricSnareImage,
    floor: electricFloorImage,
    hiHat: electricHiHatImage,
    lowDrum: electricLowTomImage,
    highDrum: electricHighTomImage,
    crash: electricCrashImage,
    ride: electricRideImage,
  },
};

const sounds = {
  rock: {
    bass: bassSound,
    snare: snareSound,
    floor: lowFloorSound,
    hiHat: hihatSound,
    lowDrum: lowDrumSound,
    highDrum: tomSound,
    crash: crashSound,
    ride: longride,
  },
  jazz: {
    bass: bassSound,
    snare: snareSound,
    floor: lowFloorSound,
    hiHat: hihatSound,
    lowDrum: lowDrumSound,
    highDrum: tomSound,
    crash: crashSound,
    ride: longride,
  },
  electronic: {
    bass: bassSound,
    snare: snareSound,
    floor: lowFloorSound,
    hiHat: hihatSound,
    lowDrum: lowDrumSound,
    highDrum: tomSound,
    crash: crashSound,
    ride: longride,
  },
};

const padColors = {
  bass: 'bg-red-500',
  snare: 'bg-blue-500',
  floor: 'bg-green-500',
  hiHat: 'bg-purple-500',
  lowDrum: 'bg-orange-500',
  highDrum: 'bg-pink-500',
  crash: 'bg-teal-500',
  ride: 'bg-yellow-500',
};

const keyMap = {
  'a': 'bass',
  's': 'snare',
  'd': 'floor',
  'f': 'hiHat',
  'g': 'lowDrum',
  'h': 'highDrum',
  'j': 'crash',
  'k': 'ride',
};
function App() {
  const [currentKit, setCurrentKit] = useState('rock');
  const [activePad, setActivePad] = useState(null);

  const playSound = (pad) => {
    const audio = new Audio(sounds[currentKit][pad]);
    audio.play();
    setActivePad(pad);
    setTimeout(() => setActivePad(null), 200); 
  };

  const handleKeyDown = (event) => {
    const pad = keyMap[event.key];
    if (pad) {
      playSound(pad);
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return (
    <div className="flex flex-col items-center justify-center bg-gray-800 text-white min-h-screen">
      <header className="text-center mb-8">
        <h1 className="text-4xl font-bold text-yellow-400">Roland OCTAPAD</h1>
      </header>
      <div className="flex flex-wrap justify-center space-x-4 mb-4">
        <button className="bg-blue-600 p-2 rounded hover:bg-gray-500 hover:cursor-pointer" onClick={() => setCurrentKit('rock')}>ROCK</button>
        <button className="bg-green-600 p-2 rounded hover:bg-gray-500 hover:cursor-pointer" onClick={() => setCurrentKit('jazz')}>JAZZ</button>
        <button className="bg-pink-600 p-2 rounded hover:bg-gray-500 hover:cursor-pointer" onClick={() => setCurrentKit('electronic')}>ELECT</button>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4">
        {['bass', 'snare', 'floor', 'hiHat', 'lowDrum', 'highDrum', 'crash', 'ride'].map(pad => (
          <div key={pad} className={`h-[20vh] sm:h-[300px] p-4 rounded-md border-2 border-gray-600 transition hover:cursor-pointer hover:shadow-lg ${activePad === pad ? padColors[pad] : 'bg-gray-700'}`} onClick={() => playSound(pad)}>
            <img src={images[currentKit][pad]} alt={pad} className="w-full h-full object-fill rounded-md" />
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;