import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { AuthProvider } from './context/AuthContext';
import { ToastProvider } from './components/ToastProvider';
import App from './App';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import ProfilePage from './pages/ProfilePage';
import MyVotesPage from './pages/MyVotesPage';

export default function AppRouter() {
    return (
        <HelmetProvider>
            <BrowserRouter>
                <AuthProvider>
                    <ToastProvider>
                        <Routes>
                            <Route path="/" element={<App />} />
                            <Route path="/login" element={<LoginPage />} />
                            <Route path="/signup" element={<SignupPage />} />
                            <Route path="/profile/:slug" element={<ProfilePage />} />
                            <Route path="/my-votes" element={<MyVotesPage />} />
                        </Routes>
                    </ToastProvider>
                </AuthProvider>
            </BrowserRouter>
        </HelmetProvider>
    );
}
