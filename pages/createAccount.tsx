import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../../assets/logoTwo.jpg';
import '../style/createAccount.css';
import { API_BASE_URL } from '../../config';

const CreateAccount: React.FC = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [spotifyId, setSpotifyId] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Use a build-time environment variable when available so we can point
  // the UI at a remote API (EC2) instead of localhost
  // Detect environment: use import.meta.env in Vite, process.env in tests
  const API_URL =
    (typeof import.meta !== 'undefined'
      ? (import.meta as any).env?.VITE_API_URL
      : process.env.VITE_API_URL) ?? 'https://bookify.it.com';

  // Restore saved form values (if any) after returning from Spotify OAuth
  useEffect(() => {
    try {
      const raw = sessionStorage.getItem('createAccountForm');
      if (raw) {
        const parsed = JSON.parse(raw);
        if (parsed.firstName) setFirstName(parsed.firstName);
        if (parsed.lastName) setLastName(parsed.lastName);
        if (parsed.email) setEmail(parsed.email);
        if (parsed.password) setPassword(parsed.password);
      }
    } catch (e) {
      console.warn('Could not restore create account form from sessionStorage', e);
    }
  }, []);

  useEffect(() => {
    try {
      const params = new URLSearchParams(window.location.search);
      const callbackSpotifyId = params.get('spotifyId');

      if (callbackSpotifyId) {
        setSpotifyId(callbackSpotifyId);
        params.delete('spotifyId');

        const query = params.toString();
        const cleanUrl = `${window.location.pathname}${query ? `?${query}` : ''}`;
        window.history.replaceState({}, document.title, cleanUrl);
      }
    } catch (e) {
      console.warn('Could not parse spotify callback params', e);
    }
  }, []);

  const handleConnectSpotify = () => {
    // Grab whatever the user typed in so far
    const formData = { firstName, lastName, email, password };
    try {
      // put it in sessionStorage so we don't lose it if the page reloads
      sessionStorage.setItem('createAccountForm', JSON.stringify(formData));
    } catch (e) {
      // If saving fails, just let the user know in the console (not a big deal)
      // eslint-disable-next-line no-console
      console.warn('Could not save form data to sessionStorage', e);
    }

    // Set up where we want to come back after Spotify does its thing
    const redirectTo = encodeURIComponent('/createAccount');
    // Send the user off to Spotify to connect their account
    window.location.href = `${API_BASE_URL}/auth/spotify?redirect_to=${redirectTo}`;
  };

  const handleCreateAccount = async () => {
    // Validation
    if (!firstName || !lastName || !email || !password) {
      alert('Please fill in all required fields');
      return;
    }

    // Spotify is optional during account creation.
    if (!spotifyId) {
      alert('Please connect your Spotify account first');
      return;
    }

    setLoading(true);
    try {
      // Only include spotify_id if it exists
      const payload: any = {
        first_name: firstName,
        last_name: lastName,
        email,
        password,
        spotify_connected: Boolean(spotifyId),
      };
      if (spotifyId) payload.spotify_id = spotifyId;

      const response = await fetch(`${API_BASE_URL}/users`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        const userData = await response.json();
        console.log('Account created successfully:', userData);

        try { sessionStorage.removeItem('createAccountForm'); } catch (e) { /* ignore */ }

        try {
          localStorage.setItem('userId', userData._id);
          localStorage.setItem('userEmail', userData.email);
        } catch (e) { /* ignore */ }

        navigate('/submitPage');
      } else {
        const errorData = await response.json();
        alert(`Error creating account: ${errorData.message || 'Unknown error'}`);
        setLoading(false);
      }
    } catch (error) {
      console.error('Error creating account:', error);
      alert('Failed to create account. Please check your connection and try again.');
      setLoading(false);
    }
  };


  return (
    <div className="create-account-page">
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
          <button
            className="landing-nav-primary"
            onClick={() => navigate('/login')}
          >
            Login
          </button>
        </nav>
      </header>

      {/* Main Card */}
      <main className="create-account-main">
        <div className="create-account-card">
          <div className="create-account-card-top-bar" />

          {/* Header Section */}
          <div className="create-account-header-section">
            <div className="create-account-icon-badge">
              <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <circle cx="12" cy="7" r="4" stroke="white" strokeWidth="2" />
              </svg>
            </div>
            <h1 className="create-account-title">Create account</h1>
            <p className="create-account-subtitle">Join Bookify today</p>
          </div>

          {/* Form Section */}
          <form className="create-account-form">
            {/* First Name */}
            <div className="create-account-input-group">
              <div className="create-account-input-wrapper">
                <svg className="create-account-input-icon" viewBox="0 0 24 24" fill="none">
                  <circle cx="12" cy="7" r="4" stroke="currentColor" strokeWidth="2" />
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                </svg>
                <input
                  type="text"
                  placeholder="First Name"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  className="create-account-input"
                />
              </div>
            </div>

            {/* Last Name */}
            <div className="create-account-input-group">
              <div className="create-account-input-wrapper">
                <svg className="create-account-input-icon" viewBox="0 0 24 24" fill="none">
                  <circle cx="12" cy="7" r="4" stroke="currentColor" strokeWidth="2" />
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                </svg>
                <input
                  type="text"
                  placeholder="Last Name"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  className="create-account-input"
                />
              </div>
            </div>

            {/* Email */}
            <div className="create-account-input-group">
              <div className="create-account-input-wrapper">
                <svg className="create-account-input-icon" viewBox="0 0 24 24" fill="none">
                  <rect x="3" y="5" width="18" height="14" rx="2" stroke="currentColor" strokeWidth="2" fill="none" />
                  <path d="M3 7l9 6 9-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="create-account-input"
                />
              </div>
            </div>

            {/* Password */}
            <div className="create-account-input-group">
              <div className="create-account-input-wrapper">
                <svg className="create-account-input-icon" viewBox="0 0 24 24" fill="none">
                  <rect x="5" y="11" width="14" height="10" rx="2" stroke="currentColor" strokeWidth="2" fill="none" />
                  <path d="M8 11V7a4 4 0 0 1 8 0v4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                  <circle cx="12" cy="16" r="1.5" fill="currentColor" />
                </svg>
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="create-account-input"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="create-account-password-toggle"
                >
                  <svg viewBox="0 0 24 24" fill="none" className="create-account-password-icon">
                    {showPassword ? (
                      <>
                        <path d="M3 12s6-8 9-8 9 8 9 8-6 8-9 8-9-8-9-8z" stroke="currentColor" strokeWidth="2" fill="none" />
                        <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="2" fill="none" />
                      </>
                    ) : (
                      <>
                        <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
                        <line x1="1" y1="1" x2="23" y2="23" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </>
                    )}
                  </svg>
                </button>
              </div>
            </div>

            {/* Spotify Connection Button */}
            <button
              type="button"
              onClick={handleConnectSpotify}
              className="create-account-spotify-button"
              style={{
                backgroundColor: spotifyId ? '#1db954' : '#1ed760',
                color: 'white',
                padding: '12px 20px',
                borderRadius: '25px',
                border: 'none',
                cursor: 'pointer',
                fontWeight: 'bold',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '10px',
                width: '100%',
                marginBottom: '16px',
              }}
            >
              <svg viewBox="0 0 24 24" fill="currentColor" style={{ width: '20px', height: '20px' }}>
                <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z" />
              </svg>
              {spotifyId ? '✓ Spotify Connected' : 'Connect Spotify'}
            </button>

            {/* Create Account Button */}
            <button
              type="button"
              onClick={handleCreateAccount}
              className="create-account-button"
              disabled={loading}
              style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}
            >
              {loading && (
                <span style={{
                  width: '16px', height: '16px', border: '2px solid rgba(255,255,255,0.4)',
                  borderTopColor: '#fff', borderRadius: '50%',
                  display: 'inline-block', animation: 'spin 0.7s linear infinite',
                }} />
              )}
              {loading ? 'Creating account…' : 'Create account'}
            </button>
            <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
          </form>


          {/* Sign In Link */}
          <div className="create-account-footer">
            <p className="create-account-footer-text">
              Already have an account?{' '}
              <button
                type="button"
                onClick={() => navigate('/login')}
                className="create-account-footer-link"
              >
                Sign in
              </button>
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default CreateAccount;
