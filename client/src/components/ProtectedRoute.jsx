import { Navigate } from "react-router-dom"

const ProtectedRoute = ({user,loading,children}) => {
    if (loading){
        return (
            <div className="min-h-screen flex items-center justify-center bg-[#f8f8fc]">
                <div className="animate-spin rounded-full h-32 w-32 border-t-4 border-b-4 border-purple-500"></div>

            </div>
        )
    }

    if(!user){
        return <Navigate to="/login" replace />
    }
    return children
}

export default ProtectedRoute