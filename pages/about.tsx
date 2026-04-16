import React from 'react';
import logo from '../../assets/Logo.png';
import { useNavigate } from 'react-router-dom';

const imgIcon = "https://www.figma.com/api/mcp/asset/508f971a-81ac-45e7-894b-1ccf7f16887e";
const imgIcon9 = "https://www.figma.com/api/mcp/asset/40f22fc1-8fd3-4d02-a1b7-376423be7a00";

const About: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div style={{ position: 'relative', width: '100%', minHeight: '100vh', backgroundColor: '#fff' }}>
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
              className="landing-nav-button"
              onClick={() => navigate('/connectionPage')}
            >
              Learn More
            </button>
            <button
              className="landing-nav-button"
              onClick={() => navigate('/')}
            >
              Home
            </button>
            
            <button
              className="landing-nav-button"
              onClick={() => navigate('/createAccount')}
            >
              Sign Up
            </button>
            <button
              className="landing-nav-primary"
              onClick={() => navigate('/login')}
            >
              Login
            </button>
          </nav>
      </header>

      {/* Main Content */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          minHeight: '2058.5px',
          backgroundImage: 'linear-gradient(119.91deg, #EFF6FF 0%, #FAF5FF 50%, #FDF2F8 100%)'
        }}
      >
        {/* Hero Section */}
        <div style={{ position: 'relative', height: '447.5px', paddingTop: '65px', marginLeft: '80px', marginRight: '80px' }}>
          {/* Badge */}
          <div
            style={{
              position: 'absolute',
              top: '145px',
              left: '50%',
              transform: 'translateX(-50%)',
              backgroundColor: 'rgba(255, 255, 255, 0.6)',
              border: '1px solid #E9D4FF',
              borderRadius: '16777200px',
              height: '38px',
              paddingLeft: '16px',
              paddingRight: '16px',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}
          >
          
            <p
              style={{
                fontFamily: 'Arimo, sans-serif',
                fontSize: '14px',
                fontWeight: 400,
                lineHeight: '20px',
                color: '#8200DB',
                margin: 0
              }}
            >
              About Bookify
            </p>
          </div>

          {/* Heading */}
          <div style={{ position: 'absolute', top: '207px', left: '16px', right: '16px', textAlign: 'center' }}>
            <h1
              style={{
                fontFamily: 'Arimo, sans-serif',
                fontSize: '60px',
                fontWeight: 'bold',
                lineHeight: '60px',
                color: '#101828',
                margin: 0
              }}
            >
              Every Book Has a
            </h1>
            <h1
              style={{
                fontFamily: 'Arimo, sans-serif',
                fontSize: '60px',
                fontWeight: 'bold',
                lineHeight: '60px',
                backgroundImage: 'linear-gradient(90deg, #155DFC 0%, #9810FA 50%, #E60076 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                margin: 0,
                marginTop: '10px'
              }}
            >
              Perfect Soundtrack
            </h1>
          </div>

          {/* Subtitle */}
          <p
            style={{
              position: 'absolute',
              top: '351px',
              left: '50%',
              transform: 'translateX(-50%)',
              fontFamily: 'Arimo, sans-serif',
              fontSize: '20px',
              fontWeight: 400,
              lineHeight: '32.5px',
              color: '#4A5565',
              textAlign: 'center',
              margin: 0,
              maxWidth: '768px',
              paddingLeft: '16px',
              paddingRight: '16px'
            }}
          >
            Bookify creates personalized music playlists that match the vibe, mood, and emotions of your favorite books. Whether you're reading romance, thriller, or sci-fi, we'll find the perfect songs to enhance your experience.
          </p>
        </div>

        {/* Stats Section */}
        <div style={{ marginTop: '80px', paddingLeft: '32px', paddingRight: '32px' }}>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(4, 1fr)',
              gap: '24px',
              marginBottom: '80px'
            }}
          >
            {[
              { 
                number: '50K+', 
                label: 'Playlists Created',
                icon: (
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M9 18V5l12-2v13"></path>
                    <circle cx="6" cy="18" r="3"></circle>
                    <circle cx="18" cy="16" r="3"></circle>
                  </svg>
                )
              },
              { 
                number: '10K+', 
                label: 'Books Matched',
                icon: (
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path>
                    <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path>
                  </svg>
                )
              },
              { 
                number: '25K+', 
                label: 'Active Users',
                icon: (
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                    <circle cx="9" cy="7" r="4"></circle>
                    <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                    <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                  </svg>
                )
              },
              { 
                number: '98%', 
                label: 'Satisfaction Rate',
                icon: (
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                  </svg>
                )
              }
            ].map((stat, index) => (
              <div
                key={index}
                style={{
                  backgroundColor: 'rgba(255, 255, 255, 0.6)',
                  border: '1px solid rgba(255, 255, 255, 0.5)',
                  borderRadius: '16px',
                  boxShadow: '0px 10px 15px -3px rgba(0,0,0,0.1), 0px 4px 6px -4px rgba(0,0,0,0.1)',
                  padding: '24px',
                  textAlign: 'center',
                  height: '178px',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'flex-start'
                }}
              >
                <div
                  style={{
                    width: '56px',
                    height: '56px',
                    borderRadius: '14px',
                    boxShadow: '0px 10px 15px -3px rgba(0,0,0,0.1), 0px 4px 6px -4px rgba(0,0,0,0.1)',
                    backgroundImage: 'linear-gradient(135deg, #2B7FFF 0%, #9810FA 100%)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: '12px'
                  }}
                >
                  {stat.icon}
                </div>
                <p
                  style={{
                    fontFamily: 'Arimo, sans-serif',
                    fontSize: '30px',
                    fontWeight: 'bold',
                    lineHeight: '36px',
                    color: '#101828',
                    margin: '0 0 4px 0'
                  }}
                >
                  {stat.number}
                </p>
                <p
                  style={{
                    fontFamily: 'Arimo, sans-serif',
                    fontSize: '14px',
                    fontWeight: 400,
                    lineHeight: '20px',
                    color: '#4A5565',
                    margin: 0
                  }}
                >
                  {stat.label}
                </p>
              </div>
            ))}
          </div>

          {/* How It Works Section */}
          <div
            style={{
              backgroundColor: '#FFF',
              border: '1px solid #F3F4F6',
              borderRadius: '24px',
              boxShadow: '0px 20px 25px -5px rgba(0,0,0,0.1), 0px 8px 10px -6px rgba(0,0,0,0.1)',
              padding: '48px',
              marginBottom: '64px'
            }}
          >
            <h2
              style={{
                fontFamily: 'Arimo, sans-serif',
                fontSize: '30px',
                fontWeight: 'bold',
                lineHeight: '36px',
                color: '#101828',
                textAlign: 'center',
                margin: '0 0 60px 0'
              }}
            >
              How It Works
            </h2>
            <div style={{ maxWidth: '768px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <p
                style={{
                  fontFamily: 'Arimo, sans-serif',
                  fontSize: '18px',
                  fontWeight: 400,
                  lineHeight: '29.25px',
                  color: '#364153',
                  margin: 0
                }}
              >
                Our advanced AI analyzes the themes, emotions, pacing, and atmosphere of each book in our database. We then match these elements with songs that complement and enhance your reading experience.
              </p>
              <p
                style={{
                  fontFamily: 'Arimo, sans-serif',
                  fontSize: '18px',
                  fontWeight: 400,
                  lineHeight: '29.25px',
                  color: '#364153',
                  margin: 0
                }}
              >
                Simply search for your book, and within seconds, you'll have a curated playlist ready to go. Each playlist is uniquely crafted to capture the essence of the story, from heart-pounding action scenes to quiet, contemplative moments.
              </p>
              <p
                style={{
                  fontFamily: 'Arimo, sans-serif',
                  fontSize: '18px',
                  fontWeight: 400,
                  lineHeight: '29.25px',
                  color: '#364153',
                  margin: 0
                }}
              >
                Our community of readers rates and refines each playlist, ensuring you always get the best musical companion for your literary journey.
              </p>
            </div>
          </div>

          {/* Why Readers Love Bookify Section */}
          <h2
            style={{
              fontFamily: 'Arimo, sans-serif',
              fontSize: '30px',
              fontWeight: 'bold',
              lineHeight: '36px',
              color: '#101828',
              textAlign: 'center',
              margin: '0 0 68px 0'
            }}
          >
            Why Readers Love Bookify
          </h2>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(2, 1fr)',
              gap: '24px',
              marginBottom: '64px'
            }}
          >
            {[
              {
                icon: (
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21.5 2v6h-6M2.5 22v-6h6M2 11.5a10 10 0 0 1 18.8-4.3M22 12.5a10 10 0 0 1-18.8 4.2"/>
                    <circle cx="12" cy="12" r="2" fill="white"/>
                  </svg>
                ),
                title: 'Smart Playlists',
                description: 'AI-generated playlists that capture the mood, themes, and emotions of your favorite books.'
              },
              {
                icon: (
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10"/>
                    <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"/>
                    <path d="M2 12h20"/>
                  </svg>
                ),
                title: 'Multiple Genres',
                description: 'From classical to contemporary, we match music across all genres to your reading experience.'
              },
              {
                icon: (
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/>
                    <circle cx="9" cy="7" r="4"/>
                    <path d="M22 21v-2a4 4 0 0 0-3-3.87"/>
                    <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
                  </svg>
                ),
                title: 'Curated by Readers',
                description: 'Community ratings and reviews help you discover the perfect soundtrack for every book.'
              },
              {
                icon: (
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
                  </svg>
                ),
                title: 'Instant Generation',
                description: 'Get your personalized playlist in seconds. Just enter your book and let us do the magic.'
              }
            ].map((feature, index) => (
              <div
                key={index}
                style={{
                  backgroundColor: '#FFF',
                  border: '1px solid #F3F4F6',
                  borderRadius: '16px',
                  boxShadow: '0px 10px 15px -3px rgba(0,0,0,0.1), 0px 4px 6px -4px rgba(0,0,0,0.1)',
                  padding: '33px',
                  display: 'flex',
                  gap: '16px',
                  alignItems: 'flex-start'
                }}
              >
                <div
                  style={{
                    width: '48px',
                    height: '48px',
                    borderRadius: '14px',
                    backgroundImage: 'linear-gradient(135deg, #2B7FFF 0%, #9810FA 100%)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0
                  }}
                >
                  {feature.icon}
                </div>
                <div style={{ flex: 1 }}>
                  <h3
                    style={{
                      fontFamily: 'Arimo, sans-serif',
                      fontSize: '20px',
                      fontWeight: 'bold',
                      lineHeight: '28px',
                      color: '#101828',
                      margin: '0 0 8px 0'
                    }}
                  >
                    {feature.title}
                  </h3>
                  <p
                    style={{
                      fontFamily: 'Arimo, sans-serif',
                      fontSize: '16px',
                      fontWeight: 400,
                      lineHeight: '26px',
                      color: '#4A5565',
                      margin: 0
                    }}
                  >
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* CTA Section */}
          <div
            style={{
              backgroundImage: 'linear-gradient(90deg, #2B7FFF 0%, #9810FA 50%, #E60076 100%)',
              borderRadius: '24px',
              boxShadow: '0px 25px 50px -12px rgba(0,0,0,0.25)',
              padding: '48px',
              textAlign: 'center',
              marginBottom: '64px'
            }}
          >
            <h2
              style={{
                fontFamily: 'Arimo, sans-serif',
                fontSize: '36px',
                fontWeight: 'bold',
                lineHeight: '40px',
                color: '#FFF',
                margin: '0 0 16px 0'
              }}
            >
              Ready to Find Your Book's Soundtrack?
            </h2>
            <p
              style={{
                fontFamily: 'Arimo, sans-serif',
                fontSize: '20px',
                fontWeight: 400,
                lineHeight: '28px',
                color: 'rgba(255, 255, 255, 0.9)',
                margin: '0 0 32px 0'
              }}
            >
              Join thousands of readers enhancing their literary experience with music
            </p>
            <button
              onClick={() => navigate('/create-account')}
              style={{
                backgroundColor: '#FFF',
                borderRadius: '14px',
                boxShadow: '0px 10px 15px -3px rgba(0,0,0,0.1), 0px 4px 6px -4px rgba(0,0,0,0.1)',
                border: 'none',
                padding: '16px 32px',
                fontFamily: 'Arimo, sans-serif',
                fontSize: '18px',
                fontWeight: 'bold',
                lineHeight: '28px',
                color: '#9810FA',
                cursor: 'pointer',
                transition: 'transform 200ms ease, box-shadow 200ms ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'scale(1.05)';
                e.currentTarget.style.boxShadow = '0px 15px 20px -3px rgba(0,0,0,0.2), 0px 6px 8px -4px rgba(0,0,0,0.15)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'scale(1)';
                e.currentTarget.style.boxShadow = '0px 10px 15px -3px rgba(0,0,0,0.1), 0px 4px 6px -4px rgba(0,0,0,0.1)';
              }}
            >
              Get Started Free
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
