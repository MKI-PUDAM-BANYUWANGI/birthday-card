import React, { useState } from 'react';
import { Button } from '@/components/ui/button';

interface ScenePhotosProps {
    onNext: () => void;
}

const photos = [
    "/photos/foto1.jpg",
    "/photos/foto2.jpg",
    "/photos/foto3.jpg",
    "/photos/foto4.jpg",
    "/photos/foto5.jpg",
    "/photos/foto6.jpg",
    "/photos/foto7.jpg",
    "/photos/foto8.jpg",
    "/photos/foto9.jpg",
    "/photos/foto10.jpg",
    "/photos/foto11.jpg",
    "/photos/foto12.jpg",
    "/photos/foto13.jpg",
    "/photos/foto14.jpg",
    "/photos/foto15.jpg",
    "/photos/foto16.jpg",
    "/photos/foto17.jpg",
    "/photos/foto18.jpg",
    "/photos/foto19.jpg",
    "/photos/foto20.jpg",
    "/photos/foto21.jpg",
    "/photos/foto22.jpg",
    "/photos/foto23.jpg",
    "/photos/foto24.jpg",
];
// =====================

const ScenePhotos: React.FC<ScenePhotosProps> = ({ onNext }) => {
    const [currentIndex, setCurrentIndex] = useState(Math.floor(photos.length / 2));

    const goToPrev = () => {
        setCurrentIndex((prev) => (prev === 0 ? photos.length - 1 : prev - 1));
    };

    const goToNext = () => {
        setCurrentIndex((prev) => (prev === photos.length - 1 ? 0 : prev + 1));
    };

    // Calculate position and scale for each photo
    const getPhotoStyle = (index: number) => {
        const diff = index - currentIndex;

        // Handle wrap-around for circular carousel effect
        let adjustedDiff = diff;
        if (diff > photos.length / 2) adjustedDiff = diff - photos.length;
        if (diff < -photos.length / 2) adjustedDiff = diff + photos.length;

        const absDistance = Math.abs(adjustedDiff);

        // Only show photos within 3 positions of center
        if (absDistance > 3) return { display: 'none' };

        const scale = 1 - absDistance * 0.15; // Center is 1, sides get smaller
        const translateX = adjustedDiff * 120; // Horizontal offset
        const zIndex = 10 - absDistance;
        const opacity = 1 - absDistance * 0.2;
        const rotateY = adjustedDiff * -5; // Slight 3D rotation

        return {
            transform: `translateX(${translateX}px) scale(${scale}) rotateY(${rotateY}deg)`,
            zIndex,
            opacity,
            transition: 'all 0.4s ease-out',
        };
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center p-6 romantic-gradient relative overflow-hidden">

            {/* Decorative background elements */}
            <div className="absolute top-10 right-10 w-32 h-32 rounded-full bg-rose-soft/30 blur-3xl" />
            <div className="absolute bottom-10 left-10 w-40 h-40 rounded-full bg-primary/20 blur-3xl" />

            <div className="z-10 w-full max-w-4xl flex flex-col items-center">
                <h2 className="text-2xl md:text-3xl font-display text-foreground mb-8 text-center animate-fade-up">
                    Every moment with you... 📸
                </h2>

                {/* Carousel Container */}
                <div className="relative w-full h-[350px] md:h-[450px] flex items-center justify-center mb-8">

                    {/* Left Arrow */}
                    <button
                        onClick={goToPrev}
                        className="absolute left-2 md:left-8 z-20 w-10 h-10 md:w-12 md:h-12 rounded-full bg-white/80 shadow-lg flex items-center justify-center text-primary hover:bg-white transition-colors"
                    >
                        ❮
                    </button>

                    {/* Photos */}
                    <div className="relative w-[200px] md:w-[280px] h-[280px] md:h-[380px]" style={{ perspective: '1000px' }}>
                        {photos.map((src, index) => {
                            const style = getPhotoStyle(index);
                            if (style.display === 'none') return null;

                            return (
                                <div
                                    key={index}
                                    className="absolute top-0 left-0 w-full h-full rounded-xl overflow-hidden shadow-xl border-4 border-white/70 cursor-pointer"
                                    style={style}
                                    onClick={() => setCurrentIndex(index)}
                                >
                                    <img
                                        src={src}
                                        alt={`Memory ${index + 1}`}
                                        className="w-full h-full object-cover"
                                        onError={(e) => {
                                            (e.target as HTMLImageElement).src = `https://placehold.co/280x380/pink/white?text=Foto+${index + 1}`;
                                        }}
                                    />
                                </div>
                            );
                        })}
                    </div>

                    {/* Right Arrow */}
                    <button
                        onClick={goToNext}
                        className="absolute right-2 md:right-8 z-20 w-10 h-10 md:w-12 md:h-12 rounded-full bg-white/80 shadow-lg flex items-center justify-center text-primary hover:bg-white transition-colors"
                    >
                        ❯
                    </button>
                </div>

                <p className="text-lg font-body text-muted-foreground mb-8 text-center max-w-lg animate-fade-up">
                    It's a memory I want to keep forever.
                </p>

                <div className="animate-fade-up">
                    <Button
                        variant="romantic"
                        size="lg"
                        onClick={onNext}
                        className="min-w-[150px]"
                    >
                        Still Want to Next? 💗
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default ScenePhotos;
