import { useState, createContext, useContext } from 'react';

// Toast Context
const ToastContext = createContext(null);

export const useToast = () => {
    const context = useContext(ToastContext);
    if (!context) {
        throw new Error('useToast must be used within a ToastProvider');
    }
    return context;
};

export const ToastProvider = ({ children }) => {
    const [toast, setToast] = useState(null);

    const showToast = (message, type = 'info', action = null) => {
        setToast({ message, type, action });
        setTimeout(() => setToast(null), 4000);
    };

    const hideToast = () => setToast(null);

    return (
        <ToastContext.Provider value={{ showToast, hideToast }}>
            {children}

            {/* Toast Notification */}
            {toast && (
                <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[100] animate-slide-up">
                    <div className={`flex items-center gap-3 px-5 py-4 rounded-xl shadow-2xl backdrop-blur-sm ${toast.type === 'warning'
                            ? 'bg-amber-500/95 text-white'
                            : toast.type === 'error'
                                ? 'bg-red-500/95 text-white'
                                : 'bg-gray-900/95 text-white'
                        }`}>
                        {/* Icon */}
                        <span className="text-xl">
                            {toast.type === 'warning' ? '🔒' : toast.type === 'error' ? '❌' : 'ℹ️'}
                        </span>

                        {/* Message */}
                        <span className="font-medium">{toast.message}</span>

                        {/* Action Button */}
                        {toast.action && (
                            <button
                                onClick={() => {
                                    toast.action.onClick();
                                    hideToast();
                                }}
                                className="ml-2 px-3 py-1.5 bg-white/20 hover:bg-white/30 rounded-lg text-sm font-semibold transition-colors"
                            >
                                {toast.action.label}
                            </button>
                        )}

                        {/* Close Button */}
                        <button
                            onClick={hideToast}
                            className="ml-2 p-1 hover:bg-white/20 rounded-lg transition-colors"
                        >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>
                </div>
            )}
        </ToastContext.Provider>
    );
};
