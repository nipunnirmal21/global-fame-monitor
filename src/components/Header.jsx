import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Header({ searchQuery, onSearchChange, totalVotes }) {
    const [isFocused, setIsFocused] = useState(false);
    const { isAuthenticated, user, logout, isAdmin } = useAuth();

    return (
        <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-100 shadow-sm">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col sm:flex-row items-center justify-between py-4 gap-4">
                    {/* Logo */}
                    <Link to="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
                        <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                            <span className="text-white text-xl">🌍</span>
                        </div>
                        <div>
                            <h1 className="text-xl font-bold text-gray-900 tracking-tight">
                                Global Fame Monitor
                            </h1>
                            <p className="text-xs text-gray-500 hidden sm:block">
                                Community Voting Platform
                            </p>
                        </div>
                    </Link>

                    {/* Search Bar */}
                    <div className="w-full sm:max-w-md">
                        <div
                            className={`relative transition-all duration-200 ${isFocused ? 'transform scale-[1.02]' : ''
                                }`}
                        >
                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                <svg
                                    className={`h-5 w-5 transition-colors duration-200 ${isFocused ? 'text-blue-500' : 'text-gray-400'
                                        }`}
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                                    />
                                </svg>
                            </div>
                            <input
                                type="text"
                                placeholder="Search 250 famous people..."
                                value={searchQuery}
                                onChange={(e) => onSearchChange(e.target.value)}
                                onFocus={() => setIsFocused(true)}
                                onBlur={() => setIsFocused(false)}
                                className={`w-full pl-12 pr-4 py-3 bg-gray-50 border rounded-xl text-gray-900 placeholder-gray-400 transition-all duration-200 focus:outline-none ${isFocused
                                    ? 'border-blue-300 bg-white shadow-lg shadow-blue-100 ring-2 ring-blue-100'
                                    : 'border-gray-200 hover:border-gray-300'
                                    }`}
                            />
                            {searchQuery && (
                                <button
                                    onClick={() => onSearchChange('')}
                                    className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-gray-600 transition-colors"
                                >
                                    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            )}
                        </div>
                    </div>

                    {/* Right Section - Vote Counter & Auth */}
                    <div className="flex items-center gap-4">
                        {/* Vote Counter */}
                        <div className="hidden md:flex items-center gap-3 text-sm">
                            <div className="flex items-center gap-2 px-3 py-2 bg-green-50 rounded-lg">
                                <span className="text-green-600">👍</span>
                                <span className="font-semibold text-green-700">{totalVotes.likes.toLocaleString()}</span>
                            </div>
                            <div className="flex items-center gap-2 px-3 py-2 bg-red-50 rounded-lg">
                                <span className="text-red-600">👎</span>
                                <span className="font-semibold text-red-700">{totalVotes.dislikes.toLocaleString()}</span>
                            </div>
                        </div>

                        {/* Auth Buttons */}
                        {isAuthenticated ? (
                            <div className="flex items-center gap-3">

                                {/* My Votes Link */}
                                <Link
                                    to="/my-votes"
                                    className="hidden sm:flex items-center gap-2 px-3 py-2 text-sm font-medium text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                                >
                                    <span>📊</span>
                                    <span>My Votes</span>
                                </Link>
                                {isAdmin && (
                                    <Link
                                        to="/admin"
                                        className="hidden sm:flex items-center gap-2 px-3 py-2 text-sm font-medium text-gray-600 hover:text-purple-600 hover:bg-purple-50 rounded-lg transition-colors"
                                    >
                                        <span>⚙️</span>
                                        <span>Admin</span>
                                    </Link>
                                )}
                                <div className="hidden sm:flex items-center gap-2 px-3 py-2 bg-gray-50 rounded-lg">
                                    <div className="w-7 h-7 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                                        <span className="text-white text-xs font-bold">
                                            {user?.username?.charAt(0).toUpperCase()}
                                        </span>
                                    </div>
                                    <span className="text-sm font-medium text-gray-700">{user?.username}</span>
                                </div>
                                <button
                                    onClick={logout}
                                    className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
                                >
                                    Logout
                                </button>
                            </div>
                        ) : (
                            <div className="flex items-center gap-2">

                                <Link
                                    to="/login"
                                    className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
                                >
                                    Login
                                </Link>
                                <Link
                                    to="/signup"
                                    className="px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg shadow hover:shadow-lg transition-all hover:scale-105"
                                >
                                    Sign Up
                                </Link>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </header>
    );
}
