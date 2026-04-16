import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../../assets/logoTwo.jpg';
import { API_BASE_URL } from '../../config';

const AIPoweredIcon = () => (
    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" />
        <path d="M2 12h20" />
        <circle cx="12" cy="12" r="3" fill="currentColor" />
    </svg>
);

const PersonalizedIcon = () => (
    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
        <circle cx="12" cy="7" r="4" />
        <path d="M12 14l3 3" />
        <path d="M18 8l-6 6" />
    </svg>
);

const ImmersiveIcon = () => (
    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7z" />
        <circle cx="12" cy="12" r="3" />
    </svg>
);

const SubmitPage: React.FC = () => {
    const navigate = useNavigate();
    const [author, setAuthor] = useState('');
    const [title, setTitle] = useState('');
    const [reviewText, setReviewText] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            const existsResponse = await fetch(
                `${API_BASE_URL}/books/exists?title=${encodeURIComponent(title)}`,
            );

            if (!existsResponse.ok) {
                throw new Error('Book unavailable :(');
            }

            const { exists, bookId } = await existsResponse.json();

            if (!exists) {
                navigate('/errorPage');
                return;
            }

            const trimmedReview = reviewText.trim();
            if (trimmedReview && bookId) {
                const authorEmail =
                    localStorage.getItem('userEmail') ||
                    sessionStorage.getItem('userEmail') ||
                    '';

                if (authorEmail) {
                    const reviewResponse = await fetch(`${API_BASE_URL}/reviews/user`, {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({
                            bookId,
                            text: trimmedReview,
                            authorEmail,
                        }),
                    });

                    if (!reviewResponse.ok) {
                        throw new Error('Failed to save user review');
                    }
                }
            }

            const response = await fetch(`${API_BASE_URL}/books/submit`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    title,
                    author,
                }),
            });

            if (!response.ok) {
                throw new Error('Failed to submit book');
            }
        } catch (error) {
            console.error('Book submission failed:', error);
            alert('Could not submit book details. Please try again.');
            setLoading(false);
            return;
        }

        let songs: { id: number; title: string; artist: string; genre: string }[] = [];
        try {
            const playlistRes = await fetch(
                `${API_BASE_URL}/books/playlist?title=${encodeURIComponent(title)}`,
            );
            if (playlistRes.ok) {
                const data = await playlistRes.json();
                songs = data.songs ?? [];
            }
        } catch {
            // ignore — PlaylistPage will use fallback data
        }

        navigate('/PlaylistPage', { state: { songs, bookTitle: title } });
    };

    return (
        <div className="submit-page">
            <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
            {loading && (
              <div style={{
                position: 'fixed', inset: 0, zIndex: 9999,
                background: 'rgba(0,0,0,0.55)', backdropFilter: 'blur(4px)',
                display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                gap: '20px',
              }}>
                <div style={{
                  width: '56px', height: '56px',
                  border: '5px solid rgba(255,255,255,0.2)',
                  borderTopColor: '#9810FA',
                  borderRadius: '50%',
                  animation: 'spin 0.8s linear infinite',
                }} />
                <p style={{ color: '#fff', fontSize: '18px', fontWeight: 600, margin: 0 }}>Generating your playlist…</p>
              </div>
            )}
            <header className="landing-header">
                <div className="login-brand">
                    <div className="login-brand-badge">
                        <img src={logo} alt="Bookify" className="login-brand-logo" />
                    </div>

                    <span
                        style={{
                            fontFamily: 'Arimo, sans-serif',
                            fontSize: '20px',
                            fontWeight: 'bold',
                            lineHeight: '28px',
                            backgroundImage: 'linear-gradient(90deg, #155DFC 0%, #9810FA 100%)',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            backgroundClip: 'text'
                        }}
                    >
                        Bookify
                    </span>
                </div>

                <nav className="landing-nav">
                    <button
                        style={{ whiteSpace: 'nowrap' }}
                        className="landing-nav-button"
                        onClick={() => navigate('/connectionPage')}
                    >
                        Learn More
                    </button>
                    <button
                        className="landing-nav-button"
                        onClick={() => navigate('/about')}
                    >
                        About
                    </button>
                    <button className="landing-nav-button" onClick={() => navigate('/feedback')}>Feedback</button>
                    <button className="landing-nav-primary" onClick={() => navigate('/user')}>User Page</button>

                </nav>
            </header>

            <main className="submit-main">
                <div className="submit-hero">
                    <div className="submit-pill">

                        <span>AI-Powered Audiobook Generation</span>
                    </div>
                    <h1 className="submit-title">Create Your Playlist</h1>
                    <p className="submit-subtitle">
                        Enter your favorite book details and let AI curate the perfect listening experience
                    </p>
                </div>

                <section className="submit-card" aria-label="Create playlist form">
                    <form className="submit-form" onSubmit={handleSubmit}>
                        <label className="submit-label" htmlFor="author">Author Name</label>
                        <input
                            id="author"
                            name="author"
                            type="text"
                            placeholder="e.g., J.K. Rowling"
                            className="submit-input"
                            value={author}
                            onChange={(e) => setAuthor(e.target.value)}
                            required
                        />

                        <label className="submit-label" htmlFor="title">Book Title</label>
                        <input
                            id="title"
                            name="title"
                            type="text"
                            placeholder="e.g., Harry Potter and the Sorcerer's Stone"
                            className="submit-input"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            required
                        />

                        <label className="submit-label" htmlFor="review">Your Review (Optional)</label>
                        <textarea
                            id="review"
                            name="review"
                            placeholder="Share what you thought about the book..."
                            className="submit-input"
                            value={reviewText}
                            onChange={(e) => setReviewText(e.target.value)}
                            rows={4}
                            style={{ resize: 'vertical', minHeight: '110px' }}
                        />

                        <button type="submit" className="submit-button" disabled={loading}>
                            Generate Playlist
                        </button>
                    </form>

                    <div className="submit-divider" role="presentation" />
                    <p className="submit-footnote">
                        Our AI will analyze the book's themes and mood to create a personalized audiobook experience
                    </p>
                    <p className="submit-footnote" style={{ marginTop: '8px' }}>
                        Already Read? make your playlist more personalized by adding your own review!
                    </p>
                </section>

                <div className="submit-features" aria-label="Feature list">
                    <div className="submit-feature">
                        <div className="submit-feature-icon" aria-hidden>
                            <AIPoweredIcon />
                        </div>
                        <p className="submit-feature-text">AI-Powered</p>
                    </div>
                    <div className="submit-feature">
                        <div className="submit-feature-icon" aria-hidden>
                            <PersonalizedIcon />
                        </div>
                        <p className="submit-feature-text">Personalized</p>
                    </div>
                    <div className="submit-feature">
                        <div className="submit-feature-icon" aria-hidden>
                            <ImmersiveIcon />
                        </div>
                        <p className="submit-feature-text">Immersive</p>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default SubmitPage;