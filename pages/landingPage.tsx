import React from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../../assets/Logo.png';
import landingPagePicOne from '../../assets/landingPagePicOne.jpeg';
import landingPagePicThree from '../../assets/LandingPagePicThree.jpeg';
import Hero from '../../ui/hero';

type AnimatedBookIconProps = {
  variant?: 'a' | 'b' | 'c';
  className?: string;
  style?: React.CSSProperties;
};

const AnimatedBookIcon: React.FC<AnimatedBookIconProps> = ({ variant = 'a', className, style }) => {
  const animationName = variant === 'b' ? 'floatB' : variant === 'c' ? 'floatC' : 'floatA';
  return (
    <div className={className} style={{
      height: '64px',
      flexShrink: 0,
      alignSelf: 'stretch',
      animation: `${animationName} 3s ease-in-out infinite`,
      ...style,
    }}>
      <style>{`
        /* Variant A: gentle vertical float + slight clockwise tilt */
        @keyframes floatA {
          0%, 100% {
            transform: translate(0px, 0px) rotate(0deg);
          }
          50% {
            transform: translate(0px, -20px) rotate(5deg);
          }
        }

        /* Variant B: deeper float with subtle horizontal sway + counter-clockwise tilt */
        @keyframes floatB {
          0%, 100% {
            transform: translate(0px, 0px) rotate(0deg);
          }
          25% {
            transform: translate(6px, -10px) rotate(-3deg);
          }
          50% {
            transform: translate(0px, -26px) rotate(-6deg);
          }
          75% {
            transform: translate(-6px, -10px) rotate(-3deg);
          }
        }

        /* Variant C: figure-eight drift with micro spin */
        @keyframes floatC {
          0%, 100% {
            transform: translate(0px, 0px) rotate(0deg) scale(1);
          }
          20% {
            transform: translate(10px, -12px) rotate(6deg) scale(1.02);
          }
          40% {
            transform: translate(-8px, -22px) rotate(12deg) scale(1.01);
          }
          60% {
            transform: translate(-14px, -6px) rotate(-4deg) scale(0.99);
          }
          80% {
            transform: translate(8px, -18px) rotate(-10deg) scale(1.005);
          }
        }
      `}</style>

      <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 64 64" fill="none">
        <path d="M10.6667 52V12C10.6667 10.2319 11.3691 8.5362 12.6194 7.28595C13.8696 6.03571 15.5653 5.33333 17.3334 5.33333H50.6667C51.374 5.33333 52.0523 5.61428 52.5524 6.11438C53.0525 6.61448 53.3334 7.29275 53.3334 8V56C53.3334 56.7072 53.0525 57.3855 52.5524 57.8856C52.0523 58.3857 51.374 58.6667 50.6667 58.6667H17.3334C15.5653 58.6667 13.8696 57.9643 12.6194 56.714C11.3691 55.4638 10.6667 53.7681 10.6667 52ZM10.6667 52C10.6667 50.2319 11.3691 48.5362 12.6194 47.286C13.8696 46.0357 15.5653 45.3333 17.3334 45.3333H53.3334" stroke="#9810FA" strokeWidth="5.33333" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M21.3333 32V26.6667C21.3333 23.8377 22.4571 21.1246 24.4574 19.1242C26.4578 17.1238 29.1709 16 31.9999 16C34.8289 16 37.542 17.1238 39.5424 19.1242C41.5428 21.1246 42.6666 23.8377 42.6666 26.6667V32" stroke="#9810FA" strokeWidth="5.33333" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M39.9999 34.6667C41.4727 34.6667 42.6666 33.4728 42.6666 32C42.6666 30.5272 41.4727 29.3333 39.9999 29.3333C38.5272 29.3333 37.3333 30.5272 37.3333 32C37.3333 33.4728 38.5272 34.6667 39.9999 34.6667Z" stroke="#9810FA" strokeWidth="5.33333" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M23.9999 34.6667C25.4727 34.6667 26.6666 33.4728 26.6666 32C26.6666 30.5272 25.4727 29.3333 23.9999 29.3333C22.5272 29.3333 21.3333 30.5272 21.3333 32C21.3333 33.4728 22.5272 34.6667 23.9999 34.6667Z" stroke="#9810FA" strokeWidth="5.33333" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </div>
  );
};

const landingPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col" style={{ background: 'linear-gradient(135deg, #EFF6FF 0%, #FAF5FF 50%, #F0FDFA 100%), #FFF' }}>
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
          <button
            className="landing-nav-primary"
            onClick={() => navigate('/login')}
          >
            Login
          </button>
        </nav>
      </header>

      <main className="flex-1" style={{ marginTop: '24px' }}>
        <Hero
          title={<span style={{ fontSize: '160px', lineHeight: '1.2', display: 'inline-block', overflow: 'visible' }}>{'Bookify'}</span>}
          subtitle={
            <div style={{ position: 'relative', display: 'block' }}>
              <span style={{
                color: '#364153',
                textAlign: 'center',
                fontFamily: 'Arimo, system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial',
                fontSize: '45px',
                fontStyle: 'normal',
                fontWeight: 400,
                lineHeight: '56.25px',
                margin: 0,
                display: 'block',
                marginTop: '-50px',
                marginBottom: '100px'
              }}>
                Read it, hear it, feel it
              </span>
              <div style={{ position: 'absolute', top: '50%', left: '70%', transform: 'translate(220px, -50%)', marginTop: '50px', marginBottom: '100px' }}>
                <AnimatedBookIcon variant="a" />
              </div>
              <div style={{ position: 'absolute', top: '50%', right: '105%', transform: 'translate(220px, -50%)', marginTop: '570px', marginBottom: '100px' }}>
                <AnimatedBookIcon variant="b" />
              </div>
            </div>
          }
        // imageSrc={headerImg}
        />

        <div className="w-full flex items-center justify-center" style={{ position: 'relative', minHeight: '60vh', maxWidth: '1100px', margin: '0 auto' }}>
          <img
            src={landingPagePicOne}
            alt="Bookify experience"
            style={{
              width: '984px',
              height: '380px',
              objectFit: 'cover',
              borderRadius: '16px',
              display: 'block',
              margin: '0 auto',
              objectPosition: 'center',
              boxShadow: '0 12px 30px rgba(0,0,0,0.50)'
            }}
          />

        </div>



        <p style={{
          fontFamily: 'Arimo',
          fontSize: '49px',
          fontStyle: 'normal',
          fontWeight: 400,
          lineHeight: '73.5px',
          background: 'linear-gradient(90deg, #9810FA 0%, #009689 100%)',
          backgroundClip: 'text',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          margin: '24px auto 0',
          textAlign: 'left',
          maxWidth: '948px',
          marginLeft: 'auto',
          marginRight: 'auto',
          paddingLeft: '16px',
          paddingRight: '16px',
          letterSpacing: '0.5px',
        }}>
          Your Personal Audio Library
        </p>

        <div style={{
          display: 'flex',
          height: '458px',
          padding: '49px 49px 1px 49px',
          flexDirection: 'column',
          alignItems: 'flex-start',
          gap: '24px',
          flexShrink: 0,
          alignSelf: 'stretch',
          borderRadius: '24px',
          border: '1px solid rgba(255, 255, 255, 0.50)',
          background: 'rgba(255, 255, 255, 0.60)',
          boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.10), 0 8px 10px -6px rgba(0, 0, 0, 0.10)',
          maxWidth: '948px',
          margin: '24px auto 0',
          marginLeft: 'auto',
          marginRight: 'auto',
          position: 'relative',
        }}>

          <p style={{
            fontFamily: 'Arimo',
            fontSize: '24px',
            fontStyle: 'normal',
            fontWeight: 400,
            lineHeight: '36px',
            color: '#364153',
            margin: 0,
            letterSpacing: '0.5px',
          }}>
            At Bookify, we believe that books have the power to transform lives.
            Our mission is to make reading more accessible and enjoyable for everyone
            by converting written content into high-quality audio format. Whether
            you're commuting, exercising, or simply relaxing, Bookify allows you to immerse
            yourself in your favorite books anytime, anywhere.
          </p>
          <div style={{ position: 'absolute', top: '394px', right: '-90px' }}>
            <AnimatedBookIcon variant="c" />
          </div>
          {/* Left-aligned picture below the library text */}
          {/* <div style={{ position: 'absolute', top: '-50%', left: '70%', transform: 'translate(220px, -50%)', marginTop: '50px', marginBottom: '100px' }}>
            <AnimatedBookIcon variant="a" />
          </div> */}
        </div>
        <div style={{
          maxWidth: '948px',
          margin: '16px auto 0',
          paddingLeft: '16px',
          paddingRight: '16px',
          paddingTop: '80px',
          paddingBottom: '80px',
          display: 'flex',
          alignItems: 'flex-start',
          gap: '24px'
        }}>
          <img
            src={landingPagePicThree}
            alt="Bookify library preview"
            style={{
              width: '456px',
              height: '348.922px',
              objectFit: 'cover',
              borderRadius: '16px',
              display: 'block',
              boxShadow: '0 12px 30px rgba(0,0,0,0.50)'
            }}
          />
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', width: '431.195px' }}>
            <span style={{
              background: 'linear-gradient(90deg, #009689 0%, #155DFC 100%)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              fontFamily: 'Arimo',
              fontSize: '80px',
              fontStyle: 'normal',
              fontWeight: 400,
              lineHeight: '80px',
              textAlign: 'right'
            }}>
              Try It Now
            </span>
            <button
              onClick={() => navigate('/create-account')}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'scale(1.04)';
                e.currentTarget.style.boxShadow = '0 35px 60px -15px rgba(0, 0, 0, 0.35)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'scale(1)';
                e.currentTarget.style.boxShadow = '0 25px 50px -12px rgba(0, 0, 0, 0.25)';
              }}
              style={{
                marginTop: '16px',
                display: 'flex',
                width: '431.195px',
                padding: '16px 48px 0 48px',
                flexDirection: 'column',
                alignItems: 'flex-start',
                flex: '1 0 0',
                borderRadius: '16px',
                background: 'linear-gradient(90deg, #155DFC 0%, #9810FA 100%)',
                boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
                border: 'none',
                cursor: 'pointer',
                transition: 'transform 200ms ease, box-shadow 200ms ease'
              }}
              aria-label="Bookify"
            >
              <span style={{
                flex: '1 0 0',
                color: '#FFF',
                fontFamily: 'Arimo',
                fontSize: '97px',
                fontStyle: 'normal',
                fontWeight: 400,
                lineHeight: '97px'
              }}>
                Bookify
              </span>
            </button>
          </div>
        </div>
      </main>

      <footer className="py-6 text-center text-sm text-gray-500">© {new Date().getFullYear()} Bookify </footer>
    </div>
  );
};

export default landingPage;