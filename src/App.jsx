import { useState, useMemo } from 'react';
import { Helmet } from 'react-helmet-async';
import Header from './components/Header';
import HeroSection from './components/HeroSection';
import CategoryTabs from './components/CategoryTabs';
import PeopleGrid from './components/PeopleGrid';
import Footer from './components/Footer';
import ErrorBoundary from './components/ErrorBoundary';
import { useVotesApi } from './hooks/useVotesApi';
import { famousPeople, searchPeople, filterByCategory } from './data/famousPeople';

function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');

  const { getVotes, getUserVote, addLike, addDislike, isAnimating, getTotalVotes, loading } = useVotesApi();

  // Filter people based on search and category
  const filteredPeople = useMemo(() => {
    if (searchQuery) {
      return searchPeople(searchQuery, activeCategory);
    }
    return filterByCategory(activeCategory);
  }, [searchQuery, activeCategory]);

  // Exclude top 10 from the grid when not searching
  const gridPeople = useMemo(() => {
    if (searchQuery) {
      return filteredPeople;
    }
    // When showing all or specific category, exclude first 10 from grid (shown in hero)
    if (activeCategory === 'all') {
      return filteredPeople.slice(10);
    }
    return filteredPeople;
  }, [filteredPeople, searchQuery, activeCategory]);

  const totalVotes = getTotalVotes();

  const siteUrl = typeof window !== 'undefined' ? window.location.origin : '';
  const defaultTitle = 'Global Fame Monitor - Real-Time Community Voting';
  const defaultDescription =
    'Vote for the world\'s 250 most famous people. Community-driven voting platform with real-time counters.';

  return (
    <div className="min-h-screen bg-white font-sans antialiased">
      <Helmet>
        <title>{defaultTitle}</title>
        <meta name="description" content={defaultDescription} />
        <link rel="canonical" href={siteUrl || '/'} />

        <meta property="og:title" content="Global Fame Monitor - Community Voting Platform" />
        <meta property="og:description" content={defaultDescription} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={siteUrl || '/'} />
        <meta property="og:site_name" content="Global Fame Monitor" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Global Fame Monitor - Community Voting Platform" />
        <meta name="twitter:description" content={defaultDescription} />
      </Helmet>

      {/* Header with Search */}
      <Header
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        totalVotes={totalVotes}
      />

      {/* Hero Section - Top 10 (wrapped with ErrorBoundary) */}
      {!searchQuery && activeCategory === 'all' && (
        <ErrorBoundary>
          <HeroSection
            votes={getVotes}
            getUserVote={getUserVote}
            onLike={addLike}
            onDislike={addDislike}
            isAnimating={isAnimating}
          />
        </ErrorBoundary>
      )}

      {/* Category Tabs */}
      <CategoryTabs
        activeCategory={activeCategory}
        onCategoryChange={setActiveCategory}
      />

      {/* People Grid (wrapped with ErrorBoundary) */}
      <ErrorBoundary>
        <PeopleGrid
          people={gridPeople}
          votes={getVotes}
          getUserVote={getUserVote}
          onLike={addLike}
          onDislike={addDislike}
          isAnimating={isAnimating}
          searchQuery={searchQuery}
        />
      </ErrorBoundary>

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default App;

