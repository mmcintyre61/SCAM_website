import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const imgIcon = 'https://www.figma.com/api/mcp/asset/a5acca11-7321-4dbf-93f2-75936a7ffdaa';
const imgIcon1 = 'https://www.figma.com/api/mcp/asset/3eeb5b52-8871-409d-8b5d-1a02a30bb920';

const BookNotFoundPage: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [bookInfo, setBookInfo] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission here
    console.log('Submitted:', { email, bookInfo });
    // You can add API call logic here
  };

  return (
    <div className="bg-white relative min-h-screen w-full">
      {/* Top gradient bar */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-tl-2xl rounded-tr-2xl" />

      {/* Header */}
      <div className="absolute top-0 left-0 right-0 bg-white/80 border-b border-gray-200 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-8 h-16 flex items-center justify-between">
          {/* Bookify Logo */}
          <div className="flex items-center gap-2">
            <div
              className="w-10 h-10 rounded-2xl shadow-lg flex items-center justify-center"
              style={{
                backgroundImage:
                  'linear-gradient(135deg, rgba(43, 127, 255, 1) 0%, rgba(173, 70, 255, 1) 50%, rgba(246, 51, 154, 1) 100%)',
              }}
            >
              <img alt="Bookify Icon" className="w-6 h-6" src={imgIcon1} />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Bookify
            </span>
          </div>

          {/* Navigation */}
          <div className="flex items-center gap-8">
            <button className="text-gray-600 text-base font-normal hover:text-gray-900">
              Features
            </button>
            <button className="text-gray-600 text-base font-normal hover:text-gray-900">
              About
            </button>
            <button className="text-gray-600 text-base font-normal hover:text-gray-900" onClick={() => navigate('/feedback')}>Feedback</button>
            <button className="text-gray-600 text-base font-normal hover:text-gray-900" onClick={() => navigate('/user')}>User Page</button>
            <button className="px-6 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white text-base font-normal rounded-xl hover:shadow-lg transition-shadow">
              Sign Up
            </button>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div
        className="absolute top-0 left-0 right-0 bottom-0 pt-32 px-64 flex justify-center"
        style={{
          backgroundImage:
            'linear-gradient(143.6602427570806deg, rgba(239, 246, 255, 1) 0%, rgba(250, 245, 255, 1) 50%, rgba(253, 242, 248, 1) 100%)',
        }}
      >
        <div className="bg-white border border-gray-200 rounded-3xl shadow-2xl p-12 w-full max-w-2xl">
          {/* Icon Container */}
          <div className="flex justify-center mb-12">
            <div className="relative w-32 h-32">
              {/* Blurred background */}
              <div
                className="absolute inset-0 blur-2xl rounded-3xl opacity-40"
                style={{
                  backgroundImage:
                    'linear-gradient(135deg, rgba(43, 127, 255, 1) 0%, rgba(173, 70, 255, 1) 50%, rgba(246, 51, 154, 1) 100%)',
                }}
              />
              {/* Main icon */}
              <div
                className="absolute inset-0 rounded-3xl shadow-xl flex items-center justify-center"
                style={{
                  backgroundImage:
                    'linear-gradient(135deg, rgba(43, 127, 255, 1) 0%, rgba(173, 70, 255, 1) 50%, rgba(246, 51, 154, 1) 100%)',
                }}
              >
                <img alt="Book Icon" className="w-16 h-16" src={imgIcon} />
              </div>
            </div>
          </div>

          {/* Heading */}
          <h1 className="text-5xl font-bold text-center text-gray-900 mb-8">
            Uh oh!
          </h1>

          {/* Description */}
          <div className="text-center mb-12">
            <p className="text-lg text-gray-700 mb-4">
              Your book is not currently in our database
            </p>
            <p className="text-base text-gray-600">
              Please use this form so we can notify you when we have added this
              book and it is ready for playlist generation
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email Input */}
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-gray-50 border border-gray-300 px-6 py-4 rounded-2xl text-base text-gray-700 placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />

            {/* Book Info Input */}
            <input
              type="text"
              placeholder="Title, Author"
              value={bookInfo}
              onChange={(e) => setBookInfo(e.target.value)}
              className="w-full bg-gray-50 border border-gray-300 px-6 py-4 rounded-2xl text-base text-gray-700 placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full h-16 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white text-lg font-normal rounded-2xl hover:shadow-lg transition-shadow font-sans"
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
