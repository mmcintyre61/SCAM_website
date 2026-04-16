import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { API_BASE_URL } from "../../config";
import logo from "../../assets/Logo.png";
import "../../styles.css";

interface Book {
  _id: string;
  title: string;
}

interface Playlist {
  _id: string;
  title: string;
}

interface FeedbackInput {
  score: number;
  comment: string;
}

const StarRating = ({
  score,
  setScore,
}: {
  score: number;
  setScore: (val: number) => void;
}) => (
  <div style={{ display: "flex", gap: 8, fontSize: 28 }}>
    {[1, 2, 3, 4, 5].map((star) => (
      <span
        key={star}
        style={{
          cursor: "pointer",
          color: star <= score ? "#facc15" : "#d1d5db",
        }}
        onClick={() => setScore(star)}
      >
        ★
      </span>
    ))}
  </div>
);

const FeedbackPage = () => {
  const navigate = useNavigate();

  const userId =
    localStorage.getItem("userId") ||
    sessionStorage.getItem("userId");

  const [books, setBooks] = useState<Book[]>([]);
  const [playlists, setPlaylists] = useState<Playlist[]>([]);
  const [feedbacks, setFeedbacks] = useState<
    Record<string, FeedbackInput>
  >({});
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (!userId) {
      navigate("/login");
      return;
    }

    const fetchData = async () => {
      try {
        const res = await axios.post(`${API_BASE_URL}/graphql`, {
          query: `
            query GetUserData($id: ID!) {
              getUserById(id: $id) {
                _id
                books {
                  _id
                  title
                }
                playlists {
                  _id
                  title
                }
              }
            }
          `,
          variables: { id: userId },
        });

        const data = res.data?.data?.getUserById;

        if (!data) throw new Error("User not found");

        setBooks(data.books || []);
        setPlaylists(data.playlists || []);

        // Initialize feedback state
        const initialFeedback: Record<string, FeedbackInput> = {};
        (data.playlists || []).forEach((playlist: Playlist) => {
          initialFeedback[playlist._id] = {
            score: 0,
            comment: "",
          };
        });

        setFeedbacks(initialFeedback);
      } catch (err) {
        console.error("FETCH ERROR:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [navigate, userId]);

  const handleSubmit = async (playlistId: string) => {
    const feedback = feedbacks[playlistId];
    if (!feedback || !feedback.score) return;

    try {
      await axios.post(`${API_BASE_URL}/graphql`, {
        query: `
          mutation CreateFeedback($input: CreateFeedbackInput!) {
            createFeedback(createFeedbackInput: $input) {
              _id
            }
          }
        `,
        variables: {
          input: {
            user_id: userId,
            playlist_id: playlistId,
            score: feedback.score,
            comments: feedback.comment ? [feedback.comment] : [],
          },
        },
      });

      setMessage("Feedback submitted!");
    } catch (err) {
      console.error("SUBMIT ERROR:", err);
      setMessage("Failed to submit feedback");
    }
  };

  if (loading) return <div>Loading...</div>;
//<img src={logo} alt="Bookify" className="login-brand-logo"
  return (
    <div className="landing-page">
      {/* HEADER */}
      <header className="landing-header">
        <div className="login-brand">
          <div className="login-brand-badge">
            <img
              src={logo}
              alt="Bookify"
              className="login-brand-logo"
            />
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
              backgroundClip: 'text',
            }}
          >
            Bookify
          </span>
        </div>

        <nav className="landing-nav">
          <button
            className="landing-nav-button"
            onClick={() => navigate("/")}
          >
            Features
          </button>
          <button
            className="landing-nav-button"
            onClick={() => navigate("/feedback")}
          >
            Feedback
          </button>
          <button
            className="landing-nav-button"
            onClick={() => navigate("/about")}
          >
            About
          </button>
          
          <button
            className="landing-nav-primary"
            onClick={() => navigate("/signup")}
          >
            Sign Up
          </button>
        </nav>
      </header>

      {/* MAIN */}
      <div className="feedback-container">
        <div className="feedback-title-wrap">
          <h1 className="feedback-title">Feedback</h1>
        </div>

        {/* BOOKS */}
        {books.length > 0 && (
          <div className="user-section">
            <h3>Your Books</h3>
            {books.map((book) => (
              <p key={book._id}>{book.title}</p>
            ))}
          </div>
        )}

        {/* NO PLAYLISTS */}
        {playlists.length === 0 && (
          <div className="user-section">
            <h3>No playlists found</h3>
            <p>Submit a book and we’ll create you a playlist 🎧</p>
            <button
              className="btn-secondary"
              onClick={() => navigate("/")}
            >
              Go back to the Home Page
            </button>
          </div>
        )}

        {/* PLAYLISTS */}
        {playlists.map((playlist) => (
          <div key={playlist._id} className="feedback-card">
            <h3>Playlist: {playlist.title}</h3>

            <StarRating
              score={feedbacks[playlist._id]?.score || 0}
              setScore={(val) =>
                setFeedbacks((prev) => ({
                  ...prev,
                  [playlist._id]: {
                    ...prev[playlist._id],
                    score: val,
                  },
                }))
              }
            />

            <textarea
              placeholder="Add comments..."
              value={feedbacks[playlist._id]?.comment || ""}
              onChange={(e) =>
                setFeedbacks((prev) => ({
                  ...prev,
                  [playlist._id]: {
                    ...prev[playlist._id],
                    comment: e.target.value,
                  },
                }))
              }
              style={{ width: "100%", marginTop: 8 }}
            />

            <button
              className="feedback-button"
              disabled={!feedbacks[playlist._id]?.score}
              onClick={() => handleSubmit(playlist._id)}
            >
              Submit Feedback
            </button>
          </div>
        ))}

        {message && <p>{message}</p>}
      </div>
    </div>
  );
};

export default FeedbackPage;