import { useState } from 'react';

export default function VoteButton({ type, count = 0, onClick, isAnimating, isActive = false, disabled = false, locked = false }) {
    const isLike = type === 'like';
    const [showTooltip, setShowTooltip] = useState(false);

    const handleClick = (e) => {
        // CRITICAL: Stop propagation to prevent triggering parent Link navigation
        e?.stopPropagation?.();
        e?.preventDefault?.();

        if (locked) {
            setShowTooltip(true);
            setTimeout(() => setShowTooltip(false), 2000);
            return;
        }

        // Safely call onClick
        try {
            onClick?.();
        } catch (error) {
            console.error('Vote click error:', error);
        }
    };

    // Null-safe count display
    const safeCount = typeof count === 'number' ? count : 0;

    return (
        <div className="relative">
            <button
                onClick={handleClick}
                disabled={disabled}
                className={`group flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all duration-200 
                    ${locked
                        ? 'bg-gray-100 text-gray-400 border border-gray-200 cursor-not-allowed opacity-70'
                        : isActive
                            ? (isLike
                                ? 'bg-green-500 text-white shadow-lg shadow-green-200'
                                : 'bg-red-500 text-white shadow-lg shadow-red-200')
                            : (isLike
                                ? 'bg-gray-50 hover:bg-green-50 text-gray-600 hover:text-green-600 border border-gray-200 hover:border-green-200'
                                : 'bg-gray-50 hover:bg-red-50 text-gray-600 hover:text-red-600 border border-gray-200 hover:border-red-200')
                    } 
                    ${isAnimating ? (isLike ? 'animate-pulse-like scale-105' : 'animate-pulse-dislike scale-105') : ''}
                    ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
                `}
            >
                {/* Lock Icon for Guests */}
                {locked && (
                    <span className="text-gray-400 text-xs">🔒</span>
                )}

                {/* Vote Icon */}
                <span className={`text-lg transition-transform duration-200 ${!locked && !disabled && 'group-hover:scale-110'} ${isAnimating ? 'scale-125' : ''}`}>
                    {isLike ? '👍' : '👎'}
                </span>

                {/* Count - NULL SAFE */}
                <span className={`min-w-[2rem] text-center font-semibold ${isAnimating ? 'animate-count-up' : ''}`}>
                    {safeCount.toLocaleString()}
                </span>
            </button>

            {/* Login Tooltip */}
            {showTooltip && (
                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-2 bg-gray-900 text-white text-sm rounded-lg shadow-lg whitespace-nowrap z-50 animate-fade-in">
                    <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-1">
                        <div className="border-4 border-transparent border-t-gray-900"></div>
                    </div>
                    Please login to vote
                </div>
            )}
        </div>
    );
}

