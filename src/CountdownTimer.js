import React, { useState, useEffect, useRef, useMemo } from 'react';

const CountdownTimer = ({ targetTime }) => {
    const [remaining, setRemaining] = useState({});
    const [finished, setFinished] = useState(false);
    const soundRef = useRef();

    // ✅ Memoize target date to prevent unnecessary recalculations
    const target = useMemo(() => new Date(targetTime), [targetTime]);

    useEffect(() => {
        const update = () => {
            const now = new Date().getTime();
            const dist = target.getTime() - now;

            if (dist <= 0) {
                setFinished(true);
                setRemaining({ d: 0, h: 0, m: 0, s: 0 });

                soundRef.current?.play().catch((error) => {
                    console.warn("Audio playback failed:", error);
                });

                return;
            }

            setRemaining({
                d: Math.floor(dist / (1000 * 60 * 60 * 24)),
                h: Math.floor((dist % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
                m: Math.floor((dist % (1000 * 60 * 60)) / (1000 * 60)),
                s: Math.floor((dist % (1000 * 60)) / 1000),
            });
        };

        const timer = setInterval(update, 1000);
        update();

        return () => clearInterval(timer);
    }, [target]);

    // ✅ Format to 12-hour clock with AM/PM
    const formatTargetTime = () => {
        return target.toLocaleString('en-US', {
            dateStyle: 'medium',
            timeStyle: 'short',
        });
    };

    return (
        <div className="timer-box">
            <p className="target-info">Target: {formatTargetTime()}</p>
            <div className={`timer ${finished ? 'finished' : ''}`}>
                {finished ? (
                    <h3>🎉 Time's up!</h3>
                ) : (
                    <h3>
                        ⏳ {remaining.d}d : {remaining.h}h : {remaining.m}m : {remaining.s}s
                    </h3>
                )}
            </div>
            <audio ref={soundRef} src="/alert.mp3" preload="auto" />
        </div>
    );
};

export default CountdownTimer;
