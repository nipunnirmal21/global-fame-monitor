import { Navigate, Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function AdminRoute({ children }) {
    const { isAuthenticated, isAdmin, initializing, user } = useAuth();
    const location = useLocation();

    if (initializing) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="animate-spin w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full" />
            </div>
        );
    }

    if (!isAuthenticated) {
        return <Navigate to="/login" replace state={{ from: location.pathname }} />;
    }

    if (!isAdmin) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
                <div className="max-w-md w-full bg-white rounded-2xl shadow-lg border border-gray-100 p-8 text-center">
                    <div className="text-5xl mb-4">🔒</div>
                    <h1 className="text-xl font-bold text-gray-900 mb-2">Admin Access Required</h1>
                    <p className="text-gray-500 mb-6">
                        Signed in as <strong>{user?.username}</strong>, but this account does not have admin privileges.
                        Add your username to <code className="text-sm bg-gray-100 px-1 rounded">ADMIN_USERNAMES</code> in the server <code className="text-sm bg-gray-100 px-1 rounded">.env</code> file, then log in again.
                    </p>
                    <Link
                        to="/"
                        className="inline-block px-5 py-2.5 text-sm font-medium text-white bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl"
                    >
                        Back to Home
                    </Link>
                </div>
            </div>
        );
    }

    return children;
}
