import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { famousPeople, generateSlug } from '../data/famousPeople';
import { stances, TOPICS } from '../data/stances';

// ── Category badge colours ────────────────────────────────────────────────────
const CATEGORY_STYLES = {
    sports:   { bg: 'rgba(59,130,246,0.15)',  text: '#60a5fa', label: '⚽ Sports' },
    music:    { bg: 'rgba(168,85,247,0.15)',  text: '#c084fc', label: '🎵 Music' },
    film:     { bg: 'rgba(245,158,11,0.15)',  text: '#fbbf24', label: '🎬 Film & TV' },
    business: { bg: 'rgba(16,185,129,0.15)',  text: '#34d399', label: '💼 Business' },
    politics: { bg: 'rgba(239,68,68,0.15)',   text: '#f87171', label: '🏛️ Politics' },
};

// ── Single Stance Card ────────────────────────────────────────────────────────
function StanceCard({ person, stanceEntry, topic }) {
    const [imgError, setImgError] = useState(false);
    const isLike = stanceEntry.stance === 'like';
    const catStyle = CATEGORY_STYLES[person.category] || CATEGORY_STYLES.business;
    const slug = generateSlug(person.name);

    const avatarUrl = imgError
        ? null
        : `https://en.wikipedia.org/wiki/Special:FilePath/${person.name.replace(/ /g, '_')}.jpg?width=300`;

    const initials = person.name
        .split(' ')
        .slice(0, 2)
        .map(w => w[0])
        .join('');

    return (
        <div className="stance-card">
            {/* Stance Indicator Bar */}
            <div
                className="stance-bar"
                style={{ background: isLike ? '#22c55e' : '#ef4444' }}
            />

            <div className="stance-card-inner">
                {/* Avatar + Name row */}
                <div className="stance-top-row">
                    <Link to={`/profile/${slug}`} className="stance-avatar-link">
                        {avatarUrl ? (
                            <img
                                src={avatarUrl}
                                alt={person.name}
                                className="stance-avatar"
                                onError={() => setImgError(true)}
                            />
                        ) : (
                            <div className="stance-avatar stance-avatar-fallback">
                                {initials}
                            </div>
                        )}
                    </Link>

                    <div className="stance-person-info">
                        <Link
                            to={`/profile/${slug}`}
                            className="stance-person-name"
                        >
                            {person.name}
                        </Link>
                        <span
                            className="stance-category-badge"
                            style={{
                                background: catStyle.bg,
                                color: catStyle.text,
                            }}
                        >
                            {catStyle.label}
                        </span>
                    </div>

                    {/* Like / Dislike Pill */}
                    <div className={`stance-pill ${isLike ? 'stance-pill--like' : 'stance-pill--dislike'}`}>
                        {isLike ? (
                            <>
                                <svg className="stance-pill-icon" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                Like
                            </>
                        ) : (
                            <>
                                <svg className="stance-pill-icon" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M10 14H5.236a2 2 0 01-1.789-2.894l3.5-7A2 2 0 018.736 3h4.018a2 2 0 01.485.06l3.76.94m-7 10v5a2 2 0 002 2h.096c.5 0 .905-.405.905-.904 0-.715.211-1.413.608-2.008L17 13V4m-7 10h2m5-10h2a2 2 0 012 2v6a2 2 0 01-2 2h-2.5" />
                                </svg>
                                Dislike
                            </>
                        )}
                    </div>
                </div>

                {/* Topic Badge */}
                <div className="stance-topic-badge">
                    <span className="stance-topic-emoji">{topic.emoji}</span>
                    <span>{topic.label}</span>
                </div>

                {/* Quote */}
                {stanceEntry.quote && (
                    <blockquote className="stance-quote">
                        "{stanceEntry.quote}"
                    </blockquote>
                )}
            </div>
        </div>
    );
}

// ── Main Page ─────────────────────────────────────────────────────────────────
export default function TrendingStancesPage() {
    const [search, setSearch]           = useState('');
    const [stanceFilter, setStanceFilter] = useState('all'); // 'all' | 'like' | 'dislike'
    const [topicFilter, setTopicFilter] = useState('all');

    // Build enriched list: join stances with famousPeople
    const enriched = useMemo(() =>
        stances
            .map(s => {
                const person = famousPeople.find(p => p.id === s.personId);
                const topic  = TOPICS.find(t => t.id === s.topic);
                return person && topic ? { ...s, person, topic } : null;
            })
            .filter(Boolean),
        []
    );

    // Apply filters
    const filtered = useMemo(() => {
        let result = enriched;

        if (stanceFilter !== 'all') {
            result = result.filter(s => s.stance === stanceFilter);
        }
        if (topicFilter !== 'all') {
            result = result.filter(s => s.topic.id === topicFilter);
        }
        if (search.trim()) {
            const q = search.toLowerCase();
            result = result.filter(
                s =>
                    s.person.name.toLowerCase().includes(q) ||
                    s.topic.label.toLowerCase().includes(q) ||
                    s.quote?.toLowerCase().includes(q)
            );
        }
        return result;
    }, [enriched, search, stanceFilter, topicFilter]);

    // Stats
    const likeCount    = filtered.filter(s => s.stance === 'like').length;
    const dislikeCount = filtered.filter(s => s.stance === 'dislike').length;

    return (
        <div className="stances-page">
            {/* ── Header ── */}
            <div className="stances-hero">
                <div className="stances-hero-inner">
                    {/* Back link */}
                    <Link to="/" className="stances-back-link">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                        </svg>
                        Back to Rankings
                    </Link>

                    <div className="stances-title-row">
                        <div className="stances-icon">🔥</div>
                        <div>
                            <h1 className="stances-title">Trending Stances</h1>
                            <p className="stances-subtitle">
                                Where the world's most famous people stand on global topics
                            </p>
                        </div>
                    </div>

                    {/* Stats bar */}
                    <div className="stances-stats">
                        <div className="stances-stat">
                            <span className="stances-stat-num">{filtered.length}</span>
                            <span className="stances-stat-label">Total Stances</span>
                        </div>
                        <div className="stances-stat-divider" />
                        <div className="stances-stat">
                            <span className="stances-stat-num stances-stat-like">{likeCount}</span>
                            <span className="stances-stat-label">✅ In Favour</span>
                        </div>
                        <div className="stances-stat-divider" />
                        <div className="stances-stat">
                            <span className="stances-stat-num stances-stat-dislike">{dislikeCount}</span>
                            <span className="stances-stat-label">❌ Against</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* ── Filters ── */}
            <div className="stances-filters-wrapper">
                <div className="stances-filters-inner">
                    {/* Search */}
                    <div className="stances-search-wrap">
                        <svg className="stances-search-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                        <input
                            type="text"
                            placeholder="Search by name, topic, or quote…"
                            value={search}
                            onChange={e => setSearch(e.target.value)}
                            className="stances-search-input"
                        />
                        {search && (
                            <button
                                onClick={() => setSearch('')}
                                className="stances-search-clear"
                                aria-label="Clear search"
                            >
                                ✕
                            </button>
                        )}
                    </div>

                    {/* Stance filter pills */}
                    <div className="stances-filter-pills">
                        {[
                            { value: 'all',     label: '🌐 All' },
                            { value: 'like',    label: '✅ Like' },
                            { value: 'dislike', label: '❌ Dislike' },
                        ].map(f => (
                            <button
                                key={f.value}
                                onClick={() => setStanceFilter(f.value)}
                                className={`stances-filter-pill${stanceFilter === f.value ? ' stances-filter-pill--active' : ''}`}
                            >
                                {f.label}
                            </button>
                        ))}
                    </div>

                    {/* Topic dropdown */}
                    <select
                        value={topicFilter}
                        onChange={e => setTopicFilter(e.target.value)}
                        className="stances-topic-select"
                    >
                        {TOPICS.map(t => (
                            <option key={t.id} value={t.id}>
                                {t.emoji} {t.label}
                            </option>
                        ))}
                    </select>
                </div>
            </div>

            {/* ── Grid ── */}
            <div className="stances-grid-wrapper">
                {filtered.length > 0 ? (
                    <div className="stances-grid">
                        {filtered.map(s => (
                            <StanceCard
                                key={s.id}
                                person={s.person}
                                stanceEntry={s}
                                topic={s.topic}
                            />
                        ))}
                    </div>
                ) : (
                    <div className="stances-empty">
                        <div className="stances-empty-icon">🔍</div>
                        <h3 className="stances-empty-title">No stances found</h3>
                        <p className="stances-empty-sub">Try adjusting your filters or search term</p>
                        <button
                            onClick={() => { setSearch(''); setStanceFilter('all'); setTopicFilter('all'); }}
                            className="stances-reset-btn"
                        >
                            Reset Filters
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}
