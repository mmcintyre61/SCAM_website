import React, { useMemo, useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import logo from '../../assets/logoTwo.jpg';
import '../style/playlist.css';
import { API_BASE_URL } from '../../config';
import { authFetch } from '../authFetch';

type Song = {
  id: number;
  title: string;
  artist: string;
  genre: string;
  cover?: string;
  rating?: 'liked' | 'disliked' | null;
};

type StarAnimation = {
  id: string;
  songId: number;
  x: number;
  y: number;
};

const initialSongs: Song[] = [
  { id: 1, title: 'Midnight Dreams', artist: 'Luna Echo', genre: 'Indie' },
  { id: 2, title: 'Electric Sunrise', artist: 'The Wavelengths', genre: 'Electronic' },
  { id: 3, title: 'Paper Hearts', artist: 'Indie Rose', genre: 'Pop' },
  { id: 4, title: 'Neon Lights', artist: 'Cyber Symphony', genre: 'Synthwave' },
  { id: 5, title: 'Ocean Waves', artist: 'Ambient Journey', genre: 'Ambient' },
  { id: 6, title: 'City Rain', artist: 'Urban Poets', genre: 'Hip Hop' },
  { id: 7, title: 'Golden Hour', artist: 'Sunset Collective', genre: 'Folk' },
  { id: 8, title: 'Starlight', artist: 'Cosmic Rays', genre: 'Electronic' },
  { id: 9, title: 'Lost in Time', artist: 'Temporal Echoes', genre: 'Indie' },
  { id: 10, title: 'Velvet Sky', artist: 'Dream Weavers', genre: 'R&B' },
  { id: 11, title: 'Midnight Jazz', artist: 'Blue Note Trio', genre: 'Jazz' },
  { id: 12, title: 'Summer Breeze', artist: 'The Chill Vibes', genre: 'Chill' },
  { id: 13, title: 'Retro Wave', artist: 'Synthwave Kings', genre: 'Synthwave' },
  { id: 14, title: 'Morning Coffee', artist: 'Acoustic Soul', genre: 'Acoustic' },
  { id: 15, title: 'Dance Floor', artist: 'Beat Masters', genre: 'Dance' },
  { id: 16, title: 'Mountain Echo', artist: 'Folk Wanderers', genre: 'Folk' },
  { id: 17, title: 'Electric Dreams', artist: 'Pixel Hearts', genre: 'Electronic' },
  { id: 18, title: 'Moonlight Serenade', artist: 'Classical Remix', genre: 'Classical' },
  { id: 19, title: 'Urban Nights', artist: 'Hip Hop Collective', genre: 'Hip Hop' },
  { id: 20, title: 'Sunset Boulevard', artist: 'West Coast Sound', genre: 'Rock' },
];

const PlaylistPage: React.FC = () => {
  const navigate = useNavigate(); // for header nav
  const location = useLocation();

  // grab songs/title from the last page if they were passed in
  // if nothing was passed use an empty array 
  //if they refresh the songs or switch tabs we still want songs to be there
  const locationSongs: Song[] = (location.state as any)?.songs ?? [];
  const bookTitle: string = (location.state as any)?.bookTitle ?? 'My Bookify Playlist';

  //load saved playlist if the useer went away
  const savedState = (() => {
    try { return JSON.parse(sessionStorage.getItem('bookify_playlist_state') || 'null'); } catch { return null; }
  })();
  // cleanup so old data does not leak into a future visit
  if (savedState) sessionStorage.removeItem('bookify_playlist_state');

  // pick songs in this order: 
  // saved state from before spotify login, passed in from last page, fake songs
  const [songs, setSongs] = useState<Song[]>(
    savedState?.songs ?? (locationSongs.length > 0 ? locationSongs : initialSongs)
  );
  const effectiveBookTitle = savedState?.bookTitle ?? bookTitle; // if user is returning from spotify login, use the old book title instead of the one passed in (which would be the same, but just in case)
  const [filter, setFilter] = useState<'all' | 'liked' | 'disliked'>('all');
  const [stars, setStars] = useState<StarAnimation[]>([]);
  const [playlistLoading, setPlaylistLoading] = useState(false);
  const [regenerating, setRegenerating] = useState(false);


  // regenerate the playlist
  const handleRegenerate = async () => {
    setRegenerating(true); //have it look like a loading circle

    try {
      // call backend to regenerate based on book title, if it fails just keep current songs and do nothing
      //books/playlist calls getPlaylist (books.controller), which calls runCreatePlaylist which calls create-playlist.py to get a new playlist based on the book title, if that fails it falls back to the old TS pipeline so we have multiple layers of fallback to ensure this works as best as possible
      const res = await fetch(`${API_BASE_URL}/books/playlist?title=${encodeURIComponent(effectiveBookTitle)}`); //encodeUIRComponent so it can handle special characters in book titles
      
      
      if (res.ok) {
        //success
        const data = await res.json(); //expecting { songs: [{ title, artist, genre, cover }] }
        
        // map songs to our Song type and add ids, if a field is missing just show a blank space 
        const fresh: Song[] = (data.songs ?? []).map((s: any, i: number) => ({
          id: i + 1,
          title: s.title ?? 'Unknown',
          artist: s.artist ?? 'Unknown Artist',
          genre: s.genre ?? '',
          cover: s.cover ?? null,
          rating: null,
        }));

        //
        if (fresh.length > 0) {
          setSongs(fresh);
        }
      }
    } catch {
      // if it fails keep current songs and do nothing
    } finally {
      setRegenerating(false);
    }
  };

  // get album art for songs that are missing it
  useEffect(() => {
    if (!songs.length) return;
    // skip call when covers already exist
    const missing = songs.filter((s) => !s.cover);
    if (!missing.length) return;

    //Call backend to get album art for songs that are missing it, 
    // if it fails just ignore covers and do nothing since they are nice to have but not essential
    authFetch(`${API_BASE_URL}/songs/album-art`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ songs: songs.map((s) => ({ title: s.title, artist: s.artist })) }),
    })
      .then((r) => r.json())
      .then(({ songs: withCovers }: { songs: { title: string; artist: string; cover: string | null }[] }) => {
        setSongs((prev) =>
          prev.map((s) => {
            const match = withCovers.find((c) => c.title === s.title && c.artist === s.artist);
            return match?.cover ? { ...s, cover: match.cover } : s;
          })
        );
      })
        .catch(() => {/* covers are nice to have but page still works without them */});
      }, []); 

  //this counts how many songs are liked/disliked/total and calculates percentage rated for the progress bar
  
  //total number of songs rated so far
  const ratedCount = useMemo(
    () => songs.filter((s) => s.rating === 'liked' || s.rating === 'disliked').length,
    [songs]
  );
  const likedCount = useMemo(() => songs.filter((s) => s.rating === 'liked').length, [songs]);
  const dislikedCount = useMemo(() => songs.filter((s) => s.rating === 'disliked').length, [songs]);
  
  //percent of songs rated
  const ratedPct = Math.round((ratedCount / songs.length) * 100);

  const visibleSongs = useMemo(() => {
    if (filter === 'liked') return songs.filter((s) => s.rating === 'liked');
    if (filter === 'disliked') return songs.filter((s) => s.rating === 'disliked');
    return songs;
  }, [filter, songs]);

  // this handles when user clicks like/dislike buttons, it toggles that rating 
  // and also adds a fun star animation to make it feel more rewarding (and to give feedback that the button was clicked)
  const toggleRating = (id: number, next: 'liked' | 'disliked', event?: React.MouseEvent) => {
    const current = songs.find((s) => s.id === id)?.rating ?? null;

    // pop stars when user hits like
    if (next === 'liked' && current !== 'liked' && event?.currentTarget) {
      const button = event.currentTarget as HTMLButtonElement;
      if (button) {
        const rect = button.getBoundingClientRect();
        const animationId = `star-${Date.now()}-${Math.random()}`;
        const newStars: StarAnimation[] = [];

        for (let i = 0; i < 5; i++) {
          newStars.push({
            id: `${animationId}-${i}`,
            songId: id,
            x: rect.left + rect.width / 2,
            y: rect.top + rect.height / 2,
          });
        }

        setStars((prev) => [...prev, ...newStars]);

        // clear stars after the animation time
        setTimeout(() => {
          setStars((prev) => prev.filter((s) => !newStars.some((ns) => ns.id === s.id)));
        }, 1000);
      }
    }

    // same star pop for dislike so both buttons feel alive
    if (next === 'disliked' && current !== 'disliked' && event?.currentTarget) {
      const button = event.currentTarget as HTMLButtonElement;
      if (button) {
        const rect = button.getBoundingClientRect();
        const animationId = `star-${Date.now()}-${Math.random()}`;
        const newStars: StarAnimation[] = [];

        // make the stars come out in a burst pattern with some randomness
        for (let i = 0; i < 5; i++) {
          newStars.push({ // give each star a unique id so we can track and remove them after the animation
            id: `${animationId}-${i}`, // associate the star with the song id so we can remove them after animation
            songId: id,
            x: rect.left + rect.width / 2,
            y: rect.top + rect.height / 2,
          });
        }

        setStars((prev) => [...prev, ...newStars]);

        // clear stars after the animation time
        setTimeout(() => {
          setStars((prev) => prev.filter((s) => !newStars.some((ns) => ns.id === s.id)));
        }, 1000);
      }
    }

    // clicking same rating again removes that rating
    const newRating = current === next ? null : next;
    setSongs((prev) => // update the rating for the song that was clicked
      prev.map((s) => {
        if (s.id !== id) return s; // only update the one that was clicked
        return { ...s, rating: newRating }; // toggle rating or remove if same button clicked again
      })
    );
  };

  const handleAddPlaylist = async () => {
    // send rating choices first so backend can store feedback
    const rated = songs.filter((s) => s.rating === 'liked' || s.rating === 'disliked');
    if (rated.length > 0) {
      authFetch(`${API_BASE_URL}/songs/rate`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(
          rated.map((s) => ({
            title: s.title,
            artist: s.artist,
            liked: s.rating === 'liked',
          }))
        ),
      }).catch(() => {});
    }

    // final playlist keeps liked + unrated and drops disliked
    const playlistSongs = songs
      .filter((s) => s.rating !== 'disliked')
      .map((s) => ({ title: s.title, artist: s.artist }));

    const userId =
      localStorage.getItem('userId') || sessionStorage.getItem('userId') || '';

    // open tab now so browsers do not block it as popup later
    const spotifyTab = window.open('', '_blank');
    if (spotifyTab) {
      spotifyTab.document.write(`<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8"/>
  <title>Adding your playlist to Spotify...</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body {
      display: flex; flex-direction: column; align-items: center; justify-content: center;
      height: 100vh; background: #0f0f1a; color: #fff; font-family: sans-serif; gap: 24px;
    }
    .spinner {
      width: 56px; height: 56px;
      border: 5px solid rgba(168,85,247,0.2);
      border-top-color: #a855f7;
      border-radius: 50%;
      animation: spin 0.9s linear infinite;
    }
    @keyframes spin { to { transform: rotate(360deg); } }
    p { font-size: 1.1rem; color: #c4b5fd; letter-spacing: 0.03em; }
  </style>
</head>
<body>
  <div class="spinner"></div>
  <p>Adding your playlist to Spotify…</p>
</body>
</html>`);
      spotifyTab.document.close();
    }

    // this handles creating the playlist and opening the Spotify tab
    setPlaylistLoading(true);
    // call backend to create playlist
    // if spotify is not linked itll return a 401 and we will redirect user to the spotify connect flow
    // after they connect we restore their state and try creating the playlist again
    try {
      const res = await authFetch(`${API_BASE_URL}/songs/create-playlist`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ songs: playlistSongs, bookTitle: effectiveBookTitle, userId }),
      });

      // open the spotify tab with the new playlist
      if (res.ok) {
        const { playlistUrl } = await res.json();
        if (playlistUrl) { // if we got a url back open it
          if (spotifyTab) { //
            spotifyTab.location.href = playlistUrl;
          } else { // what this does: if the initial window.open failed (like due to popup blockers), we can still open the spotify playlist in the current tab as a fallback, better than nothing
            window.open(playlistUrl, '_blank');
          }
          return; 
        }
        spotifyTab?.close();
        alert('Playlist was created but no URL was returned. Check your Spotify app.');
      } 



      // if we get a 401 it means spotify is not linked, so we save state and redirect to connect flow, after connecting user will be sent back here and we will restore state and try creating playlist again
      else {
        const errData = await res.json().catch(() => ({}));
        if (res.status === 401) {
          // spotify not linked yet, save state then send user to connect flow
          spotifyTab?.close();
          sessionStorage.setItem(
            'bookify_playlist_state',
            JSON.stringify({ songs, bookTitle: effectiveBookTitle })
          );
          window.location.href = `${API_BASE_URL}/auth/spotify?redirect_to=/PlaylistPage`;
          return;
        }
        spotifyTab?.close();
        alert(`Could not create playlist: ${errData.message || res.statusText}`);
      }
    } catch {
      spotifyTab?.close();
      alert('Something went wrong creating your playlist. Please try again.');
    } finally {
      setPlaylistLoading(false);
    }
  };

  return (
    <div className="playlist-page">
      {/* Floating stars container */}
      <div className="playlist-stars-container">
        {stars.map((star) => (
          <div
            key={star.id}
            className="playlist-floating-star"
            style={{
              left: `${star.x}px`,
              top: `${star.y}px`,
            }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 48 48" fill="none">
              <path d="M19.874 31C19.6954 30.3079 19.3347 29.6762 18.8292 29.1708C18.3238 28.6653 17.6921 28.3046 17 28.126L4.73 24.962C4.52066 24.9026 4.33642 24.7765 4.20523 24.6029C4.07403 24.4293 4.00305 24.2176 4.00305 24C4.00305 23.7824 4.07403 23.5707 4.20523 23.3971C4.33642 23.2235 4.52066 23.0974 4.73 23.038L17 19.872C17.6919 19.6936 18.3234 19.3332 18.8288 18.8281C19.3342 18.323 19.6951 17.6918 19.874 17L23.038 4.73001C23.0968 4.51985 23.2228 4.33469 23.3966 4.2028C23.5705 4.0709 23.7828 3.99951 24.001 3.99951C24.2192 3.99951 24.4315 4.0709 24.6054 4.2028C24.7792 4.33469 24.9052 4.51985 24.964 4.73001L28.126 17C28.3046 17.6922 28.6653 18.3238 29.1708 18.8292C29.6762 19.3347 30.3079 19.6955 31 19.874L43.27 23.036C43.481 23.0942 43.6671 23.22 43.7997 23.3942C43.9323 23.5683 44.0041 23.7811 44.0041 24C44.0041 24.2189 43.9323 24.4317 43.7997 24.6059C43.6671 24.78 43.481 24.9058 43.27 24.964L31 28.126C30.3079 28.3046 29.6762 28.6653 29.1708 29.1708C28.6653 29.6762 28.3046 30.3079 28.126 31L24.962 43.27C24.9032 43.4802 24.7772 43.6653 24.6034 43.7972C24.4295 43.9291 24.2172 44.0005 23.999 44.0005C23.7808 44.0005 23.5685 43.9291 23.3946 43.7972C23.2208 43.6653 23.0948 43.4802 23.036 43.27L19.874 31Z" stroke="#22c55e" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" />
              <path d="M40 6V14" stroke="#22c55e" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" />
              <path d="M44 10H36" stroke="#22c55e" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" />
              <path d="M8 34V38" stroke="#22c55e" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" />
              <path d="M10 36H6" stroke="#22c55e" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
          </div>
        ))}
      </div>

      {/* Header */}
      <header className="landing-header">
        <div className="login-brand">
          <div className="login-brand-badge">
            <img src={logo} alt="Bookify" className="login-brand-logo" />
          </div>
          <span className="login-brand-text">Bookify</span>
        </div>

        <nav className="landing-nav">
          <button className="landing-nav-button" onClick={() => navigate('/connectionPage')}>Features</button>
          <button className="landing-nav-button" onClick={() => navigate('/feedback')}>Feedback</button>
          <button className="landing-nav-button" onClick={() => navigate('/about')}>About</button>
          <button className="landing-nav-primary" onClick={() => navigate('/user')}>User Page</button>
        </nav>
      </header>

      <main className="playlist-main">
        {/* Stats bar */}
        <section className="playlist-stats" aria-label="Your Progress">
          <div className="playlist-stats-top">
            <div className="playlist-stats-label">
              <span className="playlist-stats-icon" aria-hidden>♪</span>
              <span>Your Progress</span>
            </div>
            <span className="playlist-stats-qty">{ratedCount} / {songs.length} rated</span>
          </div>
          <div className="playlist-progress">
            <div className="playlist-progress-bar" style={{ width: `${ratedPct}%` }} />
          </div>
          <div className="playlist-stats-cards">
            <div className="playlist-stat-card playlist-liked">
              <div className="playlist-stat-icon" aria-hidden>👍</div>
              <div className="playlist-stat-text">
                <span className="playlist-stat-label">Liked</span>
                <span className="playlist-stat-value">{likedCount}</span>
              </div>
            </div>
            <div className="playlist-stat-card playlist-disliked">
              <div className="playlist-stat-icon" aria-hidden>👎</div>
              <div className="playlist-stat-text">
                <span className="playlist-stat-label">Disliked</span>
                <span className="playlist-stat-value">{dislikedCount}</span>
              </div>
            </div>
          </div>
        </section>

        {/* Filters */}
        <div className="playlist-filters" role="tablist" aria-label="Filter songs">
          <button
            className={`playlist-filter-button ${filter === 'all' ? 'is-primary' : ''}`}
            aria-pressed={filter === 'all'}
            onClick={() => setFilter('all')}
          >
            All Songs
          </button>
          <button
            className={`playlist-filter-button ${filter === 'liked' ? 'is-active' : ''}`}
            aria-pressed={filter === 'liked'}
            onClick={() => setFilter('liked')}
          >
            Liked
          </button>
          <button
            className={`playlist-filter-button ${filter === 'disliked' ? 'is-active' : ''}`}
            aria-pressed={filter === 'disliked'}
            onClick={() => setFilter('disliked')}
          >
            Disliked
          </button>
        </div>

        {/* Song list */}
        <section className="playlist-list" aria-label="Song list">
          {visibleSongs.map((song) => (
            <article key={song.id} className="playlist-item" aria-label={`${song.title} by ${song.artist}`}>
              <div className="playlist-item-cover" aria-hidden>
                {song.cover && (
                  <img
                    src={song.cover}
                    alt=""
                    style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '10px', display: 'block' }}
                    onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = 'none'; }}
                  />
                )}
              </div>
              <div className="playlist-item-meta">
                <h3 className="playlist-item-title">{song.title}</h3>
                <div className="playlist-item-sub">
                  <span className="playlist-item-artist">{song.artist}</span>
                  <span className="playlist-item-genre">{song.genre}</span>
                </div>
              </div>
              <div className="playlist-item-actions">
                <button
                  className={`playlist-thumb-btn ${song.rating === 'liked' ? 'is-liked' : ''}`}
                  aria-label="Like"
                  onClick={(e) => toggleRating(song.id, 'liked', e)}
                >
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M5.83333 8.33333V18.3333" stroke="currentColor" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M12.4997 4.9L11.6664 8.33333H16.5247C16.7835 8.33333 17.0387 8.39362 17.2701 8.50933C17.5015 8.625 17.7028 8.793 17.8581 9C18.0133 9.207 18.1182 9.4473 18.1645 9.7018C18.2108 9.9564 18.1972 10.2183 18.1247 10.4667L16.1831 17.1333C16.0821 17.4795 15.8716 17.7836 15.5831 18C15.2946 18.2164 14.9437 18.3333 14.5831 18.3333H3.33333C2.891 18.3333 2.46707 18.1577 2.15451 17.8452C1.84195 17.5326 1.66667 17.109 1.66667 16.6667V10C1.66667 9.55797 1.84195 9.134 2.15451 8.82145C2.46707 8.50889 2.891 8.33333 3.33333 8.33333H5.63333C5.94333 8.33307 6.24724 8.24652 6.51073 8.0831C6.77422 7.91968 6.98689 7.686 7.12477 7.4083L10 1.66667C10.3927 1.67153 10.7795 1.765 11.1312 1.94052C11.483 2.11604 11.7905 2.36859 12.0309 2.67949C12.2713 2.99039 12.4383 3.35159 12.5195 3.73618C12.6007 4.12077 12.594 4.51865 12.4997 4.9Z" stroke="currentColor" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
                <button
                  className={`playlist-thumb-btn ${song.rating === 'disliked' ? 'is-disliked' : ''}`}
                  aria-label="Dislike"
                  onClick={() => toggleRating(song.id, 'disliked')}
                >
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M14.167 11.6667V1.66669" stroke="currentColor" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M7.50026 15.1L8.33359 11.6667H3.47526C3.21652 11.6667 2.96133 11.6064 2.7299 11.4907C2.49848 11.375 2.29717 11.207 2.14193 11C1.98668 10.793 1.88176 10.5527 1.83548 10.2982C1.78919 10.0436 1.80281 9.78175 1.87526 9.53335L3.81693 2.86669C3.9179 2.52049 4.12843 2.21639 4.41693 2.00002C4.70542 1.78365 5.05631 1.66669 5.41693 1.66669H16.6669C17.109 1.66669 17.5329 1.84228 17.8454 2.15484C18.158 2.4674 18.3336 2.89133 18.3336 3.33335V10C18.3336 10.442 18.158 10.866 17.8454 11.1785C17.5329 11.4911 17.109 11.6667 16.6669 11.6667H14.3669C14.0569 11.6669 13.753 11.7535 13.4895 11.9169C13.2259 12.0803 13.0132 12.314 12.8753 12.5917L10.0003 18.3334C9.60728 18.3285 9.22048 18.2349 8.86876 18.0595C8.51704 17.8842 8.20949 17.6316 7.96909 17.3207C7.72869 17.0098 7.56166 16.6486 7.48048 16.264C7.3993 15.8795 7.40606 15.4816 7.50026 15.1Z" stroke="currentColor" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
              </div>
            </article>
          ))}
        </section>

        {/* Footer actions */}
        <div className="playlist-footer">
          <button className="playlist-add-btn" onClick={handleAddPlaylist} disabled={playlistLoading}>
            {playlistLoading && (
              <span style={{
                width: '14px', height: '14px', border: '2px solid rgba(255,255,255,0.4)',
                borderTopColor: '#fff', borderRadius: '50%',
                display: 'inline-block', animation: 'spin 0.7s linear infinite',
              }} />
            )}
            {playlistLoading ? 'Creating playlist…' : 'Add playlist'}
          </button>
          <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
          <button className="playlist-regenerate btn-link" onClick={handleRegenerate} disabled={regenerating}>
            {regenerating ? 'Regenerating…' : 'Regenerate playlist'}
          </button>
        </div>
      </main>
    </div>
  );
};

export default PlaylistPage;