import { createContext, useEffect, useState } from 'react'
import { loginUser } from '@/services/authService'

export const AuthContext = createContext()

function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [token, setToken] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const storedUser = localStorage.getItem('germenUser')
    const storedToken = localStorage.getItem('germenToken')

    if (storedUser && storedToken) {
      setUser(JSON.parse(storedUser))
      setToken(storedToken)
    }

    setIsLoading(false)
  }, [])

  const login = async (credentials) => {
    const data = await loginUser(credentials)

    setUser(data.user)
    setToken(data.token)

    localStorage.setItem(
      'germenUser',
      JSON.stringify(data.user)
    )

    localStorage.setItem(
      'germenToken',
      data.token
    )

    return data
  }

  const logout = () => {
    setUser(null)
    setToken(null)

    localStorage.removeItem('germenUser')
    localStorage.removeItem('germenToken')
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        login,
        logout,
        isAuthenticated: Boolean(user && token),
        isLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider