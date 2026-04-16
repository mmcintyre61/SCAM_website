import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const imgIcon = 'https://www.figma.com/api/mcp/asset/5831f9b5-16a8-4465-b280-1e8069e85d94';
const imgIcon1 = 'https://www.figma.com/api/mcp/asset/9aac75fa-afa3-4646-93c4-a31ab2caccf0';

const BookNotFoundPage: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [bookInfo, setBookInfo] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Submitted:', { email, bookInfo });
  };

  return (
    <div style={{ position: 'relative', width: '100%', minHeight: '100vh', backgroundColor: '#fff' }}>
      {/* Top gradient bar */}
      <div
        style={{
          position: 'absolute',
          top: '-1px',
          left: 0,
          width: '100%',
          height: '4px',
          borderRadius: '24px 24px 0 0',
          backgroundImage: 'linear-gradient(90deg, #2B7FFF 0%, #AD46FF 50%, #F6339A 100%)'
        }}
      />

      {/* Header */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '65px',
          backgroundColor: 'rgba(255, 255, 255, 0.8)',
          borderBottom: '1px solid #E5E7EB',
          paddingLeft: '32px',
          paddingRight: '32px',
          paddingBottom: '1px'
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            height: '64px',
            width: '100%'
          }}
        >
          {/* Bookify Logo */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', height: '40px' }}>
            <div
              style={{
                width: '40px',
                height: '40px',
                borderRadius: '14px',
                boxShadow: '0px 10px 15px -3px rgba(0,0,0,0.1), 0px 4px 6px -4px rgba(0,0,0,0.1)',
                backgroundImage: 'linear-gradient(135deg, #2B7FFF 0%, #AD46FF 50%, #F6339A 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <img alt="" style={{ width: '24px', height: '24px' }} src={imgIcon1} />
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

          {/* Navigation */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', height: '40px' }}>
            <button
              onClick={() => navigate('/connectionPage')}
              style={{
                fontFamily: 'Arimo, sans-serif',
                fontSize: '16px',
                fontWeight: 400,
                lineHeight: '24px',
                color: '#4A5565',
                background: 'transparent',
                border: 'none',
                cursor: 'pointer',
                padding: '8px 16px'
              }}
            >
              Features
            </button>
            <button
              onClick={() => navigate('/about')}
              style={{
                fontFamily: 'Arimo, sans-serif',
                fontSize: '16px',
                fontWeight: 400,
                lineHeight: '24px',
                color: '#4A5565',
                background: 'transparent',
                border: 'none',
                cursor: 'pointer',
                padding: '8px 16px'
              }}
            >
              About
            </button>
            <button onClick={() => navigate('/feedback')} style={{
                fontFamily: 'Arimo, sans-serif',
                fontSize: '16px',
                fontWeight: 400,
                lineHeight: '24px',
                color: '#FFF',
                backgroundImage: 'linear-gradient(90deg, #2B7FFF 0%, #9810FA 100%)',
                border: 'none',
                borderRadius: '10px',
                cursor: 'pointer',
                padding: '8px 16px',
                height: '40px'
              }} >Feedback</button>
            <button onClick={() => navigate('/user')} style={{
                fontFamily: 'Arimo, sans-serif',
                fontSize: '16px',
                fontWeight: 400,
                lineHeight: '24px',
                color: '#FFF',
                backgroundImage: 'linear-gradient(90deg, #2B7FFF 0%, #9810FA 100%)',
                border: 'none',
                borderRadius: '10px',
                cursor: 'pointer',
                padding: '8px 16px',
                height: '40px'
              }} >User Page</button>
            <button
              onClick={() => navigate('/create-account')}
              style={{
                fontFamily: 'Arimo, sans-serif',
                fontSize: '16px',
                fontWeight: 400,
                lineHeight: '24px',
                color: '#FFF',
                backgroundImage: 'linear-gradient(90deg, #2B7FFF 0%, #9810FA 100%)',
                border: 'none',
                borderRadius: '10px',
                cursor: 'pointer',
                padding: '8px 16px',
                height: '40px'
              }}
            >
              Sign Up
            </button>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          minHeight: '871px',
          paddingTop: '129px',
          paddingLeft: '272px',
          paddingRight: '272px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          backgroundImage: 'linear-gradient(143.66deg, #EFF6FF 0%, #FAF5FF 50%, #FDF2F8 100%)'
        }}
      >
        <div
          style={{
            backgroundColor: '#FFF',
            border: '1px solid #F3F4F6',
            borderRadius: '24px',
            boxShadow: '0px 25px 50px -12px rgba(0,0,0,0.25)',
            width: '100%',
            height: '678px',
            position: 'relative',
            maxWidth: '640px',
            margin: '0 auto'
          }}
        >
          {/* Icon Container */}
          <div
            style={{
              position: 'absolute',
              top: '48px',
              left: '50%',
              transform: 'translateX(-50%)',
              width: '128px',
              height: '128px'
            }}
          >
            {/* Blurred background */}
            <div
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '128px',
                height: '128px',
                borderRadius: '24px',
                filter: 'blur(24px)',
                opacity: 0.4,
                backgroundImage: 'linear-gradient(135deg, #2B7FFF 0%, #AD46FF 50%, #F6339A 100%)'
              }}
            />
            {/* Main icon */}
            <div
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '128px',
                height: '128px',
                borderRadius: '24px',
                boxShadow: '0px 20px 25px -5px rgba(0,0,0,0.1), 0px 8px 10px -6px rgba(0,0,0,0.1)',
                backgroundImage: 'linear-gradient(135deg, #2B7FFF 0%, #AD46FF 50%, #F6339A 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <img alt="" style={{ width: '64px', height: '64px' }} src={imgIcon} />
            </div>
          </div>

          {/* Heading */}
          <h1
            style={{
              position: 'absolute',
              top: '208px',
              left: '50%',
              transform: 'translateX(-50%)',
              fontFamily: 'Arimo, sans-serif',
              fontSize: '48px',
              fontWeight: 'bold',
              lineHeight: '48px',
              color: '#101828',
              textAlign: 'center',
              margin: 0
            }}
          >
            Uh oh!
          </h1>

          {/* Description */}
          <div
            style={{
              position: 'absolute',
              top: '280px',
              left: '48px',
              right: '48px',
              display: 'flex',
              flexDirection: 'column',
              gap: '8px'
            }}
          >
            <p
              style={{
                fontFamily: 'Arimo, sans-serif',
                fontSize: '18px',
                fontWeight: 400,
                lineHeight: '28px',
                color: '#364153',
                textAlign: 'center',
                margin: 0
              }}
            >
              Your book is not currently in our database
            </p>
            <p
              style={{
                fontFamily: 'Arimo, sans-serif',
                fontSize: '16px',
                fontWeight: 400,
                lineHeight: '24px',
                color: '#4A5565',
                textAlign: 'center',
                margin: 0
              }}
            >
              Please use this form so we can notify you when we have added this book and it is ready for playlist generation
            </p>
          </div>

          {/* Form */}
          <form
            onSubmit={handleSubmit}
            style={{
              position: 'absolute',
              top: '404px',
              left: '48px',
              right: '48px',
              display: 'flex',
              flexDirection: 'column',
              gap: '24px'
            }}
          >
            {/* Email Input */}
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{
                backgroundColor: '#F9FAFB',
                border: '1px solid #E5E7EB',
                borderRadius: '14px',
                padding: '16px 24px',
                fontSize: '16px',
                fontFamily: 'Arimo, sans-serif',
                color: '#364153',
                height: '58px',
                width: '100%',
                boxSizing: 'border-box'
              }}
              required
            />

            {/* Book Info Input */}
            <input
              type="text"
              placeholder="Title, Author"
              value={bookInfo}
              onChange={(e) => setBookInfo(e.target.value)}
              style={{
                backgroundColor: '#F9FAFB',
                border: '1px solid #E5E7EB',
                borderRadius: '14px',
                padding: '16px 24px',
                fontSize: '16px',
                fontFamily: 'Arimo, sans-serif',
                color: '#364153',
                height: '58px',
                width: '100%',
                boxSizing: 'border-box'
              }}
              required
            />

            {/* Submit Button */}
            <button
              type="submit"
              style={{
                backgroundImage: 'linear-gradient(90deg, #2B7FFF 0%, #9810FA 50%, #E60076 100%)',
                borderRadius: '14px',
                boxShadow: '0px 10px 15px -3px rgba(0,0,0,0.1), 0px 4px 6px -4px rgba(0,0,0,0.1)',
                border: 'none',
                height: '60px',
                width: '100%',
                color: '#FFF',
                fontFamily: 'Arimo, sans-serif',
                fontSize: '18px',
                fontWeight: 400,
                lineHeight: '28px',
                cursor: 'pointer',
                transition: 'transform 200ms ease, box-shadow 200ms ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'scale(1.02)';
                e.currentTarget.style.boxShadow = '0px 15px 20px -3px rgba(0,0,0,0.2), 0px 6px 8px -4px rgba(0,0,0,0.15)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'scale(1)';
                e.currentTarget.style.boxShadow = '0px 10px 15px -3px rgba(0,0,0,0.1), 0px 4px 6px -4px rgba(0,0,0,0.1)';
              }}
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default BookNotFoundPage;
