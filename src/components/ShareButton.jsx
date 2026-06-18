import { useState } from 'react';
import { shareProfile } from '../utils/shareProfile';
import { useToast } from './ToastProvider';

export default function ShareButton({ name, slug, size = 'md', className = '' }) {
    const { showToast } = useToast();
    const [sharing, setSharing] = useState(false);

    const handleShare = async (event) => {
        event.preventDefault();
        event.stopPropagation();

        if (sharing) return;

        setSharing(true);
        try {
            await shareProfile({
                name,
                slug,
                onCopied: () => showToast('Profile link copied to clipboard', 'info'),
                onError: () => showToast('Unable to share profile link', 'error')
            });
        } finally {
            setSharing(false);
        }
    };

    const sizeClasses = size === 'sm'
        ? 'px-2.5 py-2 text-xs gap-1'
        : 'px-4 py-2.5 text-sm gap-2';

    return (
        <button
            type="button"
            onClick={handleShare}
            disabled={sharing}
            aria-label={`Share ${name}'s profile`}
            className={`inline-flex items-center font-medium rounded-xl border border-gray-200 bg-gray-50 text-gray-600 hover:bg-blue-50 hover:text-blue-600 hover:border-blue-200 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed ${sizeClasses} ${className}`}
        >
            <svg className={size === 'sm' ? 'w-3.5 h-3.5' : 'w-4 h-4'} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
            </svg>
            <span>Share</span>
        </button>
    );
}
