import React, {
  createContext,
  useContext,
  useState,
} from 'react'

export const SideBarContext = createContext()

export const SideBarProvider = ({ children }) => {
  const [show, setShow] = useState(true)
  return (
    <SideBarContext.Provider
      value={{
        show,
        setShow,
      }}
    >
      {children}
    </SideBarContext.Provider>
  )
}

export const useSideBarValue = () =>
  useContext(SideBarContext)
