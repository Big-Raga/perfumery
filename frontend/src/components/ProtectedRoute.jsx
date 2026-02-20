import { Navigate } from 'react-router-dom';
import { useVerifyAuth } from '../hooks/adminHooks';

const ProtectedRoute = ({ children }) => {
    const { data, isLoading, isError } = useVerifyAuth();

    if (isLoading) {
        return (
            <div className="min-h-screen bg-gray-100 flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto"></div>
                    <p className="mt-4 text-gray-600">Verifying authentication...</p>
                </div>
            </div>
        );
    }

    if (isError || !data) {
        return <Navigate to="/admin/login" replace />;
    }

    return children;
};

export default ProtectedRoute;
