import { Navigate } from 'react-router-dom'
import useAuth from '@/hooks/useAuth'

function ProtectedRoute({ children, allowedRoles }) {
  const {
    user,
    isAuthenticated,
    isLoading,
  } = useAuth()

  if (isLoading) {
    return (
      <div className="p-10 text-center">
        Cargando...
      </div>
    )
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />
  }

  if (
    allowedRoles &&
    !allowedRoles.includes(user?.role)
  ) {
    return <Navigate to="/" replace />
  }

  return children
}

export default ProtectedRoute