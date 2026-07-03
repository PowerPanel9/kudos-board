import { createContext, useContext } from 'react'

// Lets any component (Header, route pages, 401 handlers) open the login modal
// without prop-drilling. Provided in App.
export const LoginModalContext = createContext({ openLogin: () => {} })

export const useLoginModal = () => useContext(LoginModalContext)
