import React, { useState } from 'react';
import SceneOpening from '@/components/scenes/SceneOpening';
import SceneFeeling from '@/components/scenes/SceneFeeling';
import SceneMessage from '@/components/scenes/SceneMessage';
import SceneCard from '@/components/scenes/SceneCard';

type Scene = 'opening' | 'feeling' | 'message' | 'card';

const Index: React.FC = () => {
  const [currentScene, setCurrentScene] = useState<Scene>('opening');
  const [isTransitioning, setIsTransitioning] = useState(false);

  const goToScene = (scene: Scene) => {
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentScene(scene);
      setIsTransitioning(false);
    }, 300);
  };

  return (
    <div className={`transition-opacity duration-300 ${isTransitioning ? 'opacity-0' : 'opacity-100'}`}>
      {currentScene === 'opening' && (
        <SceneOpening onNext={() => goToScene('feeling')} />
      )}
      
      {currentScene === 'feeling' && (
        <SceneFeeling onNext={() => goToScene('message')} />
      )}
      
      {currentScene === 'message' && (
        <SceneMessage onNext={() => goToScene('card')} />
      )}
      
      {currentScene === 'card' && (
        <SceneCard isVisible={true} />
      )}
    </div>
  );
};

export default Index;
