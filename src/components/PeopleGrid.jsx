import { useState } from 'react';
import ProfileCard from './ProfileCard';

export default function PeopleGrid({ people, votes, getUserVote, onLike, onDislike, isAnimating, searchQuery }) {
    const [showAll, setShowAll] = useState(false);

    // Show all if searching, otherwise show 20 initially
    const displayCount = searchQuery || showAll ? people.length : 20;
    const displayedPeople = people.slice(0, displayCount);
    const hasMore = people.length > displayCount;

    if (people.length === 0) {
        return (
            <div className="py-20 text-center">
                <div className="text-6xl mb-4">🔍</div>
                <h3 className="text-xl font-semibold text-gray-700 mb-2">No results found</h3>
                <p className="text-gray-500">
                    Try a different search term or category
                </p>
            </div>
        );
    }

    return (
        <section className="py-10 px-4">
            <div className="max-w-7xl mx-auto">
                {/* Section Header */}
                <div className="flex items-center justify-between mb-6">
                    <div>
                        <h2 className="text-2xl font-bold text-gray-900">
                            {searchQuery ? 'Search Results' : 'All Famous People'}
                        </h2>
                        <p className="text-gray-500 text-sm mt-1">
                            Showing {displayedPeople.length} of {people.length} people
                        </p>
                    </div>
                </div>

                {/* Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {displayedPeople.map((person) => (
                        <ProfileCard
                            key={person.id}
                            person={person}
                            votes={votes(person.id)}
                            userVote={getUserVote(person.id)}
                            onLike={onLike}
                            onDislike={onDislike}
                            isLikeAnimating={isAnimating(person.id, 'like')}
                            isDislikeAnimating={isAnimating(person.id, 'dislike')}
                            featured={false}
                        />
                    ))}
                </div>

                {/* Load More Button */}
                {hasMore && (
                    <div className="mt-10 text-center">
                        <button
                            onClick={() => setShowAll(true)}
                            className="inline-flex items-center gap-2 px-8 py-3 bg-gray-900 text-white font-medium rounded-full hover:bg-gray-800 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                        >
                            <span>Load All {people.length - displayCount} More</span>
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                            </svg>
                        </button>
                    </div>
                )}
            </div>
        </section>
    );
}
