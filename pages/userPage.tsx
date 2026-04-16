import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import logo from '../../assets/Logo.png';
import '../../styles.css';
import { API_BASE_URL } from '../../config';


const SectionCard = ({ title, children }: any) => (
    <div className="user-section">
        <h3 className="user-section-title">{title}</h3>
        {children}
    </div>
);

const InputRow = ({ label, value, onChange, type = "text" }: any) => (
    <div className="input-row">
        <span className="input-label">{label}</span>
        <input
            type={type}
            className="input-line"
            value={value}
            onChange={(e) => onChange(e.target.value)}
        />
    </div>
);

const UserPage = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");

    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const [spotifyId, setSpotifyId] = useState<string | null>(null);

    useEffect(() => {
        const rawUserId =
            localStorage.getItem("userId") ||
            sessionStorage.getItem("userId");

        const userId = rawUserId?.trim();

        console.log("USER ID BEING SENT:", JSON.stringify(userId));

        if (!userId) {
            navigate("/login");
            return;
        }

        axios.post(`${API_BASE_URL}/graphql`, {
            query: `
                query GetUserById($id: ID!) {
                getUserById(id: $id) {
                    _id
                    first_name
                    last_name
                    email
                    spotify_id

                    books {
                    _id
                    title
                    author
                    }

                    playlists {
                    _id
                    title
                    author
                    }
                }
                }
                `,
            variables: { id: userId }
        })
            .then(res => {
                const data = res.data?.data?.getUserById;

                if (!data) throw new Error("User not found");

                setUser(data);
                setFirstName(data.first_name);
                setLastName(data.last_name);
                setUsername(data.email?.split("@")[0] || "");
                setEmail(data.email);
                setSpotifyId(data.spotify_id || null);
            })
            .catch(err => {
                console.error("FULL ERROR:", err);
                console.error("GRAPHQL RESPONSE:", err.response?.data);
                setError("Failed to load user profile.");
            })
            .finally(() => setLoading(false));

    }, [navigate]);

    // 🔹 Update profile
    const handleSaveProfile = async () => {
        setError("");
        setSuccess("");

        const userId = localStorage.getItem("userId") || sessionStorage.getItem("userId");
        if (!userId) {
            navigate("/login");
            return;
        }

        try {
            const res = await axios.post(
                `${API_BASE_URL}/graphql`,
                {
                    query: `
          mutation UpdateUser($id: ID!, $input: CreateUserInput!) {
            updateUser(id: $id, updateUserInput: $input) {
              _id
              first_name
              last_name
              email
              spotify_id
              books
              playlists
            }
          }
        `,
                    variables: {
                        id: userId,
                        input: {
                            first_name: firstName,
                            last_name: lastName,
                            email: email
                        }
                    }
                },
                {
                    headers: {
                        "Content-Type": "application/json"
                    }
                }
            );

            const updatedUser = res.data.data.updateUser;

            setUser(updatedUser);
            setSuccess("Profile updated successfully!");
        } catch (err: any) {
            console.error("UPDATE ERROR:", err.response?.data || err.message);
            setError("Failed to update profile.");
        }
    };

    // 🔹 Change password
    const handleChangePassword = async () => {
        setError("");
        setSuccess("");

        if (newPassword !== confirmPassword) {
            setError("New password and confirmation do not match.");
            return;
        }

        const userId =
            localStorage.getItem("userId") ||
            sessionStorage.getItem("userId");

        if (!userId) return navigate("/login");

        try {
            const res = await axios.post(
                `${API_BASE_URL}/graphql`,
                {
                    query: `
          mutation ChangePassword($userId: String!, $currentPassword: String!, $newPassword: String!) {
            changePassword(
              userId: $userId,
              currentPassword: $currentPassword,
              newPassword: $newPassword
            ) {
              _id
            }
          }
        `,
                    variables: {
                        userId,
                        currentPassword,
                        newPassword
                    }
                },
                {
                    headers: {
                        "Content-Type": "application/json"
                    }
                }
            );

            setCurrentPassword("");
            setNewPassword("");
            setConfirmPassword("");
            setSuccess("Password updated successfully!");
        } catch (err: any) {
            console.error("PASSWORD ERROR:", err.response?.data || err.message);
            setError(err.response?.data?.errors?.[0]?.message || "Failed to change password.");
        }
    };

    if (loading || !user) return <div>Loading...</div>;

    return (
        <div className="user-page">
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
                            backgroundClip: 'text',
                        }}
                    >
                        Bookify
                    </span>
                </div>
                <nav className="landing-nav">
                    <button className="landing-nav-button" onClick={() => navigate('/')}>Log out</button>
                    
                    <button className="landing-nav-primary" onClick={() => navigate('/submitPage')}>Create Playlist</button>
                </nav>
            </header>

            <div className="user-container">
                {error && <div className="error-message">{error}</div>}
                {success && <div className="success-message">{success}</div>}

                <div className="user-title-wrap">
                    <div className="user-icon">
                        <svg viewBox="0 0 24 24" fill="none" className="user-title-icon">
                            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                            <circle cx="12" cy="7" r="4" stroke="currentColor" strokeWidth="2" />
                        </svg>
                    </div>
                    <h1 className="user-title">User Profile</h1>
                </div>

                {/* PROFILE CARD */}
                <SectionCard title="Profile Card">
                    <InputRow label="First Name:" value={firstName} onChange={setFirstName} />
                    <InputRow label="Last Name:" value={lastName} onChange={setLastName} />
                    <InputRow label="Username:" value={username} onChange={setUsername} />
                    <InputRow label="Email:" value={email} onChange={() => { }} />

                    <div className="button-row">
                        <button className="btn-secondary" onClick={handleSaveProfile}>Save Changes</button>
                        <button
                            className="btn-secondary"
                            onClick={() => {
                                if (!user) return;

                                setFirstName(user.first_name);
                                setLastName(user.last_name);
                                setUsername(user.username || user.email.split("@")[0]);
                            }}
                        >
                            Cancel
                        </button>
                    </div>
                </SectionCard>

                {/* SPOTIFY CARD */}
                <SectionCard title="Spotify">
                    <InputRow label="Status:" value={spotifyId ? "Connected" : "Not Connected"} onChange={() => { }} />
                    <InputRow label="Spotify ID:" value={spotifyId || ""} onChange={() => { }} />
                    <div className="button-center">
                        <button className="btn-secondary" onClick={() => window.location.href = `/auth/spotify?redirect_to=/user`}>Reconnect Spotify</button>
                    </div>
                </SectionCard>

                {/* PASSWORD CARD */}
                <SectionCard title="Change Password">
                    <InputRow label="Current Password:" type="password" value={currentPassword} onChange={setCurrentPassword} />
                    <InputRow label="New Password:" type="password" value={newPassword} onChange={setNewPassword} />
                    <InputRow label="Confirm Password:" type="password" value={confirmPassword} onChange={setConfirmPassword} />

                    <div className="button-center">
                        <button className="btn-secondary" onClick={handleChangePassword}>Update Password</button>
                    </div>
                </SectionCard>

                {/* ACTIVITY CARD */}
                <SectionCard title="Your Activity">
                    <InputRow label="Playlists:" value={user?.playlists?.length || 0} onChange={() => { }} />
                    <InputRow label="Books:" value={user?.books?.length || 0} onChange={() => { }} />

                    <div className="button-center">
                        <button
                            className="btn-secondary"
                            onClick={() => navigate('/PlaylistPage')}
                        >
                            View Playlist
                        </button>                    </div>
                </SectionCard>
            </div>
        </div>
    );
};

export default UserPage;