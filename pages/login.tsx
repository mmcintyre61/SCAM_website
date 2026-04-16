import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../../assets/logoTwo.jpg';
import iconEyeLock from '../../assets/PWnot-viewable.png';
import iconEyeNotLock from '../../assets/PW-viewable.png';
import iconUser from '../../assets/email-icon.png';
import iconLock from '../../assets/PW-icon.png';
import { API_BASE_URL } from '../../config';

// Icon assets from Figma (form inputs)

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const PWsource = showPassword ? iconEyeNotLock : iconEyeLock;

  const handleLogin = async (e?: React.FormEvent) => {
    e?.preventDefault();
    setError(null);

    if (!email || !password) {
      setError('Please enter both email and password');
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(`${API_BASE_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      if (!res.ok) {
        if (res.status === 404) setError('No account found for that email');
        else if (res.status === 401) setError('Invalid email or password');
        else setError('Login failed. Please try again.');
        setLoading(false);
        return;
      }

      const userData = await res.json();
      console.log("LOGIN RESPONSE:", userData);

      if (rememberMe) {
        localStorage.setItem('userId', userData.id);
        localStorage.setItem('userEmail', userData.email);
      } else {
        sessionStorage.setItem('userId', userData.id);
        sessionStorage.setItem('userEmail', userData.email);
      }

      navigate('/submitPage'); // Go to UserPage
    } catch {
      setError('Cannot reach the server. Make sure the API is running and CORS/protocol settings are correct.');
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      <div className="login-blur login-blur-blue" />
      <div className="login-blur login-blur-pink" />

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

      <main className="login-main">
        <div className="login-card-shell">
          <div className="login-card-glow" aria-hidden />
          <div className="login-card">
            <div className="login-card-top-bar" />
            <div className="login-card-body">
              <div className="login-card-header">
                <div className="login-form-badge">
                  <img src={logo} alt="Bookify" className="login-form-logo" />
                </div>
                <h2 className="login-heading">Welcome to Bookify</h2>
                <p className="login-subheading">Read it, hear it, feel it</p>
              </div>

              <form className="login-form" onSubmit={handleLogin}>
                <div className="login-input-group">
                  <div className="login-input-shell">
                    <input
                      type="email"
                      placeholder="Username or Email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="login-input"
                    />
                  </div>
                  <img src={iconUser} alt="" className="login-input-icon" />
                </div>

                <div className="login-input-group">
                  <div className="login-input-shell">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      placeholder="Password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      className="login-input"
                    />
                  </div>
                  <img src={iconLock} alt="" className="login-input-icon" />
                  <button
                    // img src={iconEyeNotLock} 
                    type="button"
                    onClick={() => setShowPassword((prev) => !prev)}
                    className="login-toggle-icon"
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                  >
                    <img src={PWsource} alt="" className="login-icon-20" />
                  </button>
                </div>

                <div className="login-row">
                  <label className="login-checkbox-label">
                    <input
                      type="checkbox"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                      className="login-checkbox"
                    />
                    Remember me
                  </label>
                  <button className="login-link-button" type="button" onClick={() => navigate('/forgot-password')}>
                    Forgot password?
                  </button>
                </div>

                {error && <p className="login-error">{error}</p>}

                <button className="login-primary-button" type="submit" disabled={loading} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                  {loading && (
                    <span style={{
                      width: '16px', height: '16px', border: '2px solid rgba(255,255,255,0.4)',
                      borderTopColor: '#fff', borderRadius: '50%',
                      display: 'inline-block', animation: 'spin 0.7s linear infinite',
                    }} />
                  )}
                  {loading ? 'Signing in…' : 'Sign In'}
                </button>
                <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
              </form>

              <p className="login-footer-text">
                Don't have an account?{' '}
                <button type="button" className="login-footer-link" onClick={() => navigate('/create-account')}>
                  Sign up
                </button>
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Login;
