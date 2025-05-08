import { createContext, useContext, useEffect, useState, Dispatch, ReactNode, SetStateAction } from 'react'
import { LOGIN_URL } from '../utils/contanst'
import { LogoutAndDeleteToken } from '../services/LogOut'
import { type User } from '../types/Interfaces'
import axios from 'axios'

interface IAuthContext {
  isAuthenticated: boolean
  user: User | null
  setUser: Dispatch<SetStateAction<User| null>>
  setIsAuthenticated: Dispatch<SetStateAction<boolean>>
}

const AuthContext = createContext<IAuthContext | undefined>(undefined)

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null)
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  useEffect(() => {
    axios.get(`${LOGIN_URL}/profile`)
      .then(res => {
        if (res.status === 200) {
          setIsAuthenticated(true)
          setUser(res.data)
        }
      })
      .catch(error => {
        if (error.response && error.response.status === 401) {
          LogoutAndDeleteToken()
          setIsAuthenticated(false)
          setUser(null)
        }
      })
  }, [isAuthenticated])

  return (
    <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated, user, setUser }}>
      {children}
    </AuthContext.Provider>
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = (): IAuthContext => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
