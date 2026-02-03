import React, { useState, useRef } from 'react';
import SceneOpening from '@/components/scenes/SceneOpening';
import SceneFeeling from '@/components/scenes/SceneFeeling';
import SceneMessage from '@/components/scenes/SceneMessage';
import SceneCard from '@/components/scenes/SceneCard';
import SceneVideo from '@/components/scenes/SceneVideo';
import FloatingHearts from '@/components/FloatingHearts';
import CursorTrail from '@/components/CursorTrail';

type AppScene = 'opening' | 'feeling' | 'message' | 'video' | 'card';

const Index: React.FC = () => {
  const [currentScene, setCurrentScene] = useState<AppScene>('opening');
  const [isTransitioning, setIsTransitioning] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  const goToScene = (scene: AppScene) => {
    setIsTransitioning(true);

    // Handle background music
    if (audioRef.current) {
      const isEnteringVideo = scene === 'video';
      const isLeavingVideo = currentScene === 'video' && scene !== 'video';

      if (isEnteringVideo) {
        audioRef.current.pause();
      } else if (isLeavingVideo) {
        audioRef.current.play().catch((e) => console.log('Audio resume failed', e));
      }
    }

    setTimeout(() => {
      setCurrentScene(scene);
      setIsTransitioning(false);
    }, 300);
  };

  const handleStart = () => {
    if (audioRef.current) {
      // Reset audio to beginning and ensure it's ready
      audioRef.current.currentTime = 0;
      audioRef.current.volume = 0.5;
      
      // Play must be called synchronously from user gesture
      const playPromise = audioRef.current.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => console.log('Audio playing successfully'))
          .catch((e) => console.log('Audio playback failed', e));
      }
    }
    goToScene('feeling');
  };

  return (
    <>
      <audio ref={audioRef} loop preload="auto">
        <source src="/music/Ed Sheeran - Perfect - LatinHype.mp3" type="audio/mpeg" />
        Your browser does not support the audio element.
      </audio>

      <div className={`transition-opacity duration-300 ${isTransitioning ? 'opacity-0' : 'opacity-100'}`}>
        {currentScene === 'opening' && (
          <SceneOpening onNext={handleStart} />
        )}

        {currentScene === 'feeling' && (
          <SceneFeeling onNext={() => goToScene('message')} />
        )}

        {currentScene === 'message' && (
          <SceneMessage onNext={() => goToScene('video')} />
        )}

        {currentScene === 'video' && (
          <SceneVideo onNext={() => goToScene('card')} />
        )}

        {currentScene === 'card' && (
          <SceneCard isVisible={true} />
        )}
      </div>
      <FloatingHearts />
      <CursorTrail />
    </>
  );
};

export default Index;
