import React, { useState, useEffect, useMemo } from "react"
import { ToastContainer } from "react-toastify"
import Auth from "./pages/Auth"
import { getToken, decodeToken, removeToken } from "./utils/token"
import AuthContext from "./context/AuthContext"
import Navigation from "./routes/Navigation"

export default function App() {
  const [auth, setAuth] = useState(undefined)
  
  useEffect(() => {
    const token = getToken()
    if (!token) {
      setAuth(null)
    } else {
      setAuth(decodeToken(token))
    }
  }, [])

  const logout = () => {
    removeToken()
    setAuth(null)
  }

  const setUser = (user) => {
    setAuth(user)
  }

  const authData = useMemo(
    () => ({
      auth,
      logout,
      setUser
    }),
    [auth]
  )

  if (auth === undefined) return null

  return (
    <AuthContext.Provider value={authData}>
      {!auth ? <Auth /> : <Navigation />}
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </AuthContext.Provider>
  )
}
