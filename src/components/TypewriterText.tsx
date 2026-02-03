import React, { useState, useEffect } from 'react';

interface TypewriterTextProps {
    text: string;
    delay?: number;
    speed?: number;
    className?: string;
    onComplete?: () => void;
}

const TypewriterText: React.FC<TypewriterTextProps> = ({
    text,
    delay = 0,
    speed = 50,
    className = "",
    onComplete
}) => {
    const [displayedText, setDisplayedText] = useState('');
    const [isStarted, setIsStarted] = useState(false);

    useEffect(() => {
        const startTimeout = setTimeout(() => {
            setIsStarted(true);
        }, delay);

        return () => clearTimeout(startTimeout);
    }, [delay]);

    const characters = React.useMemo(() => Array.from(text), [text]);

    // Use ref for onComplete to avoid restarting effect when parent re-renders
    const onCompleteRef = React.useRef(onComplete);
    useEffect(() => {
        onCompleteRef.current = onComplete;
    }, [onComplete]);

    useEffect(() => {
        if (!isStarted) return;

        let currentIndex = 0;
        setDisplayedText(''); // Reset text when starting

        const interval = setInterval(() => {
            if (currentIndex < characters.length) {
                setDisplayedText(characters.slice(0, currentIndex + 1).join(''));
                currentIndex++;
            } else {
                clearInterval(interval);
                if (onCompleteRef.current) onCompleteRef.current();
            }
        }, speed);

        return () => clearInterval(interval);
    }, [isStarted, characters, speed]); // Removed onComplete from dependencies

    return (
        <span className={className}>
            {displayedText}
            {isStarted && displayedText.length < text.length && (
                <span className="animate-pulse">|</span>
            )}
        </span>
    );
};

export default TypewriterText;
