// Uncomment this line to use CSS modules
// import styles from './app.module.css';
// import NxWelcome from './nx-welcome';
// src/main.tsx (top)
import './../styles.css';
import './style/tokens.css';
import { Route, Routes, Link } from 'react-router-dom';
import LandingPage from './pages/landingPage'; 
import ConnectionPage from './pages/connectionPage';
import Login from './pages/login';
import CreateAccount from './pages/createAccount';
import SubmitPage from './pages/sumbitPage';
import About from './pages/about';
import PlaylistPage from './pages/PlaylistPage';
import ErrorPage from './pages/errorPage';
import UserPage from './pages/userPage';
import FeedbackPage from './pages/FeedbackPage';


export function App() {
  return (
    <div>
      {/* <NxWelcome title="bookify-ui" /> */}

      {/* START: routes */}
      
      <Routes>
        {/* Root route */}
        <Route path="/" element={<LandingPage />} />

        <Route path="/about" element={<About />} />

        <Route path="/connectionPage" element={<ConnectionPage />} />

        <Route path="/login" element={<Login />} />

        <Route path="/create-account" element={<CreateAccount />} />

        <Route path="/createAccount" element={<CreateAccount />} />

        <Route path="/submitPage" element= {<SubmitPage/>} />

        <Route path="/PlaylistPage" element={<PlaylistPage />} />

        <Route path="/errorPage" element={<ErrorPage />} />

        <Route path="/user" element={<UserPage />} />
        
        <Route path="/feedback" element={<FeedbackPage />} />

      </Routes>
      {/* END: routes */}
    </div>
  );
}

export default App;