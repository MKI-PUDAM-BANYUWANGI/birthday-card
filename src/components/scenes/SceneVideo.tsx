import React, { useRef, useState } from 'react';
import { Button } from '@/components/ui/button';

interface SceneVideoProps {
    onNext: () => void;
}

const SceneVideo: React.FC<SceneVideoProps> = ({ onNext }) => {
    const videoRef = useRef<HTMLVideoElement>(null);
    const [isPlaying, setIsPlaying] = useState(false);

    const togglePlay = () => {
        if (videoRef.current) {
            if (isPlaying) {
                videoRef.current.pause();
            } else {
                videoRef.current.play();
            }
            setIsPlaying(!isPlaying);
        }
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center p-6 romantic-gradient relative overflow-hidden">

            {/* Decorative background elements */}
            <div className="absolute top-10 left-10 w-32 h-32 rounded-full bg-rose-soft/30 blur-3xl" />
            <div className="absolute bottom-10 right-10 w-40 h-40 rounded-full bg-primary/20 blur-3xl" />

            <div className="z-10 w-full max-w-4xl flex flex-col items-center animate-fade-up">
                <h2 className="text-2xl md:text-3xl font-display text-foreground mb-8 text-center">
                    Sebuah kenangan untukmu... 🎥
                </h2>

                <div className="relative w-full max-w-sm aspect-[9/16] bg-black/10 rounded-2xl overflow-hidden shadow-2xl border-4 border-white/50 mb-8 group mx-auto">
                    <video
                        ref={videoRef}
                        className="w-full h-full object-cover"
                        controls
                        onPlay={() => setIsPlaying(true)}
                        onPause={() => setIsPlaying(false)}
                    >
                        {/* User needs to add their video file to public/ and update this src */}
                        <source src="/video/birthday-gurl.mp4" type="video/mp4" />
                        Browser kamu tidak mendukung pemutaran video.
                    </video>
                </div>

                <div className="opacity-0 animate-fade-up delay-700">
                    <Button
                        variant="romantic"
                        size="lg"
                        onClick={onNext}
                        className="min-w-[150px]"
                    >
                        Buka hatiku 💌
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default SceneVideo;
